# PHASE 17 — THEME AUDIT

> Pre-implementation snapshot (describes the state *before* the theme work). The plan below was executed; the one correction was that the toggle lives in the header only (not the mobile nav). See `PHASE-16-FINAL-REPORT.md`.

## 1. Current Architecture
- Next.js 16.3.8, React 19, TypeScript strict
- Tailwind v4 (@import "tailwindcss")
- Root layout: src/app/layout.tsx — no theme attribute, no theme provider, no toggle
- Global styles: src/app/globals.css — dark-only semantic tokens (Aurora Terminal)
- Header: src/components/layout/site-header.tsx — motion-based dark header, no toggle
- No next-themes/ThemeProvider found; no data-theme usage

## 2. Token Inventory (Dark)
From globals.css: --color-background (#07111f), --color-foreground (#f5f8fc), --color-text (#f5f8fc), --color-surface (#0d1b2e), --color-surface-elevated (#11213a), --color-border (mix), --color-primary (#20d8e8), --color-secondary (#725cff), --color-success (#64f2c1)

## 3. Approach
- Add [data-theme="dark"] baseline (preserve) + [data-theme="light"] semantic tokens in globals.css
- Server reads fxa_theme cookie in RootLayout; sets data-theme on <html> (hydration-safe)
- Client ThemeController syncs + updates cookie on toggle
- Header + MobileNav get accessible toggle; shared state
- Prefer semantic tokens over hard-coded values; avoid global invert
