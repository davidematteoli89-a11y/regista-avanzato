# Legacy Marker Update Checklist — P119

## Script update

- [x] dry-run script identified;
- [x] legacy home marker identified;
- [x] new home marker added;
- [x] no UI code changed.

## Public route safety

- [x] public routes still verified;
- [x] public data still visible;
- [x] manual-serie-a still visible;
- [x] no private/admin/debug/raw exposed;
- [x] no operational buttons exposed.

## Verification

- [x] full-public-path-verification passed;
- [x] final-env passed;
- [x] audit providers passed;
- [x] writer guards passed;
- [x] lint passed;
- [x] typecheck passed;
- [x] build passed.

## Safety

- [x] no Substack URL invented;
- [x] no Substack integration;
- [x] no provider calls;
- [x] no DB write;
- [x] no deploy;
- [x] no merge;
- [x] Production untouched.

## Decision markers

- `point_119_legacy_marker_update_completed=true`
- `legacy_marker_update_ready=true`
- `code_change=true`
- `ui_code_change=false`
- `dry_run_full_public_path_passed=true`
- `legacy_marker_false_negative=false`
- `public_routes_verified=true`
- `public_data_visible=true`
- `private_admin_publicly_exposed=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `site_integration_done=false`
- `publication_ready=false`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
