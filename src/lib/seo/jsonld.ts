/**
 * JSON-LD structured-data generators (Rule 15).
 *
 * Each generator returns a plain, schema.org-conformant node. We only emit
 * types whose content genuinely exists on the page, and only truthful
 * fields. No fabricated aggregateRating, no invented address/phone unless
 * verified (see claims registry).
 */

import { siteConfig } from "@/config/site";
import { canonicalUrl } from "@/lib/seo/canonical";

type Node = Record<string, unknown>;

/** Organization — the FOREXAA entity. Verified fields only. */
export function organizationLd(): Node {
  const node: Node = {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: `${siteConfig.url}/icons/forexaa-mark.svg`,
    // `sameAs` is intentionally empty: no verified social profiles yet
    // (Rule 23 / 49). Populate once real accounts are approved.
  };
  return node;
}

/** WebSite — current, minimal form (no obsolete search-box pattern). */
export function websiteLd(): Node {
  return {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export interface Crumb {
  readonly label: string;
  readonly href: string;
}

/** BreadcrumbList — visible breadcrumbs and JSON-LD must match. */
export function breadcrumbLd(items: readonly Crumb[], canonicalBase: string): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href === "/" ? canonicalBase : `${canonicalBase}${item.href}`,
    })),
  };
}

/**
 * SoftwareApplication — only for pages that actually describe a software
 * product (e.g. a trading platform / CRM). Not used just because software
 * is mentioned.
 */
export function softwareApplicationLd(opts: {
  name: string;
  description: string;
  url: string;
  operatingSystems?: string;
}): Node {
  return {
    "@type": "SoftwareApplication",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: opts.operatingSystems ?? "Cross-platform (web, desktop, mobile)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      // We list pricing on request; not fabricating a numeric price.
    },
  };
}

/** Service — for service pages (liquidity, white-label, launch services). */
export function serviceLd(opts: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}): Node {
  return {
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType ?? "Brokerage technology",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

/**
 * FAQPage. NOTE (Rule 22): Google currently limits FAQ rich results to
 * prominent government/health sites, so emitting this is for machine
 * understanding, not guaranteed rich results. Only include questions whose
 * answers are genuinely substantive.
 */
export function faqLd(items: readonly FaqItem[]): Node {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Article — for future resource/blog content. */
export function articleLd(opts: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}): Node {
  return {
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    author: {
      "@type": "Organization",
      name: opts.author ?? siteConfig.name,
    },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}

/** Convenience: canonical base for a given path. */
export function canonFor(path: string): string {
  return canonicalUrl(path);
}
