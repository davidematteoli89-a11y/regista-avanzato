# Merge Deploy Brand Refresh — P121

## Scope

- merge preview to main;
- push main;
- deploy/assign Production;
- post-deploy verification;
- no DB write;
- no provider/import;
- no Apify;
- no Substack integration.

## Authorization

User authorization received:

> Autorizzo P121 — Merge preview to main and deploy brand refresh.

Authorized:

- merge preview → main;
- push su main;
- deploy/assegnazione Production;
- verifica post-deploy.

Candidate commit authorized:

- `d9266d1b9ee9a62b3aa44e39445bdea94bf0ebbe`

Current main at start:

- `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83`

## Pre-merge verification

| Check | Result |
|---|---|
| branch before merge | `preview` |
| `origin/main` before merge | `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` |
| `origin/preview` before merge | `f14548d269b06d092c94255d98bbabc1cdf31d2f` |
| candidate ancestor check | passed |
| post-candidate diff check | passed |
| post-candidate diff scope | docs P120 only |
| forbidden post-candidate app/config/env changes | none |

Post-candidate files after `d9266d1b9ee9a62b3aa44e39445bdea94bf0ebbe`:

- `docs/production_release_gate_brand_refresh_p120.md`
- `docs/production_release_gate_brand_refresh_checklist_p120.md`
- `docs/manual_import_point_121_decision_p120.md`
- `docs/provider_point_120_closure.md`
- `docs/production_readiness.md`
- `docs/c_phase_progress.md`
- `docs/supabase_staging_next_steps.md`

Final pre-merge checks:

- `dry-run:full-public-path-verification`: passed;
- `dry-run:final-env-checklist`: passed;
- `audit:providers`: passed;
- `dry-run:provider-writer-guards`: passed;
- `lint`: passed;
- `typecheck`: passed;
- `build`: passed.

## Merge result

| Item | Value |
|---|---|
| main_before_merge | `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` |
| preview_head_at_merge | `f14548d269b06d092c94255d98bbabc1cdf31d2f` |
| main_after_merge | `374ee02d846dc1604b8529d3fb5e3676fe2e1a84` |
| pushed_main_commit | `374ee02d846dc1604b8529d3fb5e3676fe2e1a84` |
| merge strategy | `--no-ff` |
| conflicts | no |

Post-merge checks on main:

- `dry-run:full-public-path-verification`: passed;
- `lint`: passed;
- `typecheck`: passed;
- `build`: passed.

## Deployment result

| Item | Value |
|---|---|
| production domain | `https://regista-avanzato-rouge.vercel.app/` |
| production_deployed | `true` |
| production_assignment_done | `true` |
| assignment mode | automatic Git production deploy / domain serving updated |
| deployment id | `unavailable_from_local_cli_inspection` |
| production_commit_verified | `unknown_metadata_unavailable` |

The Production domain served the brand refresh and public data after the main push. No Vercel env/config/root directory changes were made.

## Production verification

| Route | Status | Brand visible | Data visible | Issues |
|---|---:|---|---|---|
| `/` | 200 | yes | not applicable | none |
| `/manifesto` | 200 | yes | not applicable | none |
| `/rubriche` | 200 | yes | not applicable | none |
| `/competitions` | 200 | yes | yes | none |
| `/competitions/manual-serie-a` | 200 | yes | yes | none |
| `/chi-siamo` | 200 | yes | not applicable | none |
| `/account` | 200 | yes | not applicable | none |
| `/metodo` | 200 | yes | not applicable | none |

Production safety checks:

- `private_admin_publicly_exposed=false`;
- admin/debug/raw visible: false;
- operational buttons visible: false;
- Substack placeholder URL visible: false;
- public data visible on `/competitions`: true;
- public data visible on `/competitions/manual-serie-a`: true.

## Safety

- no DB write;
- no provider/import;
- no Apify;
- no Supabase changes;
- no env changes;
- no Vercel config changes;
- no Substack integration;
- no invented Substack URL;
- no social/newsletter publication;
- no secrets printed;
- private_admin not exposed;
- no admin/debug/raw/operational buttons.

## Decision

- `point_121_merge_deploy_brand_refresh_completed=true`
- `merge_deploy_brand_refresh_ready=true`
- `merge_executed=true`
- `main_pushed=true`
- `production_deployed=true`
- `production_assignment_done=true`
- `candidate_preview_commit=d9266d1b9ee9a62b3aa44e39445bdea94bf0ebbe`
- `preview_head_at_merge=f14548d269b06d092c94255d98bbabc1cdf31d2f`
- `main_before_merge=8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83`
- `main_after_merge=374ee02d846dc1604b8529d3fb5e3676fe2e1a84`
- `pushed_main_commit=374ee02d846dc1604b8529d3fb5e3676fe2e1a84`
- `production_commit_verified=unknown_metadata_unavailable`
- `production_routes_verified=true`
- `production_brand_visible=true`
- `production_public_data_visible=true`
- `private_admin_publicly_exposed=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `site_integration_done=false`
- `publication_ready=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `p122_recommended=post_production_brand_refresh_verification`
