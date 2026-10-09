# INTERNAL LINKING

Model: `src/config/seo/internal-links.ts` (data-driven, Rule 24). Every
important page has: parent category, siblings, related products/solutions/
resources, a CTA, and a breadcrumb. No orphan pages.

## Principles

- **Descriptive anchors.** "Forex CRM & back office", "Liquidity
  infrastructure" — never "click here".
- **Contextual.** Links sit in content that explains the destination, not
  in footer spam.
- **Hub → child.** Ancestors link down to their children; children link
  back up to the hub and across to siblings.
- **No dead links ship.** `resolveForLink()` resolves any *planned*
  (not-yet-built) target to its live hub, so the site never has a link to a
  404. When a child page is built, the registry entry flips to `live` and
  the link automatically points at it (no code change).

## Clusters (mirror the topical map)

- **CRM cluster**: /broker-technology → crm, traders-room, back-office,
  ib-affiliate, risk; related to MT5/MT4 and liquidity and pricing.
- **White-label cluster**: /platforms → mt4-mt5, mt7, ctrader,
  white-label vs full license, white-label pricing.
- **Liquidity cluster**: /infrastructure → aggregation, providers,
  bridge, A-book/B-book, hybrid risk, architecture.
- **Homepage** links intentionally to: CRM, Platforms, Liquidity,
  White Label, Prop Trading, Solutions, Pricing, Case Studies (teaser),
  Resources, Contact (Rule 56).

## Tests

- `tests/seo/internal-links.test.ts` asserts: every modelled target is a
  known registry path; planned targets resolve to live fallbacks; all nav +
  footer links resolve to live routes; core pages are reachable from the
  home link model.
- `seo:check` scans rendered HTML for internal links to unregistered
  paths (dead links) and 404s the sampled ones.
