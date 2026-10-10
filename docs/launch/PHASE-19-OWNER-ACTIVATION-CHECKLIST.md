> **Document provenance:** Reconstructed from the owner-provided Phase 19 Final Report. These are OWNER-REPORTED blockers, not independently verified.

# Phase 19 — Owner Activation Checklist

## Status: BLOCKED — await owner-supplied configuration

### Owner-infrastructure blockers (4 reported)

| # | Requirement | Variable(s) | Owner action | Safe verification | Status |
|---|---|---|---|---|---|
| 1 | PostgreSQL | `DATABASE_URL` | Supply production DB connection string via provider secret manager | Rerun `npm run production:preflight`; confirm 0 blockers in DB category | BLOCKED |
| 2 | Shared rate limit | `RATE_LIMIT_URL`, `RATE_LIMIT_TOKEN` | Configure production Redis-backed rate-limit service + token | Confirm connectivity + auth without exhausting quotas | BLOCKED |
| 3 | SMTP delivery | `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM` | Supply production SMTP credentials | Verify via a single controlled message to an approved recipient | BLOCKED |
| 4 | Site URL + verification | `NEXT_PUBLIC_SITE_URL`, Google Search Console token | Set production origin + Search Console token | Confirm canonical/OG/robots render with the live origin | BLOCKED |

### Backup prerequisite (separate requirement)

| Requirement | Owner action | Status |
|---|---|---|
| Backup | Establish and verify a restorable backup before any DB migration | NOT CHECKED |

> The backup prerequisite is reported as `NOT CHECKED` and is **separate** from the four confirmed preflight blockers. Do not describe it as one of the four blockers.

## Notes
- Current `production:preflight` reports 4 blockers and 4 warnings (owner-controlled).
- These values are owner-reported; rerun the preflight to confirm current status before assuming unchanged.
- No secret values are reproduced here.
- Resolving a setting does **not** automatically resolve every preflight check; rerun and confirm.
- Resolution of owner blockers does **not** authorize deployment — deployment requires explicit go-ahead and final preflight confirmation of `0 blocker(s)`.
