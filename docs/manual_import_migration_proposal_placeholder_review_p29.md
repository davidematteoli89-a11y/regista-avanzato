# Punto 29 — Manual import migration proposal placeholder review

Stato: review documentale, no-apply/no-write.

Questa matrice revisiona i placeholder della proposal `docs/migration_proposals/manual_import_read_only_views_p28.sql.md`. Non conferma lo stato live Supabase e non autorizza migration draft o applicazione.

Status ammessi:

- `resolvable_from_local_docs`
- `needs_dashboard_confirmation`
- `needs_db_read_only_view`
- `blocked`
- `not_required`

| View | Placeholder | Meaning | Current evidence | Status | How to resolve |
| --- | --- | --- | --- | --- | --- |
| `manual_import_competitions_lookup` | `CONFIRM_ACTUAL_COMPETITIONS_TABLE` | Tabella sorgente `public.competitions` | Presente in `supabase/migrations/0001_base_schema.sql`; documentata in P21/P24 | `needs_dashboard_confirmation` | Verifica dashboard/SQL Editor con SELECT metadata, no write |
| `manual_import_competitions_lookup` | `CONFIRM_ACTUAL_COMPETITION_ID_COLUMN` | Colonna `competitions.id` | Presente in schema locale | `needs_dashboard_confirmation` | Confermare in staging live |
| `manual_import_competitions_lookup` | `CONFIRM_ACTUAL_PROVIDER_ID_COLUMN` | Colonna fixture/provider competition id | `api_competition_id` presente localmente; dedup reale ancora da decidere | `needs_dashboard_confirmation` | Confermare colonna e policy dedup prima di draft |
| `manual_import_competitions_lookup` | `CONFIRM_ACTUAL_SEASON_COLUMN` | Colonna `season` | Presente localmente; default fixture da chiarire | `needs_dashboard_confirmation` | Confermare valore staging e formato |
| `manual_import_competitions_lookup` | `CONFIRM_HELPER_VIEW_CONTEXT` | Uso `public.is_editor_or_admin()` nella view | Helper esiste localmente; uso in view richiede conferma live | `needs_dashboard_confirmation` | Verificare RLS/grants e comportamento da sessione admin/editor |
| `manual_import_teams_lookup` | `CONFIRM_ACTUAL_TEAMS_TABLE` | Tabella sorgente `public.teams` | Presente in schema locale | `needs_dashboard_confirmation` | Verifica dashboard/SQL Editor con SELECT metadata, no write |
| `manual_import_teams_lookup` | `CONFIRM_ACTUAL_TEAM_ID_COLUMN` | Colonna `teams.id` | Presente in schema locale | `needs_dashboard_confirmation` | Confermare in staging live |
| `manual_import_teams_lookup` | `CONFIRM_ACTUAL_PROVIDER_TEAM_ID_COLUMN` | Colonna provider team id | `api_team_id` presente localmente; `source_provider_id` serve per provider reale | `needs_dashboard_confirmation` | Confermare se lookup manuale usa `api_team_id`, `slug` o mapping manuale |
| `manual_import_teams_lookup` | `CONFIRM_ACTUAL_COMPETITION_FK_COLUMN` | FK `teams.competition_id` | Presente in schema locale | `needs_dashboard_confirmation` | Confermare join live con competitions |
| `manual_import_teams_lookup` | `CONFIRM_TEAM_DEDUP_KEY` | Dedup team | Locale suggerisce `competition_id + slug` o provider key | `needs_db_read_only_view` | Serve view/SELECT read-only per validare collisioni |
| `manual_import_standings_lookup` | `CONFIRM_ACTUAL_STANDINGS_TABLE` | Tabella sorgente `public.standings` | Presente in schema locale | `needs_dashboard_confirmation` | Verifica dashboard/SQL Editor con SELECT metadata, no write |
| `manual_import_standings_lookup` | `CONFIRM_ACTUAL_STANDINGS_POSITION_COLUMN` | Naming posizione/rank | `rank` presente localmente; fixture usa `rank` | `resolvable_from_local_docs` | Mantenerlo ma confermare live prima di draft |
| `manual_import_standings_lookup` | `CONFIRM_STANDINGS_TEAM_FK` | FK `standings.team_id` | Presente in schema locale | `needs_dashboard_confirmation` | Confermare join live con teams |
| `manual_import_standings_lookup` | `CONFIRM_STANDINGS_COMPETITION_FK` | FK `standings.competition_id` | Presente in schema locale | `needs_dashboard_confirmation` | Confermare join live con competitions |
| `manual_import_standings_lookup` | `CONFIRM_SEASON_STAGE_MATCHDAY_POLICY` | Valori `season`, `stage`, `matchday` | Colonne presenti localmente; policy fixture ancora da decidere | `needs_db_read_only_view` | Serve check read-only su dati/demo e decisione manuale |
| `manual_import_standings_lookup` | `CONFIRM_GOAL_DIFFERENCE_POLICY` | Calcolo/colonna `goal_difference` | Colonna presente; calcolo `goals_for - goals_against` documentato come plausibile | `needs_dashboard_confirmation` | Confermare policy prima di write futura |

## Sintesi

- Placeholder critici live ancora aperti: `9`.
- Dashboard confirmation required: `true`.
- Future migration draft allowed: `false`.
- `next_write_allowed=false`.

## Dashboard confirmation P30-B

La verifica dashboard reale è stata dichiarata completata manualmente dall'utente, senza SQL e senza write; i campi schema non sono stati forniti.

- dashboard confirmation performed: `true`
- SQL executed: `false`
- DB write: `false`
- service_role used: `false`
- placeholders resolved count: `0`
- placeholders unresolved count: `0`
- placeholders unclear count: `16`
- new read-only view still required: `true`
- ready for migration draft: `false`
- next_write_allowed: `false`

Tutti i placeholder che richiedono stato live restano `unclear` fino a verifica manuale Dashboard.

## Manual schema values collection P30-C

- schema values collection prepared: `true`
- real schema values provided: `false`
- placeholders resolved count: `0`
- placeholders uncollected count: `16`
- ready for migration draft: `false`
- next_write_allowed: `false`
- recommended next step: user provides real schema values from dashboard

I placeholder restano `uncollected/unclear`; non sono stati promossi a `resolved`.
