# Public Exposure Safety Checklist — P50

## Before creating public routes

- [ ] Visibility policy documented.
- [ ] Public reader separated from admin reader.
- [ ] No `service_role`.
- [ ] No provider fetch.
- [ ] No import activation.
- [ ] No `private_admin` fallback.
- [ ] Empty state defined.
- [ ] Incognito test defined.

## Before changing visibility

- [ ] Explicit user authorization.
- [ ] Exact rows/scope known.
- [ ] Rollback plan.
- [ ] Post-change verification.
- [ ] Admin verification.
- [ ] Public verification.
- [ ] Incognito verification.
- [ ] No deploy unless separately authorized.

## Before deploy

- [ ] Public routes reviewed.
- [ ] `private_admin` not exposed.
- [ ] Provider/import off.
- [ ] Apify off.
- [ ] No secrets staged.
- [ ] `lint`, `typecheck`, `build` passed.
- [ ] No unexpected DB writes.
- [ ] Production deployment separately authorized.

## Punto 50 status

- `point_50_public_exposure_policy_plan_created=true`
- `public_exposure_policy_mode=plan_only`
- `public_exposure_enabled=false`
- `private_admin_publicly_exposed=false`
- `visibility_changed=false`
- `public_routes_enabled=false`
- `public_readers_implemented=false`
- `db_write=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `service_role_used=false`

## Punto 51 status

- `point_51_public_reader_design_dry_run_created=true`
- `public_reader_design_mode=dry_run_only`
- `public_readers_implemented=false`
- `public_reader_skeleton_operational=false`
- `public_routes_enabled=false`
- `public_routes_created=false`
- `public_reader_connected_to_routes=false`
- `private_admin_publicly_exposed=false`
- `visibility_changed=false`
- `point_51_db_write=false`
- `provider_fetch=false`
- `external_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `service_role_used=false`

## Punto 52 status

- `point_52_public_reader_contract_skeleton_created=true`
- `public_reader_contract_mode=contract_skeleton_only`
- `public_readers_implemented=false`
- `public_reader_operational=false`
- `public_reader_skeleton_operational=false`
- `public_routes_enabled=false`
- `public_routes_created=false`
- `public_reader_connected_to_routes=false`
- `supabase_queries_implemented=false`
- `admin_reader_imported=false`
- `private_admin_publicly_exposed=false`
- `visibility_changed=false`
- `point_52_db_write=false`
- `provider_fetch=false`
- `external_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `service_role_used=false`
