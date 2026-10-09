# PHASE 9 — HYDRATION AUDIT

## Summary

Phase 8's browser QA surfaced **React error #412** ("error while hydrating this
DOM node, switching to client-side rendering") on the static routes
`/`, `/broker-technology/crm`, `/solutions/new-brokerage`. Phase 9 proved the
true root cause and fixed it. **The framer-motion hypothesis from Phase 8 was
wrong** — motion was a red herring.

## Reproduction (Phase 8 method)

`npm run browser:qa` (headless Chrome + CDP, zero new dependencies) captures
uncaught exceptions. Phase 8 result: #412 on the 3 static routes, clean on
`/contact`. Reproduced identically in Phase 9.

## Root cause — CONFIRMED (evidence, not hypothesis)

**The per-request CSP nonce cannot be embedded in build-time static HTML, so
static routes' inline RSC flight scripts are CSP-blocked in production.**

Evidence chain:

1. **Static vs dynamic HTML differs.** A static (build-time prerendered)
   route's HTML contains inline flight scripts (`<script>self.__next_f.push…`)
   with **no `nonce` attribute** (0 nonce'd scripts). A dynamically rendered
   route (`/contact`, and `/crm` when forced dynamic) embeds the per-request
   nonce into every inline script (13–16 nonce'd scripts).

2. **The production CSP requires that nonce.** `src/proxy.ts` generates a fresh
   nonce per request and emits `script-src 'self' 'nonce-<value>'`
   (`src/security/headers.ts`). An inline script without a matching nonce is
   blocked.

3. **Chrome blocks the static flight scripts.** CDP console capture on a
   static route shows repeated:
   `Executing inline script violates the following Content Security Policy
   directive 'script-src 'self' 'nonce-…''`. The RSC flight payload never runs.

4. **Hydration fails → #412.** With the flight payload blocked, React cannot
   hydrate the streamed content and throws #412, recovering by client-rendering
   the subtree. `window.self.__next_f` stays empty (0 entries).

5. **Forcing dynamic rendering fixes it.** Adding `export const dynamic =
   "force-dynamic"` to `/broker-technology/crm` (diagnostic) made #412
   disappear on that route while the still-static routes kept failing —
   isolating the cause to build-time prerendering, not content or motion.

6. **Motion was exonerated.** Disabling every `whileInView`/`useScroll`/
   `useTransform` story component (ScrollScene, VisualReveal, ArchitectureFlow,
   HorizontalStory) and even replacing the CRM page with a minimal static page
   did **not** remove #412. The Next.js 16 docs confirm the mechanism:
   *"static pages are generated at build time, when no request or response
   headers exist — so no nonce can be injected."*

## Fix

`src/app/layout.tsx`: `export const dynamic = "force-dynamic"` on the root
layout, so every page renders at request time and Next.js embeds the
per-request nonce into its inline flight scripts. This is the Next.js-
documented approach for combining a CSP nonce with the App Router.

**Why this is the right fix (not a mask):**
- It preserves the strict nonce-based CSP (no `unsafe-inline`, no wildcards) —
  the Phase 7/8 security control is unchanged.
- It does not touch the motion system, content, or SEO.
- The cost is per-request server rendering of the marketing pages (measured in
  `docs/performance/PHASE-9-CLOSURE.md`): LCP is unchanged within run variance
  (2.7–3.2s), because the simulated mobile TTFB floor (~460ms) dominates.

## Secondary defect found and fixed

Enabling full hydration exposed a **pre-existing mobile horizontal overflow**
on `/` (home): the `scene02-brokerage` "assembling layers" cards start at
`x: ±40` (framer transforms), and transforms **do** extend the scrollable
overflow area — the `+40` cards pushed the document 20px past the viewport at
375px. It was masked in Phase 8 because static streaming hadn't laid the
content out at measurement time.

Fix: `overflow-x-clip` on the scene02 layers container (and defensively on the
scene10 CTA glow container, which has the same latent pattern). `overflow-x:
clip` prevents scrollable overflow without creating a scroll container.

## Validation

- `npm run browser:qa` → **60/60** (was 45/48 in Phase 8). Includes the new
  interaction checks: keyboard Tab navigation, mobile drawer open/focus/Escape,
  mega menu open/Escape.
- Zero uncaught exceptions on all routes.
- No horizontal overflow at 375/390/430/768/1024/1280/1440/1920.
- `prefers-reduced-motion` renders cleanly.

## Confidence ledger

| Claim | Status |
| --- | --- |
| #412 is caused by CSP nonce on static flight scripts | **Confirmed** (evidence chain above) |
| Motion (whileInView/useScroll/useTransform) causes #412 | **Refuted** (disabling all motion did not help) |
| Static streaming masks the home overflow | **Confirmed** (overflow appears only after full hydration) |
| force-dynamic fixes #412 without security regression | **Confirmed** (CSP unchanged, nonce now embedded) |
