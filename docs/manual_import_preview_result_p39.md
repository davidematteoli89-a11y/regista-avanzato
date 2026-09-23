# Punto 39 — Manual import preview result

## Scope

- Preview manual fixture: `true`
- No DB write: `true`
- No provider: `true`
- No import reale: `true`
- No Apify: `true`
- No Production: `true`
- next_write_allowed: `false`

La preview del Punto 39 è stata eseguita in modalità `local_only_unresolved`: fixture locali caricate, view read-only considerate disponibili perché verificate nel Punto 37, ma nessun lookup DB aggiuntivo eseguito nel Punto 39.

Follow-up Punto 40-Fix: preparata query read-only per lookup live manuale. Finché la query non viene eseguita dall’utente e il risultato minimo non viene fornito localmente, la preview resta `read_only_lookup_pending`.

## Inputs

- Fixture competitions: `fixtures/provider/manual/competitions.sample.json`
- Fixture teams: `fixtures/provider/manual/teams.sample.json`
- Fixture standings: `fixtures/provider/manual/standings.sample.json`
- View availability: `true`
- Views verified count: `3`
- Lookup mode: `read-only lookup pending`
- View lookup executed: `false`
- Reason: `pending_manual_sql_editor_execution`

## Preview summary

| Area | Fixture rows | Create | Update | Skip | Conflict | Unresolved | Notes |
|---|---:|---:|---:|---:|---:|---:|---|
| Competitions | 1 | 0 | 0 | 0 | 0 | 1 | Nessun lookup DB eseguito; risultato non applicabile. |
| Teams | 2 | 0 | 0 | 0 | 0 | 2 | Nessun lookup DB eseguito; relation competition non risolta contro view live. |
| Standings | 2 | 0 | 0 | 0 | 0 | 2 | Nessun lookup DB eseguito; team/competition non risolti contro view live. |
| Totale | 5 | 0 | 0 | 0 | 0 | 5 | Preview local-only. |

## Conflict / unresolved details

| Area | Fixture identifier | Status | Reason | Suggested next step |
|---|---|---|---|---|
| Competitions | `api_competition_id` fixture locale | unresolved | Lookup view non eseguito nel Punto 39. | Punto 40-Fix: definire lookup read-only applicativo sicuro o mapping manuale. |
| Teams | `api_team_id` fixture locali | unresolved | Lookup view non eseguito; competition relation non confermata live. | Punto 40-Fix: risolvere mapping team/competition in preview read-only. |
| Standings | `competition/team fixture refs` | unresolved | Team/competition non risolti contro view live. | Punto 40-Fix: risolvere chiave logica prima di ogni write plan. |

## Output

- manual_import_preview_completed: `true`
- preview_mode: `read_only_lookup_pending`
- provider_fetch: `false`
- external_fetch: `false`
- db_write: `false`
- service_role_used: `false`
- import_real_execution: `false`
- provider_import_enabled: `false`
- apify_enabled: `false`
- production_touched: `false`
- fixtures_loaded: `true`
- competitions_fixture_count: `1`
- teams_fixture_count: `2`
- standings_fixture_count: `2`
- views_verified_count: `3`
- view_lookup_executed: `false`
- create_count: `0`
- update_count: `0`
- skip_count: `0`
- conflict_count: `0`
- unresolved_count: `5`
- next_write_allowed: `false`
