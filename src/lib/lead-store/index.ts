/**
 * Lead storage abstraction (Phase 6 Rule 8-12).
 *
 * - PostgresLeadStore (production): durable, parameterized persistence.
 * - EmailNotificationLeadStore (dev / degraded fallback): the sales-inbox
 *   email is the record when no database is configured.
 *
 * Selection: Postgres when DATABASE_URL is set, otherwise the email store.
 * In production without a database, getLeadStore() logs a warning — the lead
 * is NOT lost silently, and verify:production flags it as a BLOCKER.
 */

import { PostgresLeadStore } from "@/lib/lead-store/postgres";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "closed"
  | "archived";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  country: string;
  businessType: string;
  intent: string;
  interest: string;
  message: string;
  source: string;
  status: LeadStatus;
  submittedAt: string;
}

/** Input accepted by save() — id/status are assigned server-side. */
export type LeadInput = Omit<Lead, "id" | "status" | "submittedAt">;

export interface LeadStore {
  readonly kind: "postgres" | "email";
  save(
    lead: LeadInput,
  ): Promise<{ success: boolean; error?: string; id?: string }>;
  /** Internal lifecycle only — never exposed to the public form. */
  setStatus?(id: string, status: LeadStatus): Promise<void>;
}

/** Escape HTML entities to prevent injection in email templates. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Server-side dedup fingerprint. Only low-sensitivity identifying fields are
 * combined — never the free-form message, and never used as an analytics key.
 */
export function generateLeadFingerprint(email: string, company: string): string {
  const normalized = `${email.toLowerCase().trim()}|${company.toLowerCase().trim()}`;
  return Buffer.from(normalized).toString("base64");
}

/**
 * EmailNotificationLeadStore: dev / degraded fallback. The sales-inbox email
 * is the record when no database is configured.
 */
class EmailNotificationLeadStore implements LeadStore {
  readonly kind = "email" as const;
  private readonly recentFingerprints = new Map<string, number>();

  async save(
    lead: LeadInput,
  ): Promise<{ success: boolean; error?: string; id?: string }> {
    try {
      const fingerprint = generateLeadFingerprint(lead.email, lead.company);
      const now = Date.now();
      const lastSubmission = this.recentFingerprints.get(fingerprint);

      if (lastSubmission && now - lastSubmission < 60000) {
        console.info("[lead-store:email] Duplicate submission detected, skipping");
        return { success: true };
      }
      this.recentFingerprints.set(fingerprint, now);

      const { getEmailProvider } = await import("@/lib/email/provider");
      const provider = getEmailProvider();

      const e = {
        interest: escapeHtml(lead.interest),
        name: escapeHtml(lead.name),
        email: escapeHtml(lead.email),
        company: escapeHtml(lead.company),
        country: escapeHtml(lead.country),
        businessType: escapeHtml(lead.businessType),
        intent: escapeHtml(lead.intent),
        message: escapeHtml(lead.message),
        source: escapeHtml(lead.source),
      };

      const html = `
        <h2>New FOREXAA inquiry</h2>
        <p><strong>Interest:</strong> ${e.interest}</p>
        <p><strong>Context:</strong> ${e.intent}</p>
        <p><strong>Name:</strong> ${e.name}</p>
        <p><strong>Email:</strong> ${e.email}</p>
        <p><strong>Company:</strong> ${e.company}</p>
        <p><strong>Country:</strong> ${e.country}</p>
        <p><strong>Business type:</strong> ${e.businessType}</p>
        <p><strong>Source page:</strong> ${e.source}</p>
        <p><strong>Message:</strong></p>
        <p>${e.message}</p>
      `;

      const text = `New FOREXAA inquiry

Interest: ${lead.interest}
Context: ${lead.intent}
Name: ${lead.name}
Email: ${lead.email}
Company: ${lead.company}
Country: ${lead.country}
Business type: ${lead.businessType}
Source page: ${lead.source}

Message:
${lead.message}`;

      const result = await provider.send({
        to: process.env.SALES_EMAIL ?? "sales@forexaa.com",
        subject: `New inquiry: ${lead.interest} — ${lead.company}`.slice(0, 200),
        html,
        text,
      });

      if (!result.success) {
        return { success: false, error: "Failed to send notification" };
      }
      return { success: true, id: "email-record" };
    } catch (error) {
      console.error(
        "[lead-store:email] failed:",
        error instanceof Error ? error.message : "unknown",
      );
      return { success: false, error: "Failed to save lead" };
    }
  }
}

let store: LeadStore | null = null;

/**
 * Choose the active lead store. Postgres when DATABASE_URL is set; otherwise
 * the email store (dev/degraded). Never silent about the degraded case in prod.
 */
export function getLeadStore(): LeadStore {
  if (!store) {
    if (process.env.DATABASE_URL) {
      store = new PostgresLeadStore();
    } else {
      store = new EmailNotificationLeadStore();
      if (process.env.NODE_ENV === "production") {
        console.warn(
          "[lead-store] No DATABASE_URL configured in production — using " +
            "email-only lead store (degraded). Leads are not durably persisted. " +
            "Set DATABASE_URL and run the migration for durable storage.",
        );
      }
    }
  }
  return store;
}
