/**
 * Single source of truth for breadcrumb hrefs (Rule 34). Both the visible
 * <Breadcrumbs/> component and the BreadcrumbList JSON-LD read from here,
 * so they can never drift apart.
 */
import type { SiteRoute } from "@/config/seo/types";
import type { Crumb } from "@/lib/seo/jsonld";

/** Hub-level crumb label → path. Only intermediate crumbs use this map;
 * the final crumb always resolves to the route's own path. */
export const CRUMB_LABEL_TO_PATH: Record<string, string> = {
  Home: "/",
  Solutions: "/solutions",
  Platforms: "/platforms",
  "Broker Technology": "/broker-technology",
  Infrastructure: "/infrastructure",
  Services: "/services",
  Resources: "/resources",
  Company: "/company",
  Pricing: "/pricing",
  Contact: "/contact",
};

export function crumbTrail(route: SiteRoute): Crumb[] {
  return route.breadcrumb.map((label, index) => {
    const isLast = index === route.breadcrumb.length - 1;
    return { label, href: isLast ? route.path : (CRUMB_LABEL_TO_PATH[label] ?? "/") };
  });
}
