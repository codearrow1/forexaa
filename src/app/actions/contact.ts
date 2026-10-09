"use server";

import { ContactDemoSchema, type ContactDemo } from "@/validation/forms";
import { getLeadStore, type LeadInput } from "@/lib/lead-store";
import {
  getRateLimiter,
  setupRateLimiter,
  RATE_LIMIT_PROFILES,
} from "@/security/rate-limit";
import { sanitizeIntent } from "@/lib/contact-intent";
import { internalNotification, userConfirmation } from "@/lib/email/templates";
import { observe } from "@/lib/observability";
import { getServerLogger } from "@/lib/logger";

/**
 * Contact / demo submission server action (Rule 16/17).
 *
 * SECURITY MODEL:
 * 1. Validate all FormData with Zod (server is the only authority)
 * 2. Normalize values (trim, lowercase email)
 * 3. Enforce length limits
 * 4. Reject unknown enum values
 * 5. Detect honeypot submissions (website_url must be empty)
 * 6. Rate-limit per IP (production: shared backend; dev: in-memory)
 * 7. Prevent duplicate abuse via server-side fingerprint
 * 8. Avoid logging PII (name, email, company, message)
 * 9. Avoid returning sensitive infrastructure errors
 * 10. Never trust hidden inputs
 * 11. Never accept arbitrary redirect URLs
 */

// Wire the shared rate-limit backend from env (no-op in dev / when unset),
// then use the production-capable limiter. See src/security/rate-limit.ts.
setupRateLimiter();
const rateLimiter = getRateLimiter();

export interface ContactActionResult {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function submitContactForm(
  formData: FormData,
  clientIp: string = "unknown",
): Promise<ContactActionResult> {
  // --- 1. Honeypot check ---
  const honeypot = String(formData.get("website_url") ?? "").trim();
  if (honeypot.length > 0) {
    // Bot detected — silently succeed to avoid revealing the honeypot.
    getServerLogger().warn("contact_honeypot_triggered", { ip: clientIp });
    return { success: true };
  }

  // --- 2. Rate limiting ---
  const { limit, windowMs } = RATE_LIMIT_PROFILES.contact;
  const rateResult = await rateLimiter.consume(
    `contact:${clientIp}`,
    limit,
    windowMs,
  );
  if (!rateResult.allowed) {
    getServerLogger().warn("contact_rate_limited", { ip: clientIp });
    return {
      success: false,
      error: "Too many requests. Please try again later.",
    };
  }

  // --- 3. Zod validation ---
  const raw: Record<string, unknown> = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    country: formData.get("country"),
    businessType: formData.get("businessType"),
    interest: formData.get("interest"),
    message: formData.get("message"),
  };

  const parsed = ContactDemoSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "_root";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { success: false, error: "Validation failed", fieldErrors };
  }

  const data = parsed.data as ContactDemo;

  // --- 4. Context -> safe intent (never a free-form value into the record) ---
  const intent = sanitizeIntent(String(formData.get("context") ?? ""));

  const lead: LeadInput = {
    name: data.name,
    email: data.email,
    company: data.company,
    country: data.country,
    businessType: data.businessType,
    intent,
    interest: data.interest,
    message: data.message,
    source: "contact-form",
  };

  // --- 5. Persist the lead (durable when a DB is configured) ---
  const store = getLeadStore();
  const saved = await store.save(lead);

  const { getEmailProvider } = await import("@/lib/email/provider");
  const provider = getEmailProvider();

  if (!saved.success) {
    // Durable store failed: last-resort internal email so the request is not
    // silently lost (Rule 16). Email failure is safe for the user.
    const fallback = await provider.send(internalNotification(lead));
    observe("lead-store.failure", { storeKind: store.kind, emailedFallback: fallback.success });
    getServerLogger().error("contact_lead_save_failed", {
      ip: clientIp,
      emailedFallback: fallback.success,
    });
    return {
      success: fallback.success,
      error: fallback.success
        ? "We received your request. Please allow a little extra time."
        : "We couldn't submit your request right now. Please try again.",
    };
  }

  // --- 6. Notification emails (best-effort; the lead is already persisted) ---
  // The confirmation is always attempted. The internal notification is sent
  // here only when the store is Postgres (the email store records internally).
  const confirmation = await provider.send(userConfirmation(lead));
  if (!confirmation.success) observe("email.failure", { kind: "confirmation" });
  if (store.kind === "postgres") {
    const internal = await provider.send(internalNotification(lead));
    if (!internal.success) observe("email.failure", { kind: "internal" });
  }

  // --- 7. Success (no PII in logs) ---
  getServerLogger().info("contact_form_submitted", {
    interest: data.interest,
    businessType: data.businessType,
    intent,
  });

  return { success: true };
}
