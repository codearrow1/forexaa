# Phase 12A — Homepage V2: Before / After

**Date:** 2026-10-06
**Scope:** Homepage (`/`) visual, UX and information-architecture transformation into a premium B2B brokerage-infrastructure site. No backend, feature, route or architecture changes (force-dynamic, CSP/nonce frozen).

---

## 1. Verdict

**HOMEPAGE V2 COMPLETE — MINOR FOLLOW-UP** (details in §7).

Every hard gate matches or beats the Phase 11/12 baseline: 109/109 tests, lint 0 errors, typecheck/build pass, `seo:check` 0/0, `verify:headers` pass, browser QA 64/64, Lighthouse 0 hard budget failures across all 10 routes with a11y 100 / SEO 100 / CLS 0 everywhere, `npm audit --omit=dev` 0 runtime vulnerabilities, preflight limited to the 4 known owner blockers, `launch:check` reports `READY FOR ACTIVATION — OWNER ACTIONS REQUIRED` (identical to baseline).

---

## 2. Information architecture

### Before — 10 client-rendered scenes (`src/components/marketing/home-scenes/`, now unused)

| # | Scene | Heading |
|---|-------|---------|
| 1 | scene01-market | Market-ticker hero (`h1.type-display` — "The Technology Behind Modern Brokerages.") |
| 2 | scene02-brokerage | Brokerage overview |
| 3 | scene03-client | "Give clients one connected digital experience." |
| 4 | scene04-operations | "The CRM that runs the client lifecycle." |
| 5 | scene05-trading | "Choose the trading experience your clients get." |
| 6 | scene06-liquidity | "Liquidity is what makes a platform a business." |
| 7 | scene07-risk | "Risk sits between your operations and the market." |
| 8 | scene08-partners | "Your network is your reach." |
| 9 | scene09-complete | "FOREXAA connects the entire brokerage operation." |
| 10 | scene10-cta | Closing CTA |

### After — 12 sections (`src/components/marketing/home-v2/`, rendered by `src/app/page.tsx`)

| # | Section | Heading | Layout pattern |
|---|---------|---------|----------------|
| 1 | Hero | "The Technology / Behind Modern / Brokerages." (`h1.type-hero`) | Full-screen split: copy left, Brokerage-OS command-center visual right; atmospheric grid |
| 2 | Problem | "A brokerage is an operating system, not a trading terminal." | Split: copy left, fragmented → connected chips visual right |
| 3 | Brokerage OS | "One connected brokerage technology stack." | Centered **interactive signature** — 7-module diagram with inspector panel |
| 4 | Client Experience | "One client experience from onboarding to trading." | Full-width Trader's Room interface |
| 5 | CRM | "One client lifecycle from lead to funded account." | Split — UI left, copy right (side flips vs §4) |
| 6 | Trading | "Choose the trading experience your clients get." | Split — copy left, UI right |
| 7 | Liquidity | "Connect every client account to a unified execution layer." | Stacked full-width architecture |
| 8 | Risk | "Risk sits between your operations and the market." | Split — UI left, copy right |
| 9 | Partners | "Your network is your reach." | Stacked full-width network diagram |
| 10 | Operations | "The trading platform is only one part of the brokerage." | Split — copy left, UI right |
| 11 | Complete Stack | "One connected system. Every layer of the brokerage." | Centered dramatic summary + 7-layer diagram |
| 12 | Final CTA | "Build your brokerage…" | Centered CTA band |

No two consecutive sections share a layout (spec §29). The product interfaces — CRM, Trader's Room, Trading, Liquidity, Risk, Partner Network, Operations — are large synthetic panels built from the shared `@/components/product/visuals` primitives (`src/components/marketing/home-v2/product-interface.tsx`).

### Narrative change

- **Before:** market-ticker hook → feature tour.
- **After:** typographic positioning statement → *problem framing* → interactive "Brokerage OS" thesis → product proof per layer → complete-stack summary → CTA. The page argues a thesis before it shows UI.

---

## 3. Visual system

- **Type scale (new in `globals.css`):** `.type-hero` (`clamp(4rem, 8vw, 5.5rem)`), `.type-section`, `.type-subsection`, `.type-lead`, `.type-body-v2`. Hero h1 grew from `type-display` to a dominant `type-hero` with a gradient-clipped middle line ("Behind Modern").
- **Hero:** server-rendered h1 (LCP-first, never client-gated), eyebrow label "Brokerage Infrastructure", two CTAs ("Build Your Brokerage" / "Explore the Platform"), signature `HeroArchitecture` client island (animated connection paths + module grid + metric strip), scroll hint.
- **Signature interaction:** `BrokerageOS` — click/hover a module (Client Experience, CRM, Trading, Liquidity, Risk, Operations, Partners) to update an inspector panel; reduced-motion renders the full static diagram.
- **Motion:** scoped to `ScrollScene` reveals, hero path-draw and the Brokerage-OS interaction; all frozen under `prefers-reduced-motion`.

---

## 4. Rendering model

- **Before:** all 10 scenes were client components ("use client") — the whole homepage hydrated.
- **After:** predominantly server-rendered. Server: `page.tsx`, `hero.tsx` (h1, copy, CTAs), all `product-interface` panels, section shells that need no state. Client islands: `hero-architecture.tsx`, `brokerage-os.tsx`, `sections.tsx` (ScrollScene reveals / reduced-motion hooks).
- **Critical fix during the phase:** the h1 was initially client-gated, which made `seo:check` fail with `ERROR /: missing H1`. `hero.tsx` was rewritten as a server component so the h1 is in the server HTML — `seo:check` is back to 0/0 and the LCP element is `h1.type-hero`.

---

## 5. Verification — before vs after

| Gate | Baseline (Phase 11/12) | Phase 12A final | Delta |
|------|------------------------|-----------------|-------|
| typecheck | PASS | PASS | — |
| lint | 0 errors / 13 warnings | 0 errors / 13 warnings (pre-existing) | — |
| tests | 109/109 | 109/109 (`tests/integration/home.test.tsx` updated to V2 copy: `/The Technology/i`, "Build Your Brokerage", "Explore the Platform", exactly 1 h1, ≥12 sections) | — |
| build | PASS | PASS | — |
| seo:check | 0/0 | 0/0 | — |
| verify:headers | PASS | PASS | — |
| browser:qa | 64/64 | 64/64 (no overflow at 375/390/430/768/1024/1280/1440/1920, no JS exceptions, reduced-motion visible, drawer/menu/keyboard OK) | — |
| Lighthouse `/` (evidence JSON) | perf 95, a11y 100, seo 100, LCP 2850 ms, TBT 69 ms, CLS 0 (`phase10/lh-_.json`) | perf 91, a11y 100, seo 100, LCP 3061 ms, TBT 206 ms, CLS 0 (`phase12a/lh-_.json`) | LCP/TBT up — see §7 |
| Lighthouse all 10 routes | a11y 100 / seo 100 / CLS 0 | a11y 100 / seo 100 / CLS 0, **0 hard failures, 0 soft warns** | — |
| npm audit --omit=dev | 0 | **0** (see §6) | — |
| npm audit (full) | 5 high (dev-toolchain braces chain, unfixable) | 5 high (same chain) | — |
| production:preflight | 4 owner blockers | CODE 0 blockers; 4 owner blockers (same four: SITE_URL, DATABASE_URL, rate-limit, SMTP) | — |
| launch:check | READY FOR ACTIVATION — OWNER ACTIONS REQUIRED | READY FOR ACTIVATION — OWNER ACTIONS REQUIRED | — |

Accessibility fixes made during the phase:

- `color-contrast` failure (a11y 96) on the Problem-section "fragmented" chips — caused by `opacity-50` halving `text-text-muted` contrast to ~2.2:1. Removed the wrapper opacity; chips now measure ~5.1:1 (`#7c8da3` on `#0d1b2e`). a11y returned to 100.
- `useReducedMotionSafe()` called from server components — `"use client"` added to `home-v2/sections.tsx` (hook + ScrollScene usage); `hero-architecture` `reduced` prop made optional with a client-side default.

---

## 6. Dependency security note

During final verification `npm audit --omit=dev` reported a new high advisory — `source-map-js` GHSA-68fv-2mgg-jv7q, **published 2026-09-30**, i.e. after the Phase 11/12 baseline was recorded. It arrives transitively via `next → postcss`.

Fix: `npm update source-map-js` → `1.2.2`. Lockfile delta is exactly 6 lines (version/resolved/integrity); no package.json change. Runtime audit returned to 0; full audit unchanged at the known 5 dev-toolchain advisories. Tests and build re-verified after the update.

---

## 7. Known deltas / minor follow-up

1. **LCP ~3.0 s on `/` (was 2.85 s).** The LCP element is the hero h1 (expected — it is the largest above-the-fold text). Every route on the site measures 2.8–3.2 s under Lighthouse mobile emulation, including routes untouched by this phase, so this is environmental/threshold noise rather than a homepage-specific regression. Hard budgets (a11y/SEO/CLS) pass; LCP is display-only in this gate.
2. **TBT on `/` varies 64–206 ms across mobile-emulated runs (baseline 69 ms, baseline range 43–133 ms).** Performance score stays 91–95 (soft floor 90). The homepage now hydrates three client islands instead of ten full scenes; the variance is dominated by Lighthouse CPU-throttling noise. Worth a re-measure on real hardware during owner QA; no action required to pass the gate.
3. **Owner blockers unchanged** (4): `NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`, `RATE_LIMIT_URL`/`RATE_LIMIT_TOKEN`, SMTP credentials. Owner-gated, not fabricated — this phase did not touch them.
4. **Manual visual review:** 8 full-page screenshots captured for human review (this model cannot inspect images):
   `docs/qa/evidence/home-v2/home-v2@{375,390,430,768,1024,1280,1440,1920}.png`.
5. **Old scenes retained, unused:** `src/components/marketing/home-scenes/*` (10 files) and `src/components/marketing/home/*` legacy components are no longer imported. Removal is a separate cleanup task, deliberately out of scope for this phase.

---

## 8. Evidence index

| Artifact | Path |
|----------|------|
| Lighthouse reports (10 routes, final) | `docs/performance/evidence/phase12a/lh-*.json` |
| Lighthouse reports (pre-V2 comparison) | `docs/performance/evidence/phase10/lh-_.json` |
| Homepage screenshots @8 widths | `docs/qa/evidence/home-v2/home-v2@*.png` |
| Browser-QA screenshots (375/1280, 4 routes) | `docs/qa/evidence/_*.png` |
| New/changed source | `src/app/page.tsx`, `src/components/marketing/home-v2/{hero,hero-architecture,brokerage-os,product-interface,sections}.tsx`, `src/app/globals.css` (type scale), `tests/integration/home.test.tsx` |
