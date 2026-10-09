# DATABASE & EMAIL RECOVERY (Phase 7 Rule 38/39)

Owner-gated. Documented here so launch does not claim backups exist that are
not configured.

## Database provider & migration
- Provider: PostgreSQL (owner-supplied `DATABASE_URL`; e.g. Neon, RDS, Supabase).
- Migration: `npm run db:migrate` (idempotent `src/lib/lead-store/schema.sql`).
  Run explicitly before launch and on every schema change. Never run against an
  unintended database — confirm the target `DATABASE_URL` first.
- Access control: server-only `DATABASE_URL`; no client access; least-privilege
  role (INSERT/SELECT/UPDATE on `leads` only).

## Backup & restore (must be configured by owner — not assumed)
- Backup: point-in-time recovery (Neon PITR) or scheduled `pg_dump` nightly.
- Restore: PITR to a timestamp, or `psql < backup.sql` into a clean DB, then
  re-run `npm run db:migrate`.
- Do NOT claim backups exist unless the owner has enabled them.

## Email (recovery path)
- Sales inbox: `SALES_EMAIL`.
- Provider: SMTP (`SMTP_HOST/PORT/USER/PASSWORD/FROM`) via the console/SMTP
  abstraction. In dev the console provider logs; in production SMTP must be set.
- Failure behavior (documented in the contact action):
  - DB success + email failure → lead stays in DB (authoritative record); user
    still gets a safe success.
  - DB failure + email success → lead recorded by email (last-resort); flagged
    as a degraded event (observability).
  - Both fail → safe user error; observability signal emitted.
- The `leads` database is the authoritative record once enabled; email is
  notification + last-resort, not the source of truth.
- Retry strategy: none implemented (single best-effort send). Owner may add a
  queue later; the lead is already persisted, so nothing is lost.
