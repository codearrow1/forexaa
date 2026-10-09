/**
 * Contact URL intent → safe form interest mapping (Phase 6 Rule 2/3).
 *
 * The URL `?intent=` is a *context* entry point. The form's `interest` field
 * is a strict Zod enum. We NEVER pass an intent value straight into the
 * schema field: we map it to a schema-valid interest so validation always
 * passes. Unknown intents fall back to "general".
 *
 * This keeps the "URL intent" layer and the "form interest" layer decoupled.
 */

/** Values accepted by the ContactDemoSchema `interest` field. */
export const INTEREST_VALUES = [
  "demo",
  "pricing",
  "white-label",
  "migration",
  "general",
] as const;
export type Interest = (typeof INTEREST_VALUES)[number];

/** Valid URL `?intent=` values (context entry points). */
export const CONTACT_INTENTS = [
  "demo",
  "crm",
  "platform",
  "liquidity",
  "white-label",
  "prop",
  "existing-broker",
  "pricing",
  "general",
] as const;
export type ContactIntent = (typeof CONTACT_INTENTS)[number];

/** intent → the schema-valid interest to preselect in the form. */
const INTENT_TO_INTEREST: Record<ContactIntent, Interest> = {
  demo: "demo",
  crm: "demo",
  platform: "demo",
  liquidity: "demo",
  "white-label": "white-label",
  prop: "general",
  "existing-broker": "migration",
  pricing: "pricing",
  general: "general",
};

/** Normalize any URL string to a known intent; unknown → "general". */
export function sanitizeIntent(raw: string | null | undefined): ContactIntent {
  if (raw && (CONTACT_INTENTS as readonly string[]).includes(raw)) {
    return raw as ContactIntent;
  }
  return "general";
}

/** Map a (sanitized) intent to a schema-valid interest value. */
export function intentToInterest(intent: ContactIntent): Interest {
  return INTENT_TO_INTEREST[intent] ?? "general";
}
