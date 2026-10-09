# PRODUCT SEO MODEL

How product pages are discovered, indexed and connected. Source of truth:
`src/config/seo/routes.ts` (registry) + `src/config/seo/keywords.ts`
(keyword map).

## Per-page SEO record (Rule 35/39)

Every live page carries: unique title, unique description, canonical,
robots policy, OG + Twitter metadata, content type, primary topic, intent,
breadcrumb, schema types, internal-link relationships.

| Route | Title | Primary topic | Intent | Schema |
| --- | --- | --- | --- | --- |
| `/broker-technology/crm` | Forex CRM for Brokers | Forex CRM product | commercial-investigation | BreadcrumbList, SoftwareApplication |
| `/broker-technology/traders-room` | Trader's Room for Brokers | Client portal | commercial-investigation | BreadcrumbList, SoftwareApplication |
| `/broker-technology/back-office` | Forex Back Office & Operations | Operations console | commercial-investigation | BreadcrumbList, SoftwareApplication |
| `/broker-technology/ib-affiliate` | Forex IB & Affiliate Management | Partner system | commercial-investigation | BreadcrumbList, SoftwareApplication |
| `/platforms/mt4-mt5` | MT4 & MT5 White Label Brokerage Platform | MT4/MT5 white label | commercial-investigation | BreadcrumbList, SoftwareApplication |
| `/platforms/mt7` | MobiusTrader MT7 for Brokers | MT7 white label | commercial-investigation | BreadcrumbList, SoftwareApplication |
| `/platforms/ctrader` | cTrader White Label for Brokers | cTrader white label | commercial-investigation | BreadcrumbList, SoftwareApplication |
| `/infrastructure/liquidity` | Forex Liquidity Infrastructure | Liquidity layer | commercial-investigation | BreadcrumbList, Service |
| `/services/white-label` | Forex Broker White Label Solutions | White-label service | commercial-investigation | BreadcrumbList, Service |
| `/solutions/social-copy` | Social, Copy, PAMM & MAM Trading | Managed trading models | commercial-investigation | BreadcrumbList, Service |
| `/contact` | Contact | Contact / demo | transactional | BreadcrumbList |

## Intent alignment (Rule 63)

Each product page's first screen answers: what it is, who it is for, what it
contains. The H1 + lead + visual do this without requiring a scroll.

## Content differentiation (Rule 64)

No two pages explain the same thing. The platforms hub compares
technically; each platform page explains its own deployment. Social/Copy
is one hub for four related concepts — not four near-identical pages.

## Internal linking (Rule 40/86)

- Pillar → product: hubs link to every child product.
- Product → sibling: `relatedProducts` cross-link.
- Product → hub: `relatedHubs` link back up.
- Product → conversion: every product page links to `/contact` (primary
  CTA) and `/pricing`.
- No orphans: `seo:check` + `tests/seo/internal-links.test.ts` verify every
  indexable page is reachable.

## Schema (Rule 36/66)

Only types that describe content actually on the page. Product pages →
SoftwareApplication; service pages → Service; all deep pages →
BreadcrumbList (visible + JSON-LD match). No blanket schema, no
aggregateRating, no invented entities.

## OG images (Rule 67)

Every product page has a route-aware `opengraph-image.tsx` (via
`next/og`), generated from the shared Aurora Terminal card with the page's
own title + section. Not one generic image.
