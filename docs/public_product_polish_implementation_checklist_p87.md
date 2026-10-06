# Public Product Polish Implementation Checklist — P87

## UI/copy checklist

- [x] Homepage polished.
- [x] `/competitions` page polished.
- [x] Competition detail polished.
- [x] CTA `/competitions` present.
- [x] Newsletter CTA does not invent URL.
- [x] MVP/manual data microcopy present.
- [x] Public data still visible.
- [x] Copy less technical and more editorial.
- [x] No private_admin exposure.
- [x] No admin links added.
- [x] No debug/raw payload.
- [x] No operational buttons.

## Safety checklist

- [x] No DB write.
- [x] No rollback.
- [x] No provider/import.
- [x] No Apify.
- [x] No deploy.
- [x] No merge main.
- [x] No Production touch.
- [x] No Vercel config/env/root directory changes.
- [x] No schema/RLS/migration changes.
- [x] No service_role usage added.
- [x] No `.env.local` read/printed.

## Verification checklist

- [x] `dry-run:final-env-checklist` required.
- [x] `dry-run:full-public-path-verification` required.
- [x] `audit:providers` required.
- [x] `dry-run:provider-writer-guards` required.
- [x] `lint` required.
- [x] `typecheck` required.
- [x] `build` required.

## Markers

- `point_87_public_product_polish_implemented=true`
- `public_product_polish_implemented=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
