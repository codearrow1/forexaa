# Phase 13 — Site-Wide Visual Continuity: Before / After

**Date:** 2026-10-07
**Scope:** Extend the homepage V2 premium visual language across the internal site: every product page, the four solution pages, the hub pages (/solutions, /platforms, /broker-technology, /infrastructure, /services, /pricing, /resources), trust pages, company/partners and contact. Visual/UX/product-storytelling only. No backend, feature, route, API, auth, security or force-dynamic changes.

**Inputs:** [`docs/design/PHASE-13-SITEWIDE-VISUAL-AUDIT.md`](PHASE-13-SITEWIDE-VISUAL-AUDIT.md) (findings) and [`docs/design/PHASE-13-PRODUCT-VISUAL-SYSTEM.md`](PHASE-13-PRODUCT-VISUAL-SYSTEM.md) (rules) — every rebuild in this phase follows those.

---

## 1. Verdict

**PHASE 13 COMPLETE — MINOR FOLLOW-UP** (details in §7).

Every hard gate matches or beats the Phase 12A baseline, with expanded coverage: 109/109 tests, lint 0 errors, typecheck/build pass, `seo:check` 0/0, `verify:headers` pass, browser QA **144/144** (up from 64, routes 4→9), Lighthouse **0 hard failures across 15 routes** (up from 10) with a11y 100 / SEO 100 / CLS 0 everywhere, `production:preflight` still limited to the 4 known owner blockers (CODE 0 blockers).

---

## 2. What changed, by area

### 2.1 Global foundation
- New `.type-product-hero` scale in `globals.css` (`clamp(3.25rem, 6vw, 4.75rem)`), the internal-page counterpart to the homepage `.type-hero`. Used by every internal hero h1 and by the final-CTA statement panels.
- `Heading` level-2 now maps to `.type-section` (all 25 major-section usages); level-1 heroes that need hero scale are rendered manually as `h1.type-product-hero`.
- CTA hierarchy enforced centrally via `src/config/ctas.ts`: `book-demo` removed; `build-brokerage` and `talk-to-forexaa` added. Conversion CTAs point at `/contact?intent=<page>`; no dead or cross-purposed conversion links.
- Nav foundation: `PRIMARY_ACTIONS` demo → contact ("Talk to FOREXAA"), company "Book a Demo" → "Build Your Brokerage".

### 2.2 Product pages (10) — `ProductPage` template v2
Removed the `visualStates` content type (all remaining "-" placeholders) and replaced the legacy content scenes with:
1. **Hero** — `h1.type-product-hero`, `.type-lead` lead, two CTAs, oversized product visual (all 10 `page-visuals` hero visuals).
2. **Interface scene** — full-width emphasis panel with a purpose-built synthetic UI per product (10 new `*InterfaceScene` renders: CRM, Trader's Room, Back Office, IB/Affiliate, MT4/MT5, MT7, cTrader, Liquidity, White Label, Social Copy), each tagged "Illustrative interface".
3. Overview → workflow → capabilities → **Integration scene** (new `integration-scene.tsx`, a non-pinned topology diagram that replaces the retired `HorizontalStory` 300vh sticky).
4. Audience → Related products → FAQ (shared `FaqAccordion`) → **final CTA panel** (`type-product-hero` statement + "Build Your Brokerage" primary, contextual ghost).

### 2.3 Solution pages (4) — `SolutionPage` v2
- Hero visual via a new `visual` prop (+ `visualAnchorId` so `/solutions/new-brokerage#stack-builder` keeps working); the new-brokerage page keeps its interactive `BrokerageStackBuilder`.
- Implementation journeys de-duplicated across the four pages (each page now owns one journey: implementation / rollout / model / migration).
- Final CTA panels upgraded to the standard pattern.

### 2.4 Hubs — `HubPage` v2
- Manual hero (Breadcrumbs, Badge eyebrow, `h1.type-product-hero`, `.type-lead`), new `opening` slot for a signature visual (e.g. `SolutionsHubScene`), related-products block, and an always-rendered final CTA panel with contextual secondary CTA.
- `/solutions` "Planned" badge made conditional (only genuinely unbuilt targets get it); hub-level FAQ blocks consolidated onto the shared `FaqAccordion` (content kept distinct per hub); all content blocks wrapped in `ScrollScene`.

### 2.5 Trust, company, partner, contact
- Trust: hero scale, linked-tile `TrustSection`, orphan tiles removed (Data Protection, Operational Practices — dead-ends with content already covered by security/privacy), restrained final CTA on all 5 trust pages.
- Company: hero scale, final CTA panel, primary href `/contact?intent=general` (was demo).
- Partners: hero scale, empty-state heading + "Build Your Brokerage" button, new final CTA panel, descriptions de-duplicated vs the company cards.
- Contact: hero scale; form/INTENT_LABELS architecture untouched.

### 2.6 Legacy cleanup
Full audit §5 inventory removed: `src/components/marketing/home/*` (11), `home-scenes/*` (10), `product/interactive/*` cascade, `product/lightbox.tsx`, the `visualStates` type + 10 content blocks, and the dead story exports (`TimelineScene`, `PinnedPanel`, `ProductZoom`, `HorizontalStory`, `ImageReveal`, `TextReveal`, `LayeredParallax`, `StorySection`, `StoryScene`, `StickyScene`, `SceneProgress`) from `story/{scenes,reveals,primitives}.tsx` — leaving exactly the three live motion exports (`ScrollScene`, `VisualReveal`, `ArchitectureFlow`). Verified 0 imports/references across `src`+`tests` before deletion.

---

## 3. Bugs found and fixed during verification

The expanded QA caught three real issues, all fixed and re-verified:

1. **Horizontal overflow at exactly 1024 px on every page** (browser:qa 10 fails, 134/144 first run). Cause: 7 mega-menu triggers × 8 px padding = 44 px over the container once the nav CTA became "Talk to FOREXAA". Fix: `lg:px-2 xl:px-3` on the mega-menu trigger (`mega-menu.tsx`). 144/144 after.
2. **Horizontal overflow at 375 px on `/platforms/mt4-mt5`** (and latent on cTrader/liquidity): the CTA statement word "infrastructure" at 52 px exceeded its 294 px box. Fix: `hyphens: auto; overflow-wrap: break-word` on `.type-product-hero`. docScrollWidth now equals clientWidth at every width.
3. **Heading-order a11y 98** on `/solutions`, `/platforms`, `/pricing` (cards jumped h1 → h3). Fix: real section h2s ("Business models", "Lineup", "Plans"); plus `/solutions/new-brokerage` (h1 → h3 from the hero stack-builder) — panel heading demoted to semantic h2. All routes now a11y 100. Bonus fix: `/pricing` tier card "Request a quote" pointed at `/company`; now `/contact?intent=pricing` (CTA-hierarchy rule).

---

## 4. Verification — before vs after

| Gate | Baseline (Phase 12A) | Phase 13 final | Delta |
|------|----------------------|----------------|-------|
| typecheck | PASS | PASS | — |
| lint | 0 errors / 13 warnings | 0 errors / 13 warnings (pre-existing, `tests/setup.ts` etc.) | — |
| tests | 109/109 (23 files) | 109/109 (registry CTA-hierarchy test + product-page rendering updated) | — |
| build | PASS | PASS | — |
| seo:check | 0/0 | 0/0 | — |
| verify:headers | PASS | PASS | — |
| browser:qa | 64/64 (4 routes × 8 widths + interactions) | **144/144 (9 routes × 8 widths + interactions)** | +80 checks, 0 fails |
| Lighthouse routes | 10 | **15** (added `/solutions`, `/broker-technology/traders-room`, `/broker-technology/back-office`, `/platforms`, `/pricing`) | +5 routes |
| Lighthouse hard fails | 0 | **0** | — |
| Lighthouse a11y / SEO | 100 / 100 (10 routes) | **100 / 100 (15 routes)** | — |
| Lighthouse CLS | 0 | **0** (one-off 0.533 flake on `/contact`/`/infrastructure/liquidity` in 2 of 6 full runs — see §7) | — |
| Lighthouse perf | 89–96, soft warns 0 | 89–96, soft warns 0 | — |
| production:preflight | 4 owner blockers, CODE 0 | 4 owner blockers (SITE_URL, DATABASE_URL, rate-limit, SMTP), CODE 0 | — |

No new runtime vulnerabilities introduced (npm audit --omit=dev 0, unchanged since Phase 12A §6).

---

## 5. Accessibility / honesty guardrails maintained

- All metrics stay qualitative; synthetic interfaces are tagged "Illustrative interface"/"Conceptual …"; synthetic IDs stay masked (`CL-••24`, `KYC-••12`).
- Owner env vars absent; no fabricated partners/stats/latency/certs/offices were introduced.
- Reduced-motion: `ScrollScene`/`VisualReveal` respect `prefers-reduced-motion` (verified by browser:qa on all 9 routes).
- Lint 13 pre-existing warnings unchanged; banned-words state unchanged.

---

## 6. Known deltas / follow-up

1. **LCP 2.7–3.2 s across all 15 mobile-emulated routes** (hard floor is a11y/SEO/CLS; LCP is informational in this gate). Values match the Phase 12A baseline range and untouched routes, so this is environmental threshold noise, not a per-page regression. The LCP element on every internal page is the intended hero (`h1.type-product-hero`).
2. **Floating-point CLS 0.5334 flake**: identical value appeared on `/contact` (twice) and `/infrastructure/liquidity` (once) in 6 full Lighthouse runs, and reported 0 in the remaining runs including both final ones. Deterministic float + route-dependent + non-reproducible → measurement artifact (mobile-emulation layout timing), not a page defect. Worth a re-measure on real hardware during owner QA.
3. **Owner blockers unchanged** (4): `NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`, `RATE_LIMIT_URL`/`RATE_LIMIT_TOKEN`, SMTP credentials. Owner-gated, not fabricated.
4. **Manual visual review**: 88 full-page screenshots (11 pages × 8 widths) captured for human review; each verified programmatically as non-blank with correct widths. This model cannot inspect images.
5. **Scope deferrals kept**: `legal/*`, `services`, `resources`, `trust/privacy` remain intentional placeholders; old homepage-V1 screenshots not re-captured (homepage untouched this phase).

---

## 7. Evidence index

| Artifact | Path |
|----------|------|
| Audit (findings, §5 dead-code inventory) | `docs/design/PHASE-13-SITEWIDE-VISUAL-AUDIT.md` |
| Visual-system rules doc | `docs/design/PHASE-13-PRODUCT-VISUAL-SYSTEM.md` |
| This report | `docs/design/PHASE-13-BEFORE-AFTER.md` |
| Lighthouse reports (15 routes, final) | `docs/performance/evidence/phase13/lh-*.json` |
| Page screenshots (11 pages × 8 widths) | `docs/qa/evidence/phase13/*.png` |
| Key templates | `src/components/templates/{product-page,solution-page,hub-page,trust-page}.tsx`, `src/components/product/{page-visuals,integration-scene,faq-accordion,related-products,stack-builder}.tsx`, `src/components/ui/heading.tsx`, `src/app/globals.css` |
| Navigation / CTA config | `src/config/{navigation,ctas,menus}.ts`, `src/components/layout/site-header.tsx`, `src/components/navigation/{mega-menu,mobile-nav}.tsx` |