# ENVIRONMENT MATRIX

Required variables per environment. Never print values — only presence.

| Variable | Dev | Test | Production | Notes |
| --- | --- | --- | --- | --- |
| `NODE_ENV` | `development` | `test` | `production` | drives rate-limit/lead-store selection |
| `NEXT_PUBLIC_SITE_URL` | optional | optional | **required** | canonical origin |
| `DATABASE_URL` | optional | optional | **required** | Postgres lead persistence |
| `RATE_LIMIT_URL` | optional | optional | **required** | shared rate-limit backend |
| `RATE_LIMIT_TOKEN` | optional | optional | **required** | shared rate-limit backend |
| `RATE_LIMIT_PROVIDER` | optional | optional | optional | informational label |
| `SMTP_HOST` | optional | optional | **required** | live email |
| `SMTP_PORT` | optional | optional | **required** | live email |
| `SMTP_USER` | optional | optional | **required** | live email |
| `SMTP_PASSWORD` | optional | optional | **required** | live email (never logged) |
| `SMTP_FROM` | optional | optional | **required** | live email |
| `SALES_EMAIL` | optional | optional | **required** | internal notification recipient |
| `GOOGLE_SITE_VERIFICATION` | optional | optional | optional | Search Console meta (render only when set) |

## Behavior by environment
- **Development:** in-memory rate limiter; email-only lead store (console
  provider). No production blockers enforced.
- **Test:** same as dev; deterministic.
- **Production:** requires `DATABASE_URL`, `RATE_LIMIT_URL`+`RATE_LIMIT_TOKEN`,
  and SMTP config. Missing any → `verify:production` reports BLOCKER and the
  app does not claim production readiness.

## Security
- No `NEXT_PUBLIC_*` secret. All server-only vars are read in server code.
- Credentials are never logged, never in client bundles, never in analytics.
- `verify:production` prints presence only, never values.
