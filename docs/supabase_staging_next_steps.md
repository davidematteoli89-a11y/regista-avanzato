# Supabase staging next steps

## Stato attuale

Supabase staging e Vercel Preview sono collegati e funzionanti per Auth, account, preferenze, ricerca quota e admin protetto.

Completato:

- Trigger/profilo utente verificato.
- RPC quota ricerca verificata fino al limite 3/3.
- RLS anon/free user testata senza leakage noto.
- Utente test promosso admin in staging e helper RBAC verificati.
- UI locale e Preview online testate su login, account, preferenze, ricerca, admin e logout.
- Provider reali e Apify restano spenti.

## Migration history risk

Le migrazioni `0001`-`0006` sono state applicate manualmente via `db query --file`.

Questo significa che `supabase_migrations.schema_migrations` potrebbe non essere allineata allo stato reale del database.

Regole fino a decisione:

- Non usare `supabase db push`.
- Non usare `supabase db reset`.
- Non rilanciare migrazioni già applicate.
- Non creare nuove migrazioni senza piano di tracking.

## Opzioni migration tracking

### Opzione A — Continuare manualmente nello staging attuale

Lasciare staging così com'è e applicare eventuali fix SQL mirati con query controllate.

Pro:

- Rischio basso sullo staging già funzionante.
- Non richiede reset.

Contro:

- Tracking migrazioni non standard.
- Richiede disciplina manuale.

### Opzione B — Allineare `schema_migrations`

Inserire/registrare con procedura controllata le migrazioni già applicate, dopo verifica esatta dello stato database.

Pro:

- Porta lo staging verso flusso Supabase più ordinato.

Contro:

- Va fatto con estrema prudenza.
- Rischio mismatch se una migrazione è stata applicata con piccole differenze manuali.

### Opzione C — Ricreare staging in futuro

Creare un nuovo staging vuoto e applicare le migrazioni con flusso Supabase corretto.

Pro:

- Stato pulito e riproducibile.

Contro:

- Richiede rifare seed, utente test e configurazioni.

## Prossima fase consigliata

FASE C:

1. Public readers Supabase per competitions/teams/matches: avviato in C.1.
2. Seed demo pubblicato e controllato: prossimo passo C.2.
3. Admin editorial content reale manuale.
4. Provider stable solo in dry-run.
5. Primo import reale solo dopo conferma.
6. Apify ancora spento fino a test budget.
7. Substack CTA finale.

## Stato C.1

- `public_competitions`, `public_teams`, `public_matches` e `public_standings` sono predisposte come fonti pubbliche.
- I reader pubblici provano Supabase staging e cadono in fallback mock solo se Supabase non è configurato o la view non è disponibile.
- Se Supabase è configurato ma le view sono vuote, la UI deve mostrare un empty state controllato.
- Non sono stati attivati provider, Apify, import o Production.

## Stato C.2

- Seed demo corretto applicato manualmente.
- `public_competitions`: 1.
- `public_teams`: 4.
- `public_matches`: 2.
- `public_standings`: 4.
- Provider attivi: 0.
- Import abilitati: 0.
- Route pubbliche principali verificate localmente con dati demo Supabase.
- Prossimo passo: C.3 admin/editorial content reale manuale oppure commit C.1/C.2 prima di procedere.

## Stato C.4.2

- L'area admin ha un tasto `Esci` visibile nell'header.
- Il logout admin usa Supabase Auth server-side e reindirizza a `/login`.
- La navbar pubblica non mostra più `Accedi`/`Registrati gratis` quando esiste una sessione Supabase: mostra `Account`.
- Il route group pubblico è dinamico per leggere i cookie/sessione a ogni richiesta.
- Da verificare su Preview dopo push: login, navbar `Account`, logout, navbar `Accedi`/`Registrati gratis`, `/admin` bloccato dopo logout.

## Stato C.4.3

- Deployment Preview del branch `preview` trovato e Ready.
- Preview protetto da Vercel Authentication: richiesta anonima reindirizzata a Vercel SSO.
- Commit fix CTA: `11646dc`.
- URL Preview individuato: `https://regista-avanzato-kwh385tqr-davide-matteoli.vercel.app`.
- Alias branch Preview: `https://regista-avanzato-git-preview-davide-matteoli.vercel.app`.
- Bug manuale rilevato: il CTA `Accedi gratis` da non loggato era visibile ma non navigava correttamente sul dominio Preview.
- Fix locale preparato: CTA separati `Accedi` -> `/login` e `Registrati gratis` -> `/registrati`; `Accedi` usa anchor HTML standard.
- Test browser autenticato completato manualmente e verificato come funzionante.
- Conferme:
  - navbar `Accedi`/`Registrati gratis` da non loggato;
  - `Accedi` apre `/login`;
  - `Registrati gratis` apre `/registrati`;
  - registrazione funzionante;
  - navbar `Account` da loggato;
  - `/account` funzionante;
  - `/admin` funzionante solo con account admin;
  - utenti non loggati/non admin bloccati o 404;
  - tasto `Esci` admin funzionante;
  - `/admin` bloccato dopo logout.
- Test manuale Preview completato dall'utente: flusso funzionale, login/logout percepiti come lenti.
- Ottimizzazione locale applicata:
  - deduplica per-request di `getCurrentUser()`;
  - quota ricerca senza lettura sessione duplicata quando `userId` è già noto.

## Supabase Auth URL/Redirect per Preview

- Per Preview, Supabase Auth deve avere `Site URL` e `Redirect URLs` coerenti con il dominio Preview/alias usato.
- `localhost` resta corretto solo per sviluppo locale.
- I link email già generati prima della modifica URL possono continuare a puntare al vecchio URL.
- Dopo aver cambiato URL Supabase Auth, rigenerare la registrazione o l'email di conferma.

## Performance auth da monitorare

- Vercel Authentication su Preview può aggiungere latenza percepita.
- Supabase Auth staging remoto può rendere login/logout più lenti del mock locale.
- Il layout pubblico resta dinamico per mostrare correttamente `Accedi`/`Account`.
- Prima di altre modifiche, raccogliere tempi approssimativi e Network panel su `/login`, `/account`, `/admin`.

## Cose da non fare ancora

- Non fare deploy production.
- Non inserire env su Production.
- Non attivare provider reali.
- Non chiamare TheStatsAPI, API-Football o Apify.
- Non importare dati reali.
- Non pubblicare contenuti reali.
- Non rimuovere Deployment Protection dal Preview.

## D.17-B2 — TheStatsAPI key setup locale

La key TheStatsAPI è stata verificata solo come presenza locale in `.env.local`, senza stampare valori.

Stato:

- `.env.local` ignorato da Git;
- `.env.local` non staged;
- `THESTATSAPI_API_KEY_PRESENT=true`;
- `THESTATSAPI_BASE_URL_PRESENT=true`;
- `THESTATSAPI_PROBE_ENABLED=false`;
- nessuna real-call;
- nessuna fetch provider;
- nessuna scrittura DB;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- Production non toccata.

Prossimo step: preparare uno script TheStatsAPI gated e disabilitato di default, senza collegarlo a import o writer.

## D.17-C — Script TheStatsAPI gated senza DB

Preparato script locale:

- `scripts/provider/theStatsApiProbe.ts`.

Il comando `npm run probe:thestatsapi:gated` resta bloccato di default e non tocca Supabase:

- nessuna lettura token in modalità disabled;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessuna riga `provider_import_runs`;
- nessun log import/API usage scritto;
- nessun import abilitato;
- nessun provider attivato.

Qualunque futura real-call TheStatsAPI dovrà essere una fase separata, con conferma esplicita e massimo una richiesta read-only.

## D.17-D — Checklist pre-real-call senza Supabase write

La checklist finale TheStatsAPI è stata preparata.

Per Supabase staging non cambia nulla:

- nessuna scrittura DB;
- nessun insert/update/delete/upsert;
- nessun write su `provider_import_runs`;
- nessun write su `provider_import_logs`;
- nessun write su `api_usage_logs`;
- nessun write su `import_logs`;
- provider/import spenti;
- `realWritesEnabled=false`;
- Apify spento;
- Production non toccata.

Prima di D.17-E bisogna confermare endpoint TheStatsAPI, auth/header e parametri. In caso contrario il gate resta chiuso.

## D.17-E0 — Endpoint verificato senza Supabase write

D.17-E0 non ha modificato Supabase staging.

Risultato:

- endpoint candidato TheStatsAPI scelto per prima probe: `GET /football/competitions/comp_5840/seasons/sn_6199313/standings`;
- base URL `https://api.thestatsapi.com/api`;
- auth Bearer;
- nessuna real-call;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessun write su `provider_import_runs`, `provider_import_logs`, `api_usage_logs` o `import_logs`;
- provider/import spenti;
- `realWritesEnabled=false`;
- Apify spento;
- Production non toccata.

D.17-E dovrà restare una singola richiesta read-only e non dovrà scrivere alcun log o dato su Supabase.

## Stato C.3

- Reader editoriali predisposti in locale per leggere solo public view Supabase sicure.
- View usate:
  - `public_articles_published`;
  - `public_news_published`;
  - `public_stories_published`;
  - `public_historical_echoes`.
- File seed manuale creato: `supabase/manual/editorial_seed_c3.sql`.
- Il seed C.3 non è stato applicato.

## Prossimo passo C.3

Se confermato, applicare manualmente nello staging solo la SEZIONE 1 del file:

- `supabase/manual/editorial_seed_c3.sql`

Poi eseguire la SEZIONE 2 per verificare:

- 1 articolo demo in `public_articles_published`;
- 1 news demo in `public_news_published`;
- 1 story demo in `public_stories_published`;
- 1 Historical Echo demo in `public_historical_echoes`;
- `active_providers = 0`;
- `enabled_imports = 0`.

Non usare `db push`, `db reset`, provider reali o Apify.

## Stato C.4

- Admin editoriale collegato in lettura a Supabase staging.
- Sezioni coinvolte:
  - `/admin/generated-content/articles`;
  - `/admin/news-radar`;
  - `/admin/story-library`;
  - `/admin/historical-echo`.
- View usate:
  - `admin_public_articles`;
  - `admin_news_archive`;
  - `admin_story_library`;
  - `admin_historical_echoes`.
- Nessuna scrittura admin reale è stata implementata.
- Nessun provider/import/Apify è stato attivato.

## Prossimo passo staging

Prima di rendere operative azioni manuali:

- definire Server Actions separate per create/update/unpublish;
- aggiungere audit log obbligatorio;
- testare RLS per editor e admin;
- preferire unpublish/rollback a delete;
- mantenere publish massivo disabilitato.

## C.4.4-A — Hardening SQL manuale applicato

Migrazione applicata manualmente su Supabase staging:

- `supabase/migrations/0007_admin_editorial_views_explicit_columns.sql`.

Obiettivo:

- sostituire le view admin editoriali `select *` con view a colonne esplicite;
- preservare i nomi view già usati dai reader admin;
- ridurre rischio di leakage futuro se le tabelle base ricevono nuove colonne.

Esito:

- le view `admin_public_articles`, `admin_news_archive`, `admin_story_library` e `admin_historical_echoes` sono state ricreate;
- `information_schema.columns` conferma le colonne esplicite;
- `pg_views` conferma il filtro RBAC `where public.is_editor_or_admin()`;
- `anon` non ha grant;
- `authenticated` ha `select`, ma i profili non staff non ricevono righe dal filtro RBAC;
- provider reali e Apify restano spenti;
- Production non è stata toccata.

Prossimi controlli consigliati:

1. verificare in locale le quattro pagine admin editoriali dopo la modifica SQL;
2. verificare in Preview al prossimo deploy non Production;
3. pianificare audit delle altre view `admin_*` fuori scope editoriale.

Non usare ancora:

- `supabase db push`;
- `supabase db reset`;
- Production;
- provider o Apify.

## C.5.1 — Piano scritture admin auditate

Audit completato senza modifiche DB:

- le tabelle editoriali sono pronte per aggiornamenti manuali minimi;
- `admin_audit_logs` è presente e append-only;
- le policy attuali proteggono le tabelle da anon/free_user;
- manca però una RPC transazionale per garantire `update + audit log` come singola operazione.

Prossimo passo consigliato:

1. preparare una nuova migrazione SQL versionata, non applicata automaticamente;
2. creare funzioni RPC per:
   - aggiornamento `internal_notes`;
   - rollback/unpublish singolo da `published` a `draft` o `archived`;
3. validare in SQL:
   - content type whitelistato;
   - UUID;
   - transizioni status ammesse;
   - update solo per `id`;
4. scrivere sempre su `admin_audit_logs` nello stesso blocco;
5. decidere se abilitare solo admin/super_admin o anche editor;
6. testare anon/free_user/editor/admin su staging.

Fino a quel momento:

- nessuna form admin deve modificare dati reali;
- nessun delete reale;
- nessun publish massivo;
- nessun uso di service role per bypassare RLS.

## C.5.2-A — Applicazione manuale RPC admin

Migrazione applicata manualmente su Supabase staging:

- `supabase/migrations/0008_admin_editorial_transactional_actions.sql`.

Verifica eseguita:

- dal Supabase SQL Editor, `auth.uid()` risulta `null`;
- dal Supabase SQL Editor, `public.is_admin()` risulta `false`;
- una chiamata diretta a `update_editorial_internal_notes` fallisce correttamente con `admin_editorial_action_forbidden`;
- il blocco è atteso perché il SQL Editor non rappresenta la sessione Supabase Auth dell’utente admin dell’app;
- il controllo `public.is_admin()` resta corretto e non va rimosso.

Resta da testare:

- chiamata positiva tramite Server Action con sessione admin reale;
- scrittura audit log associata alla modifica;
- fallimento per anon/free_user da contesto applicativo;
- eventuale test `unpublish_editorial_content` solo su contenuto demo sacrificabile.

Prossimo passo consigliato:

- C.5.3: creare un piano per Server Action di test controllata, senza UI definitiva e senza abbassare la sicurezza.

Rollback SQL, se necessario:

```sql
drop function if exists public.update_editorial_internal_notes(text, uuid, text);
drop function if exists public.unpublish_editorial_content(text, uuid, text, text);
```

Non usare:

- `supabase db push`;
- `supabase db reset`;
- Production;
- provider o Apify.

## C.5.3 — Test Server Action note interne

Implementazione locale pronta:

- Server Action: `updateAdminEditorialInternalNotesAction`;
- RPC chiamata: `update_editorial_internal_notes`;
- UI: textarea `Note interne` + bottone `Salva note` nelle tabelle admin Supabase staging.

Test manuale staging/Preview consigliato:

1. login come account admin;
2. aprire `/admin/generated-content/articles`;
3. modificare la nota interna di un contenuto demo;
4. verificare redirect/reload della pagina admin;
5. controllare che la nota risulti aggiornata;
6. controllare `admin_audit_logs` per action `update_editorial_internal_notes`;
7. ripetere su `news`, `story` o `historical_echo` solo se il primo test è pulito;
8. verificare logout e blocco `/admin`;
9. verificare che provider/import/Apify restino spenti.

Da non testare ancora:

- `unpublish_editorial_content`;
- delete;
- publish;
- create;
- azioni massive.

Se il test fallisce:

- non abbassare `is_admin()`;
- non usare service role;
- registrare codice errore applicativo;
- verificare sessione Supabase Auth e ruolo `users_profile`.

## C.5.3-A — Verifica Preview note interne completata

La verifica manuale su Vercel Preview è stata completata con sessione admin reale.

Confermato:

- deployment Preview del commit `91e3e89` Ready;
- login admin riuscito;
- `/admin/generated-content/articles` accessibile;
- textarea `Note interne`, bottone `Salva note` e badge `Staging manual action` visibili;
- salvataggio nota interna demo riuscito;
- pagina aggiornata senza errore;
- `admin_audit_logs` contiene una nuova riga `update_editorial_internal_notes`;
- `before_data`, `after_data`, `metadata` e `created_at` recente presenti;
- unpublish/publish/delete/create draft non presenti;
- provider/Apify spenti;
- Production non toccata.

Query audit usata per la verifica:

```sql
select
  action,
  entity_type,
  entity_id,
  before_data,
  after_data,
  metadata,
  created_at
from public.admin_audit_logs
where action = 'update_editorial_internal_notes'
order by created_at desc
limit 5;
```

Risultato atteso:

- `action = update_editorial_internal_notes`;
- `entity_type` coerente con la sezione testata, inizialmente `article`;
- `entity_id` uguale al contenuto modificato;
- `before_data` presente;
- `after_data` presente;
- `metadata` presente;
- `created_at` recente.

Non eseguire ancora:

- `unpublish_editorial_content`;
- publish;
- delete;
- create draft;
- azioni massive.

## C.6 — Prossimi passi dopo chiusura MVP staging

Stato attuale:

- Supabase staging funzionante;
- public views demo verificate;
- view admin editoriali esplicite verificate;
- RPC `update_editorial_internal_notes` verificata tramite Server Action;
- audit log confermato;
- provider/Apify/import spenti.

Da decidere prima di nuove migrazioni:

- strategia migration tracking:
  - lasciare staging manuale fino alla prossima migrazione;
  - allineare `supabase_migrations.schema_migrations` con procedura controllata;
  - ricreare staging in futuro usando il flow Supabase migrations corretto;
- piano C.5.4 per testare `unpublish_editorial_content` solo su contenuti demo;
- audit delle altre view `admin_*` non editoriali;
- eventuale generazione tipi Supabase.

Da non fare ancora:

- `db push`;
- `db reset`;
- provider reali;
- Apify;
- import automatici;
- Production deploy.

## C.5.4 — Test staging richiesto per unpublish

La UI e la Server Action per `unpublish_editorial_content` sono preparate localmente.

Prima del test Preview:

- confermare commit/push della modifica;
- attendere deployment Preview Ready;
- usare solo utente admin test;
- scegliere un contenuto demo sacrificabile;
- non usare dati reali.

Query audit post-test:

```sql
select
  action,
  entity_type,
  entity_id,
  before_data,
  after_data,
  metadata,
  created_at
from public.admin_audit_logs
where action = 'unpublish_editorial_content'
order by created_at desc
limit 5;
```

Esito atteso:

- `action = unpublish_editorial_content`;
- `before_data.status = published`;
- `after_data.status` uguale a `draft` oppure `archived`;
- `after_data.visibility = private_admin`;
- `published_at` nullo dopo l’azione;
- `metadata.target_status` valorizzato;
- `metadata.reason_present` coerente;
- provider/Apify/import ancora spenti.

Rollback manuale:

- non previsto automaticamente in app;
- se serve ripubblicare il demo, usare una query manuale controllata oppure un futuro workflow `publish` separato;
- non implementare publish nella stessa fase.

## C.5.4-A — Verifica Preview unpublish completata

Deployment:

- Preview Ready per il commit `08d03bd`;
- target `preview`;
- alias branch Preview confermato.

Risultato:

- unpublish manuale controllato riuscito;
- contenuto demo `f528beb7-6c57-4cb3-9c0b-4cca9757bd38`;
- target finale `draft`;
- `visibility = private_admin`;
- `published_at = null`;
- audit log presente con `action = unpublish_editorial_content`;
- provider/Apify/import spenti;
- Production non toccata.

Nota `reason`:

- audit metadata: `reason_present = false`, `reason_preview = ""`;
- il codice passa il campo `reason` alla RPC;
- se il motivo è stato lasciato vuoto, nessun fix necessario;
- se il motivo era compilato, prossimo micro-fix consigliato: rendere `reason` obbligatorio lato form e Server Action.

Non usare:

- service role;
- SQL Editor per simulare sessione admin app;
- db push/reset;
- provider/Apify;
- Production.

## D.1 — Query read-only provider staging

Usare solo in Supabase SQL Editor/staging e senza modifiche dati.

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

select c.slug, c.name, c.tracking_level, c.apify_enabled, c.apify_priority, p.provider_key, pc.import_enabled, pc.priority, pc.data_confidence
from public.provider_competition_config pc
join public.competitions c on c.id = pc.competition_id
join public.data_providers p on p.id = pc.provider_id
order by c.tracking_level, c.slug, pc.priority;

select status, count(*) as import_runs
from public.import_logs
group by status
order by status;

select status, count(*) as provider_runs
from public.provider_import_logs
group by status
order by status;

select provider_key, is_active, monthly_budget_eur, warning_budget_eur, hard_stop_budget_eur
from public.data_providers
where provider_key = 'apify_sofascore';

select *
from public.apify_budget_status
order by period_start desc
limit 12;

select count(*) as teams_demo from public.public_teams;
select count(*) as matches_demo from public.public_matches;
select count(*) as standings_demo from public.public_standings;
```

D.2 consigliato:

- audit provider config in script locale dry-run;
- nessun token;
- nessun provider attivo;
- nessun import reale;
- nessun db push/reset.

## D.2 — Audit provider locale completato

Comando:

```bash
npm run audit:providers
```

Risultato:

- provider reali spenti;
- Apify spento;
- import seed default `false`;
- warnings `0`;
- nessuna lettura DB;
- nessuna scrittura DB.

Uso consigliato prima di ogni futura attivazione:

1. eseguire `npm run audit:providers`;
2. confermare provider reali off se si è ancora in fase dry-run;
3. confermare Apify off;
4. confermare warning `0`;
5. solo dopo procedere con piani D.3/D.4.

## D.3 — Stable provider dry-run locale

Comando:

```bash
npm run dry-run:stable-provider
```

Risultato D.3:

- competizione `serie-a`;
- FULL_OFFICIAL confermato;
- stable provider simulato;
- 4 team payload futuri;
- 2 match payload futuri;
- 4 standing payload futuri;
- planned tables:
  - `teams`;
  - `matches`;
  - `standings`;
  - `provider_import_logs`;
- nessuna scrittura DB.

Prima di usare Supabase staging per import reali:

- definire mapping provider UUID;
- definire mapping competition/team/match external ID;
- creare batch id;
- loggare `provider_import_logs`;
- loggare `api_usage_logs`;
- avere rollback per batch;
- tenere `import_enabled=false` finché non viene approvato un writer.

## D.4 — Logging/budget provider in dry-run

È disponibile un nuovo controllo locale:

```bash
npm run dry-run:provider-logging
```

Lo script prepara solo la forma futura di:

- `provider_import_logs`;
- `api_usage_logs`;
- guardia budget Apify.

Non legge Supabase staging e non modifica dati.

Prima di scrivere davvero log nello staging serviranno:

1. writer server-side con client Supabase sicuro;
2. flag esplicito `realWritesEnabled`;
3. batch id per import;
4. rollback documentato;
5. test RLS/admin sui log;
6. conferma manuale per primo writer.

Nota migration history:

- le migrazioni applicate manualmente restano da allineare con una strategia di tracking prima di usare flussi automatici.

## D.5 — Prima dei writer provider reali

Il layer D.5 è volutamente bloccante:

- nessuna insert su `provider_import_logs`;
- nessuna insert su `api_usage_logs`;
- nessuna insert su `import_logs`;
- nessun upsert dati calcistici;
- nessun uso service role.

Prima di scrivere log reali nello staging decidere:

1. se aggiungere `batch_id`/`import_run_id` alle tabelle log;
2. come collegare `provider_import_logs` e `import_logs`;
3. come gestire rollback per batch;
4. come testare RLS/admin sui log;
5. quale flag abilita scritture staging;
6. come impedire esecuzioni lato utente.

D.5 fornisce solo preview locali e guardie.

## D.6 — Migrazione 0009 preparata

Preparata, ma non applicata:

- `supabase/migrations/0009_provider_import_runs.sql`.

La migrazione aggiunge un modello tracciabile per import provider:

- tabella `provider_import_runs`;
- `batch_id`;
- collegamenti opzionali dai log esistenti tramite `import_run_id`/`batch_id`;
- indici;
- RLS;
- policy lettura editor/admin e scrittura admin.

Prima di applicarla allo staging:

1. confermare manualmente che Supabase Regista Avanzato sia il progetto target;
2. non usare `db push/reset`;
3. copiare solo 0009 nel SQL Editor o usare comando manuale controllato;
4. verificare tabelle/colonne/indici;
5. verificare anon/free_user bloccati;
6. verificare editor/admin read;
7. lasciare provider/import spenti.

Supabase live non è stato modificato in D.6.

## D.6-B — 0009 applicata manualmente

La migrazione `0009_provider_import_runs.sql` è stata applicata su Supabase staging “Regista Avanzato”.

Metodo:

- SQL Editor;
- nessun `supabase db push`;
- nessun `supabase db reset`;
- nessuna Production.

Verifiche read-only registrate:

- tabella `provider_import_runs` presente;
- RLS attiva;
- policy create;
- colonne `batch_id` e `import_run_id` presenti su:
  - `provider_import_logs`;
  - `api_usage_logs`;
  - `import_logs`;
- indici presenti;
- `provider_import_runs_count = 0`;
- provider esterni ancora off;
- import ancora disabilitati.

Residui prima di writer reali:

1. test RLS con sessione app;
2. test admin/editor visibility;
3. verificare blocco anon/free_user;
4. definire writer transazionale staging;
5. mantenere `realWritesEnabled=false` fino a conferma.

Prossimo step consigliato:

- D.7 — RLS/readiness test per `provider_import_runs`, senza provider e senza import reali.

## D.7 — Query read-only pronte

Per verificare `provider_import_runs` su staging usare:

```bash
pbcopy < supabase/manual/provider_import_runs_rls_d7.sql
```

Poi incollare nel SQL Editor del progetto Supabase staging “Regista Avanzato”.

Il file controlla:

- esistenza tabella;
- RLS;
- policy;
- grants;
- colonne;
- indici;
- count righe;
- provider off;
- import disabilitati;
- assenza policy delete.

Se i risultati sono corretti, il prossimo step può essere:

- D.7-A documentazione risultati; oppure
- D.8 reader admin read-only per import runs, se serve visibilità UI.

## D.7-B — Risultati query read-only ricevuti

Risultati manuali D.7-A registrati da SQL Editor staging “Regista Avanzato”:

- `provider_import_runs` esiste;
- RLS attiva;
- conteggio righe = 0;
- provider esterni off;
- nessuna riga con import abilitato;
- nessuna policy `DELETE`;
- contesto SQL Editor non autenticato come app user:
  - `auth.uid() = null`;
  - `is_admin() = false`;
  - `is_editor_or_admin() = false`.

Conferme:

- nessuna scrittura DB;
- nessun seed/provider/import reale;
- nessun `db push/reset`;
- Production non toccata;
- `realWritesEnabled=false`.

Prossimi step sicuri:

1. D.8 — reader admin read-only per mostrare `provider_import_runs` in `/admin/imports`;
2. test RLS con sessione applicativa admin/editor/free_user;
3. mantenere writer reali disabilitati fino a conferma esplicita.

## D.8 — Reader admin read-only implementato

La pagina `/admin/imports` ora include una sezione read-only per `provider_import_runs`.

Stato atteso in staging:

- tabella vuota;
- empty state visibile;
- provider reali off;
- Apify off;
- import disabilitati;
- `realWritesEnabled=false`.

Verifiche da fare dopo commit/push e Preview:

1. login come admin;
2. aprire `/admin/imports`;
3. confermare sezione `Provider import runs`;
4. confermare empty state;
5. confermare assenza di bottoni `run`, `import`, `delete`, `refresh provider`;
6. verificare che logout/non admin restino bloccati da `/admin`.

Non eseguire ancora:

- writer reali;
- insert run;
- update run;
- delete run;
- provider fetch;
- Apify.

## D.9 — Verifica Preview da completare manualmente

Verifica tecnica già completata:

- Vercel Preview Ready;
- alias branch Preview attivo;
- `/admin/imports` incluso nella build;
- Vercel Authentication attiva;
- accesso non autenticato bloccato da SSO;
- nessun deploy CLI;
- nessun provider/import/Apify.

Da verificare manualmente con admin Supabase:

1. `/admin/imports` accessibile dopo login admin;
2. sezione `Provider import runs` visibile;
3. badge sicurezza visibili;
4. empty state coerente con `provider_import_runs_count = 0`;
5. nessun bottone di scrittura/import/delete/update;
6. dopo logout la route torna bloccata.

Se la UI non mostra empty state, verificare:

- presenza env Supabase solo Preview;
- RLS su `provider_import_runs`;
- ruolo admin/editor del profilo;
- eventuali errori runtime Vercel.

## D.9-B — Preview `/admin/imports` verificata

La verifica manuale su Preview ha confermato:

- `/admin/imports` accessibile da admin;
- sezione `Provider import runs` visibile;
- empty state corretto;
- badge sicurezza presenti;
- nessun bottone di scrittura/import/run/delete/update;
- non autenticato bloccato da Vercel Authentication.

Stato invariato:

- provider reali spenti;
- Apify spento;
- import spenti;
- `realWritesEnabled=false`;
- nessuna Production.

Prossimo step consigliato:

- D.10 — test RLS applicativo con free_user/editor/admin oppure preparazione reader/log visibility successiva, sempre senza provider reali e senza scritture.

## D.10 — Audit accessi applicativi `/admin/imports`

Il codice è coerente con la matrice attesa:

- non autenticato bloccato prima da Vercel Authentication o poi da login app;
- `free_user` bloccato da `requireAdmin()`;
- `editor/admin/super_admin` approved ammessi;
- reader `provider_import_runs` solo SELECT e RLS-aware;
- nessuna service role;
- nessuna scrittura.

Da fare solo con conferma separata:

- creare o usare utente `free_user` controllato per test negativo;
- creare o usare utente `editor` controllato per test positivo read-only;
- non modificare ruoli dell’admin test senza piano.

Prossimo step consigliato:

- D.11 — piano test ruoli controllato o chiusura residuo se si decide di non creare utenti aggiuntivi ora.

## D.11 — Residui ruoli chiusi come consapevoli

Decisione:

- non creare utenti `free_user`/`editor` ora;
- non modificare ruoli ora;
- mantenere test `free_user`/`editor` come residuo documentato.

Prima di writer reali:

1. predisporre utenti controllati per test ruoli;
2. verificare RLS applicativo con admin/editor/free_user/non autenticato;
3. confermare repo privato e service role ruotata;
4. confermare env Supabase solo Preview;
5. mantenere `realWritesEnabled=false`;
6. completare piano rollback/audit/log per batch.

Non fare ancora:

- provider reali;
- Apify;
- import;
- writer DB;
- Production deploy.

## D.12-A — Suite ruoli prima dei writer reali

Preparata la suite:

- `docs/role_access_test_suite_d12a.md`.

Stato:

- admin già verificato manualmente su `/admin/imports`;
- non autenticato già bloccato;
- `free_user` ed `editor` restano test residui, da eseguire solo con utenti controllati e conferma separata;
- nessun utente creato;
- nessun ruolo modificato;
- nessuna scrittura DB.

Prossimo passo consigliato:

- D.12-B — eseguire test applicativo `free_user`/`editor` solo quando saranno disponibili utenti staging controllati;
- in alternativa D.13 — ulteriore audit documentale provider/import, mantenendo writer reali disabilitati.

## D.12-B — Piano pronto, test non eseguito

Preparato:

- `docs/role_access_test_suite_d12b.md`.

Prima di eseguire il test servono istruzioni dell’utente su:

1. riutilizzare utenti staging esistenti o crearne di nuovi;
2. quale email test usare, senza password in chat;
3. se autorizzare una promozione manuale a `editor`;
4. come effettuare cleanup dopo il test.

D.12-B conferma che il test può essere completato senza service role e senza Production, usando sessioni browser reali su Preview.

## D.13 — Readiness prima chiamata provider stabile

Preparato:

- `docs/stable_provider_real_call_readiness_d13.md`.

D.13 non usa Supabase live e non scrive dati.

Prima di qualunque real-call:

- confermare provider tra API-Football e TheStatsAPI;
- verificare manualmente docs, prezzi, rate limit e licenza;
- creare eventuale script probe separato da import/writer;
- mantenere `provider_import_runs_count = 0`;
- mantenere provider/import off;
- mantenere `realWritesEnabled=false`;
- non usare service role;
- non toccare Production.

Prossimo step consigliato:

- D.14 — scelta provider e bozza script probe read-only, ancora senza eseguirlo;
- oppure D.12-C — completare prima test utenti `free_user`/`editor`.

## D.14-A — Script probe stabile disabilitato

Creato comando:

```bash
npm run probe:stable-provider:disabled
```

Lo script non tocca Supabase staging:

- nessun client Supabase;
- nessuna scrittura DB;
- nessun provider attivato;
- nessun import attivato;
- nessuna service role;
- nessuna Production.

Serve solo a fissare il contratto sicuro della futura probe.

## D.14-B — Checklist manuale accessi ruoli

Preparata:

- `docs/role_access_manual_test_checklist_d14b.md`.

Da eseguire manualmente quando disponibili utenti staging:

- `regista-test-free-user`;
- `regista-test-editor`.

Fino alla conferma:

- non creare utenti;
- non modificare ruoli;
- non usare service role;
- non scrivere DB;
- non toccare Production.

## D.14-C — Esecuzione manuale ruoli

Preparato:

- `docs/role_access_manual_test_d14c.md`.

Prima di proseguire servono risultati manuali:

- esistenza o assenza utenti test staging;
- esito `free_user` su `/admin/imports`;
- esito `editor` su `/admin/imports`;
- conferma DB invariato con query read-only.

Non creare utenti o modificare ruoli senza conferma esplicita.

## D.14-D — Utenti test assenti

Verifica manuale read-only completata:

- query utenti `regista-test-*` eseguita nel SQL Editor staging;
- risultato: nessuna riga;
- nessun utente creato;
- nessun ruolo modificato;
- nessuna scrittura DB.

Prossimo passo:

- D.14-E — piano creazione controllata utenti test staging, usando solo email mascherate nei documenti e nessuna password.

## D.14-E — Piano creazione utenti test

Creato:

- `docs/staging_test_users_creation_plan_d14e.md`.

Azioni ancora non autorizzate:

- creare utenti;
- modificare ruoli;
- eseguire update ruolo editor;
- cancellare utenti;
- toccare Production.

Le email operative sono documentate solo in forma mascherata.

## D.15 — Provider probe readiness

Creato:

- `docs/provider_probe_readiness_d15.md`.

Stato:

- probe provider ancora disabilitata;
- nessun token letto;
- nessuna fetch;
- nessuna scrittura DB;
- provider/import spenti;
- Production non toccata.

Prima di D.16:

- decidere provider definitivo;
- verificare manualmente prezzo/rate limit/licenza;
- decidere se completare prima i test ruoli `free_user`/`editor`.

## D.16-A — Verifica manuale provider/costi/licenze

Aggiunto:

- `docs/provider_manual_verification_checklist_d16a.md`.

Staging resta invariato:

- nessuna real-call;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- nessun `provider_import_runs` insert;
- nessun provider attivato;
- nessun import attivato;
- Apify spento;
- Production non toccata.

Prima di D.16-B servono:

- scelta provider confermata manualmente;
- prezzo e rate limit verificati;
- licenza/caching/pubblicazione verificati;
- endpoint scelto;
- token solo in env sicura;
- `real_provider_probe_enabled=false` fino ad autorizzazione esplicita;
- `realWritesEnabled=false`;
- DB write ancora vietati.

## D.16-B — Piano API-Football Free senza real-call

Aggiunto:

- `docs/api_football_free_probe_plan_d16b.md`.

Staging non cambia:

- nessuna scrittura DB;
- nessun insert/update/delete/upsert;
- nessun `provider_import_runs` insert;
- provider/import ancora spenti;
- Apify spento;
- `realWritesEnabled=false`;
- `/admin/imports` read-only.

Prima di D.16-C:

- account/API-Football Free creato manualmente;
- token in env sicura;
- token non committato/stampato;
- massimo una richiesta read-only;
- nessun DB write;
- Production non toccata.

## D.16-C1 — Preparazione sicura API-Football key

Aggiunto:

- `docs/api_football_key_setup_d16c1.md`.

Nessun cambiamento a Supabase staging:

- nessuna scrittura DB;
- nessun provider attivato;
- nessun import attivato;
- nessun token letto/stampato;
- nessun `provider_import_runs` insert;
- `realWritesEnabled=false`.

La futura chiave API-Football Free dovrà essere inserita solo manualmente in env sicura locale/Preview, mai in Production e mai in chat.

## D.16-C2-B — Script probe preparato senza DB write

Aggiunto:

- `scripts/provider/apiFootballProbe.ts`;
- `docs/api_football_probe_script_d16c2b.md`.

Supabase staging resta invariato:

- nessuna scrittura DB;
- nessun insert in `provider_import_runs`;
- nessun log provider scritto;
- nessun provider attivato;
- nessun import attivato;
- `/admin/imports` read-only.

Il prossimo step consigliato è provare solo l’output disabled dello script, non una real-call.

## D.16-C2-C — Checklist finale pre-real-call

Aggiunto:

- `docs/api_football_pre_real_call_checklist_d16c2c.md`.

Supabase staging resta invariato:

- nessuna scrittura DB;
- nessun `provider_import_runs` write;
- nessun `api_usage_logs` write;
- nessun `provider_import_logs` write;
- nessun `import_logs` write;
- provider/import spenti;
- `realWritesEnabled=false`.

La futura D.16-C3 dovrà essere massimo una richiesta read-only su standings Serie A, senza DB write.

## D.16-C3 — Tentativo API-Football bloccato prima della fetch

Risultato:

- nessuna richiesta API-Football completata;
- `requests_executed=0`;
- blocco sanificato: `API_FOOTBALL_API_KEY_MISSING`;
- `.env.local` non letto/caricato da Codex;
- nessuna scrittura su Supabase staging;
- nessun `provider_import_runs` write;
- nessun `api_usage_logs` write;
- nessun `provider_import_logs` write;
- nessun `import_logs` write;
- provider/import spenti;
- Apify spento;
- Production non toccata.

Prossimo passo:

- riprovare solo con procedura esplicita che renda la key disponibile nel process environment sicuro senza stampare valori;
- mantenere comunque massimo una richiesta read-only e nessuna scrittura DB.

## D.16-C3-R1 — Supabase invariato dopo real-call read-only

La real-call API-Football R1 ha eseguito una sola richiesta esterna read-only e ha ricevuto HTTP `403`.

Supabase staging resta invariato:

- nessuna scrittura DB;
- nessun insert/update/delete/upsert;
- nessun write su `provider_import_runs`;
- nessun write su `api_usage_logs`;
- nessun write su `provider_import_logs`;
- nessun write su `import_logs`;
- provider/import spenti;
- `realWritesEnabled=false`;
- writer guards ancora bloccanti.

Prima di ulteriori provider step:

- verificare manualmente la causa del `403`;
- mantenere ogni retry come fase separata e massimo una richiesta.

## D.16-C3-R2 — Nessun impatto su Supabase staging

D.16-C3-R2 è solo readiness/documentazione:

- nessuna seconda richiesta provider;
- nessuna fetch;
- nessuna scrittura DB;
- nessun write su `provider_import_runs`;
- nessun write su `api_usage_logs`;
- nessun write su `provider_import_logs`;
- nessun write su `import_logs`;
- provider/import spenti;
- `realWritesEnabled=false`;
- writer guards ancora bloccanti.

Prossimo step eventuale: retry R2 solo dopo verifica manuale API-Football e nuova conferma esplicita.

## D.16-C3-R2 manual check — Staging invariato

La verifica dashboard API-Football è solo documentale/manuale.

Supabase staging resta invariato:

- nessuna scrittura DB;
- nessun provider/import attivato;
- nessun write su tabelle log/import;
- `realWritesEnabled=false`;
- writer guards attivi.

R2 reale resta bloccato finché non vengono chiariti manualmente piano/key/restrizioni e la stagione da usare.

## D.17-A — Pivot provider senza impatto DB

TheStatsAPI diventa il provider scelto per i prossimi test, ma D.17-A non cambia Supabase staging.

Staging resta invariato:

- nessuna scrittura DB;
- nessun write su tabelle log/import;
- nessun provider/import attivato;
- `realWritesEnabled=false`;
- writer guards attivi;
- Apify spento.

API-Football resta documentato come R1 con HTTP `403` e sospeso per ora.

## D.17-E/F — TheStatsAPI probe senza Supabase write

La probe TheStatsAPI non ha scritto nulla in Supabase.

Risultato:

- richiesta `/football/competitions`: HTTP `404`;
- standings non eseguito;
- nessuna riga creata in `provider_import_runs`;
- nessun write su `provider_import_logs`;
- nessun write su `api_usage_logs`;
- nessun write su `import_logs`;
- provider/import spenti;
- `realWritesEnabled=false`;
- Apify spento;
- Production non toccata.

Non procedere con writer o import finché non viene individuato e testato un endpoint valido.

## D.17-G — Nessun impatto Supabase

D.17-G ha corretto solo la composizione URL dello script provider.

Supabase staging invariato:

- nessuna scrittura DB;
- nessun log provider scritto;
- nessun import abilitato;
- nessun provider attivato;
- `realWritesEnabled=false`;
- writer guards attivi.

Prossimo eventuale retry resta read-only e senza DB write.

## D.17-H — Supabase invariato dopo retry TheStatsAPI

D.17-H ha eseguito una sola richiesta provider read-only, senza toccare Supabase.

Conferme:

- nessuna scrittura su `provider_import_runs`;
- nessuna scrittura su `api_usage_logs`;
- nessuna scrittura su `provider_import_logs`;
- nessuna scrittura su `import_logs`;
- nessun insert/update/delete/upsert;
- `realWritesEnabled=false`;
- writer guards attivi;
- provider/import spenti.

Risultato provider: HTTP `403`, quindi nessun mapping/import da portare su staging.

## D.17-J — Supabase invariato

D.17-J non ha eseguito chiamate provider e non ha scritto dati.

Conferme:

- nessuna scrittura DB;
- nessun `provider_import_runs` write;
- nessun `api_usage_logs` write;
- nessun `provider_import_logs` write;
- nessun `import_logs` write;
- provider/import spenti;
- writer guards attivi.

Nessun prossimo step Supabase finché TheStatsAPI non è chiarito.

## D.17-K — Nessun impatto Supabase

D.17-K non richiede azioni Supabase:

- nessuna API call;
- nessun import;
- nessun provider log;
- nessuna scrittura DB;
- writer guards invariati.

Supabase staging resta invariato finché non esiste una probe provider riuscita e autorizzata.

## D.17-L — Nessun impatto Supabase

D.17-L modifica solo lo script gated e la documentazione.

Supabase invariato:

- nessuna scrittura DB;
- nessun import log;
- nessun provider import run;
- writer guards invariati.

## D.17-M/N/Z — Nessun prossimo step Supabase

Punto 17 non produce dati da importare.

Supabase resta invariato:

- nessuna scrittura DB;
- nessun provider log;
- nessun import run;
- nessun writer reale.

## Punto 18 — Nessun prossimo step DB per provider

Punto 18 non richiede azioni Supabase.

Conferme:

- nessuna migrazione;
- nessun `db push/reset`;
- nessun insert/update/delete/upsert;
- nessun provider log;
- nessun import run;
- nessun `service_role`;
- `provider_import_runs` non viene popolata da Punto 18;
- writer reali restano disabilitati.

La modalità manual/mock usa fixture locali e dry-run senza DB write.

## Punto 19 — Preview admin senza impatto Supabase

Punto 19 non richiede azioni Supabase.

La pagina `/admin/imports` legge fixture locali e mostra una preview read-only.

Conferme:

- nessun insert/update/delete/upsert;
- nessun provider import run scritto;
- nessun audit/log provider scritto;
- nessun `service_role`;
- nessun client Supabase admin;
- nessuna migrazione;
- nessun `db push/reset`.

Un eventuale import manuale staging resta fuori scope e richiede step separato con autorizzazione esplicita.

## Punto 20 — Piano import senza scritture Supabase

Punto 20 prepara un piano per futuro import manuale staging, ma non modifica Supabase.

Conferme:

- nessun import eseguito;
- nessuna scrittura DB;
- nessun provider log scritto;
- nessun import log scritto;
- nessun `provider_import_runs` scritto;
- nessuna migrazione;
- nessun `db push/reset`.

Prima di qualsiasi step che tocchi Supabase servirà conferma esplicita e checklist preflight completa.

## Punto 21 — Readiness staging senza toccare Supabase

Punto 21 rivede lo schema locale e prepara batch/collision/rollback preview, ma non usa Supabase live.

Conferme:

- nessuna query DB;
- nessun insert/update/delete/upsert;
- nessun `service_role`;
- nessun client Supabase admin;
- nessuna migrazione;
- nessun `db push/reset`;
- nessun log import scritto.

Prima di qualsiasi write staging servirà un Punto 22 separato con autorizzazione esplicita.

## Punto 22 — Schema confirmation senza Supabase live

Punto 22 usa solo migrazioni e file locali.

Conferme:

- nessuna query Supabase;
- nessuna scrittura DB;
- nessuna migrazione;
- nessun `db push/reset`;
- nessun `service_role`;
- nessun audit log reale.

Il prossimo eventuale step richiede decisione Punto 23 e autorizzazione esplicita.

## Punto 23 — Nessun prossimo step Supabase automatico

Punto 23 non usa Supabase live.

Restano da decidere prima di qualunque DB touch:

- policy `season`;
- regole slug;
- lookup competition/team;
- manual provider id;
- stage/matchday;
- backup/rollback/audit.

Consiglio conservativo per Punto 24: ulteriore no-write review oppure DB read-only check autorizzato, non write.
