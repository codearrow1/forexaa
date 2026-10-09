import { describe, it, expect } from "vitest";
import { CTAS, ctaDestinationIsValid } from "@/config/ctas";

/**
 * CTA registry tests (Rule 14/71).
 */
describe("CTA registry", () => {
  it("every CTA has id, label, destination and event", () => {
    const all = Object.values(CTAS);
    expect(all.length).toBeGreaterThan(0);
    const seen = new Set<string>();
    for (const cta of all) {
      expect(cta.id.length).toBeGreaterThan(1);
      expect(cta.label.length).toBeGreaterThan(2);
      expect(cta.event.length).toBeGreaterThan(2);
      expect(ctaDestinationIsValid(cta.href), cta.href).toBe(true);
      expect(seen.has(cta.id)).toBe(false);
      seen.add(cta.id);
    }
  });

  it("CTA ids are unique", () => {
    const ids = Object.values(CTAS).map((cta) => cta.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
