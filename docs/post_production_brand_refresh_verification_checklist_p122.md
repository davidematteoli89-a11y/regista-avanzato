# Post-production Brand Refresh Verification Checklist — P122

## Production routes

- [x] Production homepage verified;
- [x] Production manifesto verified;
- [x] Production rubriche verified;
- [x] Production competitions verified;
- [x] Production manual-serie-a verified;
- [x] Production chi-siamo verified;
- [x] Production account verified;
- [x] Production metodo verified.

## Data and safety

- [x] public data visible;
- [x] no private/admin/debug/raw exposed;
- [x] no operational buttons;
- [x] no Substack URL invented;
- [x] no Substack integration;
- [x] no DB write;
- [x] no provider/import;
- [x] no Apify;
- [x] no deploy;
- [x] no merge.

## Brand

- [ ] full brand refresh visible;
- [x] no green leftovers detected by HTTP scan;
- [ ] logo asset confirmed in Production;

Observed issues:

- old navigation/header markers are still visible in Production;
- `/regista-avanzato-logo.png` returned 404;
- P116/P117 home headline was not detected on Production.

## Local verification commands

- [x] final-env passed;
- [x] audit providers passed;
- [x] writer guards passed;
- [x] lint passed;
- [x] typecheck passed;
- [x] build passed;
- [x] full-public-path-verification passed locally.

## Decision markers

- `point_122_post_production_brand_refresh_verification_completed=true`
- `post_production_brand_refresh_verification_ready=true`
- `production_routes_verified=true`
- `production_brand_visible=false`
- `production_public_data_visible=true`
- `production_safety_verified=true`
- `production_commit_verified=unknown_metadata_unavailable`
- `brand_refresh_production_closed=false`
- `private_admin_publicly_exposed=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `site_integration_done=false`
- `publication_ready=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
