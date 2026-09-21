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
