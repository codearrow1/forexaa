# SEO STRATEGY (FOREXAA)

North star: **the technically strongest, fastest, clearest, most useful and
most trustworthy public FOREXAA site** — not ranking manipulation.
Google's current Search Essentials emphasize people-first content,
crawlability and useful search presentation (Rule 87). We build so that
content, authority and trust can compound.

## Positioning

FOREXAA competes for B2B brokerage-technology searches:

- **Entity**: FOREXAA = connected brokerage technology platform
  (CRM + platforms + liquidity + payments + risk).
- **Differentiator vs. B2Broker / Leverate / UpTrader / Soft-FX / GTC /
  FXSOFT / Match-Trader / Finalto**: honest "what is actually in the stack"
  clarity, a premium institutional visual language, and claim discipline
  (no invented stats). Competitors win on awards walls, public pricing and
  content depth; FOREXAA's gap to close: verified proof (case studies,
  partners, numbers) — tracked in the claims registry, not invented.

## Intent model (Rule 28)

| Page family | Intent |
| --- | --- |
| Homepage | Navigational / commercial (entity + context) |
| CRM / platform hubs | Commercial investigation |
| Pricing | Transactional / commercial |
| Documentation / resources | Informational |
| Case studies | Commercial proof |
| Comparisons | Commercial investigation |

The homepage does NOT target every term (Rule 79): it owns the entity
context. Product queries are owned by their pages (keyword map).

## Topical clusters (Rule 25)

Three primary clusters, one owner per query:

1. **FOREX CRM** → `/broker-technology` (hub) + crm / traders-room /
   back-office / ib-affiliate / risk-management (planned).
2. **WHITE LABEL** → `/platforms` (hub) + mt4-mt5 / mt7 / ctrader /
   web / mobile (planned) + `/services/white-label`.
3. **LIQUIDITY** → `/infrastructure` (hub) + liquidity / payments / api /
   integrations / security (planned).

A fourth, **PROP** cluster, hangs off `/solutions/prop-firm`.

Programmatic expansion is STRICTLY controlled (Rule 66): no mass pages.
Each future page needs a distinct intent, substance and editorial review.

## Crawl architecture

- Clean, stable, descriptive URLs (Rule 11) registered in
  `src/config/seo/routes.ts` — the single source of truth.
- Self-referencing canonicals from that registry (no query-parameter
  canonicals; `?utm_*`, `?sort`, `?filter` are never canonical URLs).
- Sitemap = indexable + live routes only (Rule 13).
- robots.txt blocks `/api /admin /private /preview /test` families;
  noindex is done per-page via metadata, not robots (Rule 14).

## External reputation (later)

- Verified partner/entity `sameAs` links only when real.
- Case studies + a Search Console loop (docs/seo/SEARCH-CONSOLE-SETUP.md)
  to feed the system, measure, and fix.

## Measurement (Rule 30 — no single "ranking score")

Quality framework, tracked qualitatively + with Search Console data later:
technical accessibility · intent fit · completeness · original value ·
internal linking · entity clarity · crawlability · performance · page
experience · trust/evidence · external reputation.

## Quality gates

- `npm run seo:check` (metadata, sitemap, robots, JSON-LD, links, claims).
- Lighthouse / Core Web Vitals budgets in docs/seo/PERFORMANCE-SEO.md.
- The change checklist in docs/seo/SEO-CHANGE-CHECKLIST.md per page.
