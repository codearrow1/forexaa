import { describe, it, expect, beforeEach, afterEach } from "vitest";
import sitemapFn from "@/app/sitemap";
import robotsFn from "@/app/robots";
import { SITEMAP_ROUTES, LIVE_ROUTES } from "@/config/seo/routes";

const PROD_ORIGIN = "https://forexaa.com";

describe("sitemap (Rule 13)", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = PROD_ORIGIN;
  });
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  it("only contains live + indexable routes", () => {
    const entries = sitemapFn();
    const sitemapped = new Set(entries.map((entry) => entry.url));
    const expected = new Set(
      SITEMAP_ROUTES.map((route) =>
        `${PROD_ORIGIN}${route.path === "/" ? "" : route.path}`,
      ),
    );
    for (const url of expected) {
      expect(sitemapped.has(url), `missing ${url}`).toBe(true);
    }
    // No noindex/planned URLs leak into the sitemap.
    for (const route of LIVE_ROUTES) {
      if (route.indexation === "noindex") {
        const url = `${PROD_ORIGIN}${route.path === "/" ? "" : route.path}`;
        expect(sitemapped.has(url)).toBe(false);
      }
    }
    expect(sitemapped.size).toBe(SITEMAP_ROUTES.length);
  });

  it("all URLs are absolute, HTTPS in production, query-free, canonical", () => {
    const entries = sitemapFn();
    for (const entry of entries) {
      const url = new URL(entry.url);
      expect(url.origin).toBe(PROD_ORIGIN);
      expect(url.protocol).toBe("https:");
      expect(url.search).toBe("");
      // canonical URLs never carry a trailing slash (including root)
      expect(entry.url.endsWith("/")).toBe(false);
    }
  });

  it("homepage gets priority 1.0, the rest 0.8", () => {
    const entries = sitemapFn();
    const home = entries.find((entry) => entry.url === PROD_ORIGIN);
    expect(home?.priority).toBe(1);
    const others = entries.filter((entry) => entry.url !== PROD_ORIGIN);
    expect(others.length).toBeGreaterThan(0);
    for (const entry of others) {
      expect(entry.priority).toBe(0.8);
    }
  });
});

describe("robots.txt (Rule 14)", () => {
  it("blocks the sensitive/internal path families", () => {
    const robots = robotsFn();
    const rules = robots.rules;
    const rule = Array.isArray(rules) ? (rules[0] as { disallow?: string[] }) : (rules as { disallow?: string[] });
    expect(rule?.disallow).toEqual(
      expect.arrayContaining(["/api/", "/admin/", "/private/", "/preview/", "/test/"]),
    );
  });

  it("points at the sitemap on the configured origin", () => {
    process.env.NEXT_PUBLIC_SITE_URL = PROD_ORIGIN;
    const robots = robotsFn();
    expect(robots.sitemap).toBe(`${PROD_ORIGIN}/sitemap.xml`);
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });
});
