import { describe, it, expect } from "vitest";
import {
  ROUTE_REGISTRY,
  SITEMAP_ROUTES,
  routeByPath,
  isIndexable,
} from "@/config/seo/routes";

describe("route registry (indexation decisions)", () => {
  it("every route has a unique path and title", () => {
    const paths = ROUTE_REGISTRY.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);

    const titles = ROUTE_REGISTRY.map((route) => route.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("every route has a unique, non-empty description", () => {
    const descriptions = ROUTE_REGISTRY.map((route) => route.description);
    for (const description of descriptions) {
      expect(description.trim().length).toBeGreaterThan(30);
    }
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("thin scaffold routes are noindex (Rule 5)", () => {
    expect(routeByPath("/services")?.indexation).toBe("noindex");
    expect(routeByPath("/resources")?.indexation).toBe("noindex");
    expect(routeByPath("/company")?.indexation).toBe("noindex");
  });

  it("planned routes are never indexable", () => {
    for (const route of ROUTE_REGISTRY) {
      if (route.status === "planned") {
        expect(route.indexation).toBe("noindex");
        expect(isIndexable(route.path)).toBe(false);
      }
    }
  });

  it("the sitemap contains only live + indexable routes", () => {
    for (const route of SITEMAP_ROUTES) {
      expect(route.status).toBe("live");
      expect(route.indexation).toBe("index");
      expect(isIndexable(route.path)).toBe(true);
    }
  });

  it("the home page is the only homepage content type", () => {
    const homepages = ROUTE_REGISTRY.filter((route) => route.contentType === "homepage");
    expect(homepages.length).toBe(1);
    expect(homepages[0]?.path).toBe("/");
  });
});
