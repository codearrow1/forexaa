/**
 * Apply the lead-store migration (Phase 6).
 *
 * Owner runs this once against the target Postgres database:
 *   DATABASE_URL=postgres://... npm run db:migrate
 *
 * Idempotent (CREATE ... IF NOT EXISTS). Requires `pg` and Postgres 13+.
 * No credentials are read from source — only from the environment.
 */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import process from "node:process";

const require = createRequire(import.meta.url);

const connectionString = process.env.DATABASE_URL?.trim();
if (!connectionString) {
  console.error("DATABASE_URL is not set. Provide it to run the migration.");
  process.exit(1);
}

const pg = require("pg");
const pool = new pg.Pool({ connectionString });

try {
  const sql = readFileSync(
    new URL("../src/lib/lead-store/schema.sql", import.meta.url),
    "utf8",
  );
  await pool.query(sql);
  console.log("✓ leads schema applied (idempotent).");
} catch (error) {
  console.error("Migration failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
