# Production Polish Release Retry Checklist — P90

## Release checklist

- [x] Authorization received.
- [x] Stabilized dry-run available.
- [x] Preview candidate verified.
- [x] Main baseline verified.
- [x] Pre-merge checks passed.
- [x] Full-public-path verification passed with server on preview.
- [x] Merge executed.
- [x] Post-merge checks passed.
- [x] Full-public-path verification passed with server on main.
- [x] Main pushed.
- [x] Production deploy observed.
- [x] Home route verified.
- [x] Competitions route verified.
- [x] Detail route verified.
- [x] Public data visible.
- [x] Polish visible.

## Safety checklist

- [x] No private_admin exposure.
- [x] No admin links.
- [x] No debug/raw payload.
- [x] No operational buttons.
- [x] No DB write.
- [x] Provider/import off.
- [x] Apify off.
- [x] No Vercel config/env/root changes.
- [x] Rollback not executed.
- [x] No token/cookie/header printed.
- [x] No `.env.local` values printed.

## Markers

- `point_90_retry_production_polish_release_completed=true`
- `production_polish_released=true`
- `merge_executed=true`
- `main_pushed=true`
- `production_deploy_verified=true`
- `stabilized_dry_run_used=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `vercel_config_changed=false`
- `vercel_env_changed=false`
- `vercel_root_directory_changed=false`
- `rollback_executed=false`
