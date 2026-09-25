# Provider dry-run plan — D.1

Stato: piano preparato, nessuna chiamata reale.

## Obiettivo

Preparare test provider calcio reali in modalità dry-run, senza fetch esterne, senza scritture Supabase e senza consumo budget.

## Provider stabile futuro

Provider candidati:

- TheStatsAPI;
- API-Football.

Wrapper:

- `stableFootballProvider`.

Adapter già presenti:

- `lib/dataProvider/stableFootballProvider.ts`;
- `lib/dataProvider/theStatsApiProvider.ts`;
- `lib/dataProvider/apiFootballProvider.ts`;
- `lib/dataProvider/stableProviderConfig.ts`;
- `lib/dataProvider/stableProviderMappers.ts`.

Variabili env future, senza valori:

- `STABLE_PROVIDER_NAME`;
- `STATSAPI_KEY`;
- `STATSAPI_BASE_URL`;
- `API_FOOTBALL_KEY`;
- `API_FOOTBALL_BASE_URL`;
- `STABLE_PROVIDER_DAILY_BUDGET_REQUESTS`;
- `STABLE_PROVIDER_MONTHLY_BUDGET_REQUESTS`.

Ambiente:

- configurare prima solo Vercel Preview;
- non configurare Production;
- non stampare token;
- non usare service role nel client.

## Piano dry-run stabile

1. Lasciare `stable_provider`, `the_stats_api`, `api_football` disattivati.
2. Scegliere una competizione test, preferibilmente `serie-a`.
3. Eseguire solo mapping locale/mock:
   - competizione;
   - squadre;
   - fixtures;
   - standings.
4. Verificare payload Supabase futuri senza scrivere:
   - `competitions`;
   - `teams`;
   - `matches`;
   - `standings`;
   - `provider_import_logs`;
   - `api_usage_logs`.
5. Loggare report locale safe:
   - provider risolto;
   - fallback usato;
   - numero record previsti;
   - warning;
   - scritture Supabase = 0;
   - chiamate esterne = 0.
6. Solo dopo approvazione futura, preparare un dry-run con fixture payload reale salvato localmente e redatto, senza token.

## Script già disponibili

Non duplicare per ora:

- `scripts/runInitialImport.ts`;
- `scripts/importCompetitions.ts`;
- `scripts/importTeams.ts`;
- `scripts/importFixtures.ts`;
- `scripts/runDailyMatchesImport.ts`;
- `scripts/runFullStatsImport.ts`;
- `scripts/importMatchStats.ts`;
- `scripts/importPlayerStats.ts`;
- `scripts/importPlayerSeasonStats.ts`;
- `scripts/importTeamSeasonStats.ts`.

Questi script sono stati progettati come dry-run/mock e devono restare senza fetch reali finché non viene approvata una fase dedicata.

## Script proposti per D.2

Stato D.2: creato script locale read-only.

Script disponibile:

- `scripts/provider/auditProviderConfig.ts`.

Comando:

```bash
npm run audit:providers
```

Lo script controlla:

- provider modellati in `config/providers.ts`;
- stato atteso provider:
  - `mock_provider` on;
  - `manual_provider` on;
  - `stable_provider` off;
  - `the_stats_api` off;
  - `api_football` off;
  - `apify_sofascore` off;
- conteggio competizioni totali;
- conteggio FULL_OFFICIAL;
- conteggio APIFY P1;
- conteggio APIFY P2;
- conteggio TRIGGER;
- seed `import_enabled=false`;
- presenza documentazione guardie budget Apify.

Output D.2 verificato:

```text
providers_total=6
providers_state=stable_provider:off, the_stats_api:off, api_football:off, apify_sofascore:off, manual_provider:on, mock_provider:on
competitions_total=43
full_official=14
apify_light_plus_p1=15
apify_light_plus_p2=14
trigger=0
seed_import_enabled_default=false
apify_budget_doc=present
warnings=0
```

Regole per ogni script:

- nessun output env;
- nessun token;
- nessuna fetch;
- nessuna scrittura DB;
- nessun import reale;
- report leggibile e sicuro.

Script futuri, solo se necessari:

- `scripts/provider/checkProviderBudget.ts`.

## D.3 — Stable provider dry-run singola competizione

Stato: implementato localmente e verificato.

Script:

- `scripts/provider/dryRunStableProvider.ts`;
- comando `npm run dry-run:stable-provider`;
- default competition: `serie-a`.

Uso:

```bash
npm run dry-run:stable-provider
```

Oppure:

```bash
npm run dry-run:stable-provider -- --competition=serie-a
```

Cosa simula:

- futuro provider `stable_provider`;
- candidati esterni `the_stats_api/api_football`;
- mapping verso payload futuri:
  - `teams`;
  - `matches`;
  - `standings`;
  - `provider_import_logs`;
- 4 squadre demo;
- 2 partite demo;
- 4 righe classifica demo;
- summary import mock.

Cosa non fa:

- non legge `.env.local`;
- non legge `process.env`;
- non stampa token;
- non chiama TheStatsAPI;
- non chiama API-Football;
- non chiama Apify;
- non chiama SofaScore;
- non fa fetch;
- non apre client Supabase;
- non scrive DB;
- non attiva provider/import.

Output verificato:

```text
competition_slug=serie-a
competition_name=Serie A
tracking_level=full_official
provider_candidate=stable_provider
external_provider_candidates=the_stats_api/api_football
mode=dry_run
fetch_external=false
db_write=false
mapped_teams_count=4
mapped_matches_count=2
mapped_standings_count=4
planned_tables=teams,matches,standings,provider_import_logs
safety_checks=stable_provider_off:ok, the_stats_api_off:ok, api_football_off:ok, apify_off:ok, no_external_fetch:ok, no_db_write:ok, no_token_read:ok
warnings=0
```

Limiti:

- payload statico/demo, non proveniente da provider reale;
- nessun confronto con Supabase live;
- nessun mapping ID esterno reale;

## Punto 18 — Manual fixtures dry-run

Script aggiunto:

- `scripts/provider/manualFixtureDryRun.ts`.

Comando:

```bash
npm run dry-run:manual-fixtures
```

Fixture locali:

- `fixtures/provider/manual/competitions.sample.json`;
- `fixtures/provider/manual/teams.sample.json`;
- `fixtures/provider/manual/standings.sample.json`.

Il dry-run:

- usa solo fixture locali versionate;
- non legge `.env.local`;
- non stampa env o token;
- non chiama provider;
- non chiama Apify/SofaScore;
- non fa fetch;
- non apre client Supabase;
- non scrive DB;
- non attiva provider/import.

Output atteso:

```text
mode=manual_fixture_dry_run
source=local_fixtures
external_fetch=false
db_write=false
token_read=false
token_printed=false
provider_activated=false
import_enabled=false
```

Questo diventa il dry-run consigliato finché non esiste un provider reale verificato.

## Punto 19 — Reader condiviso e admin preview

La logica del dry-run manual fixtures è stata estratta in:

- `lib/provider/manualFixtures.ts`.

Il modulo:

- legge solo fixture locali;
- valida struttura minima;
- controlla riferimenti standings verso competizioni/squadre;
- restituisce summary e preview;
- non legge env;
- non chiama provider;
- non usa Supabase;
- non scrive DB.

Lo script `npm run dry-run:manual-fixtures` resta compatibile e usa lo stesso modulo della preview admin.

## Punto 20 — Manual import plan dry-run

Nuovo comando:

```bash
npm run dry-run:manual-import-plan
```

Il comando produce solo un piano import descrittivo.

Non fa:

- SQL eseguibile;
- fetch provider;
- lettura env/token;
- Supabase client;
- DB write;
- import reale;
- provider activation.

Output chiave atteso:

```text
mode=manual_import_plan_dry_run
external_fetch=false
db_write=false
token_read=false
token_printed=false
blocked_real_execution=true
requires_explicit_approval=true
requires_staging_environment=true
requires_backup_plan=true
requires_rollback_plan=true
```

## Punto 21 — Manual import readiness dry-run

Nuovo comando:

```bash
npm run dry-run:manual-import-readiness
```

Il comando produce una readiness più vicina al DB, ma ancora senza query e senza scrittura.

Output chiave atteso:

```text
mode=manual_import_readiness_dry_run
external_fetch=false
db_write=false
token_read=false
token_printed=false
batch_executable=false
blocked_real_execution=true
collision_strategy=create_update_skip_preview
rollback_preview_available=true
sql_generated=false
pseudo_sql_not_executable=true
```

È vietato usarlo come import reale: non contiene SQL eseguibile e non apre client DB.

## Punto 22 — Manual schema confirmation dry-run

Nuovo comando:

```bash
npm run dry-run:manual-schema-confirmation
```

Il comando confronta fixture/mapping atteso con una definizione locale statica dello schema target.

Output chiave atteso:

```text
mode=manual_schema_confirmation_dry_run
schema_source=local_static_or_local_files
competitions_schema_status=needs_review
teams_schema_status=needs_review
standings_schema_status=needs_review
requires_migration=false
migration_generated=false
sql_generated=false
pseudo_sql_not_executable=true
blocked_real_execution=true
next_write_allowed=false
```

Resta vietato usarlo come write/import: non interroga il database e non genera query.

## Punto 23 — Schema review resolution dry-run

Gli script schema/readiness ora espongono motivazioni e conteggi:

- `competitions_status_reason`;
- `teams_status_reason`;
- `standings_status_reason`;
- `schema_confidence_matrix_available=true`;
- `ready_areas_count=0`;
- `needs_review_areas_count=3`;
- `blocked_areas_count=0`;
- `point_24_write_authorization_required=true`.

`next_write_allowed` resta `false`.
- nessuna deduplica DB effettiva;
- nessun log persistito.

D.4 consigliato:

- dry-run provider budget/logging: simulare request budget e provider_import_logs/api_usage_logs in memoria, senza token e senza DB write.

## Rollback

In dry-run non serve rollback dati perché non si scrive.

Quando verrà autorizzato un import reale:

- usare batch id;
- scrivere `provider_import_logs`;
- scrivere `import_logs`;
- mantenere dati precedenti finché il batch non è validato;
- prevedere query rollback per batch;
- non cancellare snapshot precedente su errore.

## Regola anti chiamata lato utente

Le pagine pubbliche devono continuare a leggere solo Supabase/public views.

Vietato:

- importare `providerRouter` in pagine pubbliche;
- chiamare provider da route pubbliche;
- fare fetch provider su render pagina;
- usare Apify per richieste utente.

## D.4 — Provider logging/budget dry-run

Stato: preparato localmente, nessuna chiamata reale.

Comando:

```bash
npm run dry-run:provider-logging
```

Lo script simula in memoria:

- una run futura su `serie-a`;
- provider candidato `stable_provider`;
- shape futura per `provider_import_logs`;
- shape futura per `api_usage_logs`;
- budget guard Apify con soglie 30/24/30 €.

Output atteso:

```text
mode=dry_run
competition_slug=serie-a
provider=stable_provider
external_fetch=false
db_write=false
provider_import_log_shape=ok
api_usage_log_shape=ok
apify_budget_guard=ok
monthly_budget_limit=30
warning_threshold=24
hard_stop=30
estimated_cost=0
should_run=true reason=budget_available_for_dry_run
warnings=0
```

Campi simulati per `provider_import_logs`:

- `provider_id`;
- `competition_id`;
- `script_name`;
- `status`;
- `started_at`;
- `finished_at`;
- `items_imported`;
- `errors`;
- `notes`.

Campi simulati per `api_usage_logs`:

- `provider_id`;
- `endpoint`;
- `request_count`;
- `date`;
- `competition_id`;
- `script_name`;
- `response_status`;
- `estimated_cost_eur`;
- `notes`.

Lo script non fa:

- lettura `.env.local`;
- lettura/stampa token;
- fetch esterne;
- chiamate TheStatsAPI/API-Football;
- chiamate Apify/SofaScore;
- scritture Supabase;
- attivazione provider/import.

Limiti:

- non valida ancora UUID reali Supabase;
- non scrive record su `provider_import_logs` o `api_usage_logs`;
- non misura costi reali;
- non sostituisce il futuro writer transazionale.

D.5 consigliato:

- progettare writer/import log server-side in modalità ancora disabilitata, con batch id, rollback e flag esplicito prima di ogni scrittura.

## D.6 — Batch/import run schema plan

D.6 prepara il passaggio da preview locali a run tracciabili, senza applicare migrazioni.

Nuova migrazione preparata:

- `supabase/migrations/0009_provider_import_runs.sql`.

Nuovo documento:

- `docs/provider_import_runs_schema_plan.md`.

Modello proposto:

- tabella `provider_import_runs`;
- `batch_id` unico;
- `provider_key`;
- `competition_id`/`competition_slug`;
- `mode`;
- `status`;
- flag `external_fetch` e `db_write`;
- costi stimati/effettivi;
- contatori record;
- `metadata`;
- `created_by`;
- RLS admin/editor.

Le preview D.5 sono state allineate per mostrare:

```text
import_run_preview=ok
provider_import_log_preview=ok
api_usage_log_preview=ok
rollback_plan_preview=ok
```

La migrazione non è stata applicata.

## D.6-B — Migrazione 0009 applicata manualmente

La migrazione `0009_provider_import_runs.sql` è stata applicata manualmente su Supabase staging “Regista Avanzato” tramite SQL Editor.

Conferme:

- nessun `db push`;
- nessun `db reset`;
- nessun deploy;
- nessuna Production;
- provider reali ancora spenti;
- Apify ancora spento;
- import ancora spenti.

Le verifiche read-only hanno confermato:

- `provider_import_runs` presente;
- RLS attiva;
- policy create;
- colonne `batch_id/import_run_id` presenti sui log;
- indici presenti;
- `provider_import_runs_count = 0`.

I dry-run restano la fonte operativa per testare forma e guardie:

- `npm run dry-run:provider-logging`;
- `npm run dry-run:provider-writer-guards`.

## D.5 — Provider writer/log guard disabilitati

Stato: preparato localmente, nessuna scrittura reale.

Nuovo comando:

```bash
npm run dry-run:provider-writer-guards
```

Creati:

- `lib/provider/providerWriteGuards.ts`;
- `lib/provider/providerImportWriter.ts`;
- `scripts/provider/dryRunProviderWriterGuards.ts`.

Il layer rappresenta la forma futura dei writer provider, ma mantiene:

- `realWritesEnabled=false`;
- `external_fetch=false`;
- `db_write=false`;
- provider reali disattivati;
- Apify disattivato;
- nessun uso di service role;
- nessuna lettura token/env.

Output atteso:

```text
mode=dry_run
competition_slug=serie-a
provider=stable_provider
real_writes_enabled=false
external_fetch=false
db_write=false
batch_id=stable_provider:serie-a:dry_run:20260831120000
provider_import_log_preview=ok
api_usage_log_preview=ok
rollback_plan_preview=ok
write_attempt_blocked=true
warnings=0
```

## D.13 — Ponte verso real-call read-only

D.13 non cambia gli script dry-run esistenti.

Gli script restano:

- locali;
- senza fetch esterne;
- senza token;
- senza scritture DB;
- con provider reali spenti;
- con Apify spento.

Il futuro script real-call dovrà essere separato dagli script dry-run e dagli import writer.

Prima probe futura:

- una sola richiesta;
- competizione `serie-a`;
- endpoint standings o fixtures;
- output console sanificato;
- nessun DB write;
- nessun import;
- nessun Apify;
- nessuna Production.

## D.14-A — Probe disabilitata

Nuovo comando:

```bash
npm run probe:stable-provider:disabled
```

Output atteso:

```text
mode=disabled_probe
competition_slug=serie-a
provider_candidate=api_football
provider_alternative=the_stats_api
real_provider_probe_enabled=false
external_fetch=false
db_write=false
token_read=false
provider_activated=false
import_enabled=false
blocked_reason=REAL_PROVIDER_PROBE_DISABLED
warnings=0
```

Questo comando è diverso da una real-call: non legge env, non chiama provider e non scrive dati.

## D.15 — Readiness probe

D.15 non modifica i dry-run.

La prossima probe reale potrà essere progettata solo dopo:

- scelta provider;
- verifica manuale costi/rate limit/licenza;
- token in env sicura;
- massimo una richiesta;
- nessuna scrittura DB;
- provider/import ancora spenti.

Documento:

- `docs/provider_probe_readiness_d15.md`.

Nota schema:

- `provider_import_logs`, `api_usage_logs` e `import_logs` esistono già;
- lo schema attuale non ha una colonna `batch_id/import_run_id`;
- in D.5 `batch_id` è quindi solo preview/documentale;
- prima di un writer reale andrà deciso se aggiungere una colonna dedicata o usare metadata/notes in modo controllato.

Rollback preview:

- D.5 non richiede rollback perché non scrive dati;
- il piano futuro prevede batch id, rollback ordinato e verifica prima di ogni commit dati.

## D.8 — Visibilità admin read-only import run

La pagina `/admin/imports` è stata predisposta per mostrare `provider_import_runs` in sola lettura.

Il reader:

- non chiama provider;
- non chiama Apify;
- non fa fetch esterne;
- non scrive DB;
- non legge token;
- non usa service role;
- rispetta RLS.

Il comportamento atteso in staging è empty state perché `provider_import_runs_count = 0`.

Questo completa la visibilità minima prima di qualunque futuro writer reale.

## Punto 24 — Local schema deep review

Punto 24 approfondisce localmente la review fixture → schema senza DB live.

Aggiornati:

- `npm run dry-run:manual-schema-confirmation`;
- `npm run dry-run:manual-import-readiness`;
- sezione read-only `/admin/imports` “Local schema deep review”.

Risultato:

- tabelle e colonne core confermate localmente;
- nessuna colonna essenziale mancante;
- competitions/teams/standings restano `needs_review`;
- ready fields: `12`;
- needs review fields: `6`;
- blocked fields: `0`;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 25-A, DB read-only check senza write.

## Punto 25 — DB read-only schema check

Aggiunto comando:

```bash
npm run dry-run:manual-db-schema-check
```

Lo script:

- usa solo client Supabase anon/pubblico se configurato;
- non usa service role;
- non stampa env/key/token;
- non scrive DB;
- non chiama provider;
- stampa solo count/status sanificati.

Risultato del primo check:

- `db_read=true`;
- `db_write=false`;
- `service_role_used=false`;

## Punto 33 — Dry-run output updates

I dry-run manual import ora espongono anche:

- `staging_apply_plan_created=true`;
- `backup_checklist_created=true`;
- `rollback_checklist_created=true`;
- `pre_apply_checklist_created=true`;
- `post_apply_verification_plan_created=true`;
- `point_34_authorization_required=true`;
- `ready_for_apply=false`;
- `next_write_allowed=false`.

Tutti gli output restano no-fetch/no-write/no-apply.

## Punto 34 — Dry-run output updates

I dry-run manual import ora espongono anche:

- `final_pre_apply_gate_created=true`;
- `authorization_language_defined=true`;
- `no_apply_safety_lock_created=true`;
- `point_35_readiness_criteria_created=true`;
- `explicit_user_authorization_received=false`;
- `point_35_blocked_without_explicit_authorization=true`;
- `ready_for_apply=false`;
- `next_write_allowed=false`.

Gli output restano no-fetch/no-write/no-apply.

## Punto 35 — Dry-run output updates

I dry-run manual import ora espongono anche:

- `point_35_explicit_authorization_received=true`;
- `real_migration_created=true`;
- `real_migration_path=supabase/migrations/20260922120000_manual_import_read_only_views.sql`;
- `staging_target_confirmed=true`;
- `production_excluded=true`;
- `migration_applied=false`;
- `db_write=false`;
- `db_write_scope=none`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `views_expected_count=3`;
- `views_verified_count=0`;
- `post_apply_verification_passed=false`;
- `next_write_allowed=false`.
- target tables non confermate;
- public views non confermate;
- payload non stampato;
- final blocked areas: `3`;
- `next_write_allowed=false`.

Il prossimo step resta no-write.

## Punto 26 — Read-only access investigation

Il dry-run DB schema check ora produce diagnosi aggiuntiva:

- `read_only_access_investigation=true`;
- `anon_client_used=true`;
- `schema_introspection_supported=false`;
- `direct_table_lookup_attempted=true`;
- `public_view_lookup_attempted=true`;
- `admin_view_lookup_attempted=false`;
- `direct_table_lookup_result=unknown`;
- `public_view_lookup_result=unknown`;
- `admin_view_lookup_result=not_attempted`;
- `requires_new_read_only_view=true`;
- `requires_service_role=false`;
- `next_write_allowed=false`.

Punto 26 non cambia lo stato operativo: nessun import, nessuna write, nessun provider.

## Punto 27 — Read-only view proposal

Punto 27 resta dry-run/documentazione.

Sono stati preparati:

- requisiti per view lookup read-only;
- field mapping fixture → view;
- pseudo-SQL non eseguibile;
- decision gate Punto 28.

Stato operativo:

- `migration_prepared=false`;
- `migration_applied=false`;
- `db_write=false`;
- `provider_activated=false`;
- `next_write_allowed=false`.

## Punto 28 — Migration proposal no-apply

Punto 28 resta dry-run/no-apply.

È stata creata una proposal documentale:

- `docs/migration_proposals/manual_import_read_only_views_p28.sql.md`

Stato:

- `read_only_view_migration_proposal_prepared=true`;
- `real_migration_file_created=false`;
- `migration_applied=false`;
- `db_write=false`;
- `provider_activated=false`;
- `next_write_allowed=false`.

Il file non è in `supabase/migrations` e non deve essere eseguito.

## Punto 29 — Proposal review dry-run status

Punto 29 revisiona e rafforza la proposal senza renderla eseguibile.

Stato dry-run:

- `migration_proposal_reviewed=true`;
- `migration_proposal_hardened=true`;
- `executable_migration_created=false`;
- `migration_file_created=false`;
- `migration_applied=false`;
- `placeholders_remaining_count=9`;
- `dashboard_confirmation_required=true`;
- `future_migration_draft_allowed=false`;
- `next_write_allowed=false`.

Provider/import restano spenti.

## Punto 40-Fix-B — Dry-run output aggiornato

Output atteso dopo lookup manuale read-only completato:

- `read_only_live_view_lookup_executed=true`;
- `query_result=success_no_rows_returned`;
- `view_lookup_executed=true`;
- `live_lookup_rows_count=0`;
- `existing_competitions_rows=0`;
- `existing_teams_rows=0`;
- `existing_standings_rows=0`;
- `preview_resolution=read_only_lookup_completed`;
- `create_count=5`;
- `update_count=0`;
- `skip_count=0`;
- `conflict_count=0`;
- `unresolved_count=0`;
- `db_write=false`;
- `provider_fetch=false`;
- `external_fetch=false`;
- `service_role_used=false`;
- `next_write_allowed=false`.

Il dry-run resta no-write/no-provider/no-env-output.

## Punto 40-B — Dry-run output atteso

Output atteso dopo creazione write plan no-apply:

- `point_40b_write_plan_created=true`;
- `write_plan_mode=no_apply`;
- `create_candidates_count=5`;
- `update_candidates_count=0`;
- `skip_candidates_count=0`;
- `conflict_count=0`;
- `unresolved_count=0`;
- `proposed_write_order=competitions,teams,standings`;
- `rollback_plan_created=true`;
- `post_write_verification_plan_created=true`;
- `db_write=false`;
- `service_role_used=false`;
- `provider_fetch=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `production_touched=false`;
- `next_write_allowed=false`;
- `point_41_authorization_required=true`.

Il dry-run resta no-write/no-provider/no-env-output.

## Punto 38 — Dry-run output alignment

Gli output dry-run manuali includono lo stato Punto 38:

- `point_38_admin_read_only_integration_checked=true`;
- `admin_imports_read_only=true`;
- `metadata_verification_completed=true`;
- `views_expected_count=3`;
- `views_verified_count=3`;
- `competitions_view_status=verified`;
- `teams_view_status=verified`;
- `standings_view_status=verified`;
- `post_apply_verification_passed=true`;
- `provider_fetch=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `production_touched=false`;
- `point_38_db_write=false`;
- `point_38_service_role_used=false`;
- `next_write_allowed=false`;
- `point_39_authorization_required=true`.

Questi output non eseguono provider fetch, DB write o deploy.

## Punto 39 — Manual import preview dry-run

Nuovo comando:

- `npm run dry-run:manual-import-preview`

Output atteso:

- `mode=manual_import_preview_dry_run`;
- `preview_mode=local_only_unresolved`;
- `external_fetch=false`;
- `provider_fetch=false`;
- `db_write=false`;
- `service_role_used=false`;
- `import_real_execution=false`;
- `fixtures_loaded=true`;
- `views_verified_count=3`;
- `view_lookup_executed=false`;
- `create_count=0`;
- `update_count=0`;
- `skip_count=0`;
- `conflict_count=0`;
- `unresolved_count=5`;
- `next_write_allowed=false`.

La preview non esegue insert/update/delete/upsert e non autorizza import reali.

## Punto 40-Fix — Read-only lookup pending

Il comando `npm run dry-run:manual-import-preview` supporta ora un risultato lookup manuale opzionale non committato:

- `fixtures/provider/manual/live-view-lookup-result.local.json`

Senza quel file, output atteso:

- `preview_mode=read_only_lookup_pending`;
- `view_lookup_executed=false`;
- `view_lookup_reason=pending_manual_sql_editor_execution`;
- `create_count=0`;
- `update_count=0`;
- `skip_count=0`;
- `conflict_count=0`;
- `unresolved_count=5`;
- `db_write=false`;
- `provider_fetch=false`;
- `service_role_used=false`;
- `next_write_allowed=false`.

Il file `.local.json` è ignorato da Git e non deve contenere segreti.

## Punto 30-C — Manual schema values collection

Output atteso dai dry-run manuali:

- `manual_schema_values_collection_prepared=true`;
- `real_schema_values_provided=false`;
- `placeholders_resolved_count=0`;
- `placeholders_uncollected_count=16`;
- `ready_for_migration_draft=false`;
- `executable_migration_created=false`;
- `migration_file_created=false`;
- `migration_applied=false`;
- `next_write_allowed=false`;
- `point_30d_authorization_required=true`.

Il dry-run resta no-write/no-provider/no-env-output.

## Punto 30-D — Local migration schema extraction

Output atteso dai dry-run manuali dopo estrazione locale:

- `local_schema_extraction_completed=true`;
- `supabase_dashboard_used=false`;
- `db_query_executed=false`;
- `db_write=false`;
- `service_role_used=false`;
- `placeholders_resolved_from_local_count=16`;
- `placeholders_unresolved_count=0`;
- `placeholders_unclear_count=0`;
- `ready_for_migration_draft=true`;
- `executable_migration_created=false`;
- `migration_file_created=false`;
- `migration_applied=false`;
- `next_write_allowed=false`;
- `point_31_authorization_required=true`.

Il dry-run resta no-write/no-provider/no-env-output. `ready_for_migration_draft=true` non autorizza apply o DB write.

## Punto 31 — Migration draft no-apply

Output atteso dai dry-run manuali:

- `migration_draft_created=true`;
- `migration_draft_path=docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`;
- `migration_draft_in_supabase_migrations=false`;
- `migration_applied=false`;
- `db_push_reset=false`;
- `db_write=false`;
- `service_role_used=false`;
- `executable_for_apply=false`;
- `requires_manual_review=true`;
- `requires_explicit_authorization=true`;
- `ready_for_apply=false`;
- `next_write_allowed=false`;
- `point_32_authorization_required=true`.

Il draft resta fuori da `supabase/migrations` e non deve essere eseguito.

## Punto 32 — Review no-apply della migration draft

Output atteso dai dry-run manuali:

- `migration_draft_reviewed=true`;
- `migration_draft_hardened=true`;
- `blocking_issues_count=0`;
- `needs_review_count=3`;
- `ready_for_staging_apply_candidate=true`;
- `ready_for_apply=false`;
- `migration_applied=false`;
- `db_push_reset=false`;
- `db_write=false`;
- `service_role_used=false`;
- `next_write_allowed=false`;
- `point_33_authorization_required=true`.

La review non applica nulla e non abilita import/provider.

## Punto 30-B — Dashboard confirmation manuale registrata

Punto 30-B registra la verifica manuale dichiarata dall'utente, senza SQL, senza DB write e senza valori schema risolutivi.

Stato dry-run:

- `dashboard_confirmation_completed=true`;
- `dashboard_sql_executed=false`;
- `dashboard_db_write=false`;
- `dashboard_service_role_used=false`;
- `placeholders_resolved_count=0`;
- `placeholders_unclear_count=16`;
- `new_read_only_view_still_required=true`;
- `ready_for_migration_draft=false`;
- `next_write_allowed=false`.

Provider/import restano spenti.
