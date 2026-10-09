# ARCHITECTURE

## Overview

FOREXAA is a greenfield marketing/platform-technology website built on the
Next.js App Router with a server-first rendering model, a strict TypeScript
boundary, and a small, audited dependency set. It is deliberately
architecture-first: the foundation (design system, security, content models,
navigation) is built before the page content is.

## Rendering model

- **Server Components by default.** Marketing copy, structure and data
  flow server-rendered.
- **Client components only for interaction:** `SiteHeader` (drawer state),
  `MobileNav`, `Tabs`, `Tooltip`, `Modal`, `Dropdown`. Everything else
  (layout chrome, hero copy, market-grid visuals) is server-rendered.
- **No `useEffect`-driven data fetching.** Data comes from config/content
  modules or later APIs. `useEffect` is reserved for browser-only concerns
  (focus, scroll lock, observers).

## Layering

```
src/app            Routes, layouts, metadata, error boundaries, robots, sitemap
src/components     Reusable UI + composition (ui/layout/navigation/marketing/shared)
src/config         Single source of truth for site, navigation, metadata
src/types          Typed content models
src/validation     Zod schemas (forms)
src/security       headers + CSP, rate-limiting
src/lib            cn, env (server-only), logger
src/proxy.ts       Network boundary: security headers + blocked paths
```

Dependency direction is one-way: `app` → `components` → `config/types`.
`lib` and `security` are leaf modules. No component may import another
component from a "lower" layer in a way that creates a cycle.

## Source of truth

- **Routes + navigation** → `src/config/navigation.ts` (`ROUTES`,
  `NAV_SECTIONS`) and `src/config/site.ts` (footer). Components read these;
  they never re-declare links. This keeps sitemap, breadcrumbs, internal
  links and the mega menu consistent.
- **Design tokens** → `src/app/globals.css`. Components use the tokens, not
  raw hex.
- **Content** → `src/types/content.ts` models + config/content modules.
  JSX holds presentation, not facts.

## Network boundary

`src/proxy.ts` (the Next.js 16 replacement for `middleware.ts`) is the only
place that runs on the request edge. It:
- injects the full security-header set (from `src/security/headers.ts`)
- returns 403 for sensitive path patterns (`/admin`, `/api/admin`, `/.env*`,
  `/private`)

Keep it fast and side-effect light: no DB, no external calls.

## Security (summary)

- **Secrets:** server-only via `src/lib/env.ts`; never shipped to the client.
- **Input:** Zod in `src/validation/forms.ts`; server is authoritative.
- **Output:** no `dangerouslySetInnerHTML`.
- **Headers/CSP:** centralized, strict in production, documented dev
  relaxation for HMR. See `docs/security/SECURITY-BASELINE.md`.
- **Third-party trust:** off by default. Any added integration must be
  documented and reflected in the CSP allowlist (`CSP_ALLOWED_ORIGINS`).

## Extensibility (later phases)

The architecture anticipates, without building:
- a headless CMS or content API for `CaseStudy`, `Article`, `Resource`
- an authenticated area (demo requests, customer portal)
- a database (via an ORM) — all queries behind server routes
- Three.js/React Three Fiber for hero motion **only where justified**
- a shared rate-limit backend (e.g. Upstash) for mutation endpoints

None of these are wired yet; the seams are in place.
