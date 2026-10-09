# PHASE 8 — PERFORMANCE AUDIT (diagnosis)

Methodology: Lighthouse 12 (headless Chrome, production build via
`npm run build` + `next start -p 3211`), **mobile form factor** (375x667,
4x CPU + Slow-4G simulation) — the same methodology as the Phase 7 baseline.
`scripts/lighthouse-ci.mjs` gained `--form-factor=mobile` (the script
previously defaulted to the desktop preset, which does not reproduce the
Phase 7 numbers) and an optional `LHCI_EVIDENCE_DIR` that retains full JSON
reports. One retry per route on flaky runs (documented repeatability policy).
All numbers below are measured, not estimated. Evidence JSON:
`docs/performance/evidence/baseline/` (start of Phase 8) and
`docs/performance/evidence/final/` (final state).

## Phase 7 baseline (authoritative, reproduced)

| Route | LCP | TBT | A11y |
| --- | ---: | ---: | ---: |
| `/` | 2.9s | 67ms | 100 |
| `/solutions/*` | 2.7–2.8s | 58–103ms | 100 |
| `/broker-technology/crm` | 3.1s | 203ms | 100 |
| `/contact` | 3.4s | 155ms | 98 (heading-order) |

Reproduced at Phase 8 start (mobile, this environment): LCP 2.7–3.3s on all
10 routes, TBT 55–237ms (contact flaky 154–237ms across runs), A11y 100 on
all routes (footer heading fix from the previous session had already landed),
CLS ≈ 0.

## Root causes found (measured)

### 1. LCP "render delay" ≈ 84% on every route — first paint was gated

LCP-element breakdowns (`largest-contentful-paint-element` +
`lcp-breakdown-insight` audits):

- TTFB ≈ 460ms (simulation floor), Load Delay/Time = 0
- **Element render delay ≈ 2.3–2.9s (83–86% of LCP)** on every route.

Two compounding causes measured:

1. **`src/app/template.tsx` SSR'd `style="opacity:0"` around all of
   `<main>`** (`motion.div initial={{opacity:0}}`). The entire page content —
   including the LCP hero text — was invisible until client hydration ran.
   In the baseline HTML, `<main>` began with `<div style="opacity:0">`.
   Effect: the largest contentful element in the first viewport could not be
   the hero text at all; Lighthouse reported the LCP element as the header
   logo wordmark (top=14) or the footer blurb (top=491, visible in the
   mobile first viewport while main content was still hidden).
2. **The root `loading.tsx` wraps every route in a Suspense boundary**
   (framework behavior): static-route content is streamed after the shell
   (initial HTML = layout + skeleton fallback; `?_rsc` fetches carry the real
   content). Next.js streaming docs state explicitly: *"If your LCP element is
   inside a Suspense boundary, it can't paint until that boundary's content is
   swapped in."*

Fixes applied: `template.tsx` now uses `initial={false}` (SSR paints the
content at full opacity; no-JS users no longer get a blank main). The root
`loading.tsx` was **kept** (see finding 4 — removing it did not reduce LCP and
was not the LCP lever; document: `src/app/loading.tsx`).

After the template fix, the LCP element on most routes was the genuine hero
heading/lead paragraph (`h1.type-display` on `/`, `p.type-body-lg` on
product/solution routes, top=317–423) — proof the gating was removed.

### 2. LCP text = self-hosted Sora/Manrope Variable fonts

The LCP element on `/` is the hero heading (Sora Variable display font,
33.6KB woff2); on all other routes it is the Manrope lead paragraph
(24.8KB woff2). Fonts were served through `@fontsource-variable` CSS
`@import` (discovered only after the CSS parsed). Phase 8:

- vendored the byte-identical latin + latin-ext variable files into
  `public/fonts/` (stable paths, `font-display: swap`, same family names,
  weight ranges and unicode-ranges as the fontsource CSS — typography
  unchanged);
- preload both LCP-critical fonts in the root layout
  (`rel="preload" as="font" crossorigin` — `crossorigin` is required:
  without it Chrome logs *"preload … not used because the request
  credentials mode does not match"* and double-fetches).

Measured effect on simulated LCP: marginal (fonts were already ~200ms into
the load; the dominant term is CPU-throttled render delay + TTFB floor).
The preload still matters for real (non-throttled) users and removes the
dev-mode double-fetch warning.

### 3. TBT driver on `/contact`

Long-task analysis (baseline): contact's TBT (154–237ms, flaky) came from
parsing the shared framework chunk `3sg07*.js` (React 19 + Next flight
runtime, 229KB raw) plus the 11–97KB HTML document. Not reducible without
changing the framework — documented, not chased. CRM TBT in clean Phase-8
mobile runs: 55–89ms (Phase 7's 203ms was a cold throttled run; the
long-task profile did not reproduce it here).

### 4. PRE-EXISTING defect found by new browser QA: React #412 hydration
mismatch on the static motion-heavy routes

`scripts/browser-qa.mjs` (new, zero-dependency headless-Chrome/CDP) captures
uncaught JS exceptions in a real browser — the first check of its kind for
this project. Result: **React error #412** ("error while hydrating this DOM
node, switching to client-side rendering") fires on first hydration of
`/`, `/broker-technology/crm`, and `/solutions/new-brokerage`; not on
`/contact`.

**Verified pre-existing (not caused by Phase 8):** a pristine-state build
(original `template.tsx`, original `scene01`, original fontsource imports,
no preload, `loading.tsx` at root) reproduces #412 identically. Phase 8
changes neither add nor remove it (final-state QA shows the same 3 routes,
same error).

Likely source class: framer-motion (`motion/react`) SSR output for the
streamed story content (`whileInView` reveals, `useScroll`/`useTransform`
pinned scenes in `src/components/story/*`) not matching the client's first
render in the minified production build. React recovers by client-rendering
the subtree, so pages function (all QA checks pass except the exception
count); it is a correctness defect, not a crash. **Fixing it requires a
framer-motion SSR audit of the story components — deliberately out of scope
for this phase (no architecture rewrites); tracked as the top CODE item in
`docs/deployment/PRODUCTION-ACTIVATION-MATRIX.md`.**

## Planned vs actual changes (this phase)

| Change | File | Expected | Actual (measured, mobile) |
| --- | --- | --- | --- |
| Remove `opacity:0` first-paint gate | `src/app/template.tsx` | hero paints on first frame; LCP ↓ | LCP element became the real hero text on `/` and product routes; simulated LCP ≈ unchanged (render delay is CPU-bound, not gate-bound) |
| Self-host + preload LCP fonts | `public/fonts/*`, `src/app/globals.css`, `src/app/layout.tsx` | earlier font delivery, no dev double-fetch | verified: `/fonts/*` served, preload consumed, dev-mode "credentials mode" warning gone |
| Footer heading order (prior session) | `src/components/layout/site-footer.tsx` | contact a11y → 100 | A11y = 100 on all routes (was 98 on `/contact`) |
| LCP-element + evidence tooling | `scripts/lighthouse-ci.mjs` | reproducible methodology | LCP element now captured per route; evidence JSON retained on demand |
| Real-browser QA + exception capture | `scripts/browser-qa.mjs` (new) | catch what Lighthouse misses | surfaced pre-existing React #412 (see §4); no horizontal overflow at 375–1920; reduced-motion renders verified |
| Verify:production classification | `scripts/verify-production.mjs` | clear CODE vs OWNER split | blockers/warnings now classed CODE / OWNER INFRASTRUCTURE / OWNER CONTENT-LEGAL |
| SEO check: public assets | `scripts/seo-check.mjs` | font preload hrefs not false-positives | 0 errors / 0 warnings restored |

## Still open (documented, not gamed)

- **Simulated mobile LCP 2.7–3.2s** remains over the 2.5s budget. Root cause
  is CPU-throttled first-render work (TTFB floor 460ms + ~2.3s render delay
  over the 97KB HTML + ~190KB JS + 58KB fonts under Slow-4G/4x CPU). A
  sub-2.5s result would require removing the cinematic motion stack
  (forbidden) or out-of-repo infrastructure (edge/CDN, better TTFB). Not
  claimed.
- **`/contact` TBT 136–196ms** flanks the 150ms budget (shared framework
  chunk parsing; Phase 7 baseline was 155ms). Documented, not chased.
- **React #412** — pre-existing, see §4.
- **`npm audit`: 5 high-severity advisories** in the dev/build toolchain
  (`braces` ← `micromatch` ← `fast-glob` ← `@next/eslint-plugin-next` ←
  `eslint-config-next`). Installed = latest = 3.0.3; no patched release
  exists on the registry. The only registry "fix" is a breaking downgrade to
  `eslint-config-next@14.2.35` (rejected — would desync from Next 16).
  Build-toolchain-only advisory: never loaded in the browser/runtime.
