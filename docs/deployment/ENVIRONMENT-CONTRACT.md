# ENVIRONMENT CONTRACT

Every environment variable used by the repository, its classification, and how
it is validated. No actual secret values are recorded here.

## Classification legend

| Class | Meaning |
| --- | --- |
| `PUBLIC` | Safe to expose in the browser (inlined at build time via `NEXT_PUBLIC_*`). |
| `SERVER-ONLY` | Read only by server code (`src/lib/env.ts`, proxy, route handlers). Never shipped to the client. |
| `SECRET` | A credential. Never logged, never committed, never exposed in HTML/errors. |
| `REQUIRED-IN-PRODUCTION` | Must be set for production to be considered ready. |
| `OPTIONAL` | Has a safe default; production warns if absent. |
| `DEVELOPMENT-ONLY` | Used only in local dev; must not silently satisfy production. |

## Variables

| Variable | Required | Scope | Secret | Example Allowed? | Validation | Failure |
| --- | --- | --- | --- | --- | --- | --- |
| `DATABASE_URL` | Yes (prod) | Server-only | Yes | No | `npm run production:preflight` — presence + postgres DSN shape (never logged) | Leads not durably persisted; `verify:production` BLOCKER |
| `RATE_LIMIT_URL` | Yes (prod) | Server-only | Yes | No | preflight — presence + https URL shape | Rate limiting is per-process only; BLOCKER |
| `RATE_LIMIT_TOKEN` | Yes (prod) | Server-only | Yes | No | preflight — presence (never logged) | Same as above |
| `SMTP_HOST` | Yes (prod) | Server-only | No | No | preflight — presence | No real email delivery; BLOCKER |
| `SMTP_USER` | Yes (prod) | Server-only | Yes | No | preflight — presence | Same |
| `SMTP_PASSWORD` | Yes (prod) | Server-only | Yes | No | preflight — presence (never logged) | Same |
| `SMTP_FROM` | Yes (prod) | Server-only | No | No | preflight — presence + email shape | Same |
| `SMTP_PORT` | No | Server-only | No | No | preflight — numeric if present (default 587) | Falls back to 587 |
| `SALES_EMAIL` | No (warn) | Server-only | No | No | preflight — email shape | Internal lead notifications not routed; WARNING |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Public | No | No | preflight — absolute https, non-localhost in prod | Canonicals/sitemap/OG point at localhost; BLOCKER |
| `GOOGLE_SITE_VERIFICATION` | No (warn) | Public | No | No | preflight — presence | Search Console not verifiable; WARNING |
| `CSP_ALLOWED_ORIGINS` | No | Server-only | No | No | `loadServerEnv()` — comma-separated https origins | Extra CSP origins ignored |
| `LOG_LEVEL` | No | Server-only | No | No | `loadServerEnv()` — trace/debug/info/warn/error | Defaults to info |
| `NODE_ENV` | Yes | Framework | No | No | preflight — development vs production | Dev defaults are not production-ready; WARNING |

## Server-only env architecture

- Server code reads env via `src/lib/env.ts` (`loadServerEnv()`). Client code
  must **never** import it.
- `NEXT_PUBLIC_*` vars are inlined at build time and are non-secret by contract.
- Secrets (`DATABASE_URL`, `RATE_LIMIT_*`, `SMTP_*`) are read only from the
  environment / `.env.local` (gitignored). They are never committed, never
  logged, never exposed in HTML or error messages.
- `npm run production:preflight` validates all of the above without revealing
  any value.

## What is NOT here

- No real database DSN, Redis URL, bearer token, SMTP credential, or
  verification token is stored in this repository.
- No production logging/monitoring service is configured (see
  `docs/operations/OBSERVABILITY-RUNBOOK.md`).
