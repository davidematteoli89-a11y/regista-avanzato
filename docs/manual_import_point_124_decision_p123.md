# Manual Import Point 124 Decision — P123

## Context

P123 diagnosed the Production brand refresh issue without deploy, merge, DB write, provider/import, Apify or Production modification.

Root cause:

- `production_alias_points_to_old_deployment`

The Production domain `regista-avanzato-rouge.vercel.app` still serves deployment `dpl_C8icKQYUPNxvhELo9e9b2LkQ4Up4`, tied to commit `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83`, while READY main deployments exist for the brand refresh commits.

## P124 options

### A. P124 — Production alias assignment to brand refresh deployment

Objective:

- assign the Production domain to the correct READY deployment only after explicit separate authorization.

Use when:

- main contains the brand refresh;
- local main build is correct;
- READY deployment exists for the brand refresh main commit;
- Production domain points to an older deployment.

### B. P124 — Repair main brand refresh missing files

Objective:

- repair main/preview if brand refresh files or logo are missing.

Current P123 result: not selected, because main contains the brand refresh and logo.

### C. P124 — Trigger or repair Production deploy

Objective:

- trigger or repair deploy if no READY deployment exists.

Current P123 result: not selected, because READY deployments exist for the relevant main commits.

### D. P124 — Repair logo asset build

Objective:

- repair the logo asset if UI is refreshed but only the logo is missing.

Current P123 result: not selected as primary, because Production serves an old commit where the full brand refresh is absent.

### E. P124 — Manual Vercel dashboard check

Objective:

- manually verify Vercel dashboard when metadata is unavailable.

Current P123 result: optional cross-check only; metadata was available read-only.

## Recommended decision

`p124_recommended=production_alias_assignment_to_brand_refresh_deployment`

This requires explicit separate authorization and must not be inferred from a generic “procedi”.
