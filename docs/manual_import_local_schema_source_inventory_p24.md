# Punto 24 — Local schema source inventory

Data: 2026-09-17  
Modalità: no-write, solo file locali, nessuna query Supabase.

## Fonti locali usate

| Fonte | Uso nella review |
|---|---|
| `supabase/schema.sql` | Fonte locale principale per tabelle, colonne, enum, FK e vincoli. |
| `supabase/migrations/0001_base_schema.sql` | Conferma storica del base schema versionato. |
| `supabase/migrations/0009_provider_import_runs.sql` | Contesto logging/import run; non modifica mapping manuale competizioni/squadre/classifiche. |
| `lib/provider/manualFixtures.ts` | Tipi fixture, validazione campi richiesti e reference check locale. |
| `fixtures/provider/manual/competitions.sample.json` | Fixture competizioni manuali. |
| `fixtures/provider/manual/teams.sample.json` | Fixture squadre manuali. |
| `fixtures/provider/manual/standings.sample.json` | Fixture classifiche manuali. |
| `scripts/provider/manualSchemaConfirmationDryRun.ts` | Dry-run schema no-write da aggiornare. |
| `scripts/provider/manualImportReadinessDryRun.ts` | Dry-run readiness no-write da aggiornare. |
| Docs P20/P21/P22/P23 | Piano import manuale, rollback, schema confirmation e motivazione `needs_review`. |

## Tabelle trovate localmente

| Tabella | Stato locale | Note |
|---|---:|---|
| `competitions` | confermata | Include colonne richieste, dedup `(internal_key, season)` e `(slug, season)`. |
| `teams` | confermata | Include `competition_id`, `api_team_id`, `slug`, `name`, `country`; dedup `(competition_id, slug)`. |
| `standings` | confermata | Include FK `competition_id`/`team_id`, stagione/stage/matchday, valori classifica e dedup `(competition_id, season, stage, matchday, team_id)`. |
| `data_providers` | confermata | Necessaria per eventuale provider manuale/source provider, ma non letta dal DB. |
| `provider_competition_config` | confermata | Possibile lookup futuro per external competition id; non interrogata. |

## Colonne confermate

### `competitions`

Confermate localmente: `id`, `internal_key`, `api_competition_id`, `slug`, `name`, `country`, `continent`, `season`, `tracking_level`, `primary_provider`, `secondary_provider`, `enrichment_provider`, `update_frequency`, `public_stats_enabled`, `data_confidence`, `status`, `visibility`, `login_required`, `created_at`, `updated_at`.

### `teams`

Confermate localmente: `id`, `competition_id`, `source_provider_id`, `api_team_id`, `slug`, `name`, `short_name`, `country`, `status`, `visibility`, `login_required`, `created_at`, `updated_at`.

### `standings`

Confermate localmente: `id`, `competition_id`, `team_id`, `source_provider_id`, `season`, `stage`, `matchday`, `rank`, `played`, `won`, `drawn`, `lost`, `goals_for`, `goals_against`, `goal_difference`, `points`, `form`, `qualification_note`, `status`, `visibility`, `login_required`, `created_at`, `updated_at`.

## Informazioni non confermate localmente

- Se nello staging reale esistono già righe compatibili per `data_providers`, `competitions` e `teams`.
- Quale valore usare come provider manuale (`source_provider_id` / `primary_provider`) senza interrogare dati live.
- Se `provider_competition_config.external_competition_id` è già popolato per le fixture manuali.
- Policy definitiva per `internal_key`, `slug`, `season`, `stage`, `matchday` e `goal_difference`.
- Eventuali drift tra schema locale e schema staging applicato manualmente.

## Limiti della review

La review non interroga Supabase e non usa service role. Di conseguenza può confermare la forma locale dello schema, ma non può confermare dati, ID UUID reali, provider manuale esistente, record già presenti o drift dello staging.

## Perché non è stato interrogato il DB

Il Punto 24 è esplicitamente no-write e no-DB-query. L'obiettivo è ridurre ambiguità locali prima di un eventuale Punto 25 read-only. Nessuna query live è stata eseguita.
