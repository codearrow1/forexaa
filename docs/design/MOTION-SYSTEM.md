# MOTION SYSTEM

Phase 4 introduces Motion for React (v13.4.6) as the primary animation
library. No GSAP, no Three.js, no smooth-scroll library.

## Architecture

```
src/lib/motion/
  transitions.ts      — Duration tokens + easing curves
  variants.ts         — Reusable animation variants
  useReducedMotionSafe.ts — useSyncExternalStore-based reduced-motion hook
  scroll.ts           — Scroll utilities (useScrollProgress, useInViewOnce, etc.)
```

## Duration tokens

| Token | Value | Use |
| --- | --- | --- |
| instant | 0.1s | Micro-feedback |
| fast | 0.2s | Hover, small transitions |
| standard | 0.35s | Default entrance |
| slow | 0.6s | Section reveals |
| cinematic | 1.2s | Hero, data flow |

## Easing

| Token | Value | Use |
| --- | --- | --- |
| out | cubic-bezier(0.22, 1, 0.36, 1) | Entrances (default) |
| inOut | cubic-bezier(0.65, 0, 0.35, 1) | State changes |
| sharp | cubic-bezier(0.4, 0, 0.2, 1) | Quick UI feedback |
| spring | cubic-bezier(0.34, 1.56, 0.64, 1) | Organic motion |

## Principles (Rule 9)

- Animations communicate hierarchy, depth, cause/effect, transition, product
  behavior, system connection — never mere decoration.
- Good: liquidity node connects to MT5 on scroll. CRM panels assemble into a
  dashboard. Platform interface expands from preview to full visual.
- Bad: everything fades up 30px. Every card rotates. Text floats continuously.

## Performance (Rule 10)

- Animate only transform, opacity, clip-path, scale (GPU-friendly).
- Never animate width, height, top/left, huge blur, expensive box-shadow.
- Use `whileInView` with `viewport={{ once: true }}` for one-shot reveals.
- Use `useReducedMotionSafe()` to resolve animations instantly under
  prefers-reduced-motion.

## Reduced motion (Rule 11/65)

- `useReducedMotionSafe()` returns true when the user prefers reduced motion.
- All animated components check this and render the final state instantly.
- Content is never hidden — only the motion is removed.
- The reduced-motion site still has full visual hierarchy, complete diagrams,
  product interfaces, and strong transitions using instant state changes.

## Mobile (Rule 64)

- Reduced particle counts, no heavy parallax, smaller dashboards.
- Desktop cinematic sequencing becomes mobile vertical sequence.
- Static fallback for very heavy scenes.

## Client component budget (Rule 57/98)

- Product pages: zero client components (all static SSR).
- Homepage: hero + platform selector are client islands; rest is static.
- Header: mega menu + mobile drawer are client islands.
- Contact page: one client component (the form).
- No giant "use client" homepage.

## Route transitions (Rule 81/82, amended Phase 8)

- `src/app/template.tsx` wraps all routes in a motion container. Phase 8: it
  uses `initial={false}` so the SSR HTML paints the page at full opacity on
  the first frame (LCP requirement — an `initial={{opacity:0}}` wrapper
  serialized `style="opacity:0"` into the HTML and gated every hero behind
  hydration; measured ~84% of LCP time as "render delay" on mobile).
- The subtle entry fade is therefore applied only via the per-scene reveal
  components (ScrollScene/VisualReveal), never around the whole route.
- Does not delay navigation, block browser history, or show fake loading.
- Respects reduced motion (instant).

## Dependency audit

| Package | Version | Justification |
| --- | --- | --- |
| motion | 13.4.6 | Primary UI + scroll storytelling. Replaces need for GSAP in this phase. |

No other animation libraries installed. No smooth-scroll library (Rule 7).
