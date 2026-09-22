# Punto 35 — Real migration review

## Migration file

- file migration creato: `supabase/migrations/20260922120000_manual_import_read_only_views.sql`
- dentro `supabase/migrations`: `true`
- apply status: `not_applied`

## View incluse

- `manual_import_competitions_lookup`
- `manual_import_teams_lookup`
- `manual_import_standings_lookup`

## Safety review

| Check | Status | Notes |
|---|---|---|
| no write statements applicativi | pass | Nessun `INSERT`, `UPDATE`, `DELETE`, `UPSERT`, `TRUNCATE`. |
| no destructive statements | pass | Nessun `DROP TABLE`, nessun `ALTER TABLE` distruttivo. |
| no provider/fetch | pass | Nessuna logica provider/API/fetch. |
| no service_role | pass | Nessun riferimento a `service_role`. |
| no Production | pass | Header staging-only. |
| only read-only views | pass | Solo `CREATE OR REPLACE VIEW`. |
| SELECT espliciti | pass | Nessun `SELECT *`. |
| grants/policies operative | pass | Non inclusi. |

## Outcome

- ready_for_staging_apply: `true`
- migration_applied: `false`
- apply_block_reason: `db push/reset vietato; serve apply manuale controllato o nuova autorizzazione operativa specifica`

