# Punto 40-B — Manual import write plan no-apply

## Scope

Questo documento prepara un piano di scrittura controllato per una futura importazione manuale staging delle 5 fixture candidate create.

Stato e limiti:

- piano documentale no-apply: `true`
- db_write: `false`
- provider_fetch: `false`
- external_fetch: `false`
- provider_import_enabled: `false`
- import_real_execution: `false`
- apify_enabled: `false`
- production_touched: `false`
- next_write_allowed: `false`

Nessuna scrittura DB viene eseguita o autorizzata dal Punto 40-B.

## Source fixtures

- `fixtures/provider/manual/competitions.sample.json`
- `fixtures/provider/manual/teams.sample.json`
- `fixtures/provider/manual/standings.sample.json`

## Current preview result

- read_only_live_view_lookup_executed: `true`
- query_result: `success_no_rows_returned`
- live_lookup_rows_count: `0`
- existing_competitions_rows: `0`
- existing_teams_rows: `0`
- existing_standings_rows: `0`
- create_count: `5`
- update_count: `0`
- skip_count: `0`
- conflict_count: `0`
- unresolved_count: `0`

## Write order proposed

Ordine futuro proposto:

1. `competitions`
2. `teams`
3. `standings`

Motivo:

- `teams` dipende da `competitions`;
- `standings` dipende da `competitions` e `teams`.

## Future write boundaries

Una futura scrittura, se mai autorizzata, dovrà rispettare questi confini:

- solo staging “Regista Avanzato”;
- Production esclusa;
- provider/import automatici spenti;
- Apify spento;
- nessun update;
- nessun delete;
- nessun upsert automatico;
- solo create delle 5 fixture previste;
- ogni record creato deve essere collegabile al batch/manual fixture plan;
- apply futuro richiede nuova autorizzazione esplicita dell’utente;
- rollback futuro richiede nuova autorizzazione esplicita separata.

## Decisione

Punto 40-B autorizza solo la pianificazione no-apply. Non autorizza alcuna scrittura DB.
