import type { MetadataRoute } from "next";
import { SITEMAP_ROUTES } from "@/config/seo/routes";
import { canonicalUrl } from "@/lib/seo/canonical";

/**
 * sitemap.xml — indexable, live, canonical URLs ONLY (Rule 13).
 *
 * The registry (ROUTE_REGISTRY) is the single source of truth: a route is
 * here iff it is `index` + `live`. No noindex, no admin, no previews, no
 * query variants, no duplicates. This file documents the Google sitemap
 * index; the main sitemap is inlined as a single file while the site is
 * small and scales to separate product/article/case-study sitemaps later.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return SITEMAP_ROUTES.map((route) => ({
    url: canonicalUrl(route.path),
    lastModified: now,
    changeFrequency:
      route.contentType === "homepage" ? ("weekly" as const) : ("monthly" as const),
    priority: route.contentType === "homepage" ? 1 : 0.8,
  }));
}
