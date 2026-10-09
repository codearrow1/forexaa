/**
 * Page SEO builder — turns a route registry entry into:
 *  - `metadata` (Next.js Metadata: title, description, canonical, robots,
 *    OG/Twitter)
 *  - `jsonLd`   (structured-data nodes rendered via <JsonLdGraph/>)
 *
 * - Canonical: absolute, self-referencing, query-free (Rule 10).
 * - robots: from the route's indexation decision (Rule 5).
 * - JSON-LD: only the schema types declared for the route, truthful fields
 *   only (Rule 15).
 *
 * OG image: handled per route by the Next.js `opengraph-image.tsx` file
 * convention (framework-native, route/content aware — Rule 36). Not set
 * here, so the per-route generator wins.
 *
 * Usage in a page:
 *   const seo = buildPageSeo(route);
 *   export const metadata = seo.metadata;
 *   ... <JsonLdGraph nodes={seo.jsonLd} />
 */

import type { Metadata } from "next";
import type { SiteRoute } from "@/config/seo/types";
import { siteConfig } from "@/config/site";
import { canonicalUrl } from "@/lib/seo/canonical";
import { routeByPath } from "@/config/seo/routes";
import {
  breadcrumbLd,
  organizationLd,
  serviceLd,
  softwareApplicationLd,
  websiteLd,
} from "@/lib/seo/jsonld";
import { crumbTrail } from "@/lib/seo/crumbs";

/** Registry lookup that never returns undefined (known path or throw). */
export function getRoute(path: string): SiteRoute {
  const route = routeByPath(path);
  if (!route) {
    throw new Error(`Unknown SEO route "${path}" — add it to the route registry.`);
  }
  return route;
}

type Node = Record<string, unknown>;

export function buildPageSeo(
  route: SiteRoute,
  extraJsonLd: readonly Node[] = [],
): { metadata: Metadata; jsonLd: Node[] } {
  const canonical = canonicalUrl(route.path);
  const index = route.indexation === "index";

  const jsonLd: Node[] = [];
  if (route.schema.includes("Organization")) jsonLd.push(organizationLd());
  if (route.schema.includes("WebSite")) jsonLd.push(websiteLd());
  if (route.schema.includes("BreadcrumbList")) {
    jsonLd.push(breadcrumbLd(crumbTrail(route), canonical));
  }
  if (route.schema.includes("Service")) {
    jsonLd.push(
      serviceLd({
        name: route.label,
        description: route.description,
        url: canonical,
      }),
    );
  }
  if (route.schema.includes("SoftwareApplication")) {
    jsonLd.push(
      softwareApplicationLd({
        name: `${siteConfig.name} — ${route.label}`,
        description: route.description,
        url: canonical,
      }),
    );
  }
  jsonLd.push(...extraJsonLd);

  const metadata: Metadata = {
    title: route.title,
    description: route.description,
    alternates: { canonical },
    robots: { index, follow: true },
    openGraph: {
      title: route.title,
      description: route.description,
      url: canonical,
      type: route.contentType === "homepage" ? "website" : "article",
      siteName: siteConfig.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
    },
  };

  return { metadata, jsonLd };
}
