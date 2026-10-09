# IMAGE SYSTEM

Phase 4 image strategy. Original compositions only — no stock photography,
no competitor imagery (Rule 38/39).

## Asset types

### 1. Product UI (synthetic)
Built from primitives in `src/components/product/visuals.tsx` and
`src/components/product/page-visuals.tsx`. Code, not images. Labeled
"Illustrative interface" / "Conceptual" where shown.

### 2. Abstract market artwork
Original SVG compositions in `public/scenes/`. Grids, data trails, node
networks, flow diagrams. Lightweight, scalable, themeable.

### 3. Technical illustrations
Architecture diagrams, liquidity flows, system maps. Original SVG/CSS.

### 4. High-end environment imagery
None in Phase 4. No generic office/handshake/skyscraper photos.

### 5. Macro visual details
CSS/SVG-based: chart lines, grid patterns, light effects, data particles.

### 6. Product mockups
Synthetic UI components arranged in desktop/tablet/mobile compositions.
No external screenshots.

## Image components (Rule 75)

| Component | Use |
| --- | --- |
| `OptimizedImage` | Standard next/image wrapper with explicit dimensions |
| `ArtDirectedImage` | Different crops per breakpoint via CSS object-position |
| `SceneImage` | Decorative scene image with lazy loading |

All use `next/image` for responsive sizing, modern formats (WebP/AVIF),
quality tuning, and correct preload/priority strategy.

## Optimization (Rule 41)

- All raster images go through `next/image`.
- Responsive sizes via `sizes` prop.
- Quality 80-85 for photos, 80 for illustrations.
- Modern formats (WebP/AVIF) served automatically by Next.js.
- Preload only the true LCP asset (hero console).
- Lazy-load below-fold images.

## Hero asset performance (Rule 42)

- The hero LCP asset is the operating console (synthetic UI, server-rendered
  HTML — no image download needed for the core visual).
- Background SVGs are lightweight (< 10KB each) and CSS-animated.
- No blocking WebGL initialization.
- Text is not dependent on image load.

## SVG policy (Rule 77)

- SVGs preferred for logos, diagrams, icons, abstract market graphics,
  architecture lines.
- Externally supplied SVGs must be sanitized.
- No arbitrary user SVG injection.

## Art direction (Rule 76)

- Desktop and mobile compositions can differ substantially.
- Desktop: wide cinematic scenes, 70/30 visual/text splits.
- Mobile: stacked visuals, horizontal carousels, reduced parallax,
  smaller dashboards.
