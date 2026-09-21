# Punto 30-B — Dashboard confirmation manuale no-write

Stato: preparazione documentale completata; conferma dashboard manuale reale eseguita dall'utente senza dettagli schema risolutivi.

## Scope

Questa fase prepara la conferma manuale da Supabase Dashboard per i placeholder critici rimasti nella migration proposal read-only.

Conferme operative:

- SQL executed: `false`
- DB write: `false`
- service_role used: `false`
- migration created: `false`
- migration applied: `false`
- provider calls: `false`
- Production touched: `false`
- next_write_allowed: `false`

Nota: l'utente ha dichiarato di avere verificato manualmente la Dashboard Supabase senza SQL e senza write. I valori schema non sono stati forniti, quindi restano `unclear`.

## Tabella conferme

| Area | Elemento | Confermato | Nome reale / valore | Note |
| --- | --- | --- | --- | --- |
| competitions | tabella reale competizioni | unclear | unclear | Da confermare visualmente in Dashboard |
| competitions | id interno | unclear | unclear | Evidenza locale: `id`; conferma live richiesta |
| competitions | provider/external id | unclear | unclear | Evidenza locale: `api_competition_id`; dedup policy non confermata |
| competitions | name | unclear | unclear | Evidenza locale: `name`; conferma live richiesta |
| competitions | slug | unclear | unclear | Evidenza locale: `slug`; conferma live richiesta |
| competitions | country | unclear | unclear | Evidenza locale: `country`; conferma live richiesta |
| competitions | category/status | unclear | unclear | Evidenza locale: `status`, `visibility`; category non confermata |
| competitions | created_at/updated_at | unclear | unclear | Evidenza locale presente; conferma live richiesta |
| competitions | FK/indici/unique/dedup | unclear | unclear | Da verificare senza modifiche |
| competitions | view pubbliche/admin esistenti | unclear | unclear | Da verificare in sola visualizzazione |
| teams | tabella reale squadre | unclear | unclear | Da confermare visualmente in Dashboard |
| teams | id interno | unclear | unclear | Evidenza locale: `id`; conferma live richiesta |
| teams | provider/external id | unclear | unclear | Evidenza locale: `api_team_id`, `source_provider_id`; conferma live richiesta |
| teams | name | unclear | unclear | Evidenza locale: `name`; conferma live richiesta |
| teams | slug | unclear | unclear | Evidenza locale: `slug`; conferma live richiesta |
| teams | country | unclear | unclear | Evidenza locale: `country`; conferma live richiesta |
| teams | relation competition/team | unclear | unclear | Evidenza locale: `competition_id`; conferma FK live richiesta |
| teams | created_at/updated_at | unclear | unclear | Evidenza locale presente; conferma live richiesta |
| teams | indici/unique/dedup | unclear | unclear | Da verificare senza modifiche |
| teams | view pubbliche/admin esistenti | unclear | unclear | Da verificare in sola visualizzazione |
| standings | tabella reale standings/classifiche | unclear | unclear | Da confermare visualmente in Dashboard |
| standings | id interno | unclear | unclear | Evidenza locale: `id`; conferma live richiesta |
| standings | competition id/reference | unclear | unclear | Evidenza locale: `competition_id`; conferma FK live richiesta |
| standings | team id/reference | unclear | unclear | Evidenza locale: `team_id`; conferma FK live richiesta |
| standings | season/stage/matchday | unclear | unclear | Evidenza locale presente; policy non confermata |
| standings | rank/position | unclear | unclear | Evidenza locale: `rank`; conferma live richiesta |
| standings | played/wins/draws/losses | unclear | unclear | Evidenza locale: `played`, `won`, `drawn`, `lost`; conferma live richiesta |
| standings | goals/points | unclear | unclear | Evidenza locale presente; conferma live richiesta |
| standings | created_at/updated_at | unclear | unclear | Evidenza locale presente; conferma live richiesta |
| standings | FK/indici/unique/dedup | unclear | unclear | Da verificare senza modifiche |
| standings | view pubbliche/admin esistenti | unclear | unclear | Da verificare in sola visualizzazione |
| RLS/policy | RLS tabelle target | unclear | unclear | Da verificare visualmente |
| RLS/policy | policy select anon/authenticated/admin/editor | unclear | unclear | Da verificare visualmente senza modificare policy |
| views | nuova read-only view necessaria | unclear | likely true | Punto 26/29 indicano necessità, ma conferma dashboard resta pendente |

## Placeholder resolution

| Placeholder | Status after dashboard check | Resolved value | Notes |
| --- | --- | --- | --- |
| `CONFIRM_ACTUAL_COMPETITIONS_TABLE` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_ACTUAL_COMPETITION_ID_COLUMN` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_ACTUAL_PROVIDER_ID_COLUMN` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_ACTUAL_SEASON_COLUMN` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_HELPER_VIEW_CONTEXT` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_ACTUAL_TEAMS_TABLE` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_ACTUAL_TEAM_ID_COLUMN` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_ACTUAL_PROVIDER_TEAM_ID_COLUMN` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_ACTUAL_COMPETITION_FK_COLUMN` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_TEAM_DEDUP_KEY` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_ACTUAL_STANDINGS_TABLE` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_ACTUAL_STANDINGS_POSITION_COLUMN` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_STANDINGS_TEAM_FK` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_STANDINGS_COMPETITION_FK` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_SEASON_STAGE_MATCHDAY_POLICY` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |
| `CONFIRM_GOAL_DIFFERENCE_POLICY` | unclear | unclear | Verifica manuale dichiarata, valore non fornito |

## Summary

- dashboard_confirmation_completed: `true`
- dashboard_sql_executed: `false`
- dashboard_db_write: `false`
- dashboard_service_role_used: `false`
- placeholders_resolved_count: `0`
- placeholders_unresolved_count: `0`
- placeholders_unclear_count: `16`
- new_read_only_view_still_required: `true`
- ready_for_migration_draft: `false`
- next_write_allowed: `false`
