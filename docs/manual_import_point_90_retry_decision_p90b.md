# Manual Import Point 90 Retry Decision — P90-B

## Context

P90-A diagnosed the P90 stop condition as a local runtime/data availability issue rather than a product regression.

P90-B stabilized `npm run dry-run:full-public-path-verification` so it now distinguishes:

- local server not reachable;
- HTTP errors;
- empty public dataset;
- detail not found;
- data visible;
- unexpected markup.

## Options

### A. Retry P90 — Merge preview to main + Production polish deploy

Objective:

- repeat P90 after dry-run stabilization;
- require fresh explicit authorization;
- keep provider/import/Apify off;
- keep DB write additional false;
- keep Production deploy scope limited to public product polish.

Recommended only if:

- local server is active;
- `npm run dry-run:full-public-path-verification` passes;
- final env checklist, providers audit, writer guards, lint, typecheck and build pass.

### B. More dry-run hardening

Objective:

- improve verification diagnostics further before release;
- no merge/deploy;
- no Production touch.

Use if P90-B diagnostics still leave ambiguity.

### C. Continue monitoring only

Objective:

- stop release workflow;
- keep current Production unchanged.

Use if release risk is no longer acceptable.

## Recommended decision

Recommended option: A — retry P90, but only after renewed explicit authorization and with the stabilized dry-run passing with the local server active.

## Markers

- `point_90b_full_public_path_verification_stabilized=true`
- `p90_can_be_retried=true`
- `generic_proceed_authorizes_deploy=false`
- `fresh_p90_authorization_required=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
