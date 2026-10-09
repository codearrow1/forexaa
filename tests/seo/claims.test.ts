import { describe, it, expect } from "vitest";
import { CLAIMS } from "@/config/seo/claims";
import { isRenderable, renderableClaim } from "@/lib/seo/claims";

/**
 * Claims tests (Rule 45/94/95): pending/forbidden claims cannot render.
 */
describe("claims registry", () => {
  it("has the legacy claim states set correctly", () => {
    const bySlug = new Map(CLAIMS.map((claim) => [claim.slug, claim]));
    expect(bySlug.get("spreads-pips")?.state).toBe("forbidden");
    expect(bySlug.get("rating")?.state).toBe("forbidden");
    expect(bySlug.get("brokers-served")?.state).toBe("pending");
    expect(bySlug.get("pricing-monthly")?.state).toBe("pending");
  });

  it("pending and forbidden claims are not renderable", () => {
    for (const claim of CLAIMS) {
      if (claim.state !== "verified") {
        expect(isRenderable(claim.slug), claim.slug).toBe(false);
        expect(() => renderableClaim(claim.slug)).toThrow();
      }
    }
  });
});
