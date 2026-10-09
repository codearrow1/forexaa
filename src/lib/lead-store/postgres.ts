import type { LeadInput, LeadStatus } from "@/lib/lead-store/index";

/**
 * Persistent PostgreSQL lead store (Phase 6 Rule 8-12).
 *
 * - Minimal schema, server-only access, parameterized queries (no raw
 *   interpolation of PII), sensible indexes.
 * - `pg` is loaded via createRequire at runtime only when DATABASE_URL is set,
 *   so it is NOT bundled at build time and the app builds without it.
 * - No PII in logs; the status lifecycle is internal (never the public form).
 */
type PgPool = {
  query(text: string, values?: unknown[]): Promise<{ rows: unknown[] }>;
  end(): Promise<void>;
};

class PostgresLeadStoreImpl {
  private pool: PgPool | null = null;

  protected async getPool() {
    if (!this.pool) {
      const { createRequire } = await import("node:module");
      const nodeRequire = createRequire(process.cwd() + "/");
      const pg = nodeRequire("pg") as {
        Pool: new (cfg: { connectionString?: string }) => {
          query(text: string, values?: unknown[]): Promise<{ rows: unknown[] }>;
          end(): Promise<void>;
        };
      };
      this.pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
      });
    }
    return this.pool;
  }
}

export class PostgresLeadStore extends PostgresLeadStoreImpl {
  readonly kind = "postgres" as const;

  async save(
    input: LeadInput,
  ): Promise<{ success: boolean; error?: string; id?: string }> {
    try {
      const pool = await this.getPool();
      const now = new Date().toISOString();
      const result = await pool.query(
        `INSERT INTO leads
           (intent, business_type, interest, name, business_email,
            company, country, message, source, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'new', $10, $10)
         RETURNING id`,
        [
          input.intent,
          input.businessType,
          input.interest,
          input.name,
          input.email,
          input.company,
          input.country,
          input.message,
          input.source,
          now,
        ],
      );
      const id = (result.rows?.[0] as { id?: string } | undefined)?.id;
      return { success: true, id };
    } catch (error) {
      console.error(
        "[lead-store:postgres] insert failed:",
        error instanceof Error ? error.message : "unknown",
      );
      return { success: false, error: "Failed to store lead" };
    }
  }

  async setStatus(id: string, status: LeadStatus): Promise<void> {
    const pool = await this.getPool();
    await pool.query(`UPDATE leads SET status = $1, updated_at = now() WHERE id = $2`, [
      status,
      id,
    ]);
  }
}
