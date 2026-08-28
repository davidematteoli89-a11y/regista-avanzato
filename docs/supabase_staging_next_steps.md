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
- URL Preview individuato: `https://regista-avanzato-ao7cjk4xf-davide-matteoli.vercel.app`.
- Alias branch Preview: `https://regista-avanzato-git-preview-davide-matteoli.vercel.app`.
- Bug manuale rilevato: il CTA `Accedi gratis` da non loggato era visibile ma non navigava correttamente sul dominio Preview.
- Fix locale preparato: CTA separati `Accedi` -> `/login` e `Registrati gratis` -> `/registrati`; `Accedi` usa anchor HTML standard.
- Test browser autenticato ancora da completare manualmente:
  - navbar `Accedi`/`Registrati gratis` da non loggato;
  - click `Accedi` verso `/login`;
  - click `Registrati gratis` verso `/registrati`;
  - navbar `Account` da loggato;
  - tasto `Esci` admin;
  - redirect a `/login`;
  - `/admin` bloccato dopo logout.

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
