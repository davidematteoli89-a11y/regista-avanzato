# Punto 40-Fix — Read-only live view lookup

## Scope

- read-only live view lookup: `prepared`
- Supabase target: staging “Regista Avanzato”
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

## Manual execution instructions

1. Aprire Supabase Dashboard.
2. Selezionare solo il progetto staging “Regista Avanzato”.
3. Confermare che non sia Production, OS-Business, Fantacalcio o Quiz Live.
4. Aprire SQL Editor.
5. Incollare solo il contenuto di `supabase/manual/manual_import_preview_lookup_p40fix.sql`.
6. Eseguire manualmente.
7. Copiare solo il risultato minimo necessario per dedup/mapping.

Se il target staging non è confermato, non eseguire la query.

## Execution status

- manual_sql_editor_execution_required: `true`
- staging_target_confirmed_by_user: `pending`
- query_executed: `pending`
- query_read_only: `true`
- db_write: `false`
- provider_fetch: `false`
- production_touched: `false`

## Lookup result

- lookup_result_status: `pending`
- preview_mode: `read_only_lookup_pending`
- view_lookup_executed: `false`
- create_count: `0`
- update_count: `0`
- skip_count: `0`
- conflict_count: `0`
- unresolved_count: `5`

Il risultato manuale può essere inserito localmente, senza committarlo, in:

- `fixtures/provider/manual/live-view-lookup-result.local.json`

Il template non sensibile è:

- `fixtures/provider/manual/live-view-lookup-result.example.json`

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
