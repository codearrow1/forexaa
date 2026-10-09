# PHASE 8 — PERFORMANCE CLOSURE

Status: **PERFORMANCE HARDENING COMPLETE — simulated mobile LCP budget not
met; see "Remaining bottlenecks". No Lighthouse values below are estimates;
all are from `docs/performance/evidence/final/` (Lighthouse 12, mobile form
factor, production build, headless Chrome; one retry on flaky runs).**

## Phase 7 baseline

| Route | LCP | TBT | A11y |
| --- | ---: | ---: | ---: |
| `/` | 2.9s | 67ms | 100 |
| `/solutions/*` | 2.7–2.8s | 58–103ms | 100 |
| `/broker-technology/crm` | 3.1s | 203ms | 100 |
| `/contact` | 3.4s | 155ms | 98 (heading-order) |

## Root causes (full detail: PHASE-8-PERFORMANCE-AUDIT.md)

1. `template.tsx` SSR'd `style="opacity:0"` around `<main>` → hero text
   invisible until hydration (≈84% of LCP was "render delay").
2. Root `loading.tsx` Suspense boundary streams static-route content after
   the shell (Next.js: LCP inside a boundary can't paint until swap-in).
3. LCP text depends on the Sora/Manrope Variable fonts discovered via CSS.
4. `/contact` TBT driven by shared framework chunk parsing (React 19 + flight
   runtime).
5. Pre-existing React #412 hydration mismatch on static motion routes
   (surfaced by the new browser QA; reproduced in a pristine build — not
   introduced by Phase 8).

## Changes made (this phase)

| File | Change |
| --- | --- |
| `src/app/template.tsx` | `initial={{opacity:0}}` → `initial={false}`: SSR paints the page at full opacity; no-JS users no longer see a blank main |
| `src/components/marketing/home-scenes/scene01-market.tsx` | hero `<h1>` de-wrapped from motion (plain element); sub-copy `initial={false}` (LCP text paints on first frame); decorative sequences untouched |
| `public/fonts/{sora,manrope}-{latin,latin-ext}-wght-normal.woff2` | byte-identical fontsource files vendored (stable paths) |
| `src/app/globals.css` | `@import` fontsource → self-hosted `@font-face` blocks (same families, weight ranges, unicode-ranges, `font-display: swap`) |
| `src/app/layout.tsx` | `<link rel="preload" as="font" crossorigin>` for both LCP-critical variable fonts |
| `package.json` / `package-lock.json` | removed now-unused `@fontsource-variable/*` |
| `src/app/loading.tsx` | kept at root (original architecture); comment documents the streaming/Suspense trade-off |
| `src/app/trust/security/page.tsx` | copy updated: fonts self-hosted at `/fonts` |
| `scripts/lighthouse-ci.mjs` | `--form-factor=mobile` (matches Phase 7 methodology), LCP-element extraction, `LHCI_EVIDENCE_DIR`, one retry per route |
| `scripts/browser-qa.mjs` (new) | zero-dependency headless-Chrome QA: overflow at 375–1920, uncaught exceptions, reduced-motion render; screenshots to `docs/qa/evidence/` |
| `scripts/verify-production.mjs` | PASS/WARNING/BLOCKER now classed CODE / OWNER INFRASTRUCTURE / OWNER CONTENT-LEGAL; exit behavior unchanged |
| `scripts/seo-check.mjs` | internal-link check excludes `public/` assets (preload hrefs were false positives) |
| `docs/design/MOTION-SYSTEM.md` | Rule 81/82 amended (route fade no longer gates first paint) |

## Before vs after (Lighthouse mobile)

| Route | LCP P7 | LCP P8 | TBT P7 | TBT P8 | CLS P8 | A11y P8 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 2.9s | 2.9s | 67ms | 94ms | 0 | 100 |
| `/solutions/new-brokerage` | 2.8s | 2.9s | — | 81ms | 0 | 100 |
| `/solutions/existing-broker` | 2.8s | 2.7s | — | 69ms | 0 | 100 |
| `/solutions/prop-firm` | 2.7s | 2.7s | — | 103ms | 0 | 100 |
| `/solutions/multi-asset` | 2.7s | 2.7s | — | 71ms | 0 | 100 |
| `/broker-technology/crm` | 3.1s | 2.9s | 203ms | 71ms | 0 | 100 |
| `/platforms/mt4-mt5` | 2.8s | 2.9s | — | 88ms | 0 | 100 |
| `/infrastructure/liquidity` | 2.8s | 2.7s | — | 69ms | 0 | 100 |
| `/services/white-label` | 3.0s | 2.9s | — | 80ms | 0 | 100 |
| `/contact` | 3.4s | 3.2s | 155ms | 159ms | 0 | 100 |

Read: **improved** — crm LCP (3.1→2.9), crm TBT (203→71), all A11y (98→100
on `/contact`), CLS pinned at 0. **Unchanged (within run variance)** — most
other LCP/TBT values (±0.1–0.2s / ±20ms between identical runs). **No
regression** detected; any single-run delta is within measured repeatability
(variance observed: LCP ±0.2s, TBT ±60ms on repeated identical runs).

## LCP / TBT / CLS / A11y results (final run)

- LCP: 2.7–3.2s on all 10 routes (over the 2.5s budget — see remaining
  bottlenecks). LCP element: footer blurb on most routes, lead paragraph on
  `/contact` (evidence in `final/lh-*.json`).
- TBT: 69–159ms; all within or at the 150ms budget except `/contact`
  (159ms, flaky 136–196ms across runs).
- CLS: 0.00 on all routes.
- A11y: 100 on all routes. SEO: 100 on all routes. Best Practices: 100.
- Perf category scores: 91–96.

## Bundle observations (`.next/static/chunks`, raw)

| Chunk | Raw | Contents |
| --- | ---: | --- |
| `0ignkfc*.js` | 391KB | `motion` (framer) — every route (header uses it) |
| `3sg07*.js` | 229KB | React 19 + Next flight runtime |
| `28enf*.js` | 163KB | react-dom |
| `03end*.js` | 121KB | Next client framework |
| others | ~110KB | route-specific islands |

≈190KB transferred (gzipped) per page. Unused-JS opportunity ≈132KB across 3
framework chunks — not actionable without changing framework dependencies
(out of scope: no dependency churn this phase). Fonts: 58.5KB (latin,
preloaded); 30.6KB latin-ext on demand. Document: ~97KB (pre-rendered DOM +
RSC payload). CSS: 9.5KB.

## Browser QA (scripts/browser-qa.mjs, headless Chrome, final build)

- Horizontal overflow: **PASS** on `/`, `/crm`, `/contact`,
  `/solutions/new-brokerage` at 375/390/430/768/1024/1280/1440/1920.
- `prefers-reduced-motion: reduce`: content renders, no exceptions beyond
  the pre-existing #412.
- Uncaught JS exceptions: **React #412 on the 3 static motion routes**
  (pre-existing — pristine-build reproduction recorded in the audit doc).
- Screenshots: `docs/qa/evidence/*.png` (375 + 1280 per route). Manual
  review of hover states, keyboard focus, mega-menu/drawer interactions, and
  animation quality remains a human task — no interaction framework
  (Playwright/Puppeteer) was added, per the phase constraint.

## Remaining bottlenecks (evidence, not optimism)

1. **Simulated mobile LCP 2.7–3.2s** — CPU-throttled render delay over the
   full document + JS under Slow-4G; TTFB floor 460ms. Closing the gap to
   2.5s requires out-of-repo infrastructure (edge/CDN, faster TTFB) or
   removing the motion architecture (forbidden this phase).
2. **`/contact` TBT flanks the 150ms budget** (shared framework chunk
   parsing).
3. **React #412** pre-existing hydration mismatch on static motion routes —
   top CODE item in the activation matrix.
4. `npm audit`: 5 high advisories in the build-toolchain `braces` chain
   (no patched release; not loaded at runtime).
