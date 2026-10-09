# PRODUCTION LAUNCH RUNBOOK

Ordered procedure to take FOREXAA.com from repository to production. Each step
is explicit. No step is assumed complete without evidence.

## 1. Owner confirms production domain

- Decide the public origin (e.g. `https://www.forexaa.com`).
- This becomes `NEXT_PUBLIC_SITE_URL`.

## 2. Owner provisions PostgreSQL

- Provision a PostgreSQL 13+ instance.
- Note the connection string for `DATABASE_URL`.

## 3. Backup baseline established

- Configure automated backups / snapshots on the PostgreSQL instance **before**
  any data exists (see `DATABASE-BACKUP-RESTORE.md`).

## 4. Environment variables configured

Set on the production environment (never committed):

```
NEXT_PUBLIC_SITE_URL=https://www.forexaa.com
DATABASE_URL=postgres://<user>:<pass>@<host>:<port>/<db>
RATE_LIMIT_URL=https://<redis-rest-endpoint>
RATE_LIMIT_TOKEN=<bearer-token>
SMTP_HOST=<smtp-host>
SMTP_PORT=<587|465>
SMTP_USER=<smtp-user>
SMTP_PASSWORD=<smtp-password>
SMTP_FROM="FOREXAA <no-reply@forexaa.com>"
SALES_EMAIL=sales@forexaa.com
```

## 5. Rate limiter configured

- Point `RATE_LIMIT_URL` + `RATE_LIMIT_TOKEN` at a shared Redis-REST / edge-KV.
- Confirm multi-instance limiting works.

## 6. SMTP configured

- Set the `SMTP_*` values for the owner's email provider.
- Confirm `SMTP_FROM` and `SALES_EMAIL` are valid receiving addresses.

## 7. Run preflight

```bash
npm run production:preflight
```

Must report **0 CODE blockers**. Owner-infrastructure blockers should clear
as steps 2–6 are completed.

## 8. Run DB migration

```bash
DATABASE_URL=postgres://... npm run db:migrate
```

Verify the `leads` table, indexes, and status constraint (see
`DATABASE-MIGRATION-RUNBOOK.md`).

## 9. Verify DB schema

Run the post-migration checks (table, columns, indexes, status values, dedup
fields). Do not alter real lead data.

## 10. Verify readiness

With the server running, confirm `/health` returns `OK` (liveness). Readiness
(configuration completeness) is reported by `production:preflight`.

## 11. Deploy application

- Deploy the production build to the owner's hosting platform.
- This step is **owner-executed**; the repository does not deploy.

## 12. Verify headers

```bash
npm run verify:headers
```

Confirm CSP nonce, HSTS, X-Frame-Options, nosniff, Permissions-Policy,
Referrer-Policy.

## 13. Verify canonical

Confirm canonical URLs use the production origin (spot-check a few routes).

## 14. Verify sitemap

Confirm `sitemap.xml` lists the indexable routes with the production origin.

## 15. Verify contact submission

Submit a valid contact form. Confirm:

- Server action runs.
- Rate limiter consumes a hit.
- Zod validation passes.
- Lead persists in PostgreSQL.
- Sales email is sent.
- User confirmation is sent.

(See `POST-LAUNCH-SMOKE-TEST.md`.)

## 16. Verify email

Confirm the sales inbox receives the internal notification and the submitter
receives the confirmation.

## 17. Verify persistence

Query the database (read-only) and confirm the test lead exists with the
expected fields.

## 18. Verify rate limiting

Submit repeatedly within safe test limits. Confirm the rate-limited response
is generic and no credentials appear in logs.

## 19. Verify browser smoke routes

Run `npm run browser:qa` against production. Confirm 64/64.

## 20. Verify Search Console

Add the `GOOGLE_SITE_VERIFICATION` meta via the configured value and verify the
property in Search Console (see `SEARCH-CONSOLE-LAUNCH-CHECKLIST.md`).

## 21. Monitor

Watch error rates, lead volume, email delivery, and rate-limiter health for the
first days after launch (see `OBSERVABILITY-RUNBOOK.md`).

## Explicitly NOT done by this repository

- No deployment.
- No DNS changes.
- No production database migration (owner runs it).
- No email sending during verification (only explicit live-delivery tests).
- No Search Console property creation.
