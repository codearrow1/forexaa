import type { MetadataRoute } from "next";
import { publicSiteUrl } from "@/lib/env";

/**
 * robots.txt (Rule 14).
 *
 * robots.txt controls CRAWLING. Indexing is controlled per-page via
 * `robots: { index: false }` in each route's metadata — they are separate
 * mechanisms and we use the right one for each.
 *
 * Blocked paths are the sensitive/private/internal families that must
 * never be crawled. These are also blocked at the network boundary in
 * src/proxy.ts, so this is defense-in-depth, not the only control.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/preview/", "/test/"],
      },
    ],
    sitemap: `${publicSiteUrl()}/sitemap.xml`,
  };
}
