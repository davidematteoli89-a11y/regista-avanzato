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
