# Phase 14 — Container Gutter Geometry Audit & Fix

**Status:** complete
**Date:** 2026-10-08
**Scope:** every content section on all 33 public routes — heading/panel left-edge alignment against the site's Container gutter grid at 5 widths.
**Method:** programmatic CDP probes (Range-based text-left measurement, DOM ancestor-chain dumps, per-section box/padding measurement) against the production build served at `http://localhost:3211`. Screenshots were captured but are not the source of truth here — all findings below are measured pixel values.

---

## 1. Gutter grid (expected baselines)

`Container` (`src/components/ui/container.tsx`) is the single source of horizontal rhythm:

```
w-full px-5 sm:px-6 lg:px-8 3xl:px-10  +  mx-auto max-w-[var(--container-width)]
```

with `--breakpoint-3xl: 120rem` (1920px) in `globals.css`. Expected heading left edges:

| Viewport | 375 | 768 | 1024 | 1440 | 1920 |
|---|---|---|---|---|---|
| Expected left | **20** | **24** | **32** | **105** | **353** |

---

## 2. Root cause

Three distinct containment bugs, one shared failure mode: content sections that never received the Container gutter.

1. **`ScrollScene` has no built-in container.** It is a bare `motion.div` (`src/components/story/primitives.tsx`) by design, because it is used *nested inside* existing Containers on home-v2, company, contact, and hub pages. Any page that places it at the top level of `<main>` without a wrapper renders headings at `left=0`.

2. **`ProductPage` had no Container at all** (`src/components/templates/product-page.tsx`). Every section — interface scene, overview, workflow, capabilities, audience, FAQ, final CTA, related products, integration scene — measured `left=0` at every width.

3. **`SolutionPage`, `TrustSection`, and `trust/privacy` used a gutter-less impostor container** — `mx-auto max-w-[var(--container-width)]` with no `px-*`. Headings measured `left=73` at 1440 (centering only, zero gutter) and `left=0` at 375.

4. **Header, footer, and home-v2 used `lg:px-8` but not `3xl:px-10`**, so at ≥1920 the chrome sat at 345 while Container content sat at 353 — an 8px misalignment on every page.

---

## 3. Fixes applied

| File | Change |
|---|---|
| `src/components/templates/product-page.tsx` | Imported `Container`; wrapped every ScrollScene block's content in `<Container>`; `RelatedProducts` and `IntegrationScene` wrapped in bare `<Container>` (no new ScrollScene — motion behavior preserved) |
| `src/components/templates/solution-page.tsx` | Replaced all 7 gutter-less `mx-auto max-w-[var(--container-width)]` inner divs with `<Container>`; FAQ and final-CTA ScrollScenes wrapped in `<Container>` |
| `src/components/templates/trust-page.tsx` | `TrustSection` inner div → `<Container>`; final-CTA ScrollScene panel wrapped in `<Container>` |
| `src/app/trust/privacy/page.tsx` | Inner div → `<Container>` |
| `src/components/layout/site-header.tsx` | Added `3xl:px-10` after `lg:px-8` |
| `src/components/layout/site-footer.tsx` | Added `3xl:px-10` after `lg:px-8` |
| `src/components/marketing/home-v2/hero.tsx` | Added `3xl:px-10` |
| `src/components/marketing/home-v2/sections.tsx` | Added `3xl:px-10` (10 sites) |
| `src/components/marketing/home-v2/brokerage-os.tsx` | Added `3xl:px-10` |

**Deliberately not changed:** `ScrollScene` itself. Adding a Container inside it would double-pad every existing nested usage (home-v2 sections, company, contact, hubs). The fix is at the call sites that were missing containment.

---

## 4. Verification

Harness (CDP, headless Chrome, production build):

- `p14-textleft.mjs` / `p14-textleft2.mjs` — Range-based heading text-left across routes × widths.
- `phase14-measure.mjs` — 9 routes × 5 widths (375/768/1024/1440/1920): per-section box, padding, heading left edge, footer bottom-row alignment → `p14-measure-<slug>@<width>.json`.
- `p14-gap.mjs` — section-gap and related-card box probe.
- `p14-opacity.mjs` — full scroll-through, counts elements still at `opacity: 0`.

### Results (post-fix)

- **All heading left edges match the grid exactly** on every probed route and width: `20 / 24 / 32 / 105 / 353`. Verified across home, both solutions, 5 product routes, trust, and contact.
- **Header/footer now align with content at ≥1920** (header brand box left = 353, footer brand left = 353, h1 left = 353). The previous 8px chrome/content mismatch is gone.
- **Related-products cards** inset correctly (`L=20 W=335` on 375).
- **No hidden content:** full scroll-through on `/`, `/broker-technology/crm`, `/solutions/new-brokerage`, `/trust/security` → `hiddenCount=0`. The earlier `opacity:0` observations were transient mid-animation states, not stuck reveals.
- **Footer bottom row** carries the full gutter classes (`px-5 sm:px-6 lg:px-8 3xl:px-10`) and measures correct at all widths.

### Known harness false positives (not bugs)

- `uncontained=1[s5:!py-16]` on product pages — the harness looks for a max-w child *inside* the section; the Container now wraps the ScrollScene from *outside*. Measured heading left = 20, so containment is real.
- Large `gaps` entries before FAQ — the related-products section's root lacks a regex-matched `py-*` value so the harness doesn't enumerate it; the section is present and correctly inset.
- Centered panels (stack-builder `Build Your Technology Stack`, CTA headings) show non-grid `boxLeft` — intentional centered content inside a contained section.
- `home s0 uncontained` — hero is intentional full-bleed.

---

## 5. Gates

Run against the fix commit, all passing:

- `npm run lint` — 0 errors (13 pre-existing warnings in `tests/setup.ts`)
- `npm run typecheck` — clean
- `npm run test` — all 109 tests pass
- `npm run build` — Next.js 16.3.8 production build succeeds

Server restarted on `:3211` with the new build; `/health` → 200.
