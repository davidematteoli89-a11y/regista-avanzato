# Preview Public Data Visibility Diagnosis Checklist — P90-A

## Diagnosis checklist

- [x] P90 stop condition reproduced.
- [x] Dry-run script identified.
- [x] Markup/test selectors checked.
- [x] Public reader/visibility checked.
- [x] P88→P90 diff checked.
- [x] Diagnosis category assigned.
- [x] Fix recommendation prepared.

## Safety checklist

- [x] No merge.
- [x] No deploy.
- [x] Production untouched.
- [x] No DB write.
- [x] No rollback.
- [x] Provider/import off.
- [x] Apify off.
- [x] No `.env.local` read/printed.
- [x] No token/cookie/header printed.
- [x] No service_role used.

## Evidence checklist

- [x] `origin/preview=09da7147c86e1614d91779ae07281641643dcb7b`.
- [x] `origin/main=690742762615b6cd5dcd434d1635968269a9dacd`.
- [x] `dry-run:full-public-path-verification` can fail without required local runtime.
- [x] Same dry-run passed in P90-A with dev server active.
- [x] Diff P88→HEAD contains only docs P89.
- [x] Public readers still use `public_free`.
- [x] Routes still use public readers.

## Markers

- `point_90a_preview_public_data_visibility_diagnosis_completed=true`
- `p90_remains_blocked=true`
- `p90b_recommended=true`
- `diagnosis_category=fixture_local_data_not_available_in_this_execution`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
