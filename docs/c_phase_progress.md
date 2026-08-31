# C phase progress

## C.1 — Public readers Supabase

Stato: implementazione minima completata in locale.

Collegato:

- reader public competitions;
- detail competition da public view se presente;
- reader public teams;
- reader public matches;
- reader public standings;
- empty state `/competizioni` per public views vuote.

Resta mock:

- profilo squadra completo;
- dettaglio partita completo;
- statistiche profonde;
- player profiles;
- highlights completi;
- contenuti editoriali generati;
- provider/import.

## Regole ancora attive

- Provider reali spenti.
- Apify spento.
- Nessun deploy Production.
- Nessun import automatico.
- Nessuna pubblicazione massiva delle 43 competizioni.

## Prossimo passo

C.2 — seed demo pubblicato controllato.

Proposta:

- pubblicare solo una competizione demo o una competizione reale selezionata;
- aggiungere poche squadre e partite;
- verificare public views online;
- mantenere provider e Apify spenti.

## C.2 — Seed demo pubblicato controllato

Stato: completato in staging.

Esito verifica:

- `public_competitions`: 0 righe.
- `public_teams`: 0 righe.
- `public_matches`: 0 righe.
- `public_standings`: 0 righe.
- anon continua a non leggere tabelle sensibili.

Causa probabile: mismatch stagione. Il seed manuale iniziale usava `2026`, mentre `serie-a` nello staging seedato usa `2026/27`.

Correzione locale:

- `supabase/manual/demo_seed_c2.sql` aggiornato per `2026/27`.
- `ON CONFLICT` rimosso dalla sezione seed dopo errore su constraint non presente nello staging reale.
- Idempotenza ottenuta con delete preventivo delle sole righe demo e insert pulito.

Prossimo passo: applicare manualmente solo la SEZIONE 1 corretta, poi verificare con la SEZIONE 2.

Verifica finale:

- `public_competitions`: 1.
- `public_teams`: 4.
- `public_matches`: 2.
- `public_standings`: 4.
- `active_providers`: 0.
- `enabled_imports`: 0.

Pagine locali verificate:

- `/competizioni`.
- `/competizioni/serie-a`.
- `/competizioni/serie-a/squadre`.
- `/competizioni/serie-a/partite`.
- `/competizioni/serie-a/classifica`.

Le pagine leggono dati demo da Supabase public views. Restano mock/dry-run provider, Apify, statistiche profonde, profili dettagliati e contenuti editoriali automatici.

## C.2.1 — Preview online verificata

Stato: completato.

Deployment verificato:

- Vercel Preview: Ready.
- Branch: `preview`.
- Commit: `bb9f8dd`.
- Environment: Preview.
- Production non toccata.

Pagine online verificate:

- `/competizioni`.
- `/competizioni/serie-a`.
- `/competizioni/serie-a/squadre`.
- `/competizioni/serie-a/partite`.
- `/competizioni/serie-a/classifica`.

Esito:

- le pagine online mostrano i dati demo persistiti in Supabase staging;
- i public readers C.1 risultano validati anche su Vercel Preview;
- il dataset C.2 resta limitato e controllato;
- provider reali spenti;
- Apify spento;
- nessun import automatico attivato;
- nessun deploy Production eseguito.

## C.3 — Contenuti editoriali manuali da Supabase

Stato: predisposto in locale, seed non applicato.

Reader collegati:

- articoli da `public_articles_published`;
- news da `public_news_published`;
- storie da `public_stories_published`;
- Historical Echo da `public_historical_echoes`.

Pagine coinvolte:

- `/articoli`;
- `/articoli/[articleId]`;
- `/news`;
- `/news/[newsId]`;
- `/storie`;
- `/storie/[storyId]`;
- `/il-calcio-si-ripete`;
- `/il-calcio-si-ripete/[echoId]`.

Seed locale creato:

- `supabase/manual/editorial_seed_c3.sql`.

Il seed non è stato applicato. Quando verrà applicato manualmente nello staging, pubblicherà al massimo:

- 1 articolo demo;
- 1 news demo;
- 1 story demo;
- 1 Historical Echo demo.

Restano spenti:

- provider reali;
- Apify;
- import automatici;
- generatori;
- Substack API;
- Production.

## C.3.1 — Dettagli editoriali verificati su Preview

Stato: completato e verificato online dopo il fix `8f83ef1`.

Contesto:

- le pagine elenco editoriali mostravano già i contenuti demo Supabase;
- le pagine dettaglio non trovavano i contenuti demo prima del fix;
- il fix ha reso coerenti liste e dettagli usando lo slug pubblico dalle public view.

Pagine dettaglio verificate online sul dominio Preview:

- `/articoli/articolo-demo-c3`;
- `/news/news-demo-c3`;
- `/storie/storia-demo-c3`;
- `/il-calcio-si-ripete/echo-demo-c3`.

Nota operativa:

- il problema residuo osservato dopo il fix dipendeva dal dominio aperto: era Production (`regista-avanzato-rouge.vercel.app`), non il dominio Preview;
- il dominio Preview collegato al branch `preview` mostra correttamente i dettagli editoriali demo;
- Production non è stata toccata.

Conferme:

- provider reali spenti;
- Apify spento;
- nessun deploy Production;
- nessuna modifica schema/RLS;
- nessun import automatico.

## C.4 — Admin editoriale manuale sicuro

Stato: implementazione minima completata in locale.

Collegato:

- `/admin/generated-content/articles` mostra articoli manuali da Supabase staging;
- `/admin/news-radar` mostra news manuali da Supabase staging;
- `/admin/story-library` mostra storie manuali da Supabase staging;
- `/admin/historical-echo` mostra Historical Echo manuali da Supabase staging.

Reader admin creati:

- `getAdminEditorialArticles()`;
- `getAdminNewsItems()`;
- `getAdminStories()`;
- `getAdminHistoricalEchoes()`;
- `getAdminEditorialSummary()`.

Le letture usano view `admin_*` server-side con sessione Supabase e RLS/RBAC. Non usano service role nel client.

Restano mock/dry-run:

- generatori articolo/newsletter/video;
- queue candidate News Radar;
- motore Historical Echo;
- import Markdown/PDF;
- publish/edit/delete;
- audit log scritture;
- provider reali;
- Apify.

Prossimo passo consigliato: C.5, pianificare azioni manuali admin sicure con Server Actions, audit log e rollback, senza attivare provider o automazioni.

## C.4.1 — Preview online admin editoriale verificata

Stato: completato.

Deployment verificato:

- Commit: `8a8f8b5`.
- Branch: `preview`.
- Environment: Preview.
- Status: Ready.
- Production non toccata.

Route admin verificate online da utente Supabase admin:

- `/admin/generated-content/articles`;
- `/admin/news-radar`;
- `/admin/story-library`;
- `/admin/historical-echo`.

Esito:

- blocco Supabase staging visibile nelle sezioni admin editoriali;
- contenuti demo editoriali visibili da Supabase staging;
- blocchi mock/dry-run ancora separati dai dati reali staging;
- provider reali spenti;
- Apify spento;
- nessuna azione reale di publish/edit/delete attiva.

Test protezione:

- dopo logout Supabase, `/admin` mostra 404;
- l’area admin risulta quindi bloccata correttamente per utente non autenticato.

Conferme:

- nessun deploy Production;
- nessuna attivazione provider;
- nessuna attivazione Apify;
- nessuna modifica schema/RLS;
- nessuna automazione admin.

## C.4.2 — Admin logout visibile

Stato: implementato e committato.

Modifica:

- aggiunto un tasto `Esci` visibile nell'header dell'area admin;
- il logout usa Supabase Auth server-side con la sessione utente;
- dopo il logout l'utente viene reindirizzato a `/login`;
- `/admin` resta protetto server-side e continua a mostrare 404 o blocco equivalente per non autenticati/non autorizzati.
- corretta la navbar pubblica: `Accedi gratis` era hardcoded e non leggeva la sessione Supabase;
- la navbar pubblica ora legge l'utente server-side e mostra `Account` quando l'utente è loggato;
- il layout pubblico è forzato dinamico per evitare una navbar prerenderizzata non coerente con i cookie di sessione.

Non modificato:

- schema/RLS;
- provider/import;
- Apify;
- scritture editoriali;
- protezione admin principale;
- logout pubblico/account.

Verifica Preview da fare dopo push:

- da anonimo la navbar pubblica mostra `Accedi` e `Registrati gratis`;
- dopo login Supabase la navbar mostra `Account`;
- dopo logout la navbar torna a `Accedi` e `Registrati gratis`;
- `/admin` resta bloccato dopo logout.

## C.4.3 — Verifica Preview admin logout e navbar auth

Stato: chiusa.

Deployment iniziale verificato:

- Commit atteso: `9690fa2`.
- Branch: `preview`.
- Environment: Preview.
- Status: Ready.
- URL Preview individuato: `https://regista-avanzato-ao7cjk4xf-davide-matteoli.vercel.app`.
- Alias branch Preview: `https://regista-avanzato-git-preview-davide-matteoli.vercel.app`.
- Production non toccata.

Deployment dopo fix CTA:

- Commit: `11646dc`.
- Branch: `preview`.
- Environment: Preview.
- Status: Ready.
- URL deployment: `https://regista-avanzato-kwh385tqr-davide-matteoli.vercel.app`.
- Alias branch Preview: `https://regista-avanzato-git-preview-davide-matteoli.vercel.app`.
- Production non toccata.

Protezione verificata:

- una richiesta HTTP anonima al Preview URL restituisce redirect a Vercel SSO;
- Deployment Protection/Vercel Authentication risulta attiva;
- il contenuto applicativo non è leggibile senza autenticazione Vercel.

Bug osservato manualmente:

- da utente Supabase non loggato, la navbar mostra `Accedi gratis`;
- il tasto non naviga correttamente sul dominio Preview;
- `/login` esiste ed è la route corretta per l'accesso;
- `/registrati` esiste ed è la route corretta per la registrazione free.

Fix locale:

- il CTA non loggato è stato reso più esplicito:
  - `Accedi` punta a `/login`;
  - `Registrati gratis` punta a `/registrati`;
- il link primario `Accedi` usa un anchor HTML standard per garantire navigazione anche se la client navigation di Next non si inizializza correttamente;
- da loggato resta `Account` verso `/account`.

Limite della verifica automatica dopo `11646dc`:

- Vercel CLI ha confermato il deployment Preview Ready;
- una richiesta anonima all'alias Preview reindirizza a Vercel SSO, quindi Deployment Protection è attiva;
- il fetch protetto del connettore Vercel non riesce a creare un URL condivisibile;
- `agent-browser` non è disponibile localmente;
- senza sessione browser Vercel autenticata e senza password Supabase, non è possibile completare automaticamente login, click su `Esci` admin e controllo visuale della navbar.

Test manuali completati sul Preview:

- da utente Supabase non loggato: homepage mostra `Accedi` e `Registrati gratis`, non `Account`;
- click su `Accedi` apre `/login`;
- click su `Registrati gratis` apre `/registrati`;
- registrazione funzionante;
- dopo login Supabase: homepage mostra `Account` e non `Accedi`/`Registrati gratis`;
- `/account` apre correttamente;
- `/admin` apre solo con account admin;
- utenti non loggati/non admin restano bloccati o ricevono 404;
- il tasto `Esci` è visibile nell'header admin;
- click su `Esci` funziona e chiude la sessione;
- dopo logout, `/admin` mostra 404/blocco equivalente;
- dopo logout, homepage torna a mostrare `Accedi` e `Registrati gratis`.

Risultati manuali riportati:

- il test manuale Preview C.4.3 è stato completato;
- accesso e uscita risultano funzionalmente corretti;
- login/logout sono stati percepiti come lenti, ma senza blocchi funzionali;
- tempi precisi non ancora registrati nei documenti.

Nota Supabase Auth URL:

- per Preview, Supabase Auth deve avere `Site URL` e `Redirect URLs` coerenti con il dominio Preview, non solo con `localhost`;
- `localhost` resta valido per sviluppo locale;
- i link email generati prima del cambio URL possono continuare a puntare al vecchio URL;
- dopo una modifica a `Site URL`/`Redirect URLs`, conviene rigenerare registrazione/email di conferma.

Audit performance:

- la navbar pubblica legge la sessione con una chiamata Supabase Auth server-side per richiesta;
- `force-dynamic` sul layout pubblico resta necessario finché la navbar deve reagire ai cookie Supabase;
- su `/account` esistevano letture auth duplicate tra layout, pagina e quota;
- `getCurrentUser()` ora è deduplicata per richiesta con `React.cache`;
- `getUserSearchUsage()` e `incrementUserSearchUsage()` non rileggono più l'utente quando ricevono già `userId`;
- il logout admin non esegue query profilo o quota: chiama solo `signOut()` e poi redirect a `/login`.

Causa probabile della lentezza:

- Vercel Preview protetto aggiunge il passaggio Vercel Authentication;
- Supabase Auth staging aggiunge chiamata remota per `getUser()`/login/logout;
- il layout pubblico dinamico evita cache statica e quindi privilegia correttezza auth rispetto a velocità;
- su free tier/staging è normale percepire qualche latenza in più rispetto a produzione ottimizzata.

Da misurare nel browser:

- tempo click `Accedi` -> render `/login`;
- tempo submit login -> `/account`;
- tempo click `Esci` admin -> `/login`;
- eventuali doppie navigazioni nel Network panel.

## C.4.4 / C.4.4-A — Admin view con colonne esplicite

Stato: migrazione preparata, committata e applicata manualmente su Supabase staging.

Audit:

- `0003_rls_policies.sql` crea view staff generiche `admin_*` con `select *`;
- le quattro view usate dalle pagine admin editoriali sono:
  - `admin_public_articles`;
  - `admin_news_archive`;
  - `admin_story_library`;
  - `admin_historical_echoes`;
- i reader admin C.4 selezionano già colonne esplicite e non richiedono modifiche.

Migrazione preparata:

- `supabase/migrations/0007_admin_editorial_views_explicit_columns.sql`.

Scelta tecnica:

- `CREATE OR REPLACE VIEW` non è sicuro per rimuovere colonne da view esistenti;
- la migrazione usa quindi `DROP VIEW IF EXISTS` e `CREATE VIEW` solo per le quattro view editoriali admin;
- non altera tabelle, dati, provider, import o RLS.

Colonne escluse dalle liste admin:

- body/testi lunghi;
- source payload e JSON non necessari;
- relation id non mostrati;
- author/approved ids non usati;
- colonne future non richieste dalla UI.

Verifica C.4.4-A completata:

- la migrazione `0007_admin_editorial_views_explicit_columns.sql` è stata applicata manualmente su Supabase staging Regista Avanzato;
- le quattro view admin editoriali sono state ricreate correttamente con colonne esplicite;
- `information_schema.columns` conferma le colonne previste;
- `pg_views` conferma il filtro interno `where public.is_editor_or_admin()`;
- `grant select` a `authenticated` resta accettabile perché il filtro RBAC non restituisce righe ai `free_user`;
- `anon` non ha grant sulle view admin;
- provider reali e Apify restano spenti;
- Production non è stata toccata.

Resta fuori scope:

- audit e bonifica di eventuali altre view `admin_*` non editoriali create in origine con `select *`.

## C.5.1 — Server Actions admin sicure + audit log

Stato: audit completato, nessuna Server Action reale attivata.

Risultato audit:

- le pagine admin editoriali candidate sono `/admin/generated-content/articles`, `/admin/news-radar`, `/admin/story-library`, `/admin/historical-echo`;
- le tabelle `public_articles`, `news_archive`, `story_library` e `historical_echoes` hanno già campi per `status`, `visibility`, `internal_notes`, `reviewed_at`, `approved_by`, `published_at` e `updated_at`;
- `admin_audit_logs` supporta audit append-only con `before_data`, `after_data` e `metadata`;
- RLS permette gestione editoriale a `is_editor_or_admin()`;
- l’audit log permette insert solo a `is_admin()`.

Perché non è stata implementata la mutazione reale:

- una Server Action TypeScript farebbe almeno due operazioni separate: update contenuto e insert audit log;
- senza una RPC SQL transazionale non si può garantire che ogni update abbia sempre il relativo audit log;
- estendere le scritture agli editor richiede una decisione RLS esplicita perché oggi l’audit insert è solo admin.

Piano C.5.2:

- creare una migrazione SQL non applicata con RPC transazionali per `update_internal_notes` e `unpublish/rollback`;
- mantenere whitelist dei content type;
- aggiornare solo record singoli via UUID;
- scrivere audit log nello stesso blocco SQL;
- testare ruoli prima di aggiungere form operativi alla UI.

Provider, Apify, Production e import restano spenti/non toccati.

## C.5.2 / C.5.2-A — Migrazione RPC transazionali admin editoriali

Stato: migrazione preparata, applicata manualmente su Supabase staging e verificata lato blocco sicurezza.

File creato:

- `supabase/migrations/0008_admin_editorial_transactional_actions.sql`.

RPC incluse:

- `update_editorial_internal_notes`;
- `unpublish_editorial_content`.

Audit schema:

- `content_status`: `draft`, `review_needed`, `approved`, `published`, `archived`, `rejected`;
- `content_visibility`: `private_admin`, `public_free`, `public_login_required`, `public_preview`, `substack_free`, `substack_paid`;
- le quattro tabelle editoriali hanno campi compatibili per note interne e rollback;
- `admin_audit_logs` ha campi sufficienti per audit sintetico.

Decisione ruoli:

- prima versione limitata ad admin/super_admin;
- editor escluso fino a test/policy dedicati;
- `grant execute` solo ad authenticated, con blocco interno per free_user.

Garanzia transazionale:

- ogni funzione esegue lettura before, update singolo, lettura after e insert audit nella stessa chiamata SQL;
- se l’audit fallisce, fallisce anche la modifica;
- non ci sono delete o update massivi.

Verifica C.5.2-A:

- migrazione `0008_admin_editorial_transactional_actions.sql` applicata manualmente su staging;
- RPC create;
- `select auth.uid(), public.is_admin();` dal Supabase SQL Editor restituisce `auth.uid = null` e `is_admin = false`;
- la chiamata diretta a `update_editorial_internal_notes` dal SQL Editor fallisce con `admin_editorial_action_forbidden`;
- il risultato è corretto: il SQL Editor non simula la sessione Supabase Auth dell’utente admin dell’app;
- il controllo `public.is_admin()` non va rimosso né indebolito;
- `unpublish_editorial_content` non è stata eseguita.

Non implementato:

- UI form;
- Server Actions app;
- publish;
- create draft;
- delete;
- provider/import/Apify;
- deploy o Production.

Prossima sottofase:

- C.5.3: piano e test tramite Server Action/admin session reale per verificare `update + audit log` positivo senza abbassare la sicurezza.

## C.5.3 — Server Action minima per test RPC update note + audit

Stato: implementata localmente, non deployata e non committata.

Implementato:

- Server Action `updateAdminEditorialInternalNotesAction`;
- UI minima nella tabella admin Supabase staging;
- salvataggio note interne tramite RPC `update_editorial_internal_notes`.

Percorso dati:

1. admin autenticato apre una sezione admin editoriale;
2. il form invia `contentType`, `contentId`, `internalNotes`;
3. la Server Action valida input e chiama `requireAdmin()`;
4. il client Supabase server-side usa i cookie della sessione reale;
5. la RPC aggiorna il record e scrive audit log nello stesso blocco SQL.

Non implementato:

- unpublish;
- publish;
- delete;
- create draft;
- upload;
- AI generation;
- Substack;
- provider/import/Apify.

Da testare manualmente:

- salvataggio nota da admin;
- riga `admin_audit_logs` creata;
- blocco anon/free_user;
- nessun impatto sulle public view salvo aggiornamento metadati admin;
- comportamento Preview dopo eventuale commit/push.

## C.5.3-A — Verifica Preview Server Action note interne

Stato: verificata manualmente su Vercel Preview.

Commit verificato:

- `91e3e89`.

Risultati confermati:

- deployment Preview del commit `91e3e89` Ready;
- login admin riuscito;
- `/admin/generated-content/articles` accessibile;
- blocco Supabase staging visibile;
- textarea `Note interne` visibile;
- bottone `Salva note` visibile;
- badge `Staging manual action` visibile;
- modifica nota interna demo riuscita;
- pagina aggiornata senza errore;
- `admin_audit_logs` contiene una nuova riga `update_editorial_internal_notes`;
- `before_data`, `after_data`, `metadata` e `created_at` recente presenti;
- unpublish/publish/delete/create draft non presenti;
- provider/Apify spenti;
- Production non toccata.

Nota operativa:

- il test positivo non va completato dal SQL Editor perché `auth.uid()` lì è `null`;
- non richiedere o condividere password in chat.

Esito audit atteso e confermato:

- `action = update_editorial_internal_notes`;
- `entity_type = article`;
- `before_data`, `after_data`, `metadata` presenti;
- `created_at` recente.

## C.6 — MVP staging closure audit

Stato: audit finale staging completato a livello documentale.

Percentuale stimata MVP staging tecnico: 80%.

Completo per staging:

- frontend pubblico buildabile e disponibile su Preview;
- login, registrazione, account e preferenze collegati a Supabase staging;
- navbar pubblica auth-aware verificata;
- quota ricerca 3/3 verificata via RPC;
- `/admin` protetto server-side con ruolo admin;
- dati demo competizioni/squadre/partite/classifica letti da public views;
- contenuti editoriali demo letti da public views;
- view admin editoriali con colonne esplicite applicate in staging;
- RPC 0008 applicate in staging;
- Server Action `updateAdminEditorialInternalNotesAction` verificata su Preview;
- audit log `update_editorial_internal_notes` scritto correttamente.

Resta spento/non implementato:

- provider stabile reale;
- Apify/SofaScore;
- import automatici;
- Substack API;
- AI generation;
- publish/unpublish/delete/create draft;
- Production deploy.

Rischi residui:

- confermare repo GitHub Private;
- confermare service role key ruotata;
- mantenere env Supabase solo Preview finché Production non è pronta;
- migration history manuale da allineare;
- altre view `admin_*` fuori scope editoriale da audire;
- legal/privacy/cookie ancora da preparare.

Prossimo passo consigliato:

- C.5.4 piano/test controllato per `unpublish_editorial_content`, oppure provider stable dry-run se si preferisce chiudere prima il lato dati.

## C.5.4 — Unpublish manuale controllato

Stato: implementato localmente, non committato e non deployato.

Implementato:

- Server Action `unpublishAdminEditorialContentAction`;
- UI minima nelle tabelle admin editoriali Supabase staging;
- visibilità azione solo per contenuti `published`;
- target consentiti `draft` e `archived`;
- checkbox di conferma obbligatoria;
- motivo opzionale, massimo 1000 caratteri;
- chiamata esclusiva alla RPC `unpublish_editorial_content`.

Garanzie mantenute:

- nessun uso di service role;
- nessuna scrittura diretta alle tabelle editoriali;
- nessuna scrittura diretta ad audit log;
- audit log gestito dalla RPC transazionale;
- nessun delete;
- nessun publish;
- nessun create draft;
- provider/Apify/import spenti;
- Production non toccata.

Verifica locale:

- `npm run lint`: ok;
- `npm run typecheck`: ok;
- `npm run build`: ok.

Da verificare manualmente su Preview:

- rimuovere dalla pubblicazione un contenuto demo published;
- confermare che sparisca dalle public views;
- confermare che resti visibile in admin con status `draft` o `archived`;
- confermare audit log `unpublish_editorial_content`;
- confermare che publish/delete/create draft restino assenti.

## C.5.4-A — Verifica Preview unpublish manuale

Stato: verificata manualmente su Vercel Preview.

Confermato:

- commit C.5.4 `08d03bd`;
- branch `preview`;
- deployment Vercel Preview Ready;
- target `preview`;
- alias `https://regista-avanzato-git-preview-davide-matteoli.vercel.app`;
- login admin riuscito;
- unpublish manuale controllato riuscito;
- RPC `unpublish_editorial_content` funzionante;
- update + audit log avvenuti correttamente;
- contenuto demo rimosso dalla pubblicazione;
- publish/delete/create draft/bulk restano disabilitati;
- provider/Apify spenti;
- Production non toccata.

Audit log:

- `action = unpublish_editorial_content`;
- `entity_type = article`;
- `entity_id = f528beb7-6c57-4cb3-9c0b-4cca9757bd38`;
- `before_data.status = published`;
- `before_data.visibility = public_free`;
- `after_data.status = draft`;
- `after_data.visibility = private_admin`;
- `after_data.published_at = null`;
- `created_at` recente.

Nota `reason`:

- audit metadata: `reason_present = false`, `reason_preview = ""`;
- codice verificato: il form invia `reason` e la Server Action lo passa come `p_reason`;
- se il motivo era vuoto, comportamento ok;
- se il motivo era compilato, preparare micro-fix per renderlo obbligatorio e ritestare.

## D.1 — Provider activation dry-run plan

Stato: audit/piano preparato, nessuna attivazione.

Risultati audit:

- provider modellati: mock, manual, stable wrapper, TheStatsAPI, API-Football, Apify/SofaScore;
- provider seedati: 6;
- provider reali spenti;
- Apify spento;
- import spenti;
- competizioni catalogo locale: 43;
- FULL_OFFICIAL: 14;
- APIFY P1: 15;
- APIFY P2: 14;
- TRIGGER concreti: 0.

Script esistenti:

- import competizioni/squadre/partite/eventi/statistiche;
- weekly Apify light import;
- full stats import;
- tutti da mantenere dry-run/mock finché non autorizzati.

Documenti D.1:

- `docs/provider_activation_plan.md`;
- `docs/provider_dry_run_plan.md`;
- `docs/apify_budget_safety_plan.md`.

Prossimo step consigliato:

- D.2: creare o eseguire solo un audit script provider config, senza fetch e senza DB write.

## D.2 — Provider config audit script

Stato: implementato localmente e verificato.

Creato:

- `scripts/provider/auditProviderConfig.ts`;
- script npm `audit:providers`.

Output principale:

- provider totali: 6;
- provider state: stable/the_stats_api/api_football/apify off, manual/mock on;
- competizioni totali: 43;
- FULL_OFFICIAL: 14;
- APIFY P1: 15;
- APIFY P2: 14;
- TRIGGER: 0;
- seed import enabled default: false;
- budget doc Apify: presente;
- warnings: 0.

Conferme:

- nessuna fetch esterna;
- nessuna chiamata provider;
- nessuna chiamata Apify/SofaScore;
- nessuna scrittura DB;
- nessun token letto o stampato;
- `.env.local` non letto.

Verifiche:

- `npm run audit:providers`: ok;
- `npm run lint`: ok;
- `npm run typecheck`: ok;
- `npm run build`: ok.

Prossimo step consigliato:

- D.3: dry-run stable provider su una singola competizione, senza fetch reale e senza Supabase write.

## D.3 — Stable provider dry-run su `serie-a`

Stato: implementato ed eseguito localmente.

Creato:

- `scripts/provider/dryRunStableProvider.ts`;
- script npm `dry-run:stable-provider`.

Output principale:

- `competition_slug=serie-a`;
- `competition_name=Serie A`;
- `tracking_level=full_official`;
- `provider_candidate=stable_provider`;
- `external_provider_candidates=the_stats_api/api_football`;
- `mapped_teams_count=4`;
- `mapped_matches_count=2`;
- `mapped_standings_count=4`;
- `planned_tables=teams,matches,standings,provider_import_logs`;
- `warnings=0`.

Conferme:

- nessuna fetch esterna;
- nessuna chiamata provider;
- nessuna chiamata Apify/SofaScore;
- nessuna scrittura DB;
- nessun token letto/stampato;
- `.env.local` non letto;
- provider/import restano spenti;
- Production non toccata.

D.4 consigliato:

- simulazione budget/logging provider stabile in memoria, preparando forma futura di `api_usage_logs` e `provider_import_logs` senza scrivere Supabase.

## D.4 — Provider logging/budget dry-run

Stato: implementato localmente, non committato finché non confermato.

Creato:

- `scripts/provider/dryRunProviderLogging.ts`;
- script npm `dry-run:provider-logging`.

Risultato atteso:

- run simulata su `serie-a`;
- provider `stable_provider`;
- fetch esterne `false`;
- DB write `false`;
- shape `provider_import_logs` ok;
- shape `api_usage_logs` ok;
- budget guard Apify ok;
- soglie budget: 30 €/mese, warning 24 €, hard stop 30 €;
- warnings `0`.

Conferme:

- provider reali spenti;
- Apify spento;
- import spenti;
- nessun token letto/stampato;
- nessuna scrittura Supabase;
- Production non toccata.

Prossimo step consigliato:

- D.5: progettare writer log/import ancora spenti, prima di qualunque attivazione reale.
