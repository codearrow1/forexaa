/**
 * Claims guard (Rule 33/34).
 *
 * Public copy may only render claims that exist in the claims registry with
 * state `verified`. This helper is the single gate; tests enforce it.
 */

import { CLAIMS } from "@/config/seo/claims";

export type ClaimSlug = (typeof CLAIMS)[number]["slug"];

const verified = new Set(
  CLAIMS.filter((claim) => claim.state === "verified").map((claim) => claim.slug),
);

/** True when the claim is verified and therefore renderable. */
export function isRenderable(slug: ClaimSlug): boolean {
  return verified.has(slug);
}

/**
 * Returns the statement of a verified claim; throws for anything else.
 * Use during SSR so an unverified claim fails the build, not the launch.
 */
export function renderableClaim(slug: ClaimSlug): string {
  const claim = CLAIMS.find((c) => c.slug === slug);
  if (!claim || claim.state !== "verified") {
    throw new Error(
      `Claim "${slug}" is not verified — it may not be rendered in public content. ` +
        "Update docs/seo claims registry with a verified source first.",
    );
  }
  return claim.statement;
}
