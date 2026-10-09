# PRODUCT UI

Phase 3 product visual language. Built on the Aurora Terminal design system
(docs/design/DESIGN-SYSTEM.md) — obsidian base, electric cyan, ultraviolet,
aurora mint, ice white, thin borders, glass surfaces, precise grids, minimal
glow.

## Principles (Rule 9/52/53)

- **Original visuals only.** No competitor screenshots, no invented
  interfaces presented as the real product.
- **Three visual states** (Rule 8): verified screenshot (none yet),
  synthetic UI labeled "Illustrative interface", or abstract/conceptual
  diagram labeled "Conceptual".
- **Vary the layout.** CRM is dashboard-led, liquidity is architecture-led,
  white label is workflow-led, platforms are comparison-led. Not every page
  is hero + 8 cards + CTA.
- **Subtle motion.** Scroll/tab/chart/card motion only; GPU-friendly
  (transform/opacity); reduced-motion respected; no layout shift; no
  constant parallax (Rule 54).
- **Mobile-first product UI** (Rule 55): stacked cards, simplified charts,
  sensible information priority — not a shrunken desktop dashboard.

## Component library (`src/components/product/`)

| Component | Use |
| --- | --- |
| `ProductWindow` | Interface chrome (title bar + dots + illustrative tag) |
| `MetricTile` | Synthetic KPI tile |
| `ChartPanel` | Static SVG sparkline/line |
| `DataTable` | Factual comparison table (no scoring) |
| `StatusBadge` | Connected / In review / etc. |
| `NavigationRail` | Left nav in dashboard previews |
| `ActivityFeed` | Synthetic activity list |
| `ArchitectureDiagram` | Layered architecture (static HTML) |
| `WorkflowDiagram` | Step flow (CRM lifecycle, IB tree) |
| `IntegrationNode` | Node in architecture/integration diagrams |
| `IllustrativeTag` | The "illustrative / conceptual" marker |

All are server-rendered primitives (no JS) except where a page explicitly
needs interaction. The only client components on product pages are the
contact form and the header menus.

## Client component budget (Rule 57)

- Product pages: **zero** client components (all static SSR).
- Contact page: one (the form).
- Header: mega menu + mobile drawer.
- Home: two tabbed showcases (from Phase 2).

## Image strategy (Rule 58/59)

- No downloaded competitor screenshots.
- Synthetic UI components + original SVGs + approved brand imagery.
- Every illustration gets a meaningful filename, descriptive alt, explicit
  dimensions, and lazy/priority strategy when it becomes a real image.

## Accessibility

- All visuals are HTML/SVG (no canvas-only content).
- Decorative nodes/lines are `aria-hidden`.
- Diagrams have text equivalents (the same information is in the copy).
- Focus states, keyboard nav, and reduced-motion are handled by the design
  system.
