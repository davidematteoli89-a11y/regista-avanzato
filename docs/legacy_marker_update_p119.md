# Legacy Marker Update — P119

## Scope

- update dry-run marker only;
- no public UI change;
- no deploy;
- no merge;
- no Production;
- no DB write;
- no provider/import;
- no Apify;
- no Substack integration.

P119 aggiorna solo il dry-run `full-public-path-verification` per riconoscere il markup home introdotto dal brand refresh P116/P117.

## Current baseline

| Item | Value |
|---|---|
| P118 commit | `54c981828821cb396cc48542d279508a254ed02b` |
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| Substack status | `not_created_or_not_confirmed` |
| Canva asset status | `partial_manual` |
| Legacy marker status before P119 | `legacy_marker_false_negative=true` |
| Branch | `preview` |

## Issue

`npm run dry-run:full-public-path-verification` failed with:

- `dry_run_pass=false`;
- `home_state=markup_unexpected`;
- `private_admin_publicly_exposed=false`.

The real public routes were already verified as working in P118.

## Root cause

The legacy home check expected markers from an older public homepage, including a stale “Esplora le competizioni” text marker.

After P116/P117, the homepage uses the refreshed brand markup with:

- “Regista Avanzato”;
- “Il calcio raccontato meglio”;
- editorial principle badges such as “No betting”;
- links to Manifesto, Rubriche and Competitions.

The dry-run failed because the marker was stale, not because the public path was broken.

## Fix applied

File modified:

- `scripts/provider/fullPublicPathVerificationDryRun.ts`

Legacy home marker replaced:

- removed stale dependency on `Esplora le competizioni`;
- added P116/P117-compatible markers:
  - `Regista Avanzato`;
  - `Il calcio raccontato meglio`;
  - `No betting`;
  - links to `/manifesto`, `/rubriche`, `/competitions`.

Controls kept:

- home must still return HTTP 200;
- competitions route must still show public data;
- detail route must still show public data;
- `private_admin` must not be exposed;
- admin/debug/raw payload must not be visible;
- operational Run/Import/Execute/Sync/Save/Apply buttons must not be visible;
- responsive markers must remain safe.

No UI code was changed.

## Verification

`npm run dry-run:full-public-path-verification` result:

- `dry_run_pass=true`;
- `home_state=verification_passed`;
- `home_http_status=200`;
- `competitions_http_status=200`;
- `competitions_page_state=data_visible`;
- `competition_detail_http_status=200`;
- `competition_detail_state=data_visible`;
- `public_competitions_count=1`;
- `public_teams_count=2`;
- `public_standings_count=2`;
- `public_bundle_status=ready`;
- `private_admin_publicly_exposed=false`;
- `public_routes_admin_links_visible=false`;
- `public_routes_debug_payload_visible=false`;
- `public_routes_operational_buttons=false`.

Additional route checks:

| Route | Status | Safety |
|---|---:|---|
| `/` | 200 | no private/admin/debug/raw/operational buttons |
| `/manifesto` | 200 | no private/admin/debug/raw/operational buttons |
| `/rubriche` | 200 | no private/admin/debug/raw/operational buttons |
| `/competitions` | 200 | no private/admin/debug/raw/operational buttons |
| `/competitions/manual-serie-a` | 200 | no private/admin/debug/raw/operational buttons |
| `/chi-siamo` | 200 | no private/admin/debug/raw/operational buttons |
| `/account` | 200 | no private/admin/debug/raw/operational buttons |
| `/metodo` | 200 | no private/admin/debug/raw/operational buttons |

Command results:

- full-public-path-verification: passed;
- final-env: passed;
- audit providers: passed;
- writer guards: passed;
- lint: passed;
- typecheck: passed;
- build: passed.

## Safety

- `ui_code_change=false`;
- `no_deploy=true`;
- `no_merge=true`;
- `production_touched=false`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `substack_created=false`;
- `substack_url_status=not_created_or_not_confirmed`;
- `site_integration_done=false`;
- `publication_ready=false`;
- `secrets_printed=false`;
- `.env.local_read=false`.

## Decision

- `point_119_legacy_marker_update_completed=true`
- `legacy_marker_update_ready=true`
- `code_change=true`
- `ui_code_change=false`
- `dry_run_full_public_path_passed=true`
- `legacy_marker_false_negative=false`
- `public_routes_verified=true`
- `public_data_visible=true`
- `private_admin_publicly_exposed=false`
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
- `p120_recommended=production_release_gate_for_brand_refresh`
