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

## D.6-B — Applicazione manuale su Supabase staging

Stato: applicata manualmente su Supabase staging “Regista Avanzato”.

Dettagli:

- migrazione: `supabase/migrations/0009_provider_import_runs.sql`;
- data documentazione: 2026-09-13;
- metodo: Supabase SQL Editor;
- `supabase db push`: non usato;
- `supabase db reset`: non usato;
- Production: non toccata.

Oggetti creati/aggiornati:

- tabella `provider_import_runs`;
- RLS attiva su `provider_import_runs`;
- policy `provider_import_runs_editor_select`;
- policy `provider_import_runs_admin_insert`;
- policy `provider_import_runs_admin_update`;
- colonne `import_run_id` e `batch_id` su `provider_import_logs`;
- colonne `import_run_id` e `batch_id` su `api_usage_logs`;
- colonne `import_run_id` e `batch_id` su `import_logs`;
- indici su `provider_import_runs`;
- indici per `import_run_id`/`batch_id` sui log collegati.

Verifiche read-only registrate:

- `provider_import_runs` esiste;
- RLS attiva;
- policy create;
- colonne batch/import presenti sui log;
- indici presenti;
- `provider_import_runs_count = 0`;
- provider esterni ancora off;
- import ancora disabilitati.

Sicurezza:

- nessuna riga reale inserita;
- nessun provider attivato;
- Apify non attivato;
- nessuna fetch esterna;
- nessun token letto o stampato;
- Production non toccata.

Residui:

- migration history Supabase resta manuale;
- serve test RLS con sessione applicativa/admin prima dei writer reali;
- writer reali ancora disabilitati;
- `realWritesEnabled=false`;
- nessuna scrittura provider ancora consentita.

Prossimo step consigliato:

- D.7 — RLS/readiness test per `provider_import_runs` e admin visibility, senza provider e senza import reali.

## D.7 — Readiness/RLS test plan

Preparato file read-only:

- `supabase/manual/provider_import_runs_rls_d7.sql`.

Preparato documento:

- `docs/provider_import_runs_rls_test_plan.md`.

Il test D.7 verifica:

- tabella esistente;
- RLS attiva;
- policy/grants;
- colonne `batch_id/import_run_id`;
- indici;
- count righe;
- provider/import ancora spenti;
- assenza policy delete.

Nessuna query di scrittura viene inclusa.

## D.7-B — Risultati readiness registrati

D.7-A è stata eseguita manualmente dal Supabase SQL Editor sul progetto staging “Regista Avanzato”.

Risultati:

- `provider_import_runs` presente;
- RLS attiva confermata;
- `provider_import_runs_count = 0`;
- provider esterni ancora off;
- nessuna configurazione con `import_enabled = true`;
- nessuna policy `DELETE` su `provider_import_runs`;
- nel SQL Editor non c’è sessione applicativa:
  - `auth.uid() = null`;
  - `is_admin() = false`;
  - `is_editor_or_admin() = false`.

La migrazione 0009 resta applicata manualmente su staging, ma la migration history Supabase può non essere allineata al flusso CLI. Non usare `db push/reset` senza piano dedicato.

Residui prima dei writer reali:

- test RLS da sessione applicativa admin/editor/free_user;
- reader admin read-only opzionale;
- writer reali ancora bloccati da `realWritesEnabled=false`.

## D.8 — Admin reader read-only

È stato preparato un reader admin server-side read-only per `provider_import_runs`.

Oggetto:

- `lib/admin/adminProviderImportRuns.ts`.

Caratteristiche:

- usa il client Supabase server-side con sessione utente;
- rispetta RLS;
- non usa service role;
- esegue solo `SELECT`;
- legge massimo 20 run ordinate per `created_at desc`;
- restituisce source `supabase_staging`, `empty` o `unavailable`;
- non abilita writer reali.

Colonne lette:

- `id`;
- `batch_id`;
- `provider_key`;
- `competition_slug`;
- `mode`;
- `status`;
- `external_fetch`;
- `db_write`;
- `estimated_cost_eur`;
- `actual_cost_eur`;
- `records_planned`;
- `records_inserted`;
- `records_updated`;
- `records_skipped`;
- `warnings_count`;
- `started_at`;
- `finished_at`;
- `created_at`.

Nessuna colonna raw, token, payload provider o configurazione privata viene letta.

La pagina `/admin/imports` mostra la sezione `Provider import runs` con empty state quando la tabella è vuota.
