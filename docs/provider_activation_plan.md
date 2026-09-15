# Provider Activation Plan

## Principio

Il frontend non conosce provider esterni. Solo job server-side chiamano adapter, normalizzano dati e scrivono su Supabase. Le pagine leggono snapshot salvati.

## Stato attuale

- `mock_provider`: usato per sviluppo/demo.
- Stable provider: disattivato.
- TheStatsAPI adapter: placeholder.
- API-Football adapter: placeholder.
- Apify/SofaScore: disattivato.
- Manual provider: disponibile per contenuti/link inseriti manualmente.

## Checklist prima dei provider reali

- [ ] Confermare provider stabile da usare.
- [ ] Definire mapping ID esterni per competizioni/squadre/giocatori/partite.
- [ ] Configurare budget richieste giornaliero/mensile.
- [ ] Verificare logging `api_usage_logs`.
- [ ] Eseguire dry-run senza scrittura.
- [ ] Eseguire import su un sottoinsieme minimo.
- [ ] Verificare deduplica e rollback.
- [ ] Verificare che nessuna pagina pubblica chiami provider.
- [ ] Verificare che il sito legga solo Supabase.
- [ ] Verificare contratto/licenza, attribuzione e diritti di memorizzazione/pubblicazione.

## Pilot FULL consigliato

1. Scegliere una competizione e una stagione.
2. Inserire token e base URL solo nei secret server-side.
3. Implementare endpoint minimi: competitions e teams.
4. Salvare fixture anonimizzate dei payload per i test.
5. Completare mapping ID esterni e normalizzatori conservativi.
6. Eseguire dry-run e confrontare quantità/identità.
7. Attivare upsert su Supabase staging solo dopo conferma.
8. Aggiungere fixtures/results, poi standings, infine statistiche.
9. Misurare richieste e costo prima di ampliare copertura.

## Checklist prima di Apify

- [ ] Lasciare `apify_sofascore` disattivato fino a test budget.
- [ ] Confermare budget 30 €/mese, warning 24 €, hard stop 30 €.
- [ ] Testare `checkApifyMonthlyBudget`.
- [ ] Testare piano weekly import solo latest round.
- [ ] Verificare che priority 1 venga prima di priority 2.
- [ ] Verificare che FULL_OFFICIAL non usi mai Apify.
- [ ] Nessun live scraping.
- [ ] Nessun download/reupload video.
- [ ] Nessuna chiamata lato utente.
- [ ] Verificare termini/licenze di Apify, actor e fonte dati.

## Guardie operative

- Provider disattivato significa nessuna fetch, non solo fallback UI.
- Budget non configurato significa safe/mock.
- Ogni chiamata ha request/run ID e log redatto.
- Budget check e prenotazione quota devono essere atomici.
- Timeout e retry limitati; nessun retry infinito.
- Import idempotenti; correzioni provider aggiornano senza duplicare.
- Fallback all'ultimo snapshot valido; un failure non cancella dati.

## FASE C consigliata

1. Collegare public readers Supabase minimi.
2. Pubblicare seed demo controllato.
3. Rendere admin editoriale manuale utile.
4. Tenere stable provider in dry-run.
5. Attivare primo import reale solo dopo conferma.
6. Tenere Apify spento fino a test budget.
7. Rifinire CTA Substack.

## Go/no-go

Go solo se contratto/licenza, budget, mapper testati, upsert idempotente, monitoraggio e fallback sono tutti verificati. In assenza di uno di questi elementi, mantenere `active: false` e usare mock.

## D.1 — Provider activation dry-run audit

Stato: piano dry-run preparato, nessun provider attivato.

Provider modellati nel codice:

- `mock_provider`: attivo nel catalogo locale, usato come fallback sviluppo/demo;
- `manual_provider`: attivo nel catalogo locale, dedicato a fonti editoriali e link ufficiali manuali;
- `stable_provider`: wrapper astratto per futuro provider stabile FULL_OFFICIAL, disattivato;
- `the_stats_api`: adapter placeholder, disattivato;
- `api_football`: adapter placeholder, disattivato;
- `apify_sofascore`: adapter placeholder/dry-run per campionati minori, disattivato.

Provider seedati nello staging:

- 6 provider base da `0006_seed_base_data.sql`;
- provider reali disattivati;
- Apify disattivato;
- import non abilitati.

Competizioni modellate:

- totale catalogo locale: 43;
- FULL_OFFICIAL: 14;
- APIFY_LIGHT_PLUS_PRIORITY_1: 15;
- APIFY_LIGHT_PLUS_PRIORITY_2: 14;
- TRIGGER concreti: 0.

FULL_OFFICIAL:

- Serie A;
- Premier League;
- LaLiga;
- Bundesliga;
- Ligue 1;
- UEFA Champions League;
- UEFA Europa League;
- Copa Libertadores;
- Brasileirão Série A;
- Argentina Primera División;
- Eredivisie;
- Jupiler Pro League;
- Primeira Liga;
- Süper Lig.

APIFY_LIGHT_PLUS_PRIORITY_1:

- Swiss Super League;
- Austrian Bundesliga;
- Danish Superliga;
- Allsvenskan;
- Eliteserien;
- Ekstraklasa;
- HNL;
- Serbian SuperLiga;
- J1 League;
- K League 1;
- Major League Soccer;
- Uruguayan Primera División;
- Categoría Primera A;
- Chilean Primera División;
- Ligue 2.

APIFY_LIGHT_PLUS_PRIORITY_2:

- Super League Greece;
- Czech First League;
- Ukrainian Premier League;
- Liga I Romania;
- Nemzeti Bajnokság I;
- Slovak Super Liga;
- Slovenian PrvaLiga;
- Premier League Bosnia and Herzegovina;
- Bulgarian First League;
- Liga 1 Peru;
- Paraguayan Primera División;
- Venezuelan Primera División;
- Bolivian División Profesional;
- Russian Premier League.

Admin stato provider/import:

- `/admin/providers` legge `data_providers` da Supabase staging se configurato, fallback mock;
- `/admin/competitions` mostra configurazione descrittiva locale;
- `/admin/imports` resta mock/dry-run;
- `/admin/apify-usage` resta mock/dry-run;
- nessuna pagina pubblica usa provider esterni.

Tabelle principali coinvolte:

- provider: `data_providers`, `provider_competition_config`;
- import/log: `provider_import_logs`, `import_logs`, `api_usage_logs`;
- Apify: `apify_usage_logs`, `apify_budget_status`;
- calcio: `competitions`, `teams`, `players`, `matches`, `match_events`, `standings`;
- statistiche: `team_match_stats`, `team_season_stats`, `player_match_stats`, `player_season_stats`.

Query read-only staging:

```sql
select count(*) as active_providers
from public.data_providers
where is_active = true;

select provider_key, name, provider_type, is_active, priority, monthly_budget_eur, warning_budget_eur, hard_stop_budget_eur
from public.data_providers
order by priority;

select count(*) as enabled_imports
from public.provider_competition_config
where import_enabled = true;

select tracking_level, count(*) as competitions
from public.competitions
group by tracking_level
order by tracking_level;

select c.slug, c.name, c.tracking_level, p.provider_key, pc.import_enabled, pc.priority, pc.data_confidence
from public.provider_competition_config pc
join public.competitions c on c.id = pc.competition_id
join public.data_providers p on p.id = pc.provider_id
order by c.tracking_level, c.slug, pc.priority;

select status, count(*) as runs
from public.import_logs
group by status
order by status;

select status, count(*) as provider_runs
from public.provider_import_logs
group by status
order by status;

select *
from public.apify_budget_status
order by period_start desc
limit 12;

select count(*) as teams_demo from public.public_teams;
select count(*) as matches_demo from public.public_matches;
select count(*) as standings_demo from public.public_standings;
```

Go/no-go D.2:

- non inserire token prima del dry-run;
- non attivare `is_active` o `import_enabled`;
- non aggiungere env su Production;
- prima simulare un provider stabile su una sola competizione demo;
- prima simulare Apify con budget mock e latest round only.

## D.2 — Provider config audit script

Stato: implementato localmente, nessuna chiamata esterna.

File:

- `scripts/provider/auditProviderConfig.ts`;
- comando `npm run audit:providers`.

Cosa fa:

- legge solo file statici versionati;
- analizza `config/providers.ts`;
- analizza `config/competitions.ts`;
- controlla la migrazione seed per `import_enabled=false`;
- controlla che il documento budget Apify citi hard stop;
- stampa report testuale sicuro.

Cosa non fa:

- non legge `.env.local`;
- non stampa env;
- non legge token;
- non chiama provider;
- non chiama Apify;
- non chiama SofaScore;
- non fa scraping;
- non apre connessioni DB;
- non scrive Supabase;
- non attiva import.

Esito corrente:

- provider totali: 6;
- provider reali spenti;
- Apify spento;
- competizioni totali: 43;
- FULL_OFFICIAL: 14;
- APIFY P1: 15;
- APIFY P2: 14;
- TRIGGER: 0;
- warnings: 0.

D.3 consigliato:

- dry-run stabile limitato a `serie-a`, usando solo adapter mock/fallback e payload futuri;
- nessun fetch reale;
- nessun token;
- nessuna scrittura DB.

## D.3 — Stable provider dry-run eseguito

Stato: completato localmente, nessun provider attivato.

Comando:

```bash
npm run dry-run:stable-provider
```

Risultato:

- competizione: `serie-a`;
- tracking level: `full_official`;
- provider candidato: `stable_provider`;
- candidati esterni: `the_stats_api/api_football`;
- mapped teams: 4;
- mapped matches: 2;
- mapped standings: 4;
- planned tables: `teams`, `matches`, `standings`, `provider_import_logs`;
- warnings: 0.

Safety checks:

- `stable_provider` off;
- `the_stats_api` off;
- `api_football` off;
- Apify off;
- fetch esterne 0;
- scritture DB 0;
- token letti/stampati 0.

Questo dry-run non abilita l’import reale. Serve solo a validare forma del piano dati e guardie operative.

## D.4 — Provider logging/budget dry-run

Stato: completato localmente, senza provider reali e senza DB write.

Nuovo comando:

```bash
npm run dry-run:provider-logging
```

Controlli simulati:

- `provider_import_logs` shape compatibile con schema staging;
- `api_usage_logs` shape compatibile con schema staging;
- budget guard Apify 30/24/30 €;
- run mock su `serie-a`;
- provider stabile ancora spento;
- TheStatsAPI/API-Football ancora spenti;
- Apify ancora spento;
- import ancora spenti.

Scenari budget simulati:

- A: 0 € + 0 € → run consentita;
- B: 24 € + 1 € → run consentita con warning;
- C: 30 € + 1 € → run bloccata da hard stop.

Il dry-run conferma la forma futura dei report, ma non rende ancora attivabile il provider reale.

Prima dell’attivazione reale restano obbligatori:

- scelta provider effettivo;
- credenziali solo server-side;
- writer log transazionale;
- mapping ID esterni;
- budget reale da Supabase;
- rollback batch;
- approvazione manuale per ogni primo import.

## D.5 — Writer/log guard disabilitati

Stato: preparato localmente.

Sono stati introdotti contratti safe per i futuri writer provider:

- `assertProviderWritesDisabled()`;
- `buildProviderImportBatchId()`;
- `buildProviderImportLogPreview()`;
- `buildApiUsageLogPreview()`;
- `buildRollbackPlanPreview()`.

Il comportamento voluto è conservativo:

- un tentativo di scrittura viene bloccato;
- il writer restituisce solo preview/report;
- non apre client Supabase;
- non usa service role;
- non chiama provider;
- non chiama Apify.

Comando di verifica:

```bash
npm run dry-run:provider-writer-guards
```

Risultato atteso:

- `real_writes_enabled=false`;
- `write_attempt_blocked=true`;
- preview log ok;
- rollback preview ok;
- warnings 0.

Prima di trasformare questo layer in writer reale serviranno:

1. decisione su `batch_id/import_run_id` nello schema;
2. writer server-side esplicito e testato;
3. RLS/admin policy sui log;
4. rollback query;
5. flag manuale per ambiente staging;
6. conferma utente prima del primo DB write.

## D.6 — Modello `provider_import_runs`

Decisione tecnica proposta, non applicata:

- introdurre `provider_import_runs` come testata batch;
- collegare `provider_import_logs`, `api_usage_logs` e `import_logs` tramite `import_run_id` e `batch_id`;
- mantenere RLS stretta;
- nessun accesso anon;
- lettura editor/admin;
- scrittura admin soltanto in futura fase server-side controllata;
- nessuna policy delete.

La migrazione preparata è:

- `supabase/migrations/0009_provider_import_runs.sql`.

Il layer preview è stato aggiornato:

- `buildProviderImportRunPreview()`;
- `provider_import_log_preview` include `import_run_id` e `batch_id`;
- `api_usage_log_preview` include `import_run_id` e `batch_id`;
- rollback preview ora considera `provider_import_runs`.

Prima dell’applicazione manuale:

1. rileggere integralmente la migrazione;
2. verificare che lo staging sia sacrificabile;
3. applicare solo 0009;
4. controllare RLS/grant;
5. non attivare writer reali.

## D.6-B — 0009 applicata, writer ancora bloccati

La migrazione `0009_provider_import_runs.sql` è stata applicata manualmente su Supabase staging “Regista Avanzato”.

Metodo:

- SQL Editor;
- no `db push`;
- no `db reset`;
- no Production.

Risultato:

- `provider_import_runs` disponibile;
- log provider/API/import collegabili tramite `import_run_id` e `batch_id`;
- RLS/policy create;
- nessuna riga reale inserita;
- provider/import ancora disattivati;
- `realWritesEnabled=false`.

## D.13 — Stable provider real-call readiness

D.13 prepara solo il piano per una futura prima chiamata reale read-only.

Documento dedicato:

- `docs/stable_provider_real_call_readiness_d13.md`.

Stato:

- nessuna chiamata TheStatsAPI;
- nessuna chiamata API-Football;
- nessuna fetch esterna;
- nessun token letto;
- nessuna scrittura DB;
- provider reali ancora off;
- `import_enabled=false`;
- Apify off;
- Production non toccata.

Decisione provvisoria:

- `api_football` è il provider preferito provvisorio solo per una futura probe read-only;
- `the_stats_api` resta alternativa;
- la scelta finale richiede verifica manuale di copertura, prezzo, rate limit, licenza e payload.

La futura real-call dovrà essere uno script separato dall’import writer, massimo una richiesta su `serie-a`, output sanificato e nessuna scrittura DB.

## D.14-A — Script probe disabilitato

Creato:

- `scripts/provider/disabledStableProviderProbe.ts`.

Aggiunto comando:

- `npm run probe:stable-provider:disabled`.

La probe è soltanto preparatoria:

- non chiama API-Football;
- non chiama TheStatsAPI;
- non legge token;
- non fa fetch;
- non scrive DB;
- non attiva provider/import;
- conferma `blocked_reason=REAL_PROVIDER_PROBE_DISABLED`.

## D.15 — Gate prima della probe reale

Creato:

- `docs/provider_probe_readiness_d15.md`.

Il gate richiede:

- provider scelto definitivamente;
- prezzo/rate limit/licenza verificati manualmente;
- token solo in env sicura;
- una sola request;
- output sanificato;
- nessun DB write;
- nessun `import_enabled=true`;
- provider ancora off in `data_providers`;
- `realWritesEnabled=false`;
- Production non toccata.

Prima di qualunque writer reale:

1. testare RLS con sessione app admin/editor/free_user;
2. verificare che anon/free_user non leggano o scrivano run/log;
3. preparare solo writer staging con rollback;
4. mantenere provider reali spenti;
5. richiedere conferma manuale.

## D.7 — Readiness senza writer reali

Prima di qualunque writer provider è stato preparato un controllo read-only:

- `supabase/manual/provider_import_runs_rls_d7.sql`;
- `docs/provider_import_runs_rls_test_plan.md`.

Il controllo non inserisce dati e non abilita import.

Serve a confermare:

- `provider_import_runs` protetta da RLS;
- nessuna policy delete;
- log collegati tramite colonne batch/import;
- provider e import ancora spenti.

## D.7-B — Esito readiness provider_import_runs

La verifica manuale read-only D.7-A è stata completata sullo staging “Regista Avanzato”.

Confermato:

- `provider_import_runs` presente;
- RLS attiva;
- count = 0;
- provider esterni ancora off;
- import ancora disabilitati;
- nessuna policy `DELETE`;
- SQL Editor non ha sessione app admin (`auth.uid() = null`, helper admin/editor = false).

Impatto sul piano provider:

- il modello run/batch è pronto come base di tracciamento;
- nessun writer reale è ancora consentito;
- nessun provider reale può essere attivato prima di test RLS applicativi;
- Apify resta spento;
- `realWritesEnabled=false` resta il blocco operativo principale.

Prossimo step:

- D.8 — visibilità admin read-only delle import run, senza import reali.

## D.8 — Reader admin import runs

Implementata visibilità read-only in `/admin/imports` per le future run provider/import.

Stato:

- reader server-side con sessione utente;
- RLS rispettata;
- nessuna service role;
- nessuna scrittura DB;
- nessun comando import;
- nessun provider reale;
- nessun Apify;
- empty state atteso con `provider_import_runs_count = 0`.

La sezione serve solo a rendere auditabile lo stato futuro dei batch. Non autorizza ancora run reali.

Prossimo step consigliato:

- D.9 — verifica Preview di `/admin/imports` e test RLS applicativo con admin/editor/free_user, senza creare run reali.

## D.9 — Preview check import runs

Verifica tecnica Preview completata:

- deployment Preview Ready;
- alias branch Preview attivo;
- route `/admin/imports` presente;
- Vercel Authentication attiva per accesso non autenticato.

Il test admin UI resta manuale perché richiede sessione Vercel e sessione Supabase admin.

Fino al completamento manuale:

- non attivare provider;
- non attivare import;
- non creare run;
- non abilitare writer;
- mantenere `realWritesEnabled=false`.

## D.9-B — Preview imports verificata manualmente

La pagina `/admin/imports` è stata verificata manualmente su Preview.

Confermato:

- admin vede la sezione `Provider import runs`;
- empty state corretto;
- badge `Read-only`, `Provider off`, `Apify off`, `realWritesEnabled=false`;
- nessun bottone di run/import/delete/update;
- accesso non autenticato bloccato da Vercel Authentication;
- provider/import restano spenti;
- DB invariato per quanto verificato;
- Production non toccata.

Questa verifica abilita solo maggiore visibilità read-only. Non abilita provider o writer.

Prossimo step consigliato:

- D.10 — test RLS applicativo per ruoli su import runs, senza run reali.

## D.10 — Ruoli applicativi import runs

Audit completato senza modifiche a utenti/ruoli.

La visibilità import runs è coerente con il piano provider:

- `free_user` non accede ad admin;
- `editor/admin` approved possono accedere in sola lettura;
- nessuna azione writer presente;
- provider/import restano spenti;
- `realWritesEnabled=false`.

Prima di qualunque attivazione provider restano necessari:

- test `free_user` negativo con utente controllato;
- test `editor` positivo read-only con utente controllato;
- conferma DB invariato;
- nessun writer reale.

## D.11 — Readiness gate provider/import

Decisione D.11:

- non creare utenti;
- non modificare ruoli;
- non abilitare writer;
- non attivare provider;
- non attivare Apify;
- non attivare import.

I test `free_user`/`editor` restano residui consapevoli.

NO writer reali finché:

- GitHub repo Private confermato;
- service role Supabase ruotata/rigenerata se esposta;
- env Supabase solo Preview;
- migrazioni manuali tracciate;
- RLS testata da app con admin/editor/free_user/non autenticato;
- `realWritesEnabled=false` resta default;
- ogni import ha `import_run_id`, `batch_id`, lifecycle, rollback e audit/log;
- budget Apify con warning 24 €/mese e hard stop 30 €/mese;
- nessuna chiamata provider/Apify lato utente;
- nessun deploy Production senza checklist dedicata.

## D.16-A — Provider manual verification checklist

Creato:

- `docs/provider_manual_verification_checklist_d16a.md`.

Obiettivo:

- confrontare manualmente `api_football` e `the_stats_api` prima di qualunque probe reale;
- non inventare prezzi, rate limit, licenze o copertura;
- mantenere tutte le voci non confermate come “da verificare manualmente”.

Decisione provvisoria:

- preferred provvisorio: `api_football`;
- alternative: `the_stats_api`;
- nessuna modifica a config, DB, provider o import.

Gate prima di real-call:

- provider scelto manualmente;
- prezzo, rate limit e licenza verificati;
- endpoint scelto;
- token solo in env sicura;
- provider ancora off in `data_providers`;
- nessun `import_enabled=true`;
- `real_provider_probe_enabled=false` fino a nuova conferma;
- `realWritesEnabled=false`;
- nessun DB write;
- Production non toccata.

## D.16-B — API-Football Free per prima probe

Creato:

- `docs/api_football_free_probe_plan_d16b.md`.

Decisione:

- prima probe futura su `api_football`;
- piano Free;
- `the_stats_api` resta alternativa.

Motivazione:

- ridurre rischio economico;
- testare endpoint/auth/payload prima di qualunque piano a pagamento;
- evitare attivazioni provider/import premature.

La probe non è stata eseguita. Restano spenti:

- API-Football in DB/config runtime;
- TheStatsAPI;
- Apify;
- import;
- writer reali.

Prima di D.16-C:

- account/API-Football Free creato manualmente;
- token solo in env sicura;
- massimo una richiesta;
- nessuna scrittura DB;
- nessun provider/import attivato;
- `realWritesEnabled=false`;
- Production non toccata.

## D.16-C1 — Preparazione API-Football key

Creato:

- `docs/api_football_key_setup_d16c1.md`.

Aggiornato:

- `.env.example` con placeholder non segreti:
  - `API_FOOTBALL_API_KEY=`;
  - `API_FOOTBALL_BASE_URL=`;
  - `API_FOOTBALL_PROBE_ENABLED=false`.

La chiave reale non viene inserita né letta. Il piano conferma:

- token solo in env sicura;
- mai token in chat o docs;
- mai token in Production;
- nessuna real-call;
- nessun provider/import attivato;
- writer ancora bloccati.

## D.16-C2-B — Script probe API-Football preparato

Creato:

- `scripts/provider/apiFootballProbe.ts`;
- `docs/api_football_probe_script_d16c2b.md`.

Aggiornato:

- `package.json` con `probe:api-football:gated`.

La fase non esegue il comando e non abilita provider.

Il piano operativo resta:

- script separato dagli import;
- massimo una richiesta futura;
- default disabled;
- nessuna fetch in D.16-C2-B;
- nessuna scrittura DB;
- provider/import spenti;
- Production non toccata.

## D.16-C3 — Real-call non completata

- Tentativo effettuato con gate temporanei abilitati.
- La richiesta reale non è partita perché la key non era disponibile nel process environment.
- `requests_executed=0`.
- Nessuna fetch provider completata.
- Nessuna scrittura DB.
- Nessun import attivato.
- Nessun provider attivato.
- Apify e TheStatsAPI non chiamati.
- Production non toccata.

Decisione:

- non abbassare le protezioni;
- non caricare `.env.local` da Codex;
- riprovare solo con una procedura esplicita che renda la key disponibile al processo senza stamparla.

## D.16-C3-R1 — API-Football raggiunta, risposta 403

La prima richiesta controllata è stata eseguita una sola volta.

- Provider: API-Football.
- Endpoint: standings Serie A.
- Richieste eseguite: 1.
- HTTP status: `403`.
- Errori API sanificati: `2`.
- Righe standings: `0`.
- Mapping teorico: non possibile in questa prova.

Conferme:

- nessun retry;
- nessuna seconda richiesta;
- nessun payload completo stampato;
- nessun token stampato;
- nessuna scrittura DB;
- provider/import ancora spenti;
- Apify spento;
- TheStatsAPI non chiamato;
- Production non toccata.

Prima di qualunque ulteriore real-call, verificare manualmente piano/key/endpoint nel provider e aprire una nuova fase autorizzata.

## D.16-C3-R2 — Preparazione retry 403

Documento:

- `docs/api_football_403_retry_readiness_d16c3r2.md`.

R2 readiness non autorizza chiamate provider. Serve solo a chiarire i gate manuali:

- piano Free attivo;
- API Football v3 abilitata;
- key corretta e non esposta;
- eventuali restrizioni IP/domain risolte;
- endpoint/parametri verificati;
- massimo una richiesta;
- nessun retry automatico;
- nessun DB write.

Provider/import restano spenti e Production resta esclusa.

## D.16-C3-R2 manual check — Nessuna attivazione provider

Documento:

- `docs/api_football_dashboard_manual_check_d16c3r2.md`.

La fase prepara controlli manuali dashboard e non attiva nulla:

- nessuna chiamata API-Football;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessun provider/import attivato;
- Apify spento;
- TheStatsAPI non chiamato;
- Production non toccata.

Prima del retry R2 servirà scegliere se usare ancora `season=2026` o modificare in fase dedicata verso `season=2025`.

## D.16-C2-C — Checklist finale prima della probe

Creato:

- `docs/api_football_pre_real_call_checklist_d16c2c.md`.

Endpoint consigliato:

- API-Football standings Serie A.

Condizioni per D.16-C3:

- key rigenerata;
- massimo una richiesta;
- niente retry/loop/paginazione;
- output summary sanificato;
- nessun DB write;
- nessun provider/import attivato;
- Production esclusa;
- conferma esplicita dell’utente.
