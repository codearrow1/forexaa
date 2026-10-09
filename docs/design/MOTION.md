# MOTION

Motion in Aurora Terminal is **subtle, purposeful, performant and
interruptible**. It supports comprehension (state changes, hierarchy) and is
never decoration for its own sake.

## Principles

1. **Subtle.** Small distance (0–8px), short duration (120–320ms), low
   opacity deltas. No large travel, no bouncing.
2. **Purposeful.** An animation must communicate a state (open/close,
   load, selection, error). If it can't, remove it.
3. **Performant.** Animate only `transform` and `opacity` (compositor
   friendly). Never animate layout properties (`width`, `height`, `top`,
   `left`). Keep per-frame work trivial.
4. **Interruptible.** Animations respond immediately to user input and can
   be reversed mid-flight (CSS transitions do this naturally; for JS
   sequences, prefer the browser cancelling the prior state).
5. **Reduced-motion compatible.** `prefers-reduced-motion: reduce` disables
   all decorative motion (global rule in `globals.css`). Essential state
   changes still occur (instantly, no animation).

## Tokens

- `--duration-fast: 120ms` — hover/focus micro-states.
- `--duration-base: 200ms` — menu open/close, card hover.
- `--duration-slow: 320ms` — modal/dialog enter-exit.
- `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` — default ease-out for
  entries; pairs with instant exit.

## Usage

- Use CSS transitions with these tokens for micro-interactions.
- Framer Motion (if later added) is reserved for section scroll reveals and
  the mobile drawer; it must honor reduced-motion.
- No full-page WebGL/three.js scenes in Phase 1. The Market Grid is
  CSS/SVG only. Introduce R3F only where a specific section justifies it and
  the animation budget still holds.

## Animation budget

- No animation blocks first paint. Critical sections render static and
  enter quickly.
- Keep total concurrent animated elements low. Backgrounds (`GlowField`,
  `GridBackground`) are static or extremely slow — they never run
  continuous high-frequency animation.
