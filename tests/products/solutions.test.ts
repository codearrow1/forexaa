import { describe, it, expect } from "vitest";
import { PRODUCTS, SOLUTION_CHAINS, productBySlug } from "@/content/products";

/**
 * Solution registry tests (Rule 71).
 */
describe("solution registry", () => {
  const all = Object.values(PRODUCTS);

  it("every solution has slug, name, category, eyebrow, title and lead", () => {
    expect(all.length).toBeGreaterThanOrEqual(10);
    const seen = new Set<string>();
    for (const product of all) {
      expect(product.slug.length).toBeGreaterThan(1);
      expect(product.name.length).toBeGreaterThan(3);
      expect(product.category).toBeTruthy();
      expect(product.eyebrow).toBeTruthy();
      expect(product.title.length).toBeGreaterThan(10);
      expect(product.lead.length).toBeGreaterThan(40);
      expect(seen.has(product.slug)).toBe(false);
      seen.add(product.slug);
    }
  });

  it("every solution has overview, capabilities, faq and CTA", () => {
    for (const product of all) {
      expect(product.overview.length).toBeGreaterThan(0);
      expect(product.capabilities.length).toBeGreaterThan(0);
      for (const group of product.capabilities) {
        expect(group.items.length).toBeGreaterThan(0);
      }
      expect(product.faq.length).toBeGreaterThan(0);
      expect(product.cta.primary).toBeTruthy();
      expect(product.cta.primaryHref.startsWith("/")).toBe(true);
      expect(product.cta.secondaryHref.startsWith("/")).toBe(true);
    }
  });

  it("every related product slug resolves in the registry", () => {
    for (const product of all) {
      for (const related of product.relatedProducts) {
        expect(productBySlug(related), `${product.slug} → ${related}`).toBeDefined();
      }
    }
  });

  it("solution chains reference only live products", () => {
    for (const chain of SOLUTION_CHAINS) {
      for (const slug of chain.chain) {
        expect(productBySlug(slug), `${chain.slug} → ${slug}`).toBeDefined();
      }
    }
  });
});
