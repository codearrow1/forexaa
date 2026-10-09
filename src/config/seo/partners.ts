/**
 * Partner registry (Rule 43/96).
 *
 * Only partners with `relationshipStatus === "verified"` AND `logoApproved`
 * may render publicly. The renderer gates on these flags; anything else is
 * withheld. No partner is ever shown by default — the array starts empty and
 * is populated only with verified, counsel-approved records.
 */

export interface PartnerRecord {
  slug: string;
  name: string;
  category: string;
  /** Human-readable relationship description. */
  relationship: string;
  relationshipType:
    | "technology-integration"
    | "commercial"
    | "referral"
    | "reseller";
  relationshipStatus: "verified" | "pending" | "terminated";
  /** Master gate — must be true to render publicly. */
  verified: boolean;
  verifiedAt?: string;
  /** Factual source for the relationship claim. */
  source?: string;
  /** Approved logo asset may be shown only when true. */
  logoApproved: boolean;
}

/**
 * No verified partners yet. This stays empty until the business owner
 * supplies verified partner data with approved logos. Do not fabricate.
 */
export const PARTNERS: readonly PartnerRecord[] = [];

/** Partners that may be rendered publicly. */
export function publicPartners(): readonly PartnerRecord[] {
  return PARTNERS.filter(
    (p) => p.relationshipStatus === "verified" && p.verified && p.logoApproved,
  );
}
