# Full Public Path Verification Stabilization Checklist — P90-B

## Stabilization checklist

- [x] P90-A diagnosis reviewed.
- [x] Script updated.
- [x] `server_unreachable` distinguished.
- [x] `empty_public_dataset` distinguished.
- [x] `data_visible` distinguished.
- [x] Without-server behavior verified.
- [x] With-server behavior verified.
- [x] Full public path verification passes with server.
- [x] No UI product change.
- [x] No public reader/filter change.

## Safety checklist

- [x] Final env checklist passed.
- [x] Providers audit passed.
- [x] Writer guards passed.
- [x] Lint/typecheck/build passed.
- [x] No merge.
- [x] No deploy.
- [x] Production untouched.
- [x] No DB write.
- [x] Provider/import off.
- [x] Apify off.
- [x] No `.env.local` read/printed.
- [x] No token/cookie/header printed.

## Markers

- `point_90b_full_public_path_verification_stabilized=true`
- `full_public_path_dry_run_diagnostic_states=true`
- `p90_can_be_retried=true`
- `production_polish_released=false`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
