# PRODUCTION ACTIVATION MATRIX (Phase 11)

Every owner dependency below is **missing in the repository** (no values
invented, no accounts created, no secrets committed). The code ships with
safe fallback behavior and `npm run verify:production` fails on purpose
until each row is satisfied. A row is marked *complete* only with evidence
(a passing check against a real owner-supplied value) — none is complete
yet.

| Requirement | Code Status | Owner Input | Verification | Launch Effect |
| --- | --- | --- | --- | --- |
| PostgreSQL | `src/lib/lead-store/postgres.ts` + `schema.sql` ready; in-memory fallback active when unset | `DATABASE_URL` (real, intended environment) | `npm run db:migrate` against that DSN; then insert/dedup/status-transition smoke test | Leads persist durably across instances; without it, leads live in per-process memory only (lost on restart) |
| DB migration | `npm run db:migrate` applies `src/lib/lead-store/schema.sql` (CREATE IF NOT EXISTS + indexes); never drops/resets | — (run after DATABASE_URL is set) | migrate output + schema/index/lead-insert/dedup/status/failure checks | Required before the Postgres lead store is used; no destructive commands exist in the script |
| Shared rate limiter | `src/security/rate-limit.ts`: shared backend when configured, in-memory no-op fallback otherwise | `RATE_LIMIT_URL` + `RATE_LIMIT_TOKEN` (Redis REST) | connectivity + limit behavior check without logging credentials | Per-IP contact limiting works across instances; without it, limits are per-process only |
| SMTP | `src/lib/email/provider.ts`: safe failure semantics (no user-visible error, lead already persisted) when unset | `SMTP_HOST` + `SMTP_USER` + `SMTP_PASSWORD` + `SMTP_FROM` | existing safe delivery test (project pattern) — never log the password | Real lead notifications + user confirmations; without it, submissions persist but nobody is emailed |
| SALES_EMAIL | read from env by the email provider (warning-level) | sales inbox address | `verify:production` presence check | Internal lead notifications routed to the sales team |
| NEXT_PUBLIC_SITE_URL | canonical/OG/redirect URLs derive from it at build time (defaults to localhost in dev builds) | the public origin (e.g. `https://www.forexaa.com`) | rebuild with the env set; `seo:check` canonical check green | correct canonicals, sitemap, OG URLs in production; without it, search indexing metadata points at localhost |
| Search Console | meta tag rendered **only** when configured (`src/app/layout.tsx`); no token committed | `GOOGLE_SITE_VERIFICATION` (from a verified property) | tag present in built HTML + property verified in Search Console | site verifiable/indexable in GSC; the value must come from a real verified property — never invented |
| Privacy/legal | `/trust/privacy` + `/legal/*` are `noindex` scaffolds; claims registry gates public copy (`src/config/seo/claims.ts`) | counsel-approved privacy copy + terms (owner/legal) | counsel sign-off recorded; gates flip to indexable only when approved | legal pages publishable; without it they stay noindex by design (no fabricated legal content) |
| Real screenshots | product visuals are original synthetic compositions; `docs/design/REAL-PRODUCT-SCREENSHOT-SPEC.md` defines the swap-in contract | verified real product screenshots | assets supplied + license confirmed in `ASSET-LICENSE-MANIFEST.md` | UI mockups replaced with real product imagery; synthetic visuals remain until then (no fake screenshots) |
| Verified partners | partner registry empty; `/company/partners` noindex; claims registry blocks unverified partner statements | verified partner/approval data | entries added to the registry with proof; `tests/seo/partners.test.ts` green | partner wall publishes; until then the registry stays intentionally empty |
| Browser QA | automated: `npm run browser:qa` → **64/64** (overflow 375–1920, exceptions, hydration console errors, reduced-motion, keyboard Tab, mobile drawer open/close/Escape, mega menu open/close/Escape). Manual: hover/focus/drawer/animation review | owner QA pass (real devices, keyboard + screen reader spot checks) | QA checklist signed off | final human sign-off on interaction quality; automated coverage is documented in `docs/qa/evidence/` |
| Rendering architecture | **force-dynamic kept** (Phase 10 decision): request-time rendering required so the per-request CSP nonce is embedded in inline RSC flight scripts. Static + strict CSP proven incompatible (#412). See `docs/architecture/PHASE-10-RENDERING-DECISION.md` | edge/CDN for TTFB (owner infra) | `verify:headers` CSP nonce + `browser:qa` zero exceptions | no shared HTML caching (nonce-safe); per-request server render. Future hash-based caching is a documented migration path, not implemented |
| LCP | first-paint gating removed (template `initial={false}`), fonts self-hosted + preloaded, hydration clean (force-dynamic); budget 2.5s | edge/CDN + real-device re-measurement (owner infra) | Lighthouse mobile LCP ≤ 2.5s on all 10 routes | **NOT met in simulation (2.7–3.2s).** Measured, not claimed; see `PHASE-10-CLOSURE.md` |
| TBT | Phase 10 full-suite TBT **43–133ms** (all < 150ms); clean single-route 38–124ms | — (re-measure post-infra) | Lighthouse mobile TBT < 150ms on all routes | UX responsiveness target met |

## Pre-existing CODE defect (top launch-blocker candidate)

**React #412 hydration mismatch — RESOLVED (Phase 9), architecture settled
(Phase 10).** Root cause was the per-request CSP nonce not being embeddable in
build-time static HTML, so static routes' inline RSC flight scripts were
CSP-blocked in production (`script-src 'self' 'nonce-...'`) and React could not
hydrate. The framer-motion hypothesis was refuted. Fix: `export const dynamic =
"force-dynamic"` in `src/app/layout.tsx`. Phase 10 confirmed this is the
correct long-term architecture (static + strict CSP is incompatible; hash and
stable-nonce alternatives rejected). Verified: `npm run browser:qa` → 64/64,
zero uncaught exceptions. See `docs/architecture/PHASE-10-RENDERING-DECISION.md`.

## Owner activation order (Phase 11)

1. **Domain / site URL** — confirm the public origin → `NEXT_PUBLIC_SITE_URL`.
2. **PostgreSQL** — provision the instance → `DATABASE_URL`.
3. **Database backup** — configure automated backups/snapshots before data
   exists (`DATABASE-BACKUP-RESTORE.md`).
4. **DB migration** — run `npm run db:migrate` against the target DSN
   (`DATABASE-MIGRATION-RUNBOOK.md`).
5. **Shared rate limiter** — provision Redis-REST / edge-KV → `RATE_LIMIT_URL`
   + `RATE_LIMIT_TOKEN`.
6. **SMTP** — configure the email provider → `SMTP_*`.
7. **Sales email** — confirm the monitored inbox → `SALES_EMAIL`.
8. **Search Console** — verify the property → `GOOGLE_SITE_VERIFICATION`
   (`SEARCH-CONSOLE-LAUNCH-CHECKLIST.md`).
9. **Legal approval** — counsel-approved privacy/terms copy.
10. **Verified partners / screenshots** — supply verified assets.
11. **Manual QA** — real-device visual/interaction review
    (`MANUAL-LAUNCH-QA.md`).
12. **Final launch check** — `npm run launch:check` reports
    `READY FOR ACTIVATION — OWNER ACTIONS REQUIRED` with 0 CODE blockers.

None of these actions has occurred. The order is the dependency sequence for a
safe activation.
