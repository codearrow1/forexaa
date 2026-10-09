# PHASE 9 — CLOSURE

## Phase 8 baseline

| Metric | Value |
| --- | --- |
| Hydration | React #412 on `/`, `/broker-technology/crm`, `/solutions/new-brokerage` |
| Browser QA | 45/48 (3 failures = #412) |
| LCP (mobile LH) | 2.7–3.2s |
| TBT (mobile LH) | 69–159ms |
| CLS | 0 |
| A11y / SEO | 100 / 100 |
| npm audit | 5 high (dev/build toolchain `braces` chain); runtime 0 |

## Hydration findings

**Root cause (confirmed):** the per-request CSP nonce cannot be embedded in
build-time static HTML. Static routes' inline RSC flight scripts therefore
carry no nonce and are CSP-blocked in production (`script-src 'self'
'nonce-…'`), so React cannot hydrate → #412. Dynamic routes render at request
time, embed the nonce, and hydrate cleanly. The Phase 8 framer-motion
hypothesis was **refuted** (disabling all motion did not help). Full evidence:
`docs/qa/PHASE-9-HYDRATION-AUDIT.md`.

**Secondary defect:** full hydration exposed a pre-existing mobile horizontal
overflow on `/` — `scene02-brokerage` layer cards start at `x: ±40` (framer
transforms extend the scrollable overflow area). Fixed with `overflow-x-clip`.

## Fixes

| File | Change |
| --- | --- |
| `src/app/layout.tsx` | `export const dynamic = "force-dynamic"` — request-time rendering so the per-request CSP nonce is embedded in inline flight scripts (fixes #412) |
| `src/components/marketing/home-scenes/scene02-brokerage.tsx` | `overflow-x-clip` on the layers container (clips the `x: ±40` entrance transforms) |
| `src/components/marketing/home-scenes/scene10-cta.tsx` | `overflow-hidden` on the glow container (same latent pattern, defensive) |
| `src/app/loading.tsx` | comment updated to reflect the force-dynamic reality |
| `scripts/browser-qa.mjs` | added interaction checks: keyboard Tab navigation, mobile drawer open/focus/Escape, mega menu open/Escape (CDP keyboard + pointer, zero new deps) |
| `scripts/verify-production.mjs` | added runtime (`npm audit --omit=dev`) vs dev/build-toolchain (`npm audit`) dependency security distinction |

## LCP before vs after (Lighthouse 12, mobile, production build)

| Route | Phase 8 LCP | Phase 9 LCP | Phase 8 TBT | Phase 9 TBT (clean) |
| --- | ---: | ---: | ---: | ---: |
| `/` | 2.9s | 2.9s | 94ms | 118ms |
| `/solutions/new-brokerage` | 2.9s | 3.0s | 81ms | 57ms |
| `/solutions/existing-broker` | 2.7s | 3.1s | 69ms | 38–58ms |
| `/solutions/prop-firm` | 2.7s | 2.7s | 103ms | 49ms |
| `/solutions/multi-asset` | 2.7s | 2.9s | 71ms | 58ms |
| `/broker-technology/crm` | 2.9s | 3.0s | 71ms | 120ms |
| `/platforms/mt4-mt5` | 2.9s | 2.9s | 88ms | 61ms |
| `/infrastructure/liquidity` | 2.7s | 2.9s | 69ms | 52ms |
| `/services/white-label` | 2.9s | 2.9s | 80ms | 43ms |
| `/contact` | 3.2s | 3.2s | 159ms | 101–124ms |

Read: **LCP unchanged within run variance** (2.7–3.2s both phases; the
simulated mobile TTFB floor ~460ms + CPU-throttled render delay dominate).
**TBT:** full-suite runs are contention-inflated (10 routes back-to-back);
clean single-route measurements are **38–124ms**, reproducibly under the
150ms target for both `/broker-technology/crm` and `/contact`.

## Dependency findings

- `npm audit` (full): **5 high** — all in the dev/build toolchain chain
  `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch →
  braces@3.0.3`. No patched `braces` release exists; the only registry "fix"
  is a breaking `eslint-config-next` downgrade (rejected).
- `npm audit --omit=dev` (runtime): **0 vulnerabilities.**
- `npm run verify:production` now reports runtime (BLOCKER if >0) and
  dev/build toolchain (WARNING, documented) separately.
- Full detail: `docs/security/PHASE-9-DEPENDENCY-AUDIT.md`.

## Browser QA before vs after

| | Phase 8 | Phase 9 |
| --- | ---: | ---: |
| Total checks | 45/48 | **60/60** |
| Hydration errors (#412) | 3 | **0** |
| Uncaught exceptions | 3 | **0** |
| Overflow failures | 0 | **0** |
| Reduced-motion failures | 0 | **0** |
| Keyboard Tab navigation | — | 4/4 pass |
| Mobile drawer open/close/Escape | — | 4/4 pass |
| Mega menu open/close/Escape | — | 4/4 pass |

Screenshots: `docs/qa/evidence/` (375 + 1280 per route). Note: this
environment cannot display images to me — visual confirmation of the
screenshots remains a manual owner task.

## Remaining manual QA

- Visual review of the captured screenshots (hero composition, glow clipping,
  drawer/mega-menu appearance).
- Real-device pass (touch, screen reader, keyboard on physical hardware).
- Hover-state and animation-quality review (automated checks cover
  open/close/Escape, not visual polish).

## Remaining owner actions

Unchanged from Phase 8 — all owner-controlled launch dependencies remain
absent and are not fabricated:

- `DATABASE_URL`, `RATE_LIMIT_URL` + `RATE_LIMIT_TOKEN`, `SMTP_*`,
  `SALES_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `GOOGLE_SITE_VERIFICATION`.
- Counsel-approved privacy/legal copy, verified partner registry, real product
  screenshots.

## Performance gap (documented, not gapped)

Simulated mobile LCP remains 2.7–3.2s (over the 2.5s budget). The dominant
term is CPU-throttled first-render work over the full client bundle
(`motion` 391KB + React 229KB + react-dom 163KB raw) under Slow-4G/4x CPU,
with a ~460ms simulated TTFB floor. Closing the gap to 2.5s would require
removing the cinematic motion architecture (forbidden) or out-of-repo
infrastructure (edge/CDN, faster TTFB). Not claimed.
