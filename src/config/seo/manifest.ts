/**
 * SEO build manifest (Rule 64) — machine-readable.
 *
 * Generated from the route registry so it can never drift from the source of
 * truth. Tools (seo:check, future editors, Search Console triage) consume
 * this shape:
 *
 * {
 *   "url": "/platforms/mt7",
 *   "indexable": false,
 *   "canonical": "https://forexaa.com/platforms/mt7",
 *   "contentType": "platform",
 *   "primaryTopic": "MT7 / MobiusTrader white label",
 *   "schema": ["BreadcrumbList", "SoftwareApplication"],
 *   "status": "planned"
 * }
 */

import { siteConfig } from "@/config/site";
import { ROUTE_REGISTRY } from "@/config/seo/routes";
import { canonicalUrl } from "@/lib/seo/canonical";

export interface SeoManifestEntry {
  url: string;
  indexable: boolean;
  canonical: string;
  contentType: string;
  primaryTopic: string;
  schema: string[];
  status: string;
  inSitemap: boolean;
}

export function buildSeoManifest(): SeoManifestEntry[] {
  return ROUTE_REGISTRY.map((route) => ({
    url: route.path,
    indexable: route.indexation === "index" && route.status === "live",
    canonical: canonicalUrl(route.path),
    contentType: route.contentType,
    primaryTopic: route.primaryTopic,
    schema: [...route.schema],
    status: route.status,
    inSitemap: route.indexation === "index" && route.status === "live",
  }));
}

export const MANIFEST_BASE_URL = siteConfig.url;
