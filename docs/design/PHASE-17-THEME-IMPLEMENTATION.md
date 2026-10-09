# PHASE 17 — THEME IMPLEMENTATION

> Corrected in the Phase 16 finalization. See `PHASE-16-FINAL-REPORT.md` (authoritative).

- Server reads the `fxa_theme` cookie in `src/app/layout.tsx` and sets `data-theme` on `<html>` before hydration; it renders `ThemeController` with `initialTheme` (hydration-safe, no flash).
- Client `ThemeController` keeps the DOM in sync and persists the cookie (1 year, `samesite=lax`).
- Accessible `ThemeToggle` is rendered in the **header only** (`site-header.tsx`). It was **not** added to the mobile nav — the earlier claim to the contrary was incorrect.
- `ThemeToggle` is prop-driven (`initialTheme`); the mount-time `setState`-in-`useEffect` was removed to fix the single `eslint` error and the placeholder flash.
- Light theme is implemented by remapping the neutral **base palette** so semantic tokens and raw palette utilities flip together (not a global invert); accents are darkened for AA contrast; borders/shadows are theme-tuned. Dark baseline preserved.
- CSP unchanged.

Verified routes (server-rendered `data-theme`, computed body contrast): `/`, `/solutions/new-brokerage`, `/broker-technology/crm`.
