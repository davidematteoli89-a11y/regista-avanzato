# Punto 42-B — Manual fixture write apply result

## Stato finale

- point_42_authorized: `true`
- manual_fixture_write_executed: `true`
- execution_channel: `manual_sql_editor_staging`
- db_write: `true`
- written_competitions_count: `1`
- written_teams_count: `2`
- written_standings_count: `2`
- total_written_rows: `5`
- post_write_verification_executed: `true`
- post_write_verification_passed: `true`
- rollback_executed: `false`
- provider_fetch: `false`
- external_fetch: `false`
- provider_import_enabled: `false`
- apify_enabled: `false`
- production_touched: `false`
- deploy_executed: `false`
- service_role_used: `false`

## File eseguito manualmente

- `supabase/manual/manual_import_fixture_write_p42.sql`

Risultato Supabase SQL Editor staging:

- `Success. No rows returned`

## Verifica post-write

Risultato verificato manualmente:

- competition verificata: `1`
- teams verificate: `2`
- standings verificate: `2`
- total_written_rows: `5`

La competition reale usa:

- `api_competition_id=manual-serie-a`
- `internal_key=manual-serie-a`
- `slug=manual-serie-a`
- `name=Serie A Manual Sample`
- `country=Italy`
- `season=2026`
- `status=draft`
- `visibility=private_admin`

Le 2 teams risultano collegate alla competition corretta:

- `manual-team-1`
- `manual-team-2`

Le 2 standings risultano presenti:

- `manual-team-1`: rank `1`, points `3.00`
- `manual-team-2`: rank `2`, points `0.00`
- status: `draft`
- visibility: `private_admin`

## Nota su verifica count iniziale

Il primo controllo `competitions_count=0` era causato da una query di verifica non allineata alla fixture reale: cercava `api_competition_id=manual-competition-1`.

La fixture reale creata e verificata usa invece:

- `api_competition_id=manual-serie-a`

La successiva verifica join teams → competition ha confermato la competition corretta.

## Conferme sicurezza

- nessun provider chiamato;
- nessuna fetch provider;
- nessun import provider attivato;
- Apify resta off;
- Production non toccata;
- nessun deploy;
- nessun `service_role`;
- rollback non eseguito perché la verifica è passata.
