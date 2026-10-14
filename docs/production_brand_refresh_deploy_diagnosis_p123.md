# Production Brand Refresh Deploy Diagnosis — P123

## Scope

- diagnosis only;
- no deploy;
- no merge;
- no Production changes;
- no DB write;
- no provider/import;
- no Apify;
- no Substack integration.

## Current baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| main before brand refresh merge | `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` |
| brand refresh merge commit | `374ee02d846dc1604b8529d3fb5e3676fe2e1a84` |
| docs P121 commit | `1f4942f834da54bf336145e3d9cd07e44effae66` |
| P122 preview docs commit | `5276a2ce0b293c6f8de6dceb5cb3eebb9e645435` |
| P122 result | Production routes/data OK, brand refresh not fully visible |
| Substack status | `not_created_or_not_confirmed` |
| Canva asset status | `partial_manual` |

## Issue

P122 and the P123 cache-busting checks confirmed:

- Production routes return HTTP 200;
- public data is visible on `/competitions` and `/competitions/manual-serie-a`;
- safety checks passed;
- the refreshed home headline `Il calcio raccontato meglio` is not visible on Production;
- old navigation/header markers are still visible on Production;
- `/regista-avanzato-logo.png` returns HTTP 404 on Production.

## Main branch verification

| Check | Result |
|---|---|
| main HEAD inspected | `1f4942f834da54bf336145e3d9cd07e44effae66` |
| brand headline present in main | true |
| `public/regista-avanzato-logo.png` exists in main | true |
| brand palette tokens present | true |
| `components/public/HomeHero.tsx` contains refreshed hero | true |
| old nav markers in `components/public/PublicNavigation.tsx` | false |

Note: strings such as `Radar`, `News` and `Articoli` still exist as intentional editorial content/route labels in other public pages, but not as old navigation markers in `PublicNavigation`.

## Local main verification

Local `main` verification passed:

- `npm run lint`: passed;
- `npm run typecheck`: passed;
- `npm run build`: passed;
- `npm run dry-run:full-public-path-verification`: passed with the local server running;
- `/` returned HTTP 200 and showed `Il calcio raccontato meglio`;
- `/regista-avanzato-logo.png` returned HTTP 200;
- `/competitions` returned HTTP 200 with public data visible;
- `/competitions/manual-serie-a` returned HTTP 200 with public data visible;
- no `private_admin`, admin link, debug/raw payload or operational write buttons were detected.

Markers:

- `local_main_brand_visible=true`
- `local_main_logo_200=true`
- `local_main_old_nav_visible=false`

## Production verification

Cache-busting checks on `https://regista-avanzato-rouge.vercel.app`:

| Route | Status | Brand headline visible | Old markers visible | Public data visible | Safety |
|---|---:|---|---|---|---|
| `/?v=p123` | 200 | false | true | n/a | passed |
| `/manifesto?v=p123` | 200 | false | true | n/a | passed |
| `/competitions?v=p123` | 200 | false | true | true | passed |
| `/competitions/manual-serie-a?v=p123` | 200 | false | true | true | passed |
| `/regista-avanzato-logo.png?v=p123` | 404 | n/a | n/a | n/a | n/a |

Markers:

- `production_home_brand_visible=false`
- `production_logo_200=false`
- `production_old_nav_visible=true`
- `production_public_data_visible=true`
- `production_safety_verified=true`

## Vercel/deployment inspection

Read-only Vercel metadata inspection found:

| Item | Value |
|---|---|
| Vercel project | `regista-avanzato` |
| Project ID | `prj_QjrP39psXIzOsVsJN7nP641e16OQ` |
| Production domain inspected | `regista-avanzato-rouge.vercel.app` |
| Current Production deployment ID | `dpl_C8icKQYUPNxvhELo9e9b2LkQ4Up4` |
| Current Production deployment URL | `regista-avanzato-lhiluf8ee-davide-matteoli.vercel.app` |
| Current Production deployment commit | `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` |
| READY deployment for brand refresh merge | `dpl_2cXLcPGLeHoWEQVpM7cUfKX1Y4Yi` (`374ee02d846dc1604b8529d3fb5e3676fe2e1a84`) |
| READY deployment for P121 docs commit | `dpl_4kQYEV8dX8StepSoNb9a1TEqsBXh` (`1f4942f834da54bf336145e3d9cd07e44effae66`) |
| READY deployment assigned to Production domain | false |
| Likely alias mismatch | true |

The newer main deployments have the `regista-avanzato-git-main-davide-matteoli.vercel.app` alias, while `regista-avanzato-rouge.vercel.app` is still serving the older deployment from `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83`.

## Root cause classification

`production_alias_points_to_old_deployment`

Evidence:

- main contains the brand refresh and logo;
- local `main` build and route checks show the refreshed brand and logo;
- Production domain still serves commit `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83`;
- newer main deployments for `374ee02d846dc1604b8529d3fb5e3676fe2e1a84` and `1f4942f834da54bf336145e3d9cd07e44effae66` exist and are READY;
- those newer deployments are not assigned to `regista-avanzato-rouge.vercel.app`.

## Recommended next step

P124 recommended:

`production_alias_assignment_to_brand_refresh_deployment`

This must require explicit separate authorization before assigning the Production domain to the correct READY deployment.

## Safety

- no deploy;
- no merge;
- no Production changes;
- no DB write;
- no provider/import;
- no Apify;
- no Substack integration;
- no invented Substack URL;
- no secrets printed.

## Decision

- `point_123_production_brand_refresh_deploy_diagnosis_completed=true`
- `production_brand_refresh_deploy_diagnosis_ready=true`
- `code_change=false`
- `diagnosis_only=true`
- `main_contains_brand_refresh=true`
- `logo_file_exists_in_main=true`
- `local_main_brand_visible=true`
- `local_main_logo_200=true`
- `production_home_brand_visible=false`
- `production_logo_200=false`
- `production_old_nav_visible=true`
- `production_public_data_visible=true`
- `production_safety_verified=true`
- `vercel_metadata_available=true`
- `production_domain_current_commit=8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83`
- `ready_deployment_for_main_found=true`
- `ready_deployment_assigned_to_domain=false`
- `root_cause=production_alias_points_to_old_deployment`
- `brand_refresh_production_closed=false`
- `private_admin_publicly_exposed=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `site_integration_done=false`
- `publication_ready=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `p124_recommended=production_alias_assignment_to_brand_refresh_deployment`
