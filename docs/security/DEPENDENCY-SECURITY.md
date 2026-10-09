# DEPENDENCY-SECURITY

## Next.js Version

| Field | Value |
| --- | --- |
| Previous version | 16.3.7 |
| Current version | 16.3.8 |
| Minimum required | 16.3.8 |
| Security release date | 2026-09-30 |
| LTS line | Active |

## Upgrade History

| Date | From | To | Reason |
| --- | --- | --- | --- |
| 2026-10-01 | 16.3.7 | 16.3.8 | Security release (September 30, 2026) |

## Policy

- `npm audit` runs on install and in CI.
- Security patches are applied before new feature work.
- No destructive automated upgrades without review.
- Lockfile integrity: `npm ci` in CI.
- Dependency set is intentionally small and maintained.

## Verification

```bash
npm install
npm audit
npm run lint
npm run typecheck
npm run test
npm run build
npm run verify:headers
npm run seo:check
```
