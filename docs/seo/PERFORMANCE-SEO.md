# PERFORMANCE / SEO

Good Core Web Vitals support page experience but do **not** guarantee top
rankings (Rule 57). We optimize performance as part of a trustworthy, fast
site — never by sacrificing content, accessibility or conversion.

## Budgets (75th-percentile mobile targets)

| Metric | Target |
| --- | --- |
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.10 |

Lab (Lighthouse) is directional; field (Search Console) is authoritative.
Do not gate on "100 everywhere" — use the budgets above as thresholds
(Rule 76).

## What we do (implemented)

- **Server-rendered static pages** (all routes are prerendered; marketing
  content ships in HTML, no client fetch — Rule 58/69).
- **Minimal client JS**: only two client components on the home page
  (the tabbed CRM + platform showcases). Everything else is static.
- **Self-hosted variable fonts** (Sora/Manrope via fontsource), no
  remote font CDN; `font-display` swap, preloaded by Next.
- **OG images** generated server-side via `next/og` (no client cost).
- **No heavy media/video/WebGL** on the home page (Rule 58).
- **Explicit image dimensions** where we add real screenshots later
  (reserve space to avoid CLS — Rule 68).
- **Code splitting** by route (App Router default).

## Future (when we add assets/media)

- AVIF/WebP responsive images; `priority` only on the true LCP asset.
- `content-visibility: auto` for below-fold heavy sections — only after
  it is tested not to cause CLS.
- Lighthouse CI with the budgets above, added to CI once the local
  Chromium infrastructure is available (Rule 76). It is NOT added now to
  avoid a heavy dependency stack.

## Watch-outs

- Any new third-party script (analytics, etc.) must pass the performance
  + security gate and be CSP-allowlisted (Rules 24/59/73).
- Animation must stay compositor-only (transform/opacity) and honor
  `prefers-reduced-motion` (docs/design/MOTION.md).
