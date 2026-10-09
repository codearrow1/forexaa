# PRODUCT ARCHITECTURE

Phase 3 turns FOREXAA from a homepage + hubs into a real product ecosystem.
This document describes the data model, the page architecture, and how the
pieces connect.

## The ecosystem

```
FOREXAA
├── Broker Technology            /broker-technology (pillar)
│   ├── Forex CRM                /broker-technology/crm
│   ├── Trader's Room            /broker-technology/traders-room
│   ├── Back Office              /broker-technology/back-office
│   ├── IB / Affiliate           /broker-technology/ib-affiliate
│   └── Social / Copy / PAMM / MAM   /solutions/social-copy
├── Platforms                    /platforms (pillar)
│   ├── MT4 / MT5                /platforms/mt4-mt5
│   ├── MT7 / MobiusTrader       /platforms/mt7
│   └── cTrader                  /platforms/ctrader
├── Infrastructure               /infrastructure (pillar)
│   └── Forex Liquidity          /infrastructure/liquidity
├── Services
│   └── White Label              /services/white-label
└── Contact                      /contact
```

Web + Mobile trading are access modes of the platforms (covered on the
platforms hub), not separate pages — no thin pages for the sake of keywords.

## Data model (Rule 44)

- `src/types/content.ts` — `ProductContent` (slug, name, category, eyebrow,
  title, lead, overview, targetAudience, capabilities, workflow,
  integrations, visualStates, relatedProducts, relatedHubs, faq, cta,
  claimKeys, governance) + `SolutionChain` (Rule 32).
- `src/content/products/*.ts` — one file per product, content only. No JSX,
  no presentation. `index.ts` is the registry (`PRODUCTS`, `PRODUCT_PATHS`,
  `SOLUTION_CHAINS`).
- `src/config/seo/routes.ts` — the route registry owns SEO (title,
  description, canonical, robots, schema, primaryTopic, intent,
  breadcrumb). Pages never hand-write metadata.
- `src/config/seo/internal-links.ts` — the internal-link model. Planned
  targets auto-resolve to live hubs, so no dead links ship.
- `src/config/menus.ts` — mega-menu + mobile-nav content (real
  destinations only).

## Page architecture (Rule 6)

`src/components/templates/product-page.tsx` composes the standard product
IA: Breadcrumb → Hero → [product visual] → Overview → Capabilities →
Workflow → Integrations → Who it's for → Related → FAQ → CTA.

Pages override the **visual slot** and can hide sections, so pages do not
all look identical (Rule 52):

| Page | Visual | Layout |
| --- | --- | --- |
| CRM | ProductWindow + nav rail + tiles + activity feed | Dashboard-led |
| Trader's Room | ProductWindow + tiles + status badges | Portal-led |
| Back Office | ProductWindow + tiles + activity feed | Operations-led |
| IB / Affiliate | Partner tree (nodes + connectors) | Concept-led |
| MT4 / MT5 | Deployment window + tiles + badges | Deployment-led |
| MT7 | Terminal window + chart panel + tiles | Terminal-led |
| cTrader | Terminal window + market-depth bars + tiles | Terminal-led |
| Liquidity | ArchitectureDiagram (5 layers) | Architecture-led |
| White Label | Stack window + tiles | Workflow-led |
| Social / Copy | 4 concept panels | Concept-led |

## Solution chains (Rule 32)

`SOLUTION_CHAINS` in `src/content/products/index.ts` models how a business
model is built from products (e.g. Prop Firm → CRM → MT7 → Back Office →
Liquidity). Data-only; future Solution pages render these without
duplicating content.

## Conversion architecture (Rule 87-89)

- Above the fold: primary CTA (`Book a Demo` → `/contact`).
- Mid-page: contextual CTA (related products + hubs).
- End: strong final CTA band with product-specific microcopy.
- No fake urgency, countdowns or manipulative language.

## Governance (Rule 80)

Every product carries `governance: { lastReviewedAt, contentOwner,
claimReviewState }`. `claimKeys` reference the claims registry; the render
layer refuses to emit `pending`/`forbidden` claims (enforced by
`tests/seo/claims.test.ts`).
