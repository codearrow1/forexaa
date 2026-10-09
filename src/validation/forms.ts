/**
 * Zod schemas for all user-facing forms.
 *
 * Client-side validation UX may mirror these, but the SERVER is the only
 * authority (Rule 28). Every field has length limits; external URLs are
 * validated to prevent open-redirect / SSRF patterns; emails are normalized.
 *
 * No unvalidated input may reach storage, logging, or downstream calls.
 */

import { z } from "zod";

/**
 * Accepts relative paths only (same-site). This blocks the class of
 * "redirect me to <user-supplied>" open-redirects and SSRF vectors.
 */
export const RelativePathSchema = z
  .string({ message: "Path must be a valid relative path." })
  .trim()
  .min(1)
  .max(2048)
  .refine((value) => value.startsWith("/") && !value.startsWith("//"), {
    message: "Path must begin with a single leading slash.",
  });

/** Trims and caps free text to sane limits. */
const text = (max: number) =>
  z.string().trim().min(1, "Required.").max(max, `Must be ${max} characters or fewer.`);

export const DemoRequestSchema = z.object({
  name: text(80),
  email: z
    .string()
    .trim()
    .max(254, "Email is too long.")
    .email("Enter a valid email address."),
  company: text(120),
  website: RelativePathSchema.optional()
    .or(
      z.string()
        .trim()
        .url()
        .max(2048)
        .refine(
          (value) => {
            const url = new URL(value);
            return url.protocol === "https:";
          },
          { message: "Website must use HTTPS." },
        ),
    )
    .optional(),
  brokerType: z.enum(["forex", "crypto", "multiasset", "prop", "other"]),
  message: z.string().trim().max(2000).optional(),
});

export const ContactSchema = z.object({
  name: text(80),
  email: z
    .string()
    .trim()
    .max(254)
    .email("Enter a valid email address."),
  message: text(4000),
});

/**
 * /contact demo request form (Phase 3).
 * Collects only what is needed to scope a conversation; NEVER collects
 * passwords, payment details, identity documents or API keys (Rule 48).
 * `website_url` is a honeypot: humans leave it empty; bots fill it.
 */
export const ContactDemoSchema = z.object({
  name: text(80),
  email: z
    .string()
    .trim()
    .max(254, "Email is too long.")
    .email("Enter a valid business email."),
  company: text(120),
  country: text(80),
  businessType: z.enum([
    "new-brokerage",
    "existing-broker",
    "prop-firm",
    "multi-asset",
    "other",
  ]),
  interest: z.enum(["demo", "pricing", "white-label", "migration", "general"]),
  message: z.string().trim().max(2000, "Keep the message under 2,000 characters."),
  /** Honeypot — must be empty for a human submission. Absent (undefined) is
   * allowed; a non-empty value is a bot and is rejected. */
  website_url: z.string().trim().max(0, "Submission rejected.").optional(),
});

export type DemoRequest = z.infer<typeof DemoRequestSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type ContactDemo = z.infer<typeof ContactDemoSchema>;

/** Country list for the select (kept data-driven, not hard-coded in JSX). */
export const COUNTRIES: readonly string[] = [
  "United Kingdom",
  "United States",
  "United Arab Emirates",
  "Australia",
  "Germany",
  "France",
  "Nigeria",
  "India",
  "Other",
];

/** Business type select options, data-driven. */
export const BUSINESS_TYPES: readonly { value: string; label: string }[] = [
  { value: "new-brokerage", label: "New brokerage" },
  { value: "existing-broker", label: "Existing broker" },
  { value: "prop-firm", label: "Prop firm" },
  { value: "multi-asset", label: "Multi-asset broker" },
  { value: "other", label: "Other" },
];

/** "What are you looking for?" options, data-driven. */
export const INTERESTS: readonly { value: string; label: string }[] = [
  { value: "demo", label: "Book a demo" },
  { value: "pricing", label: "Request pricing" },
  { value: "white-label", label: "White-label launch" },
  { value: "migration", label: "Migrate an existing broker" },
  { value: "general", label: "General question" },
];

/** Flatten a ZodError into a stable field-keyed structure for UI + logging. */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_root";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
