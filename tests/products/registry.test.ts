import { describe, it, expect } from "vitest";
import { PRODUCTS, PRODUCT_PATHS, productBySlug } from "@/content/products";
import { routeByPath } from "@/config/seo/routes";

/**
 * Product registry tests (Rule 71): every product has the data a real page
 * needs, and every cross-reference resolves.
 */
describe("product registry", () => {
  const all = Object.values(PRODUCTS);

  it("every product has slug, title, tagline and a valid category", () => {
    expect(all.length).toBeGreaterThanOrEqual(10);
    const seen = new Set<string>();
    for (const product of all) {
      expect(product.slug.length).toBeGreaterThan(1);
      expect(product.title.length).toBeGreaterThan(3);
      expect(product.tagline.length).toBeGreaterThan(10);
      expect(["crm", "traders-room", "back-office", "ib-affiliate", "platform", "liquidity", "social", "white-label"]).toContain(product.category);
      expect(seen.has(product.slug)).toBe(false);
      seen.add(product.slug);
    }
  });

  it("every product has lead, overview, capabilities, faq and CTAs", () => {
    for (const product of all) {
      expect(product.lead.length).toBeGreaterThan(40);
      expect(product.overview.length).toBeGreaterThan(0);
      expect(product.capabilities.length).toBeGreaterThan(0);
      for (const group of product.capabilities) {
        expect(group.items.length).toBeGreaterThan(0);
      }
      expect(product.faq.length).toBeGreaterThan(0);
      expect(product.cta.primary).toBeTruthy();
      expect(product.cta.primaryHref.startsWith("/")).toBe(true);
      expect(product.cta.secondaryHref.startsWith("/")).toBe(true);
      expect(product.cta.footer.length).toBeGreaterThan(10);
    }
  });

  it("every related product slug resolves in the registry", () => {
    for (const product of all) {
      for (const related of product.relatedProducts) {
        expect(productBySlug(related), `${product.slug} → ${related}`).toBeDefined();
      }
    }
  });

  it("every product path exists in the route registry as live", () => {
    for (const [slug, path] of Object.entries(PRODUCT_PATHS)) {
      const route = routeByPath(path);
      expect(route, `registry route for ${slug}`).toBeDefined();
      expect(route!.status).toBe("live");
      expect(route!.indexation).toBe("index");
    }
  });

  it("product CTAs use the Phase 13 hierarchy (Build Your Brokerage)", () => {
    for (const product of all) {
      expect(product.cta.primary, product.slug).toBe("Build Your Brokerage");
      expect(product.cta.primaryHref, product.slug).toMatch(/^\/contact\?intent=/);
    }
  });
});
