/**
 * Central navigation model. Single source of truth for:
 *  - desktop mega-menu
 *  - mobile navigation
 *  - breadcrumbs
 *  - sitemap
 *  - internal linking
 *
 * Components must read from this config (Rule 6). Do not re-declare routes
 * in JSX.
 */

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface NavColumn {
  readonly heading: string;
  readonly links: readonly NavLink[];
}

export interface NavSection {
  readonly label: string;
  readonly href: string;
  /**
   * Optional grouped columns. Empty in Phase 1; the mega-menu UI in later
   * phases renders these.
   */
  readonly columns?: readonly NavColumn[];
}

export const NAV_SECTIONS: readonly NavSection[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Platforms", href: "/platforms" },
  { label: "Broker Technology", href: "/broker-technology" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/pricing" },
] as const;

/**
 * Canonical list of every routable page. Used by:
 *  - sitemap (src/app/sitemap.ts)
 *  - navigation tests
 *  - breadcrumbs
 */
export const ROUTES: readonly string[] = [
  "/",
  "/solutions",
  "/platforms",
  "/broker-technology",
  "/infrastructure",
  "/services",
  "/resources",
  "/company",
  "/pricing",
  "/contact",
] as const;

export function isRoutablePath(path: string): boolean {
  return (ROUTES as readonly string[]).includes(path);
}

/** Primary conversion actions shown across the site. */
export const PRIMARY_ACTIONS = {
  contact: {
    label: "Talk to FOREXAA",
    /** Real destination: the contact page (Phase 13 CTA hierarchy). */
    href: "/contact",
  },
  explore: {
    label: "Explore Technology",
    href: "/platforms",
  },
} as const;
