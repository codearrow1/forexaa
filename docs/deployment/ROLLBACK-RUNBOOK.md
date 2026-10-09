# ROLLBACK RUNBOOK

How to roll back a FOREXAA.com launch. Every rollback action is explicit and
owner-executed.

## Application rollback

1. **Re-deploy the previous known-good build** to the hosting platform.
2. **Verify** the previous build serves correctly (spot-check `/`, `/contact`,
   `verify:headers`).
3. **Confirm** the CSP nonce and hydration work on the rolled-back build
   (`npm run browser:qa`).

The application is stateless (no in-memory lead data), so rolling back the
binary/build is sufficient for the app tier.

## Database migration considerations

- The lead-store migration is **forward-only** and **non-destructive**
  (`CREATE ... IF NOT EXISTS`). It does not modify or delete existing data.
- **There is no automatic down-migration.** Rolling back the schema is not
  required for an application rollback (the old app works with the new schema).
- If a schema revert is ever required, it is a **destructive, owner-authorized
  action** with a confirmed backup. It is intentionally not automated.

## Email rollback

- If email delivery is failing, the contact path already degrades safely: the
  lead is persisted (DB) or recorded (email fallback), and the user sees a safe
  error. No email data is lost.
- To "roll back" email, remove the `SMTP_*` values — the app returns to the
  console/degraded provider. This is a configuration change, not a code change.

## Rate limiter rollback

- If the shared rate limiter is misbehaving, remove `RATE_LIMIT_URL` +
  `RATE_LIMIT_TOKEN`. The app falls back to in-memory (degraded, single-
  instance) and logs a warning. This is a launch blocker, so it should be
  restored, not left degraded.

## DNS considerations

- DNS changes are **owner-executed** and not part of this repository.
- If the domain needs to point back to a previous environment, the owner updates
  DNS. Allow for TTL propagation.

## Post-rollback verification

After any rollback, re-run:

```bash
npm run verify:headers
npm run seo:check
npm run browser:qa
npm run production:preflight
```

Confirm the rolled-back state is secure and functional before considering the
rollback complete.

## Honest limitations

- The repository does not provide automated rollback infrastructure.
- Database rollback is not automatically reversible (forward-only migration).
- This runbook documents the procedure; it does not execute it.
