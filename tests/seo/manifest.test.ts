import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { buildSeoManifest } from "@/config/seo/manifest";
import { ROUTE_REGISTRY } from "@/config/seo/routes";

/**
 * Machine-readable SEO manifest (Rule 64).
 * The manifest is produced from the route registry so it cannot drift.
 * We verify its shape and invariants.
 */
describe("SEO manifest", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://forexaa.com";
  });
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  it("has one entry per registry route, in the documented shape", () => {
    const manifest = buildSeoManifest();
    expect(manifest.length).toBe(ROUTE_REGISTRY.length);
    for (const entry of manifest) {
      expect(entry).toHaveProperty("url");
      expect(entry).toHaveProperty("indexable");
      expect(entry).toHaveProperty("canonical");
      expect(entry).toHaveProperty("contentType");
      expect(entry).toHaveProperty("primaryTopic");
      expect(entry).toHaveProperty("schema");
      expect(entry).toHaveProperty("status");
      expect(typeof entry.indexable).toBe("boolean");
      expect(Array.isArray(entry.schema)).toBe(true);
    }
  });

  it("indexable === (index + live) and canonical is absolute https", () => {
    const manifest = buildSeoManifest();
    for (const entry of manifest) {
      const route = ROUTE_REGISTRY.find((r) => r.path === entry.url);
      expect(route).toBeDefined();
      const expectedIndexable =
        route!.indexation === "index" && route!.status === "live";
      expect(entry.indexable).toBe(expectedIndexable);
      expect(entry.canonical.startsWith("https://forexaa.com")).toBe(true);
      expect(entry.inSitemap).toBe(expectedIndexable);
    }
  });
});
