# Punto 29 — Manual import migration candidate sources review

Stato: review documentale, no-apply/no-write.

## Competitions

Source table/view candidata:

- `public.competitions`

Evidenza locale:

- tabella presente in `supabase/migrations/0001_base_schema.sql`;
- colonne documentate in `docs/manual_import_local_schema_source_inventory_p24.md`;
- field mapping P24/P27 usa `api_competition_id`, `slug`, `name`, `country`, `season`.

Colonne candidate:

- `id`
- `internal_key`
- `api_competition_id`
- `slug`
- `name`
- `country`
- `continent`
- `season`
- `tracking_level`
- `update_frequency`
- `status`
- `visibility`

Colonne non confermate live:

- tutte, finché non viene eseguita conferma dashboard/read-only staging.

Rischio naming mismatch:

- medio: `provider_competition_id` fixture potrebbe mappare a `api_competition_id`, `internal_key` o mapping manuale.

Dedup key candidata:

- `slug + season`
- alternativa da confermare: `internal_key + season`

Status finale:

- `needs_dashboard_confirmation`

## Teams

Source table/view candidata:

- `public.teams`

Evidenza locale:

- tabella presente in `supabase/migrations/0001_base_schema.sql`;
- colonne documentate in P21/P24;
- indici provider e dedup documentati localmente.

Colonne candidate:

- `id`
- `competition_id`
- `source_provider_id`
- `api_team_id`
- `slug`
- `name`
- `short_name`
- `country`
- `status`
- `visibility`

Colonne non confermate live:

- tutte, finché non viene eseguita conferma dashboard/read-only staging.

Rischio naming mismatch:

- medio: `provider_team_id` fixture può mappare a `api_team_id`, ma dedup primaria potrebbe essere `competition_id + slug`.

Dedup key candidata:

- `competition_id + slug`
- alternativa provider solo se `source_provider_id + api_team_id` è confermata e non nullable.

Status finale:

- `needs_dashboard_confirmation`

## Standings

Source table/view candidata:

- `public.standings`

Evidenza locale:

- tabella presente in `supabase/migrations/0001_base_schema.sql`;
- colonne `rank`, `won`, `drawn`, `lost`, `goal_difference` documentate;
- mapping fixture `wins/draws/losses` → `won/drawn/lost` già classificato come deterministico.

Colonne candidate:

- `id`
- `competition_id`
- `team_id`
- `source_provider_id`
- `season`
- `stage`
- `matchday`
- `rank`
- `played`
- `won`
- `drawn`
- `lost`
- `goals_for`
- `goals_against`
- `goal_difference`
- `points`
- `status`
- `visibility`

Colonne non confermate live:

- tutte, finché non viene eseguita conferma dashboard/read-only staging.

Rischio naming mismatch:

- basso/medio: `rank` è coerente; `wins/draws/losses` richiedono rename; `goal_difference` richiede policy confermata.

Dedup key candidata:

- `competition_id + season + stage + matchday + team_id`

Status finale:

- `needs_dashboard_confirmation`

## Decisione conservativa

Nessuna area è `ready_for_migration_draft` perché manca conferma live dashboard/read-only di tabelle, colonne, grants/RLS e helper in contesto view.

`next_write_allowed=false`.

## Dashboard confirmation P30-B

La conferma dashboard non è stata completata da Codex.

Status aggiornato:

- Competitions: `needs_dashboard_confirmation`
- Teams: `needs_dashboard_confirmation`
- Standings: `needs_dashboard_confirmation`
- RLS/policy: `needs_dashboard_confirmation`
- Views: `needs_dashboard_confirmation`

`ready_for_migration_draft=false`.

## Manual schema values collection P30-C

- schema values collection prepared: `true`
- real schema values provided: `false`
- placeholders resolved count: `0`
- placeholders uncollected count: `16`
- ready for migration draft: `false`
- next_write_allowed: `false`
- recommended next step: user provides real schema values from dashboard

Le candidate source restano candidate: tabelle, colonne, FK, RLS/policy e view devono essere raccolte dal Dashboard prima di generare qualunque draft eseguibile.

## Local migration schema extraction P30-D

- local schema extraction completed: `true`
- Supabase Dashboard used: `false`
- DB query executed: `false`
- DB write: `false`
- service_role used: `false`
- placeholders resolved from local files count: `16`
- placeholders unresolved count: `0`
- placeholders unclear count: `0`
- ready for migration draft: `true`
- next_write_allowed: `false`

Le candidate source sono ora confermate come schema locale versionato. Resta separata qualunque conferma live o applicazione DB.
