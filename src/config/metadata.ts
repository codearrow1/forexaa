/**
 * Centralized SEO/metadata configuration (Rule 32).
 *
 * All structured data and social metadata is decided HERE, not scattered
 * across pages. No fabricated ratings, awards, customer counts, licenses or
 * certifications are included (Rule 34 / 49) — any future claim must carry a
 * verified source.
 */

import { siteConfig } from "@/config/site";

const url = siteConfig.url;

export const PUBLIC_METADATA = {
  description: siteConfig.description,
  metadataBase: new URL(url),
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    // No fabricated @handle without a verified account (Rule 49).
  },
} as const;
