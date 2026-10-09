# Phase 13 — Site-Wide Visual Audit

**Status:** complete (audit phase)
**Date:** 2026-10-07
**Scope:** every public route except the homepage (`/`), which reached Homepage V2 standard in Phase 12A.
**Method:** static audit of `src/app/**/page.tsx`, `src/components/templates/*`, `src/content/products/*`, `src/components/product/*`, `src/components/story/*`, `src/config/*`; import-graph analysis for legacy components; tone scan across `src/`. Screenshot verification follows in the implementation phase (`docs/qa/evidence/phase13/`).

---

## 1. Visual-language baseline (what internal pages must inherit)

The Homepage V2 (`home-v2/*`) defines the target standard:

| Dimension | Homepage V2 standard |
|---|---|
| Hero headline | `type-hero` (64–88px clamp), server-rendered h1, gradient accent line, dominant typographic moment |
| Section headings | `type-h2` with eyebrow labels; 38–54px product-hero band for internal heroes (52–76px per system spec) |
| Body copy | `type-lead` / `type-body-lg`, max-w constraints, muted tone |
| Product visuals | Large, layered, multi-region product-UI compositions (nav rail + metrics + panels + feeds), each region meaningful |
| Motion | `ScrollScene` fade/slide rhythm, `VisualReveal` for visuals, client islands via `useReducedMotionSafe()`; reduced-motion preserves content |
| CTA hierarchy | Primary **"Build Your Brokerage"** → `/contact?intent=…`; contextual **"Explore the Platform"** → `/platforms`; conversion **"Talk to FOREXAA"** → `/contact` |
| Tone | Concrete operational language; banned: world-class / seamless / best-in-class / cutting-edge / revolutionary / game-changer / effortless (scan: **0 violations site-wide** ✓) |
| Data honesty | Synthetic UI labeled "Illustrative"; no fabricated numbers (values are qualitative or "—") |

---

## 2. Route inventory and tier classification

**33 routes** (32 audited here + homepage reference). Templates: `ProductPage` (10), `SolutionPage` (4), `HubPage` (7), `TrustPage` (5), `LegalPlaceholder` (3), custom (3).

| # | Route | Template | Visual maturity | Tier |
|---|---|---|---|---|
| 1 | `/` | custom (home-v2) | **A** — reference standard | A (done) |
| 2 | `/broker-technology/crm` | ProductPage | B — real CRM mock, hero tiles all "—" | **A target (reference page)** |
| 3 | `/broker-technology/traders-room` | ProductPage | B — compact portal mock | B |
| 4 | `/broker-technology/back-office` | ProductPage | B — hero tiles all "—" | B |
| 5 | `/broker-technology/ib-affiliate` | ProductPage | B — conceptual partner tree | B |
| 6 | `/platforms/mt4-mt5` | ProductPage | B — deployment status mock | B |
| 7 | `/platforms/mt7` | ProductPage | B — chart + tiles | B |
| 8 | `/platforms/ctrader` | ProductPage | B — depth chart + tiles | B |
| 9 | `/infrastructure/liquidity` | ProductPage | B — 5-layer architecture diagram | B |
| 10 | `/services/white-label` | ProductPage | **C** — hero is a 4-tile strip only | C |
| 11 | `/solutions/social-copy` | ProductPage | **C** — hero visual is 4 prose panels | C |
| 12 | `/solutions/new-brokerage` | SolutionPage | B+ — interactive stack builder (best non-home visual) | B |
| 13 | `/solutions/existing-broker` | SolutionPage | B — BEFORE/CONNECT/IMPROVE panels | B |
| 14 | `/solutions/prop-firm` | SolutionPage | B — 5-node vertical flow | B |
| 15 | `/solutions/multi-asset` | SolutionPage | B — market chips → 3 panels; near-duplicate steps | B |
| 16 | `/platforms` (hub) | HubPage | B — comparison table + architecture diagram | B |
| 17 | `/broker-technology` (hub) | HubPage | B — architecture diagram + workflow | B |
| 18 | `/infrastructure` (hub) | HubPage | B — infrastructure map | B |
| 19 | `/solutions` (hub) | HubPage | **C** — cards only, wrong "Planned" badges | C |
| 20 | `/pricing` | HubPage | **C** — cards only, CTAs → wrong destination | C |
| 21 | `/services` (hub) | HubPage | **C** — explicit NOINDEX scaffold | C |
| 22 | `/resources` | HubPage | **C** — explicit NOINDEX scaffold | C |
| 23 | `/contact` | custom | B — intent-aware form, conversion layout | B |
| 24 | `/company` | custom | **C** — generic cards, no visual | C |
| 25 | `/company/partners` | custom | **C** — empty state (0 partners) | C |
| 26 | `/trust` | TrustPage | **C** — non-link tiles, 2 tiles have no route | C |
| 27 | `/trust/security` | TrustPage | **C** — 24 text cards, zero visuals | C |
| 28 | `/trust/compliance` | TrustPage | **C** — text cards | C |
| 29 | `/trust/risk-disclosure` | TrustPage | **C** — text cards | C |
| 30 | `/trust/privacy` | TrustPage | **C** — placeholder (NOINDEX) | C |
| 31 | `/legal/privacy` | LegalPlaceholder | **C** — "In final review" placeholder | C |
| 32 | `/legal/terms` | LegalPlaceholder | **C** — one-paragraph placeholder | C |
| 33 | `/legal/risk-disclosure` | LegalPlaceholder | **C** — placeholder | C |

**Tier definitions**

- **TIER A** — Homepage-V2-quality product storytelling: dominant hero (52–76px scale), large layered product interface, distinct narrative sections, correct CTA hierarchy, motion rhythm. *Target state for every product/solution/hub family; currently only `/`.*
- **TIER B** — Substantial content and/or a real visual, but template-bound: small h1, generic card sections, thin or dash-filled visuals, CTA violations. *Upgrade by rebuilding the shared templates + strengthening per-page visuals.*
- **TIER C** — Thin, placeholder, or visual-free: needs rebuild (solutions hub, pricing, company, white-label, social-copy), restraint + navigation (trust), or explicit left-as-is (legal/services/resources NOINDEX scaffolds).

---

## 3. Per-route detail

### 3.1 Product family — `ProductPage` template (routes 2–11)

Shared structure today (9 sections): hero (badge + `type-h1` + lead + 2 buttons + `VisualReveal` visual) → overview (3 text cards) → capabilities (grouped bullet cards) → workflow (`ArchitectureFlow` in glass card) → integrations (`HorizontalStory`, hard-coded heading "The Brokerage Stack", cards that only say "Connects to X") → audience (plain boxes) → related → FAQ → final CTA box.

- **Hero:** present on all 10; h1 is `type-h1` (44px) — far below the 52–76px internal-hero standard.
- **Product visuals:** each page has one (`CrmVisual`, `TradersRoomVisual`, `BackOfficeVisual`, `IbAffiliateVisual`, `Mt4Mt5Visual`, `Mt7Visual`, `CtraderVisual`, `LiquidityVisual`, `WhiteLabelVisual`, `SocialCopyVisual` in `page-visuals.tsx`). Quality range: CRM (nav rail + metrics + feed) is strongest; white-label (tile strip) and social-copy (prose panels) are weakest. **9 metric values are walls of "—"** (Crm ×4, BackOffice ×4, TradersRoom ×1); a further 18 "—" sit in `visualStates` content blocks that are **rendered nowhere** (dead data).
- **Motion:** `ScrollScene` ×6, `VisualReveal`, `ArchitectureFlow`, `HorizontalStory` — all client, all reduced-motion safe. `HorizontalStory` forces a 300vh sticky section with the wrong hard-coded heading.
- **Copy hierarchy:** eyebrow badge → h1 → lead → overview cards → capability bullets; consistent but monotonous — every product page is visually the same shape regardless of product.
- **CTA:** primary "Book a Demo" → bare `/contact` on 8 of 10 (no `?intent=`); liquidity uses "Discuss your liquidity architecture"; white-label uses "Plan your brokerage launch". Final CTA repeats primary + ghost "See how pricing works". **All violate the CTA hierarchy.**
- **Client components:** only story primitives; visuals are server-rendered. ✓
- **Mobile:** responsive grids (single column ≤768px), overflow-checked at 8 widths by `browser:qa` for `/broker-technology/crm` ✓ (screenshot QA pending for the rest).
- **Issues per route:**
  - `/broker-technology/crm` — 4 "—" tiles; dead `visualStates`; no `?intent=crm`; integration cards are text boxes. *(This is the Phase 13 reference rebuild, §4.)*
  - `/broker-technology/traders-room` — 1 "—" tile; same integration dead-end.
  - `/broker-technology/back-office` — hero tile wall (all "—").
  - `/broker-technology/ib-affiliate` — visual is conceptual, not product UI; audience section disabled (inconsistent with siblings).
  - `/platforms/mt4-mt5` — visual is deployment status, not a terminal depiction.
  - `/platforms/mt7` — single 8-point sparkline.
  - `/platforms/ctrader` — 6 static bars for depth.
  - `/infrastructure/liquidity` — good architecture diagram; integrations section disabled → shorter than siblings; no `?intent=liquidity`.
  - `/services/white-label` — hero visual is 4 tiles; indexable child under NOINDEX hub.
  - `/solutions/social-copy` — hero visual is 4 prose cards; uses ProductPage while its 4 siblings use SolutionPage (IA inconsistency).

### 3.2 Solution family — `SolutionPage` template (routes 12–15)

Shared structure (11 sections): hero (**no visual**) → business situation → visual story (mid-page visual) → recommended stack → how-it-works (`ArchitectureFlow`) → components → implementation journey → add-ons → who-it-fits → FAQ → final CTA.

- **Hero:** `type-h1`, badge, lead, 2 buttons — but no visual, so solution pages open weaker than product pages.
- **Visuals:** `BrokerageStackBuilder` (interactive, `AnimatePresence`, best non-home asset), `ExistingBrokerVisual`, `PropFirmVisual`, `MultiAssetVisual` — all client, all conceptual-panel style.
- **Motion:** `ScrollScene` ×8, `VisualReveal`, `ArchitectureFlow` + the page visual.
- **CTA:** primaries are intent-qualified (`?intent=white-label|existing-broker|prop|general` ✓) but labels are bespoke ("Plan Your Brokerage Launch", "Discuss Your Stack"…). **Final CTA block renders `<h2>{cta.primary}</h2>` but overrides the button label to `CTAS["book-demo"].label` ("Book a Demo") while keeping the page's own href** — label/href mismatch on all 4 pages.
- **Issues:** `/solutions/new-brokerage` secondary CTA `#stack-builder` targets **no element** (broken anchor); `/solutions/multi-asset` `howItWorks.steps` (9) and `journey` (9) are near-identical lists (duplicate content on one page); add-ons lists overlap heavily across the 4 pages.

### 3.3 Hub family — `HubPage` template (routes 16–22)

- **Hero:** breadcrumbs + `Heading level=1` (`type-h1`) + description. **No visual, no buttons** on any hub.
- **Motion: zero** — hubs render no `ScrollScene` at all, so scroll rhythm abruptly stops when entering a hub from any other page.
- **Visuals:** `/platforms` (DataTable + ArchitectureDiagram), `/broker-technology` (ArchitectureDiagram + WorkflowDiagram), `/infrastructure` (ArchitectureDiagram) have real diagrams; `/solutions`, `/pricing`, `/services`, `/resources` have none.
- **CTA:** hub-level single button. Violations:
  - `/solutions` — label "Talk to the team about your model" → `/pricing` (label implies contact).
  - `/platforms`, `/broker-technology` — "Book a demo" → `/contact`.
  - `/infrastructure` — "Discuss your liquidity architecture" → `/contact` **without** the available `?intent=liquidity`.
  - `/pricing` — "Request pricing" and all 3 tier buttons → **`/company`** (a NOINDEX about page) instead of `/contact?intent=pricing`.
  - `/services` — "Talk to the team" → `/company`.
  - `/resources` — "Explore the technology" → `/platforms`.
- **Other issues:** `/solutions` cards carry an unconditional `Badge "Planned"` although 4 of 5 targets are `status: "live"` (only `/solutions/investment-platform` is planned and has **no page** — badge logic must follow `status`); FAQ `<details>` block copy-pasted **identically** across `/platforms`, `/broker-technology`, `/infrastructure`; `/services` and `/resources` are explicit NOINDEX scaffolds with placeholder copy.

### 3.4 Trust family — `TrustPage` template (routes 26–30)

- **Hero:** badge + `type-h1` + lead. No visual.
- **Sections:** hero + 1–4 `TrustSection`s (ScrollScene + 3–8 cards each). `/trust/security` is the densest text page on the site: **24 cards, zero visuals**.
- **CTA: none anywhere in the family.** No conversion path from any trust page.
- **Navigation:** `/trust` heading says "Explore trust topics" but the 6 tiles are **not links**; 2 tiles ("Data Protection", "Operational Practices") have **no corresponding route**.
- **Motion:** `ScrollScene` per section (except `/trust/privacy`, raw divs).
- **Duplicates:** `/trust/privacy` ↔ `/legal/privacy`; `/trust/risk-disclosure` ↔ `/legal/risk-disclosure` (same topics, different text).

### 3.5 Legal family (routes 31–33)

`LegalPlaceholder`: h1 + "In final review" warning badge + 1–2 paragraphs + "Contact the team" link. NOINDEX. **Intentionally left as-is** (Phase 13 restraint — these await counsel text; no visual work appropriate).

### 3.6 Company / partners / contact (routes 23–25)

- **`/contact`** — custom async server component; 2-column hero (copy + context-aware `INTENT_VISUALS` card | form); "What happens next" 3-step cards. 9 intent values exist, but most internal links point to bare `/contact`, so the intent visual defaults to "General Question". Motion: none. Form (Zod + honeypot + rate limit + persistence + email safe-failure) untouched by this phase.
- **`/company`** — hero + 3 card grids ("What we build", "Technology philosophy", "Product ecosystem") + final CTA ("Book a Demo"). No visual. Card copy duplicated verbatim with `/company/partners`.
- **`/company/partners`** — hero + **empty state** (`PARTNERS = []` renders "Partner network in development") + 5 category cards duplicating `/company` copy. No final CTA block.

---

## 4. Cross-cutting findings

1. **No internal route reaches Tier A.** Only the homepage has layered product-UI storytelling.
2. **CTA system violations are systemic.** "Book a Demo" is the primary on 8/10 product pages, both hub CTAs for `/platforms` + `/broker-technology`, `/company`, the forced final CTA on all 4 solution pages, and the **global nav** (`navigation.ts:71`, `menus.ts:137`). The labels "Build Your Brokerage" and "Talk to FOREXAA" appear nowhere outside the homepage hero.
3. **Solution final CTA label/href mismatch** on all 4 solution routes (`solution-page.tsx:54,234-237`).
4. **Broken anchor:** `/solutions/new-brokerage` → `#stack-builder` exists nowhere.
5. **Wrong CTA destinations:** `/pricing` ×4 buttons → `/company`; `/services` → `/company`; `/solutions` label/href mismatch; `/infrastructure` drops `?intent=liquidity`.
6. **"—" walls:** 9 em-dash metric values in `page-visuals.tsx` (must become qualitative values — **no fabricated numbers are permitted**); 18 more in never-rendered `visualStates`.
7. **Trust center has no navigation and no conversion path** (non-link tiles, 2 orphan tiles, zero CTAs).
8. **Motion inconsistency:** hubs render zero scroll motion while product/solution/trust pages animate every section.
9. **Duplicated copy:** FAQ block ×3 (platforms/broker-technology/infrastructure); `/company` ↔ `/company/partners` card descriptions; solution add-ons overlap; multi-asset self-duplication (steps vs journey).
10. **Integrations section** is a dead-end pattern: `HorizontalStory` with hard-coded "The Brokerage Stack" heading and cards whose only content is "Connects to X".
11. **Global heading scale gap:** internal h1 = `type-h1` 44px fixed vs homepage `type-hero` 64–88px; internal product heroes need the 52–76px band.
12. **Tone:** site-wide banned-word scan = **0 violations** ✓ (preserve during rewrite).

---

## 5. Legacy component audit (imports/references/tests/docs checked)

| Asset | Files | Import status | Decision |
|---|---|---|---|
| `src/components/marketing/home/*` | 11 | **0 external imports** (self-contained dead cluster) | **Remove** (Phase 13 cleanup; verified via import graph) |
| `src/components/marketing/home-scenes/*` | 10 | **0 external imports** | **Remove** |
| `src/components/product/interactive/screens.tsx` | 1 | imported only by dead `scene07-risk.tsx` | **Remove** (cascades with home-scenes) |
| `src/components/product/lightbox.tsx` | 1 | 0 imports anywhere | **Remove** |
| Story exports: `TimelineScene`, `PinnedPanel`, `ProductZoom` (scenes); `ImageReveal`, `TextReveal`, `LayeredParallax` (reveals); `StorySection`, `StoryScene`, `StickyScene`, `SceneProgress` (primitives) | — | 0 live imports (`StorySection` only by dead home-scenes) | **Remove** with the dead cluster; keep `ScrollScene`, `VisualReveal`, `ArchitectureFlow`, `HorizontalStory` (to be reworked, not removed) |
| `visualStates` (`types/content.ts` + 10 content files) | — | rendered nowhere | **Remove** from content + type (kills the remaining 18 "—" values) |
| `src/components/marketing/home-v2/*` | 5 | all live (homepage) | **Retain untouched** |
| `src/components/marketing/market-grid.tsx` | 1 | live (background, home-v2, product visuals) | **Retain** |
| `GlassPanel`, `DataNode` (market-grid) | — | used by product visuals | **Retain** |
| Legal/NOINDEX scaffolds (`legal/*`, `services`, `resources`, `trust/privacy`) | — | intentional placeholders | **Retain as-is** (documented deferral) |

No test file imports any removed asset (only `home.test.tsx` asserts homepage V2 links — unaffected). Docs references to be checked before removal in the implementation pass.

---

## 6. Mobile / responsive status

- `browser:qa` verifies horizontal-overflow at 375/390/430/768/1024/1280/1440/1920 for `/`, `/solutions/new-brokerage`, `/broker-technology/crm`, `/contact` (64 checks ✓) — all audited layouts use responsive grids that collapse to one column ≤768px.
- Screenshot evidence at all 8 widths for representative internal pages: **pending** → `docs/qa/evidence/phase13/`.
- Known responsive risks to verify visually: `HorizontalStory` (300vh sticky, fixed `w-80` cards), `ArchitectureDiagram` node widths, DataTable horizontal scroll, trust card density at 375px.

---

## 7. Work-plan mapping (audit → implementation)

| Finding | Implementation step |
|---|---|
| Tier A target for product family (§3.1) | Rebuild `ProductPage` template + per-page visuals; CRM first as reference (brief §8), then traders-room → back-office → ib-affiliate (§9) |
| Platform pages (§3.1) | mt4-mt5 → mt7 → ctrader (§10); strengthen terminal-style visuals |
| Liquidity + risk (§3.1/§3.4) | liquidity architecture-led rebuild (§11); risk visuals only where a risk surface exists (trust pages stay restrained) |
| White-label + social-copy Tier C (§3.1) | white-label stack-led rebuild (§12); social-copy product-UI rebuild |
| Solution family (§3.2) | SolutionPage hero+visual upgrade, CTA fix, anchor fix, steps/journey dedupe (§13) |
| Hubs Tier B/C (§3.3) | HubPage motion + hero upgrade; solutions badge fix; pricing/services CTAs → `/contact?intent=` (§14–15) |
| Company/partners/contact (§3.6) | restrained upgrade, dedupe copy, preserve form + safety architecture (§16–17) |
| Trust (§3.4) | link tiles, resolve 2 orphan tiles, add restrained CTA, keep density (§18) |
| CTA violations (§4.2–4.5) | CTAS registry realignment + nav + all page CTAs; add `?intent=` params (§20) |
| "—" walls (§4.6) | qualitative values in visuals; delete `visualStates` (§5) |
| Integrations dead-end (§4.10) | replace `HorizontalStory` pattern with product-specific integration scene |
| Dead code (§5) | remove verified-dead clusters after tests pass |
| Duplicate FAQs/copy (§4.9) | shared FAQ data module; distinct copy per route |
| Verification | full suite + 8-width screenshots + before/after doc (§50–54) |
