-- Minimal lead persistence schema (Phase 6). Postgres 13+.
-- Idempotent: safe to run repeatedly.

CREATE TABLE IF NOT EXISTS leads (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  intent         text NOT NULL DEFAULT 'general',
  business_type  text NOT NULL,
  interest       text NOT NULL,
  name           text NOT NULL,
  business_email text NOT NULL,
  company        text NOT NULL,
  country        text NOT NULL,
  message        text NOT NULL DEFAULT '',
  source         text NOT NULL DEFAULT 'contact-form',
  status         text NOT NULL DEFAULT 'new'
                 CHECK (status IN ('new','contacted','qualified','closed','archived')),
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
-- Fast duplicate-lookup within the short dedup window.
CREATE INDEX IF NOT EXISTS idx_leads_email_company ON leads (business_email, company);
