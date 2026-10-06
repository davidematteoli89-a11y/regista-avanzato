# Full Public Path Verification Stabilization — P90-B

## Scope

- dry-run stabilization only;
- no UI product change;
- no merge main;
- no deploy;
- no Production touch;
- no DB write;
- no provider/import;
- no Apify;
- no Vercel/env/root directory change;
- no `.env.local` read/printed;
- no token/cookie/header printed.

## Context

P90 was stopped before merge/deploy because `npm run dry-run:full-public-path-verification` saw the local public path as empty/unexpected.

P90-A diagnosed that:

- public readers and visibility were not broken;
- `PUBLIC_VISIBILITY` still resolves to `public_free`;
- there were no app/components/lib/scripts changes after P88;
- the same dry-run passed when the local Next runtime was active;
- P90 remained blocked until the dry-run became more diagnostic and stable.

## Script changes

Updated file:

- `scripts/provider/fullPublicPathVerificationDryRun.ts`

The dry-run now reports route-level diagnostic states instead of collapsing failures into a generic `dry_run_pass=false`.

Diagnostic states:

- `server_unreachable`;
- `route_http_error`;
- `empty_public_dataset`;
- `data_visible`;
- `markup_unexpected`;
- `detail_not_found`;
- `verification_passed`.

For each route, the script now reports:

- checked URL;
- HTTP status;
- route reachable true/false;
- public data indicators found true/false;
- expected slug found true/false;
- visible competition count when extractable from the public page;
- detail state;
- concise reason.

Important distinction:

- server not reachable is now `server_unreachable`, not “0 public competitions”;
- public empty state is `empty_public_dataset` or `detail_not_found`;
- visible promoted data is `data_visible`;
- unknown markup remains a hard fail with `markup_unexpected`.

The dry-run still fails when the path is not actually verifiable. P90-B does not make the verification pass automatically.

## Verification without server

| Check | Result | Notes |
| --- | --- | --- |
| `npm run dry-run:full-public-path-verification` without local server | failed as expected | `home_state=server_unreachable`, `competitions_page_state=server_unreachable`, `competition_detail_state=server_unreachable`, `dry_run_pass=false`. |

This is the intended safe behavior: no local runtime is clearly reported as unavailable and is not confused with a real empty public dataset.

## Verification with server

| Route | Expected | Result | Notes |
| --- | --- | --- | --- |
| `/` | HTTP 200 | HTTP 200 | `home_state=verification_passed`, link to `/competitions` present. |
| `/competitions` | HTTP 200, data visible | HTTP 200, `data_visible` | `competitions_page_state=data_visible`, detail link present. |
| `/competitions/manual-serie-a` | HTTP 200, data visible | HTTP 200, `data_visible` | Teams, standings and back link verified. |

With the local server active:

- `dry_run_pass=true`;
- `competitions_route_reachable=true`;
- `competition_detail_route_reachable=true`;
- `private_admin_publicly_exposed=false`;
- `public_routes_admin_links_visible=false`;
- `public_routes_debug_payload_visible=false`;
- `public_routes_operational_buttons=false`.

## Safety

- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `rollback_executed=false`
- `provider_fetch=false`
- `external_provider_fetch=false`
- `service_role_used=false`
- `env_local_read=false`
- `token_printed=false`
- `cookies_printed=false`
- `headers_printed=false`

## Decision

- `point_90b_full_public_path_verification_stabilized=true`
- `full_public_path_dry_run_diagnostic_states=true`
- `p90_can_be_retried=true`
- `production_polish_released=false`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
