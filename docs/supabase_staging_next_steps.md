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
- Test browser autenticato ancora da completare manualmente:
  - completato dall'utente e verificato come funzionante.
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
