# Provider import runs schema plan — D.6

## Stato attuale

Audit locale, senza query live e senza lettura `.env.local`.

Tabelle già presenti nelle migrazioni:

- `provider_import_logs`;
- `api_usage_logs`;
- `import_logs`;
- `apify_usage_logs`;
- `apify_budget_status`.

Non è presente una tabella dedicata alle run provider.

Non sono presenti, nello schema base, colonne:

- `batch_id`;
- `import_run_id`.

## Colonne attuali rilevanti

`provider_import_logs`:

- `id`;
- `provider_id`;
- `competition_id`;
- `script_name`;
- `status`;
- `started_at`;
- `finished_at`;
- `items_imported`;
- `errors`;
- `notes`;
- `created_at`;
- `updated_at`.

`api_usage_logs`:

- `id`;
- `provider_id`;
- `endpoint`;
- `request_count`;
- `date`;
- `competition_id`;
- `script_name`;
- `response_status`;
- `estimated_cost_eur`;
- `notes`;
- `created_at`;
- `updated_at`.

`import_logs`:

- `id`;
- `import_type`;
- `provider_id`;
- `competition_id`;
- `provider_import_log_id`;
- `status`;
- `started_at`;
- `finished_at`;
- `records_processed`;
- `records_created`;
- `records_updated`;
- `errors`;
- `notes`;
- `created_at`;
- `updated_at`.

## Proposta D.6

Preparare la migrazione:

- `supabase/migrations/0009_provider_import_runs.sql`.

La migrazione propone:

- nuova tabella `provider_import_runs`;
- `batch_id text unique not null`;
- collegamento opzionale a `data_providers` tramite `provider_key`;
- collegamento opzionale a `competitions`;
- stato run con `public.import_run_status`;
- flag `external_fetch` e `db_write`;
- costi stimati/effettivi;
- contatori record pianificati/inseriti/aggiornati/skippati;
- `warnings_count`;
- `error_message`;
- `metadata`;
- `created_by`;
- RLS attiva.

Colonne aggiunte, se applicata:

- `provider_import_logs.import_run_id`;
- `provider_import_logs.batch_id`;
- `api_usage_logs.import_run_id`;
- `api_usage_logs.batch_id`;
- `import_logs.import_run_id`;
- `import_logs.batch_id`.

## Policy proposta

- `anon`: nessun grant;
- `authenticated`: grant tecnico su `provider_import_runs`, filtrato da RLS;
- `editor/admin`: lettura tramite `public.is_editor_or_admin()`;
- `admin`: insert/update tramite `public.is_admin()`;
- nessuna policy delete.

Le pagine pubbliche non devono mai leggere questa tabella.

## Rollback futuro

Se la migrazione 0009 viene applicata e serve rollback:

1. rimuovere riferimenti `import_run_id`/`batch_id` dai log creati in test;
2. cancellare eventuali righe test da `provider_import_runs`;
3. droppare indici collegati;
4. droppare colonne aggiunte ai log solo se non più usate;
5. droppare la tabella solo se vuota e sacrificabile.

Non usare `db reset` su staging senza piano esplicito.

## Rischi residui

- `batch_id` va normalizzato e reso stabile prima degli import reali;
- i writer dovranno essere server-side e non accessibili da pagine pubbliche;
- i log potrebbero contenere metadata sensibili se non redatti;
- serve una decisione su retention e privacy dei log;
- migration history staging resta manuale.

## Stato

La migrazione 0009 è solo preparata.

Non è stata applicata.
Non sono state fatte scritture DB.
Non sono stati attivati provider/import/Apify.
