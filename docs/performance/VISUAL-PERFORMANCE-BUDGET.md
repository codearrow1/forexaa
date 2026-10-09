# VISUAL PERFORMANCE BUDGET

Phase 4 must not meaningfully regress Phase 3 performance.

## Phase 3 baseline (Lighthouse, local lab)

| Page | Perf | A11y | BP | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 95 | 100 | 92 | 100 | 2.7s | 80ms | 0 |
| `/broker-technology/crm` | 96 | 100 | 92 | 100 | 2.7s | 70ms | 0 |

## Phase 4 targets

| Metric | Target |
| --- | --- |
| LCP | ≤ 2.5s |
| CLS | ≤ 0.10 |
| TBT | ≤ 150ms (local lab) |
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | 100 |

## JavaScript budget

| Category | Budget |
| --- | --- |
| Motion library (tree-shaken) | ≤ 40KB gzipped |
| Homepage client JS | ≤ 60KB gzipped |
| Product page client JS | 0KB (all static) |
| Contact page client JS | ≤ 20KB gzipped |
| Total initial JS (homepage) | ≤ 120KB gzipped |

## Asset budgets

| Category | Budget |
| --- | --- |
| Hero visual | Server-rendered HTML (no image download for core visual) |
| Scene SVGs | ≤ 10KB each |
| Raster images | ≤ 100KB each (WebP/AVIF) |
| Fonts | ≤ 50KB total (2 variable fonts, subsetted) |
| Video (if added) | ≤ 2MB, lazy-loaded, poster image |

## Animation performance rules

- Animate only transform, opacity, clip-path, scale (GPU-friendly).
- No continuous layout calculations.
- Use `whileInView` with `viewport={{ once: true }}` for one-shot reveals.
- No dozens of independent scroll listeners — use Motion's `useScroll`.
- Particles: capped count, requestAnimationFrame, stop when offscreen,
  reduce on mobile, stop under reduced motion.
- 3D: lazy-loaded, dynamically imported, no SSR, static fallback,
  disabled on reduced motion and low-power mobile.

## Measurement

- Lighthouse CI on 5 pages: `/`, `/broker-technology/crm`, `/platforms/mt4-mt5`,
  `/infrastructure/liquidity`, `/services/white-label`.
- Store budgets in repository.
- If a visual feature materially increases JavaScript without substantial
  UX benefit: remove or simplify it.
