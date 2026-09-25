# Punto 40-Fix-B — Read-only live view lookup result

## Scope

- read-only live view lookup: `executed_manually`
- Supabase target: staging “Regista Avanzato”
- SQL Editor result: `Success. No rows returned`
- query_result: `success_no_rows_returned`
- no DB write: `true`
- no provider: `true`
- no import reale: `true`
- no Apify: `true`
- no Production: `true`
- next_write_allowed: `false`

## Query file

- `supabase/manual/manual_import_preview_lookup_p40fix.sql`

Il file contiene solo `SELECT` sulle view verificate:

- `public.manual_import_competitions_lookup`
- `public.manual_import_teams_lookup`
- `public.manual_import_standings_lookup`

La query è stata eseguita manualmente dall’utente in Supabase SQL Editor staging. Non è stata eseguita dall’app, da script, da provider o da automazioni.

## Execution status

- manual_sql_editor_execution_required: `false`
- staging_target_confirmed_by_user: `true`
- query_executed: `true`
- query_read_only: `true`
- read_only_live_view_lookup_executed: `true`
- db_write: `false`
- service_role_used: `false`
- provider_fetch: `false`
- external_fetch: `false`
- production_touched: `false`

## Lookup result

- lookup_result_status: `completed_empty`
- query_result: `success_no_rows_returned`
- preview_mode: `read_only_lookup_completed`
- view_lookup_executed: `true`
- live_lookup_rows_count: `0`
- existing_competitions_rows: `0`
- existing_teams_rows: `0`
- existing_standings_rows: `0`
- views_verified_count: `3`

Poiché le view non contengono righe live, la preview manuale risolve tutte le fixture locali come candidate create.

## Preview result

- fixtures_loaded: `true`
- competitions_fixture_count: `1`
- teams_fixture_count: `2`
- standings_fixture_count: `2`
- total_fixture_count: `5`
- create_count: `5`
- update_count: `0`
- skip_count: `0`
- conflict_count: `0`
- unresolved_count: `0`
- next_write_allowed: `false`

## Fixture lookup result file

È stato creato un esempio committabile e non sensibile:

- `fixtures/provider/manual/live-view-lookup-result.empty.example.json`

Il file rappresenta il risultato manuale “successo, zero righe” senza salvare dati reali o credenziali. Il file locale non committabile resta:

- `fixtures/provider/manual/live-view-lookup-result.local.json`

Il file `.local.json` è ignorato da Git.

## Sicurezza

- nessuna API provider chiamata;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessun `service_role`;
- nessun import reale;
- nessun deploy;
- Production non toccata;
- `next_write_allowed=false`.

## Decisione

Punto 40-Fix-B è completato. La preview è risolta con `create_count=5`, `conflict_count=0` e `unresolved_count=0`.

Il prossimo step consigliato è Punto 40-B — manual import write plan no-apply, ancora senza DB write e senza autorizzare import reali.
