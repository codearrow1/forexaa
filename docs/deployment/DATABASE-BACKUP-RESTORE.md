# DATABASE BACKUP / RESTORE

## Scope

The lead system persists PII-bearing contact submissions to PostgreSQL. This
runbook defines what must be backed up, who owns it, and how restore is verified.
No backup infrastructure is created or claimed here.

## What must be backed up

- **The `leads` table** (and its indexes) in the configured PostgreSQL
  database. This is the only durable store of contact submissions.
- **The database itself** (full dump) is the safest option — it captures the
  schema, indexes, and all lead rows.

## Who owns the backup

- **Owner / infrastructure team.** The application does not perform backups and
  does not create backup infrastructure.
- Backups must be configured on the provisioned PostgreSQL instance (e.g.,
  automated snapshots, `pg_dump` schedule) by the owner.

## When backup must occur

- **Before the first production migration** (baseline).
- **Before any schema change** (though the current migration is forward-only
  and non-destructive).
- **On a regular schedule** defined by the owner (the application does not
  schedule backups).

## Restore procedure (owner-executed)

1. **Provision a target database** (can be the same instance or a new one).
2. **Restore the dump** (e.g., `pg_restore` or `psql < dump.sql`).
3. **Verify the schema** (see `DATABASE-MIGRATION-RUNBOOK.md` post-migration
   checks).
4. **Verify lead data:** count rows, spot-check recent submissions.
5. **Point the application** at the restored database by setting `DATABASE_URL`.
6. **Verify application behavior:** submit a test contact (see
   `docs/launch/POST-LAUNCH-SMOKE-TEST.md`) and confirm the lead persists.

## Restore verification

After restore, confirm:

- The `leads` table exists with all columns and indexes.
- Existing lead rows are intact (count matches the pre-restore baseline).
- A new contact submission persists (end-to-end smoke).
- The application's `verify:production` no longer reports the database as
  missing.

## Honest limitations

- **No backup exists unless the owner's infrastructure provides it.** This
  runbook does not claim backups exist.
- **Point-in-time recovery** depends on the database's configured backup
  retention (owner responsibility).
- The application has **no backup/restore automation** — it is a verification
  and documentation layer only.
