import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { canonicalUrl } from "@/lib/seo/canonical";
import { ROUTE_REGISTRY } from "@/config/seo/routes";

describe("canonical strategy (Rule 10)", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://forexaa.com";
  });
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  it("produces absolute https URLs from configuration", () => {
    expect(canonicalUrl("/platforms")).toBe("https://forexaa.com/platforms");
    expect(canonicalUrl("/")).toBe("https://forexaa.com");
  });

  it("never includes query strings or trailing slashes", () => {
    // canonicalUrl only ever receives clean registry paths; guard the
    // normalization explicitly.
    expect(canonicalUrl("/platforms/")).toBe("https://forexaa.com/platforms");
  });
});

describe("page metadata builder", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://forexaa.com";
  });
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  it("indexable routes emit index:true + self-referencing canonical", () => {
    const { metadata } = buildPageSeo(getRoute("/platforms"));
    expect(metadata.robots).toEqual({ index: true, follow: true });
    expect(metadata.alternates?.canonical).toBe("https://forexaa.com/platforms");
    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
  });

  it("noindex routes emit index:false (crawlable) + still a canonical", () => {
    const { metadata } = buildPageSeo(getRoute("/services"));
    expect(metadata.robots).toEqual({ index: false, follow: true });
    expect(metadata.alternates?.canonical).toBe("https://forexaa.com/services");
  });

  it("titles are unique across all live pages", () => {
    const titles = ROUTE_REGISTRY.map((route) => buildPageSeo(route).metadata.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("descriptions are unique across all live pages", () => {
    const descriptions = ROUTE_REGISTRY.map(
      (route) => buildPageSeo(route).metadata.description,
    );
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("only emits schema types the route declares (no blanket schemas)", () => {
    const home = buildPageSeo(getRoute("/"));
    const types = home.jsonLd.map((node) => node["@type"]).filter(Boolean);
    expect(types).toContain("Organization");
    expect(types).toContain("WebSite");
    // Home does not declare BreadcrumbList — assert it is absent.
    expect(types).not.toContain("BreadcrumbList");

    const services = buildPageSeo(getRoute("/services"));
    const serviceTypes = services.jsonLd.map((node) => node["@type"]).filter(Boolean);
    expect(serviceTypes).toEqual([]);
  });
});
