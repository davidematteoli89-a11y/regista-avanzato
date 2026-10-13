# Preview Brand Verification Checklist — P118

## Route coverage

- [x] homepage verified;
- [x] manifesto verified;
- [x] rubriche verified;
- [x] competitions verified;
- [x] manual-serie-a verified;
- [x] chi-siamo verified;
- [x] account verified;
- [x] metodo verified.

## Responsive coverage

- [x] mobile verified;
- [x] tablet verified;
- [x] desktop verified.

Verification mode:

- local route checks;
- static responsive CSS/code inspection;
- no screenshots required for P118.

## Brand coverage

- [x] no green leftovers;
- [x] logo visible;
- [x] navbar coherent;
- [x] footer coherent;
- [x] homepage coherent;
- [x] Manifesto coherent;
- [x] Rubriche coherent;
- [x] Competitions coherent;
- [x] Chi siamo coherent;
- [x] Account coherent;
- [x] Metodo coherent;
- [x] text readable;
- [x] CTA readable;
- [x] contrast acceptable for documented palette.

## Public data and safety

- [x] public data visible;
- [x] no private/admin/debug/raw;
- [x] no Substack URL invented;
- [x] no Substack integration;
- [x] no provider calls;
- [x] no DB write;
- [x] no deploy;
- [x] no merge;
- [x] Production untouched.

## Verification commands

- [x] final-env passed;
- [x] audit providers passed;
- [x] writer guards passed;
- [x] lint passed;
- [x] typecheck passed;
- [x] build passed;
- [x] full public path verification executed.

## Known residual

- [x] `legacy_marker_false_negative=true`;
- [x] `home_state=markup_unexpected`;
- [x] route checks confirm the real public routes work.

## Decision markers

- `point_118_preview_brand_verification_completed=true`
- `preview_brand_verification_ready=true`
- `code_change=false`
- `public_routes_verified=true`
- `public_data_visible=true`
- `responsive_verified=true`
- `brand_visual_verified=true`
- `green_leftovers_removed=true`
- `legacy_marker_false_negative=true`
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
