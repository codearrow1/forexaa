# LEGACY URL MIGRATION PLAN

Source: the current public FOREXAA site (baseline reference, Rule 7).
Status: **planned, not yet implemented** (Rule 12: do not ship blind
redirects). When routes are built, implement 301s via a Next.js redirect
map (e.g. `redirects()` in next.config or the proxy). Only redirect a
legacy URL to a genuinely relevant replacement — never bulk-redirect to `/`.

## Mapping (OLD → NEW → type → reason)

| OLD URL | NEW URL | Type | Reason |
| --- | --- | --- | --- |
| `/` | `/` | 301 | Home to home |
| `/forex-crm/` | `/broker-technology/crm/` (planned) | 301 when built | CRM detail lives under broker-technology; until built, fall back to `/broker-technology` |
| `/white-label/` | `/platforms/` | 301 | White-label content consolidated into the platforms hub |
| `/mobiustrader-mt7-white-label/` | `/platforms/mt7/` (planned) | 301 when built | MT7 platform detail |
| `/mt4-mt5-white-label/` | `/platforms/mt4-mt5/` (planned) | 301 when built | MT4/5 platform detail |
| `/social-trading-white-label/` | `/platforms/` | 301 | Social/copy/PAMM is covered by the platforms hub for now |
| `/prop-trading/` | `/solutions/prop-firm/` (planned) | 301 when built | Prop-trading is a solution, not a platform |
| `/legal-services/` | `/services/` | 301 | Legal is one of the service lines |
| `/forex-liquidity/` | `/infrastructure/liquidity/` (planned) | 301 when built | Liquidity lives under infrastructure |
| `/about/` | `/company/` | 301 | About → company |
| `/why-to-choose-forexaa/` | `/` | 301 | Thin persuasion page; value now on the homepage |
| `/our-partners/` | `/company/` | 301 | Partners will live on the verified company page |
| `/news/` | `/resources/` | 301 | News becomes editorial resources |
| `/faq-answers/` | `/` (FAQ section) | 301 | FAQ now lives in the homepage section |
| `/help-center/` | `/resources/` | 301 | Help content migrates to resources |
| `/terms-condition/` | `/legal/terms/` (planned) | 301 when built | Legal doc |
| `/privacy-policy/` | `/legal/privacy/` (planned) | 301 when built | Legal doc |

## Rules

- **No 404-to-home mass redirect.** Each legacy URL maps to the most
  relevant live (or soon-live) page.
- **Verify before shipping**: crawl the live old site to confirm each old
  path still exists and returns 200 (some old pages were returning 500 —
  `/white-label/`, `/social-trading-white-label/`, `/prop-trading/`,
  `/our-partners/`). A 500 source should still be redirected (the URL is
  part of the public surface) but to the correct target.
- **Preserve equity gradually**: introduce redirects in waves as the target
  routes are built, not all at once.
- **Log it**: keep this table updated; when a redirect ships, move its row
  to a "shipped" section with a date.

## Shipped (Phase 3)

Implemented in `next.config.ts` as a static allowlist of permanent 301s.
Each destination is a complete, live page. Verified by `npm run seo:check`
(section [4]).

| OLD URL | NEW URL | Type | Reason |
| --- | --- | --- | --- |
| `/forex-crm` | `/broker-technology/crm` | 301 | CRM product page now exists |
| `/mobiustrader-mt7-white-label` | `/platforms/mt7` | 301 | MT7 platform page now exists |
| `/mt4-mt5-white-label` | `/platforms/mt4-mt5` | 301 | MT4/MT5 platform page now exists |
| `/forex-liquidity` | `/infrastructure/liquidity` | 301 | Liquidity page now exists |
| `/white-label` | `/services/white-label` | 301 | White-label service page now exists |
| `/social-trading-white-label` | `/solutions/social-copy` | 301 | Social/copy/PAMM/MAM hub now exists |
| `/about` | `/company` | 301 | Company page now exists |

## Still deferred (destination not yet complete)

| OLD URL | Intended target | Blocker |
| --- | --- | --- |
| `/prop-trading` | `/solutions/prop-firm` | Prop solution page not built |
| `/legal-services` | `/services` (legal content) | Legal service content not verified |
| `/why-to-choose-forexaa` | `/` | Thin persuasion page — value now on homepage |
| `/our-partners` | `/company` | Partner content unverified |
| `/news` | `/resources` | Editorial resources not published |
| `/faq-answers` | `/` (FAQ section) | No clean anchor target yet |
| `/help-center` | `/resources` | Help content not published |
| `/terms-condition` | `/legal/terms` | Terms text in final review |
| `/privacy-policy` | `/legal/privacy` | Privacy text in final review |

## Implementation notes (later)

- Use `redirects()` in `next.config.ts` or the `proxy.ts` boundary for a
  single source of truth.
- After deployment, monitor Search Console for old-URL 301 coverage and
  any 404 spikes.
