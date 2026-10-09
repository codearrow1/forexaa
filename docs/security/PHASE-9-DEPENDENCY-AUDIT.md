# PHASE 9 — DEPENDENCY SECURITY AUDIT

Audit date: 2026-10-03. Method: `npm audit` (full), `npm audit --omit=dev`
(runtime only), `npm ls` (dependency graph). No credentials or registry
secrets are recorded here.

## Results

| Command | Result |
| --- | --- |
| `npm audit` (full) | **5 high** severity advisories |
| `npm audit --omit=dev` (runtime) | **0 vulnerabilities** |

## Advisory detail

All 5 high-severity advisories are the **same transitive chain** in the
dev/build toolchain:

```
eslint-config-next@16.3.7
└── @next/eslint-plugin-next@16.3.7
    └── fast-glob@3.3.1
        └── micromatch@4.0.8
            └── braces@3.0.3   ← vulnerable (GHSA-vfj7-8cjw-p6xm)
```

- **Affected package:** `braces` (stack-exhaustion DoS via deeply nested
  patterns).
- **Runtime exposure:** **None.** `braces` is reachable only from
  `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` →
  `micromatch`. These are ESLint/lint tooling executed at dev/build time on
  the developer's machine and in CI. They are **not** imported by the Next.js
  server runtime, not bundled into any client chunk, and not executed in the
  browser. `npm audit --omit=dev` confirms **0 runtime vulnerabilities**.
- **Why it cannot currently be patched (Case C):** the installed `braces`
  (3.0.3) is the **latest published release** — no patched version exists on
  the registry. The only registry "fix" is `npm audit fix --force`, which
  would downgrade `eslint-config-next` to 14.2.35 — a breaking change that
  desyncs the lint config from Next.js 16.3.8. Rejected (no dependency churn
  without cause; Phase 9 spec §15).
- **Mitigation:** the chain is dev/build-only and never shipped. The
  production runtime dependency set is clean (`npm audit --omit=dev` = 0).
  `npm run verify:production` now reports runtime and dev/build-toolchain
  security **separately** so the 5 non-runtime advisories are visible but
  correctly classified, not hidden.
- **Residual risk:** low. A malicious `braces` pattern could crash a developer
  or CI lint run (availability), but cannot affect the production site or its
  visitors. Tracked here and in `docs/deployment/PRODUCTION-ACTIVATION-MATRIX.md`.

## Dependency graph (runtime)

```
forexaa@0.1.0
├── next@16.3.8
├── react@19.2.8
├── react-dom@19.2.8
├── motion@13.4.6        (client + server motion; in the client bundle)
├── pg@8.11.3            (server-only; never bundled to client)
└── zod@4.6.5            (server authority + client UX mirror)
```

No new dependencies were added in Phase 9. No versions were upgraded. The
Phase 8 removal of `@fontsource-variable/*` (replaced by self-hosted
`public/fonts`) stands.

## Production verification improvement

`npm run verify:production` now distinguishes:

```
[CODE] PASS    Runtime dependencies (npm audit --omit=dev) — 0 runtime vulnerabilities
[CODE] WARNING Dev/build toolchain (npm audit, full) — 5 advisory(ies) in dev/build toolchain (non-runtime; see docs/security/PHASE-9-DEPENDENCY-AUDIT.md)
```

Runtime vulnerabilities are a **BLOCKER**; dev/build-toolchain advisories are a
**WARNING** (documented, non-runtime). The full `npm audit` remains visible
and is never suppressed.
