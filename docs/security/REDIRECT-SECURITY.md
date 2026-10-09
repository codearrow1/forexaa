# REDIRECT SECURITY

Phase 3 implements legacy URL redirects. This document is the security
model; the implementation is `next.config.ts` (`redirects()`).

## Threat model

Redirects are a classic open-redirect / phishing vector: an endpoint that
takes a user-controlled destination and sends the browser there. We do not
build that.

## Rules (Rule 42)

1. **Static allowlist only.** Every source and destination is a literal
   string in `next.config.ts`. No user input, no parameters, no wildcards.
2. **No parameterized destinations.** Sources are exact paths (no
   `:path*`), so no untrusted data flows through a redirect.
3. **Permanent 301.** `permanent: true` for all entries.
4. **No chains.** Every destination is a final, live page. A destination
   that is itself a redirect source is forbidden (tested).
5. **No loops.** A source can never be a destination (tested).
6. **No collision with live routes.** A redirect source must not be a live
   route in the registry (tested).
7. **Query parameters are not preserved.** No `?utm_*` or other query data
   is carried through a redirect.

## Allowlist (shipped)

| Source | Destination |
| --- | --- |
| `/forex-crm` | `/broker-technology/crm` |
| `/mobiustrader-mt7-white-label` | `/platforms/mt7` |
| `/mt4-mt5-white-label` | `/platforms/mt4-mt5` |
| `/forex-liquidity` | `/infrastructure/liquidity` |
| `/white-label` | `/services/white-label` |
| `/social-trading-white-label` | `/solutions/social-copy` |
| `/about` | `/company` |

Only mappings whose destination is a complete, live page are shipped. The
rest are tracked in docs/seo/LEGACY-URL-MIGRATION.md.

## Tests

- `tests/seo/redirects.test.ts` — allowlist invariants (permanent, no
  collisions, no chains, destinations live).
- `npm run seo:check` section [4] — live 301 verification + destination
  200 check.

## Adding a redirect

1. Confirm the destination page is complete and live.
2. Add the literal mapping to `LEGACY_REDIRECTS` in `next.config.ts`.
3. Run `npm test` + `npm run seo:check`.
4. Update docs/seo/LEGACY-URL-MIGRATION.md (move the row to "Shipped").
