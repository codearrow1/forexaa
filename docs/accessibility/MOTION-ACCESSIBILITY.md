# MOTION ACCESSIBILITY

Phase 4 motion system accessibility rules. Hard requirements (Rule 61).

## Reduced motion

- `useReducedMotionSafe()` uses `useSyncExternalStore` — the React-recommended
  pattern for media queries. No setState-in-effect.
- When reduced motion is preferred:
  - All entrance animations resolve instantly to final state.
  - Scroll-linked animations are disabled (content is fully visible).
  - Data flow / particle animations are static.
  - Route transitions are instant.
  - 3D scenes are not initialized.
- The reduced-motion site is a legitimate alternative, not a broken one:
  visual hierarchy, complete diagrams, product interfaces, and full content
  remain.

## Keyboard accessibility

- All interactive elements are reachable by Tab.
- Focus states are visible (global `:focus-visible` outline).
- Mega menu: Enter/Space/ArrowDown opens, Escape closes, arrows navigate.
- Mobile drawer: focus moves to panel on open, returns to trigger on close,
  Escape closes, body scroll locked.
- Tabs: roving tabindex, arrow-key navigation.
- No focus traps except modal dialogs (which are not used in Phase 4).

## Screen reader story

- Complex diagrams have concise accessible descriptions.
- The completed state is provided semantically (not forced through
  animation sequences).
- Decorative nodes/lines are `aria-hidden`.
- All content is in normal HTML — not hidden behind canvas, video, WebGL, or
  client-only rendering.

## Content visibility

- Core semantic content (headings, paragraphs, links, CTAs) is server-rendered
  and available immediately — not gated behind JavaScript.
- Animations enhance, never gate, content.
- No full-page opacity:0 waiting for JS.

## Vestibular safety

- No rapid flashing.
- No large-scale continuous motion.
- Parallax amplitude is reduced on mobile.
- Scroll-linked motion is subtle and interruptible.

## Progressive enhancement

- Without JavaScript: navigation works, headings/content exist, images exist,
  links work, forms are understandable, core product information is accessible.
- With JavaScript: motion, interactions, visual storytelling, screen morphs,
  and diagrams are enhanced.

## Automated accessibility smoke test

- `tests/seo/motion-accessibility.test.tsx` renders the homepage and checks:
  - single h1, landmarks present, skip link target exists
  - all images have alt
  - no content hidden behind animation-only mechanisms
