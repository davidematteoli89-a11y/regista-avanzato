# Post Alias Assignment Production Verification — P125

## Scope

- post-alias verification only;
- document P124 result;
- no merge;
- no deploy;
- no additional Production changes;
- no DB write;
- no provider/import;
- no Apify;
- no Substack integration.

## Current baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app` |
| P124 assigned deployment | `dpl_4kQYEV8dX8StepSoNb9a1TEqsBXh` |
| Previous deployment | `dpl_C8icKQYUPNxvhELo9e9b2LkQ4Up4` |
| Current Production commit | `1f4942f834da54bf336145e3d9cd07e44effae66` |
| Previous Production commit | `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` |
| Substack status | `not_created_or_not_confirmed` |
| Canva asset status | `partial_manual` |

## P124 alias assignment result

P124 assigned `regista-avanzato-rouge.vercel.app` to the existing READY deployment `dpl_4kQYEV8dX8StepSoNb9a1TEqsBXh`, built from commit `1f4942f834da54bf336145e3d9cd07e44effae66`.

The alias previously pointed to deployment `dpl_C8icKQYUPNxvhELo9e9b2LkQ4Up4`, built from commit `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83`.

- `new_deployment_created=false`
- `merge_executed=false`
- `production_alias_assignment_verified=true`

## Production routes verified

All checks used the Production domain with a P125 cache-busting query parameter.

| Route | Status | Brand visible | Data visible | Issues |
|---|---:|---|---|---|
| `/` | 200 | yes, including `Il calcio raccontato meglio` | not applicable | none |
| `/manifesto` | 200 | yes | not applicable | none |
| `/rubriche` | 200 | yes | editorial labels only | none |
| `/competitions` | 200 | yes | yes, competition visible | none |
| `/competitions/manual-serie-a` | 200 | yes | yes, competition and both teams visible | none |
| `/chi-siamo` | 200 | yes | not applicable | none |
| `/account` | 200 | yes | not applicable | none |
| `/metodo` | 200 | yes | not applicable | none |
| `/regista-avanzato-logo.png` | 200 (`image/png`) | logo asset | not applicable | none |

## Brand verification

- the refreshed homepage headline `Il calcio raccontato meglio` is visible;
- the Production logo asset returns HTTP 200 with `image/png`;
- the refreshed blue/indigo/purple visual system is active;
- no known legacy green color markers were detected by the Production HTML/static source checks;
- the old Production alias issue is resolved;
- `Radar`, `News` and `Articoli`, where present, are intentional editorial labels and are not the primary navigation from the previous release;
- the primary navigation source contains Home, Manifesto, Rubriche and Competitions.

## Data verification

- `/competitions` shows `Serie A Manual Sample`;
- `/competitions/manual-serie-a` shows the public competition data, `Manual Team One` and `Manual Team Two`;
- no `private_admin` content marker was detected;
- no admin link, debug/raw payload or operational write control was detected.

## Safety verification

- `private_admin_publicly_exposed=false`;
- `admin_links_visible=false`;
- `debug_payload_visible=false`;
- `operational_buttons_visible=false`;
- no DB write;
- no provider/import;
- no Apify;
- no Supabase changes;
- no env changes;
- no Vercel config/root changes;
- no new deploy or merge;
- no Substack integration;
- no invented Substack URL;
- no social, newsletter or Substack publication;
- no secrets printed.

## Verification commands

| Command | Result |
|---|---|
| `npm run dry-run:full-public-path-verification` | passed (`dry_run_pass=true`, HTTP 200/200/200, bundle ready) |
| `npm run dry-run:final-env-checklist` | passed (`dry_run_pass=true`, `secrets_hygiene_pass=true`) |
| `npm run audit:providers` | passed (`warnings=0`, external fetches 0, DB writes 0) |
| `npm run dry-run:provider-writer-guards` | passed (`write_attempt_blocked=true`, warnings 0) |
| `npm run lint` | passed |
| `npm run typecheck` | passed |
| `npm run build` | passed |

The full public path verification initially reported `server_unreachable` because the local runtime was not running. It was repeated after starting the local Next runtime and passed. The runtime was stopped after verification.

## Decision

- `point_125_post_alias_assignment_production_verification_completed=true`
- `post_alias_assignment_production_verification_ready=true`
- `production_alias_assignment_verified=true`
- `production_deployment_id=dpl_4kQYEV8dX8StepSoNb9a1TEqsBXh`
- `production_previous_deployment_id=dpl_C8icKQYUPNxvhELo9e9b2LkQ4Up4`
- `production_commit_verified=1f4942f834da54bf336145e3d9cd07e44effae66`
- `production_previous_commit=8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83`
- `production_routes_verified=true`
- `production_brand_visible=true`
- `production_logo_200=true`
- `production_public_data_visible=true`
- `production_safety_verified=true`
- `brand_refresh_production_closed=true`
- `private_admin_publicly_exposed=false`
- `admin_links_visible=false`
- `debug_payload_visible=false`
- `operational_buttons_visible=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `site_integration_done=false`
- `publication_ready=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `p126_recommended=substack_creation_with_real_url_or_canva_a01_revision_export`
