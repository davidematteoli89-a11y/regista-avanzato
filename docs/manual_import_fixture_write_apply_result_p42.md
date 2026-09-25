# Punto 42 — Manual fixture write apply result

## Stato

- point_42_authorized: `true`
- write_sql_prepared: `true`
- rollback_sql_prepared: `true`
- post_verify_sql_prepared: `true`
- manual_fixture_write_executed: `false`
- manual_execution_required: `true`
- execution_channel: `manual_sql_editor_staging_required`
- db_write: `false`
- written_competitions_count: `0`
- written_teams_count: `0`
- written_standings_count: `0`
- total_written_rows: `0`
- provider_fetch: `false`
- external_fetch: `false`
- provider_import_enabled: `false`
- apify_enabled: `false`
- production_touched: `false`
- deploy_executed: `false`
- service_role_used: `false`
- rollback_executed: `false`
- post_write_verification_executed: `false`
- post_write_verification_required: `true`
- post_write_verification_passed: `false`

## File preparati

- Write manuale staging: `supabase/manual/manual_import_fixture_write_p42.sql`
- Rollback manuale staging: `supabase/manual/manual_import_fixture_rollback_p42.sql`
- Post-write verification read-only: `supabase/manual/manual_import_fixture_post_verify_p42.sql`

## Stato operativo

Non ho accesso sicuro al Supabase SQL Editor staging da questa sessione. Per questo il Punto 42 è preparato ma non eseguito.

L’utente deve copiare ed eseguire manualmente `supabase/manual/manual_import_fixture_write_p42.sql` solo nel progetto Supabase staging “Regista Avanzato”, poi eseguire `supabase/manual/manual_import_fixture_post_verify_p42.sql`.

## Istruzioni manuali

1. Aprire Supabase Dashboard.
2. Selezionare solo il progetto staging “Regista Avanzato”.
3. Confermare visivamente che non sia Production, OS-Business, Fantacalcio o Quiz Live.
4. Aprire SQL Editor.
5. Incollare `supabase/manual/manual_import_fixture_write_p42.sql`.
6. Eseguire una sola volta.
7. Se c’è errore, non ritentare alla cieca: copiare solo l’errore e fermarsi.
8. Se il write passa, eseguire `supabase/manual/manual_import_fixture_post_verify_p42.sql`.
9. Non eseguire rollback se la verifica passa.

## Conferme sicurezza

- provider/import restano spenti;
- Apify resta off;
- Production non toccata;
- nessun deploy;
- nessun `service_role` nell’app;
- nessuna Server Action write;
- nessun provider fetch.
