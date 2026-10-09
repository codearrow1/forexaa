# PHASE 10 — PERFORMANCE CLOSURE

## Phase 9 baseline

| Route | LCP | TBT | CLS | A11y |
| --- | ---: | ---: | ---: | ---: |
| `/` | 2.9s | 118ms | 0 | 100 |
| `/solutions/new-brokerage` | 3.0s | 57ms | 0 | 100 |
| `/solutions/existing-broker` | 3.1s | 38–58ms | 0 | 100 |
| `/solutions/prop-firm` | 2.7s | 49ms | 0 | 100 |
| `/solutions/multi-asset` | 2.9s | 58ms | 0 | 100 |
| `/broker-technology/crm` | 3.0s | 120ms | 0 | 100 |
| `/platforms/mt4-mt5` | 2.9s | 61ms | 0 | 100 |
| `/infrastructure/liquidity` | 2.9s | 52ms | 0 | 100 |
| `/services/white-label` | 2.9s | 43ms | 0 | 100 |
| `/contact` | 3.2s | 101–124ms | 0 | 100 |

## TTFB measurements (local production build, 15 requests/route)

| Route | min | median | max |
| --- | ---: | ---: | ---: |
| `/` | 20ms | 26ms | 37ms |
| `/solutions/new-brokerage` | 12ms | 22ms | 29ms |
| `/broker-technology/crm` | 15ms | 22ms | 28ms |
| `/contact` | 12ms | 15ms | 17ms |

TTFB is **insignificant locally** (12–37ms). LCP is dominated by CPU-throttled
render delay, not TTFB. These are **local** measurements; production edge TTFB
is an owner-infrastructure concern.

## LCP measurements (Lighthouse 12, mobile, production build)

| Route | Phase 9 | Phase 10 |
| --- | ---: | ---: |
| `/` | 2.9s | 2.8s |
| `/solutions/new-brokerage` | 3.0s | 3.1s |
| `/solutions/existing-broker` | 3.1s | 2.9s |
| `/solutions/prop-firm` | 2.7s | 2.7s |
| `/solutions/multi-asset` | 2.9s | 2.9s |
| `/broker-technology/crm` | 3.0s | 2.9s |
| `/platforms/mt4-mt5` | 2.9s | 2.9s |
| `/infrastructure/liquidity` | 2.9s | 2.9s |
| `/services/white-label` | 2.9s | 2.9s |
| `/contact` | 3.2s | 3.2s |

LCP unchanged within run variance (2.7–3.2s). The architecture decision
(force-dynamic) has **no material LCP impact**.

## TBT measurements

| Route | Phase 9 | Phase 10 (full suite) | Phase 10 (clean) |
| --- | ---: | ---: | ---: |
| `/` | 118ms | 69ms | — |
| `/solutions/new-brokerage` | 57ms | 92ms | — |
| `/solutions/existing-broker` | 38–58ms | 49ms | 38–58ms |
| `/solutions/prop-firm` | 49ms | 52ms | — |
| `/solutions/multi-asset` | 58ms | 43ms | — |
| `/broker-technology/crm` | 120ms | 60ms | — |
| `/platforms/mt4-mt5` | 61ms | 48ms | — |
| `/infrastructure/liquidity` | 52ms | 133ms | — |
| `/services/white-label` | 43ms | 55ms | — |
| `/contact` | 101–124ms | 120ms | 101–124ms |

TBT is **under 150ms on all routes** in the Phase 10 full-suite run (43–133ms).
The architecture change has no material TBT impact.

## Cache behavior

- All routes: `Cache-Control: private, no-cache, no-store, max-age=0,
  must-revalidate` (force-dynamic). No shared HTML caching.
- This is **required** for nonce safety: a per-request-nonce page cannot be
  safely shared-cached (the cached HTML's flight scripts would mismatch a fresh
  CSP nonce). See `PHASE-10-RENDERING-DECISION.md` §8.
- Static routes would be `s-maxage=31536000` but are not used (nonce conflict).

## Render mode comparison

| | force-dynamic (chosen) | static + hashes (rejected) |
| --- | --- | --- |
| Hydration | clean (nonce embedded) | would be clean (hashes match) |
| CSP | strict per-request nonce | strict hashes (but fragile) |
| SEO | 100 | would be 100 |
| Browser QA | 64/64 | untested (rejected) |
| Cacheability | none (nonce-safe) | shared-cacheable |
| TTFB (local) | 12–37ms | would be lower (cache hit) |
| Complexity | one line in layout | build-time hash gen + proxy integration |
| Security | strong (per-request nonce) | strong but fragile (hash mismatch → #412) |

## Browser QA result

`npm run browser:qa` → **64/64** (unchanged from Phase 9). The architecture
decision does not affect browser QA.

## Security result

- `verify:headers` PASS (CSP nonce, HSTS, X-Frame-Options, nosniff,
  Permissions-Policy, Referrer-Policy).
- `npm audit --omit=dev` → 0 runtime vulnerabilities.
- `npm audit` → 5 high (dev/build toolchain `braces` chain, non-runtime,
  documented).
- No CSP weakening. No `unsafe-inline`/`unsafe-eval`/wildcards.

## Final bottlenecks

1. **Simulated mobile LCP 2.7–3.2s** (over 2.5s budget) — CPU-throttled render
   delay over the full client bundle; TTFB is insignificant. Closing the gap
   requires removing the motion architecture (forbidden) or out-of-repo
   infrastructure (edge/CDN). Not claimed.
2. **No shared HTML caching** — required for nonce safety with force-dynamic.
   A future hash-based approach could restore caching (see decision doc §15).
3. **5 dev/build-toolchain advisories** (`braces` chain) — non-runtime, no
   patched release, documented.
