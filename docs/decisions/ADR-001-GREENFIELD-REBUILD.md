# ADR-001 — Greenfield rebuild on Next.js

**Status:** Accepted (Phase 1)
**Date:** 2026-09-30

## Context

FOREXAA's existing website is a WordPress/Avada template with duplicated
navigation, scattered copy, placeholder junk, no security hardening and a
visual identity that reads as a generic forex template. The business needs a
premium, production-grade B2B brokerage-technology site that can scale to
many product/solution pages, and a foundation that stays secure and fast as
auth, CMS and integrations are added.

## Decision

Rebuild from scratch ("greenfield") on:

- **Next.js App Router** (latest patched 16.x)
- **TypeScript, `strict` + `noUncheckedIndexedAccess`**
- **Tailwind CSS v4** (design tokens, no CSS-in-JS)
- **Server Components first**, client components only for interactivity
- **Self-hosted fonts** (fontsource Sora + Manrope)
- **Small audited dependency set** (zod for validation, testing tooling)

And apply, from day one:

- **Security-first architecture** (headers + strict CSP in a network
  boundary, Zod validation, no secrets in source, no unsafe HTML)
- **Data-driven navigation** (single source of truth in `src/config`)
- **Content separation** (typed content models, facts in config/content,
  presentation in JSX)
- **Design-token system** (Aurora Terminal) documented in
  `docs/design`
- **A testing strategy** (security headers, schema validation, navigation
  integrity, rendering, secret hygiene)

## Consequences

- **Pros:** clean architecture, fast pages, strong security posture, a
  scalable seam for later CMS/auth/3D, reproducible build and CI.
- **Costs:** the old site's pages must be re-created (they are not
  ported); the visual identity is new, so any existing brand assets must be
  re-mapped to the new tokens.
- **Out of scope here:** the full page set, contact/demo backend,
  authentication, CMS, database, payments. Those are later phases and are
  not built now (Rule 43).

## Alternatives considered

- **Patch the WordPress site:** rejected — template junk, no security
  story, hard to scale to the required IA.
- **Static site generator (e.g. Astro):** rejected — we need the
  server-capable, secure, API-friendly platform Next provides for the
  authenticated areas that follow.
