# Phase 13 — Product Visual System

**Status:** approved for implementation
**Date:** 2026-10-07
**Purpose:** the single shared visual language every internal page rebuild in Phase 13 follows. Source of truth is the Homepage V2 (`src/components/marketing/home-v2/*`); this document generalizes it into rules for products, solutions, hubs, trust and contact pages.

---

## 1. Typography

| Role | Class | Size | Usage |
|---|---|---|---|
| Homepage hero h1 | `type-hero` | clamp 64–88px | **Homepage only** (unchanged) |
| Internal hero h1 | `type-product-hero` *(new, `globals.css`)* | clamp **52–76px** (`3.25rem → 4.75rem`) | h1 on product, solution, hub, company, contact heroes |
| Section heading | `type-section` | clamp 42–56px | Every major section h2 (the V2 standard, already exists) |
| Sub-heading | `type-h2` / `type-h3` | 32px / 22px | Card groups, small h2/h3 inside sections |
| Lead | `type-lead` | clamp 17–19px | Hero leads and section leads (`text-text-muted`) |
| Body | `type-body` / `type-body-lg` | 16 / 20px | Paragraphs |
| UI / small / caption | `type-small`, `type-caption` | 14 / 12–13px | Inside product visuals, lists |
| Eyebrow | `type-label text-primary` | 12px uppercase, ls .08em | **Every section and hero gets one** — this is the V2 signature |

Rules:
- Every h1 uses `type-product-hero` (except homepage `type-hero`, legal placeholders keep `type-h1` — restraint).
- Every h2 of a major section uses `type-section`; card titles use `type-h3`/`type-body font-semibold`.
- Never stack two headings without an eyebrow label above the first one.
- Gradient accent text (`bg-gradient-to-r from-primary to-secondary-soft bg-clip-text`) reserved for hero h1 second line and final-CTA h2 — not for section headings.

## 2. Color & tone semantics

Tokens (from `globals.css`): obsidian `#07111f` page bg, deep-navy `#0d1b2e` panels, ice-white text, muted `#7c8da3`, electric-cyan primary, violet secondary, mint success.

| Tone | Meaning inside visuals |
|---|---|
| **cyan** (`border-border-accent`, `text-primary`) | platform / execution / active nav / this product |
| **violet** (`border-secondary/40`, `text-secondary-soft`) | control plane: risk, compliance, finance, review states |
| **mint** (`border-success/30`, `text-success`) | connected / verified / completed / client-facing |
| **warning** | pending / awaiting input (rare) |

Surfaces: panels inside visuals use `bg-obsidian/40–60` on `border-border`; elevated rows/chips `bg-surface-elevated`; window chrome `bg-surface-elevated/60`. Never introduce new colors.

## 3. Section rhythm & layout patterns

- Section shell: `<section className="py-24 md:py-32">` + inner `mx-auto flex max-w-[var(--container-width)] flex-col gap-10 px-5 sm:px-6 lg:px-8`.
- **Composition varies — no two consecutive sections share a layout** (Phase 12A §29). Available patterns:
  1. **Split** — `grid gap-10 lg:grid-cols-2 lg:items-center`, text/visual; alternate sides (`order-1/order-2`) between consecutive splits.
  2. **Full-width visual** — header block (`max-w-2xl`) + one large interface/diagram below.
  3. **Centered statement** — centered heading + lead (+ diagram), used for summaries/final CTA.
  4. **Card grid** — `grid gap-3 md:grid-cols-2 lg:grid-cols-3` for capabilities/audiences/FAQ topics.
- Motion wraps the **visual** (`<ScrollScene>`), not necessarily the text; text can be static.
- Templates keep `Section`/`ScrollScene` where they already exist; new sections follow this shell directly.

## 4. Hero compositions per family

| Family | Composition |
|---|---|
| **Product** (`ProductPage`) | breadcrumbs → `type-label` eyebrow → `type-product-hero` h1 → `type-lead` → CTA row → **hero visual** (right column, `VisualReveal type="scale"`); below: full-width **interface scene** (the deep multi-region product UI) |
| **Solution** (`SolutionPage`) | breadcrumbs → eyebrow → h1 + lead + CTAs (left), **solution visual right in hero** (moved up from mid-page) → situation → stack → how-it-works → components → journey → add-ons → fit → FAQ → final CTA |
| **Hub** (`HubPage`) | breadcrumbs → eyebrow + `type-product-hero` h1 + lead → page-specific opening visual/diagram → children → related → final CTA block (gains one) |
| **Trust** | breadcrumbs → eyebrow + h1 + lead (restrained, `type-h1` stays allowed here) → linked topic tiles → sections → **one** low-key conversion CTA at the end |
| **Contact** | unchanged 2-column conversion layout (form architecture untouched) |
| **Legal / NOINDEX scaffolds** | untouched |

## 5. Product visual language

Primitives (`src/components/product/visuals.tsx`) — reuse, don't fork: `ProductWindow`, `NavigationRail`, `MetricTile`, `ChartPanel`, `DataTable`, `StatusBadge`, `ActivityFeed`, `IntegrationNode`, `ArchitectureDiagram`, `WorkflowDiagram`, `IllustrativeTag`, plus `GlassPanel`/`DataNode` from `market-grid`.

**Composition standard (Tier A bar):** a hero visual has **≥3 meaningful regions** (e.g. nav rail + metric strip + pipeline/detail panel + activity feed). A tile strip alone is Tier C. Realistic labels ("Client pipeline", "KYC queue", "Watchlist"), plausible structure, no lorem.

**Honest-data rules (hard constraints):**
- Synthetic visuals are tagged `Illustrative interface` / `Conceptual structure` / `Conceptual architecture`.
- **Metric values are qualitative**: `"Connected"`, `"Live"`, `"Yours"`, `"3"`, `"Demo + Live"`, `"In review"` — never fabricated numbers, **never "—" walls** (a tile with no meaningful value gets a different component or a qualitative state).
- Symbol columns in tables use `—` per-row only where the symbol genuinely means "not applicable" (legitimate per Phase 12A note).
- Charts are explicitly captioned synthetic/conceptual.

**Two-visual system for product pages:**
1. **Hero visual** — compact entry view (window + key regions), right column of hero.
2. **Interface scene** — full-width deep view (multi-panel: nav/rail + pipeline or table + detail + feed). One per product page, purpose-built.

## 6. Diagram & architecture language

- Vertical stack diagrams: `ArchitectureDiagram` (top→bottom layers, tone borders, chips for endpoints).
- Horizontal lifecycles/workflows: `WorkflowDiagram` (numbered `01…` chips + `→`), for CRM lifecycle etc.
- Node/connector trees: `IntegrationNode` + `bg-border-strong` connectors (partner trees, integration maps).
- Animated connectors (SVG `pathLength`) only inside client islands (`HeroArchitecture` pattern) — server diagrams stay static HTML.
- Every conceptual diagram carries a caption stating it is conceptual and deployment-specific.

## 7. CTA system

Three levels, exactly as homepage V2:

| Level | Label | Destination | Where |
|---|---|---|---|
| **Primary** | **Build Your Brokerage** | `/contact?intent=<page-relevant>` | hero + final CTA of product/solution/hub pages |
| **Contextual** | per page: "Explore the Platform", "Explore the CRM", "Compare Platforms", "See the back office", "Request Pricing"… | internal routes | hero secondary, cross-links |
| **Conversion** | **Talk to FOREXAA** | `/contact` | global nav (replaces "Book a Demo"), footer, trust/low-key inline links |

Intent mapping (existing enum — no contact-page changes): crm→`crm`; mt4-mt5/mt7/ctrader→`platform`; liquidity→`liquidity`; white-label & new-brokerage→`white-label`; prop-firm→`prop`; existing-broker→`existing-broker`; pricing→`pricing`; everything else→`general` or bare `/contact`.

Registry (`src/config/ctas.ts`): add `build-brokerage` + `talk-to-forexaa`; keep contextual entries; **remove `book-demo`** (nav/menus/solution-template/content relabeled). Contact `?intent=demo` deep link remains valid (intent descriptor, not a CTA).

## 8. Motion rules

- Workhorse: `ScrollScene` (fade/slide-up) on section boundaries; `VisualReveal` for large visuals; `ArchitectureFlow` for animated flow diagrams.
- All motion through `useReducedMotionSafe()` / `DURATION` / `EASE`; reduced-motion keeps content visible (opacity 1, no transforms).
- **Sticky budget: ≤1 sticky/scroll-driven section per page.** `HorizontalStory` (300vh, hard-coded "The Brokerage Stack" heading) is **removed** from `ProductPage` and retired; no new sticky scenes.
- No new libraries (no GSAP/Three.js). Hubs gain `ScrollScene` rhythm so motion doesn't stop at hub boundaries.
- Client islands only where needed; h1 and hero copy always server-rendered (LCP/SEO lesson from Phase 12A).

## 9. Copy rules

- Banned words (verified 0 site-wide, keep it that way): world-class, seamless, best-in-class, cutting-edge, revolutionary, game-changer, state-of-the-art, unparalleled, effortless, "everything you need".
- Concrete operational nouns; capabilities state the job done, not adjectives.
- No fabricated metrics, partners, certifications, offices, latency figures (Rule 4/8/9/58).
- Solution add-ons, hub FAQs and company card copy must not duplicate across routes — shared data module where identical, distinct copy where not.

## 10. Component disposition

| Action | Components |
|---|---|
| **Reuse as-is** | `ProductWindow`, `NavigationRail`, `MetricTile`, `ChartPanel`, `DataTable`, `StatusBadge`, `ActivityFeed`, `IntegrationNode`, `ArchitectureDiagram`, `WorkflowDiagram`, `IllustrativeTag`, `GlassPanel`, `DataNode`, `Breadcrumbs`, `Badge`, `ButtonLink`, `Card`, `Section`, `Heading`, `FaqAccordion`, `RelatedProducts`, `ScrollScene`, `VisualReveal`, `ArchitectureFlow` |
| **Rework** | `ProductPage` (§4/§5 hero + interface + CTA structure), `SolutionPage` (hero visual, CTA fix, `#stack-builder` anchor), `HubPage` (motion + final CTA), `TrustPage`/`TrustSection` (linked tiles + CTA), `HorizontalStory` (removed/retired), `page-visuals.tsx` (qualitative values, deeper interfaces), `CTAS` registry, nav/menus labels |
| **New** | `.type-product-hero` (globals.css), `type-product-hero` usage; per-page interface scenes; hub opening visuals; trust topic links |
| **Remove (dead, verified)** | `marketing/home/*` (11), `marketing/home-scenes/*` (10), `product/interactive/screens.tsx`, `product/lightbox.tsx`, unused story exports (`TimelineScene`, `PinnedPanel`, `ProductZoom`, `ImageReveal`, `TextReveal`, `LayeredParallax`, `StorySection`, `StoryScene`, `StickyScene`, `SceneProgress`), `visualStates` type + content |
| **Never touch** | security headers/CSP/nonce, `force-dynamic` on contact, ContactForm validation/honeypot/ratelimit/persistence/email, owner activation architecture, homepage V2 components, route registry schema (labels/SEO descriptions may be edited, structure stays), OG image generation |

## 11. Per-family application map

| Family | Template work | Per-page work |
|---|---|---|
| CRM (reference) | ProductPage v2 | hero visual rebuild + full interface scene (nav → pipeline → detail) per brief §8 |
| traders-room, back-office, ib-affiliate | ProductPage v2 | qualitative hero metrics + new interface scenes |
| mt4-mt5, mt7, ctrader | ProductPage v2 | terminal-flavoured interface scenes (watchlist/depth/deployment) |
| liquidity | ProductPage v2 | architecture-led interface scene, intent-qualified CTA |
| white-label, social-copy | ProductPage v2 | rebuild Tier-C visuals into real interface scenes |
| solutions ×4 | SolutionPage v2 (hero visual + CTA + anchor) | keep existing signature visuals; dedupe steps/journey/add-ons |
| hubs ×7 | HubPage v2 (motion + final CTA) | opening diagram/visual where missing; badge + CTA fixes |
| company, partners, contact | local edits | restraint: card cleanup, dedupe, no new fake content |
| trust ×5 | TrustSection links + final CTA | no new visuals beyond restrained diagram where honest |
| legal ×3, services, resources | none | documented deferral (NOINDEX placeholders) |
