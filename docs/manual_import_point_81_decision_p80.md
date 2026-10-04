# Manual Import Point 81 Decision — P80

## Options

### A. P81 — Merge preview → main + Production deploy

Objective: execute the controlled Production release only with the complete explicit authorization phrase.

This option would:

- confirm `preview` HEAD;
- confirm clean working tree;
- merge `preview` into `main`;
- push `main`;
- allow/trigger Production deploy according to the approved strategy;
- run immediate post-production verification.

Recommended only with explicit complete authorization.

### B. P81 — Extra no-deploy production readiness check

Objective: repeat no-deploy readiness checks before merge/deploy.

Recommended if there is uncertainty about Vercel project/root, Production branch mapping, rollback plan or verification timing.

### C. P81 — Stay in Preview

Objective: defer Production and continue polish or validation in Preview.

Safest if Production timing is not urgent.

## Recommended decision

Recommended next step: A only if the user provides the full P81 authorization phrase.

Generic confirmations such as `vai`, `procedi`, `ok` or `continua` do not authorize merge or deploy Production.
