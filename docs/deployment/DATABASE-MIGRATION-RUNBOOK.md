# DATABASE MIGRATION RUNBOOK

## Scope

Applies the lead-store schema (`src/lib/lead-store/schema.sql`) to the target
PostgreSQL database. This is an **explicit operational step** — it is never run
automatically by the app, the preflight, or launch:check.

## Preconditions

- `DATABASE_URL` is set to the **intended** environment (never a production DSN
  unless you intend to migrate production).
- The `pg` driver is installed (`npm install` — it is a direct dependency).
- You have network access and credentials for the target database.
- **A backup exists** (see `DATABASE-BACKUP-RESTORE.md`).

## Migration behavior (verified)

- **Idempotent:** uses `CREATE TABLE IF NOT EXISTS` and `CREATE INDEX IF NOT
  EXISTS`. Safe to run repeatedly.
- **Non-destructive:** no `DROP`, no `TRUNCATE`, no `DELETE`. It only creates
  the table and indexes if absent.
- **Forward-only:** there is no down-migration. Once applied, the schema change
  is not automatically reversible.
- **Single transaction:** the script runs the whole `schema.sql` in one
  `pool.query` call (Postgres runs multi-statement queries in an implicit
  transaction), so it is all-or-nothing.

## Steps

1. **Backup** the target database first (see backup runbook).
2. **Verify connectivity** (read-only):
   ```bash
   DATABASE_URL=postgres://... node -e "const{createRequire}=require('module');const r=createRequire(process.cwd()+'/');const pg=r('pg');const p=new pg.Pool({connectionString:process.env.DATABASE_URL});p.query('SELECT 1').then(()=>{console.log('connectivity OK');return p.end()}).catch(e=>{console.error(e.message);process.exit(1)})"
   ```
3. **Apply the migration:**
   ```bash
   DATABASE_URL=postgres://... npm run db:migrate
   ```
   Expected output: `✓ leads schema applied (idempotent).`
4. **Post-migration checks** (see below).

## Post-migration verification

Run read-only checks against the target database:

- **Table exists:** `\d leads` (or query `information_schema.tables`).
- **Columns:** `id, intent, business_type, interest, name, business_email,
  company, country, message, source, status, created_at, updated_at`.
- **Indexes:** `idx_leads_created_at`, `idx_leads_status`,
  `idx_leads_email_company`.
- **Status constraint:** `status` is `CHECK (status IN ('new','contacted',
  'qualified','closed','archived'))`.
- **Dedup fields:** `business_email` + `company` are indexed for the dedup
  window lookup.

## Failure handling

- If the migration fails, the schema is unchanged (single-transaction
  all-or-nothing). Fix the connectivity/credential issue and re-run.
- **Do not** attempt to "fix" a partial migration by dropping objects. The
  migration is idempotent; re-running after fixing the cause is the correct
  recovery.
- If the target database already has a conflicting `leads` table (e.g., from a
  different schema), resolve that manually before migrating. The script will
  not overwrite existing objects.

## Rollback limitations

- The migration is **forward-only**. There is no automatic down-migration.
- To revert, you would need to `DROP TABLE leads` — a **destructive** action
  that requires explicit owner authorization and a confirmed backup. This is
  intentionally not automated.
