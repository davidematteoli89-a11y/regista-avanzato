# Vercel Production Promote Checklist — P99-D

## Authorization and target

- [x] Authorization received.
- [x] Project verified.
- [x] Repo verified.
- [x] Domain verified.
- [x] Target deployment id verified.
- [x] Target commit verified.
- [x] Target READY verified.

## Action

- [x] Promote/assign executed.
- [x] Domain assigned to target.
- [x] No new deployment generated.
- [x] No Vercel config/env/root changes.

## Production verification

- [x] `/` verified.
- [x] `/manifesto` verified.
- [x] `/rubriche` verified.
- [x] `/competitions` verified.
- [x] `/competitions/manual-serie-a` verified.
- [x] Public data visible.
- [x] Editorial pages visible.
- [x] No private_admin exposure.
- [x] No admin links.
- [x] No debug/raw payload.
- [x] No operational buttons.
- [x] No invented Substack URL.
- [x] No Substack auto-publishing.

## Safety

- [x] No DB write.
- [x] Provider/import off.
- [x] Apify off.
- [x] No Vercel config/env/root changes.
- [x] Rollback not executed.

## Decision markers

- `point_99d_vercel_production_promote_completed=true`
- `production_editorial_pages_released=true`
- `p99_recovered_after_alias_promote=true`
- `production_deploy_verified=true`
- `target_deployment_assigned_to_domain=true`
- `editorial_pages_visible=true`
- `public_data_visible=true`
- `no_deploy_config_change=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `vercel_config_changed=false`
- `vercel_env_changed=false`
- `vercel_root_directory_changed=false`
- `substack_auto_published=false`
- `rollback_executed=false`
- `p100_recommended=post_production_editorial_pages_verification`
