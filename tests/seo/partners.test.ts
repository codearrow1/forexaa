import { describe, it, expect } from "vitest";
import { PARTNERS } from "@/config/seo/partners";

/**
 * Partners tests (Rule 43/96): unverified partners cannot render publicly.
 */
describe("partners registry", () => {
  it("has no verified partners yet (all gated)", () => {
    const verified = PARTNERS.filter((p) => p.verified);
    expect(verified.length).toBe(0);
  });

  it("every partner has a name and category", () => {
    for (const partner of PARTNERS) {
      expect(partner.name.length).toBeGreaterThan(1);
      expect(partner.category).toBeTruthy();
    }
  });
});
