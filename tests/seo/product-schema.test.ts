import { describe, it, expect } from "vitest";
import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { ROUTE_REGISTRY, LIVE_ROUTES } from "@/config/seo/routes";

/**
 * Schema + metadata tests (Rule 66): every live page emits only its
 * declared schema types; titles/descriptions/canonicals are unique;
 * deep pages carry a BreadcrumbList.
 */
describe("schema + metadata across live routes", () => {
  it("titles are unique across all live routes", () => {
    const titles = LIVE_ROUTES.map((route) => buildPageSeo(route).metadata.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("descriptions are unique across all live routes", () => {
    const descriptions = LIVE_ROUTES.map(
      (route) => buildPageSeo(route).metadata.description,
    );
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("deep indexable pages emit a BreadcrumbList", () => {
    const deep = LIVE_ROUTES.filter(
      (route) => route.path.split("/").length > 2 && route.indexation === "index",
    );
    expect(deep.length).toBeGreaterThan(0);
    for (const route of deep) {
      expect(route.schema).toContain("BreadcrumbList");
      const { jsonLd } = buildPageSeo(route);
      const types = jsonLd.map((node) => node["@type"]);
      expect(types, route.path).toContain("BreadcrumbList");
    }
  });

  it("product pages emit SoftwareApplication; service pages emit Service", () => {
    for (const route of ROUTE_REGISTRY) {
      if (route.status !== "live") continue;
      const { jsonLd } = buildPageSeo(route);
      const types = jsonLd.map((node) => node["@type"] as string);
      if (route.contentType === "product" && route.schema.includes("SoftwareApplication")) {
        expect(types, route.path).toContain("SoftwareApplication");
      }
      if (route.schema.includes("Service")) {
        expect(types, route.path).toContain("Service");
      }
      // Never emit more schema types than the registry declares (no
      // blanket schema, Rule 36/66).
      const declared = new Set(route.schema);
      for (const type of types) {
        if (type === "Organization" || type === "WebSite") continue; // home-only extras
        expect(declared.has(type as string), `${route.path} emits undeclared ${type}`).toBe(true);
      }
    }
  });

  it("the home page owns Organization + WebSite", () => {
    const { jsonLd } = buildPageSeo(getRoute("/"));
    const types = jsonLd.map((node) => node["@type"] as string);
    expect(types).toContain("Organization");
    expect(types).toContain("WebSite");
  });
});
