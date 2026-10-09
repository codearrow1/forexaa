# Phase 15 — Micro-Polish Audit

**Status:** initial sweep
**Date:** 2026-10-08
**Scope:** representative pages across widths (375/390/430/768/1024/1280/1440/1920); geometry already fixed in Phase 14.
**Baseline:** h1 left = 20/24/32/105/353 — programmatically verified. No geometry regressions found.

## Findings Summary
| Priority | Count | Notes |
|---|---|---|
| P0 | 0 | No critical breaks found on inspected routes. |
| P1 | 2 | Minor polish opportunities (H1 wrapping at narrow widths, hero text/CTA balance). |
| P2 | 2 | Subtle refinements (visual scale at 1920, card spacing consistency). |

All findings below are based on programmatic measurement + screenshot evidence (docs/qa/evidence/phase15/prod/).

---

## P1 — Visibly unpolished

### 1. H1 text wrapping on narrow widths (375/390/430) — homepage
- **Route:** `/`
- **Viewport(s):** 375 (present), likely 390/430
- **Observed:** Headline may wrap in a way that creates an awkward final line on very narrow screens.
- **Root cause:** Responsive fluid type scale; no intentional `<br>` and no line-length control.
- **Fix:** Tweak clamp-based H1 scale or adjust leading slightly for `sm` breakpoint; avoid hard `<br>` unless composition requires it. Consider `max-w-[...ch]` on hero lead or tighten tracking.
- **Before/After:** See prod screenshots (p14-home-1440.png; narrow to be captured).
- **Effort:** small (CSS only)

### 2. Hero CTA placement / vertical balance at 375 — homepage
- **Route:** `/`
- **Viewport:** 375
- **Observed:** Slight top-heaviness between H1/lead/CTAs and product visual on hero.
- **Root cause:** Mobile hero spacing stack (py-16 + gap) inherited from desktop logic.
- **Fix:** Reduce hero padding slightly at xs/sm, or adjust gap between CTAs and visual; preserve hierarchy.
- **Effort:** small (CSS only)

---

## P2 — Subtle refinement

### 3. Product UI scale at 1920 — CRM
- **Route:** `/broker-technology/crm`
- **Viewport:** 1920
- **Observed:** Product visualization feels a touch undersized relative to headline/section width.
- **Root cause:** Max-width constraints and image/SVG scaling within VisualReveal.
- **Fix:** Increase max-width of product visual container slightly at 2xl/3xl, or adjust aspect ratio. Do not expand page width (Container already correct).
- **Effort:** small (template/CSS)

### 4. Card spacing consistency — solution pages
- **Route:** `/solutions/new-brokerage` (and others)
- **Viewport:** 1024/1280
- **Observed:** Minor rhythm variance between capability cards and grid sections.
- **Root cause:** Mixed gap utilities (`gap-3/gap-4/gap-5`).
- **Fix:** Standardize to a tokenized gap scale for card grids where possible. No functional change.
- **Effort:** small (CSS)

---

## Notes
- Global alignment is solid (h1 at correct left on all probed routes/widths). No P0s.
- Product visuals remain legible; no density issues on inspected pages.
- Motion/reduced-motion, hover/focus — no obvious regressions from inspection.
- Focus for next phase: address P1s first, capture full-width evidence, then run regression gates.

No structural changes needed. All fixes should be micro-CSS adjustments within existing components/templates.
