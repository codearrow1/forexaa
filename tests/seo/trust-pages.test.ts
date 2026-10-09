import { describe, it, expect } from "vitest";
import { TRUST_PAGES } from "@/config/seo/trust-pages";

/**
 * Trust pages tests (Rule 34-39): indexation states are correct.
 */
describe("trust pages", () => {
  it("the trust homepage is indexable", () => {
    const home = TRUST_PAGES.find((p) => p.path === "/trust");
    expect(home).toBeDefined();
    expect(home?.indexation).toBe("index");
  });

  it("the privacy page is noindex (pending counsel)", () => {
    const privacy = TRUST_PAGES.find((p) => p.path === "/trust/privacy");
    expect(privacy).toBeDefined();
    expect(privacy?.indexation).toBe("noindex");
  });

  it("the risk disclosure page is indexable", () => {
    const risk = TRUST_PAGES.find((p) => p.path === "/trust/risk-disclosure");
    expect(risk).toBeDefined();
    expect(risk?.indexation).toBe("index");
  });

  it("every trust page has a title and description", () => {
    for (const page of TRUST_PAGES) {
      expect(page.title.length).toBeGreaterThan(3);
      expect(page.description.length).toBeGreaterThan(20);
    }
  });
});
