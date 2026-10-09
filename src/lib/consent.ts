/**
 * Consent architecture (Phase 6 Rule 37/38/39).
 *
 * A typed consent state with a necessary-only default. Marketing/analytics
 * tracking is NOT activated by default. This is the seam a future analytics
 * provider plugs into — no provider is wired yet, so nothing is tracked.
 *
 * Privacy: only stable, non-sensitive consent categories. No PII.
 */

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export interface ConsentState {
  /** Always true — required for the site to function. */
  readonly necessary: true;
  readonly analytics: boolean;
  readonly marketing: boolean;
}

/** Default: necessary only. No marketing/analytics by default. */
export const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
};

/** Normalize arbitrary input into a safe ConsentState. */
export function normalizeConsent(
  value: Partial<Record<ConsentCategory, boolean>> | null | undefined,
): ConsentState {
  return {
    necessary: true,
    analytics: value?.analytics === true,
    marketing: value?.marketing === true,
  };
}

/** Whether a given category may run under the current consent. */
export function consentAllows(
  consent: ConsentState,
  category: ConsentCategory,
): boolean {
  if (category === "necessary") return true;
  return consent[category] === true;
}
