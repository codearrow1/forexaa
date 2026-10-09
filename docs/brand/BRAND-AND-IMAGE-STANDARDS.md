# BRAND ASSETS & IMAGE STANDARDS

Status: **temporary assets in use; final logo is NOT yet approved.**
We use a clearly-identifiable placeholder mark (concentric market-ring +
nodes, `public/icons/forexaa-mark.svg`) until official brand assets land.
Do not treat the placeholder as final.

## Plan (Rule 37)

| Asset | Target format | Notes |
| --- | --- | --- |
| Favicon | `.ico` (legacy) + `icon.svg` (modern) | `src/app/favicon.ico` + `src/app/icon.svg` (Aurora ring mark) |
| SVG icon | `public/icons/forexaa-mark.svg` | Also the Organization `logo` in JSON-LD |
| Apple touch icon | 180×180 PNG | TBD — generate from final logo |
| OG image | 1200×630 PNG, route-aware | Generated at build/serve via `next/og` (`src/lib/seo/og.tsx` + per-route `opengraph-image.tsx`). NOT one generic image. |
| Social preview | from OG image | same source |
| Dark/light variants | PNG/SVG | when final logo is supplied |

## Image SEO standard (Rule 35)

Every meaningful image must support:

- **Descriptive filename** (`forexaa-crm-dashboard.avif`), kebab-case, no
  keyword stuffing.
- **Alt text** describing the image for a blind user; decorative images
  use `alt=""`.
- **Title/caption** where they add value (not keyword padding).
- **Explicit width/height** (or aspect-ratio) reserved in layout to
  prevent CLS.
- **Responsive sources** (AVIF/WebP where appropriate) via `next/image`.
- **Correct format** and modern compression.

Policy: use **real product screenshots** wherever available. Until
screenshots exist, the home page uses the conceptual operating-console
visualization, clearly labelled "Illustrative / Demo data / Synthetic" —
we do not pass off fake visuals as real product captures.
