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

## D.17-B2 — Setup locale TheStatsAPI

Stato: completato senza real-call.

Verificato:

- `.env.local` ignorato da Git e non staged;
- `THESTATSAPI_API_KEY` presente senza stampare valori;
- `THESTATSAPI_BASE_URL` presente senza stampare valori;
- `THESTATSAPI_PROBE_ENABLED=false`;
- `token_printed=false`;
- `external_fetch=false`;
- `db_write=false`.

Conferme:

- nessuna chiamata TheStatsAPI;
- nessuna chiamata API-Football;
- API-Football resta sospeso/no retry;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessun `service_role`;
- provider/import spenti;
- Apify spento;
- Production non toccata.

Prossimo step consigliato: D.17-C — preparare script TheStatsAPI probe gated, senza esecuzione real-call.

## D.17-C — Script TheStatsAPI probe gated

Stato: preparato localmente, nessuna real-call.

Creato:

- `scripts/provider/theStatsApiProbe.ts`;
- comando `npm run probe:thestatsapi:gated`.

Comportamento default:

- `THESTATSAPI_PROBE_ENABLED=false`;
- `enabled=false`;
- `blocked_reason=THESTATSAPI_PROBE_DISABLED`;
- `external_fetch=false`;
- `db_write=false`;
- `token_read=false`;
- `token_printed=false`;
- `requests_executed=0`.

Restano confermati:

- API-Football sospeso/no retry;
- provider/import spenti;
- Apify spento;
- `realWritesEnabled=false`;
- Production non toccata.

## D.17-D — Checklist pre-real-call TheStatsAPI

Stato: completata localmente, senza real-call.

Creato:

- `docs/thestatsapi_pre_real_call_checklist_d17d.md`.

Audit statico script:

- endpoint candidato: `/football/standings`;
- metodo candidato: `GET`;
- header/auth candidato: `Authorization: Bearer <token>`;
- parametro candidato: `competition=serie-a`;
- endpoint non ancora definitivo e da confermare da documentazione/dashboard TheStatsAPI;
- hard limit una richiesta;
- nessun retry/loop/paginazione;
- nessun Supabase client;
- nessun DB writer;
- output sanificato.

Verifica disabled:

- `enabled=false`;
- `blocked_reason=THESTATSAPI_PROBE_DISABLED`;
- `external_fetch=false`;
- `db_write=false`;
- `token_read=false`;
- `token_printed=false`;
- `requests_executed=0`.

Restano confermati:

- nessuna real-call TheStatsAPI;
- nessuna fetch provider;
- API-Football sospeso/no retry;
- provider/import spenti;
- Apify spento;
- Production non toccata.

## D.17-E0 — Verifica endpoint TheStatsAPI

Stato: completata da documentazione pubblica, senza real-call.

Verificato:

- base URL: `https://api.thestatsapi.com/api`;
- auth: `Authorization: Bearer <token>`;
- header consigliato: `Accept: application/json`;
- endpoint candidate leggero: `GET /football/competitions`;
- endpoint candidato finale Serie A standings: `GET /football/competitions/comp_5840/seasons/sn_6199313/standings`;
- risposta attesa: JSON con `data`;
- rischio payload: basso/medio per standings singola.

Script aggiornato:

- `scripts/provider/theStatsApiProbe.ts` usa ora endpoint/path documentato;
- nessuna fetch eseguita;
- probe resta disabled.

Conferme:

- nessuna real-call TheStatsAPI;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- Production non toccata.

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

## D.14-B — Checklist manuale ruoli

Stato: checklist preparata, test non ancora eseguito.

Creato:

- `docs/role_access_manual_test_checklist_d14b.md`.

La checklist copre:

- verifica utenti test staging;
- test `free_user` bloccato;
- test `editor` read-only;
- query read-only per DB invariato;
- cleanup non distruttivo.

Non fatto:

- nessun utente creato;
- nessun ruolo modificato;
- nessuna scrittura DB;
- nessun provider/Apify/import attivato;
- nessuna Production.

## D.14-C — Guida esecuzione manuale ruoli

Stato: guida preparata, test non ancora eseguito.

Creato:

- `docs/role_access_manual_test_d14c.md`.

Nota tecnica:

- `users_profile` non contiene `email`;
- query read-only aggiornata con join su `auth.users` e mascheramento email.

Resta da fare manualmente:

- verificare se gli utenti test esistono;
- testare `free_user` bloccato;
- testare `editor` read-only;
- confermare DB invariato.

## D.14-D — Verifica utenti test mancanti

Stato: verifica manuale read-only registrata.

Risultato:

- query `regista-test-*` su Supabase staging: `Success. No rows returned`;
- nessun utente test trovato;
- nessun utente creato;
- nessun ruolo modificato;
- nessuna scrittura DB;
- provider/Apify/import spenti;
- Production non toccata.

Prossimo passo:

- D.14-E — piano creazione controllata utenti test staging.

## D.14-E — Piano creazione controllata utenti test

Stato: piano documentale preparato, nessuna azione su utenti.

Creato:

- `docs/staging_test_users_creation_plan_d14e.md`.

Utenti previsti:

- `free_user` con email mascherata `davide.m***@funcode.it`;
- `editor` con email mascherata `caffe1***@gmail.com`.

Non fatto:

- nessun utente creato;
- nessun ruolo modificato;
- nessuna scrittura DB;
- nessun provider/Apify/import attivato;
- Production non toccata.

## D.15 — Provider probe readiness gate

Stato: piano documentale preparato.

Creato:

- `docs/provider_probe_readiness_d15.md`.

Confermato:

- probe disabilitata;
- `real_provider_probe_enabled=false`;
- `external_fetch=false`;
- `token_read=false`;
- `db_write=false`;
- provider/Apify/import spenti;
- Production non toccata.

Prossimo step consigliato:

- D.16-A — verifica manuale provider/costi/licenze;
- oppure D.15-B — completare test utenti staging prima della probe reale.

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

## D.5 — Provider writer/log guard disabilitati

Stato: implementato localmente, non committato finché non confermato.

Creato:

- `lib/provider/providerWriteGuards.ts`;
- `lib/provider/providerImportWriter.ts`;
- `scripts/provider/dryRunProviderWriterGuards.ts`;
- script npm `dry-run:provider-writer-guards`.

Confermato:

- `realWritesEnabled=false`;
- tentativo scrittura bloccato;
- preview `provider_import_logs` ok;
- preview `api_usage_logs` ok;
- preview rollback ok;
- nessuna fetch esterna;
- nessuna scrittura DB;
- nessun token letto/stampato;
- provider/Apify/import restano spenti;
- Production non toccata.

Nota:

- `batch_id` è preview-only perché non esiste ancora nello schema staging.

## D.6 — Batch/import run schema plan

Stato: preparato localmente, non applicato.

Creato:

- `supabase/migrations/0009_provider_import_runs.sql`;
- `docs/provider_import_runs_schema_plan.md`.

Aggiornati:

- `lib/provider/providerImportWriter.ts`;
- `scripts/provider/dryRunProviderLogging.ts`;
- `scripts/provider/dryRunProviderWriterGuards.ts`.

Risultato:

- le preview ora includono `import_run_preview=ok`;
- `provider_import_logs` e `api_usage_logs` preview hanno `import_run_id`/`batch_id`;
- rollback preview considera `provider_import_runs`;
- scritture reali ancora bloccate.

Non fatto:

- nessuna applicazione migrazione;
- nessun `db push/reset`;
- nessuna scrittura Supabase;
- nessuna attivazione provider/Apify/import.

## D.6-B — Applicazione manuale 0009 documentata

Stato: completata manualmente su Supabase staging “Regista Avanzato”.

Applicata:

- `supabase/migrations/0009_provider_import_runs.sql`.

Metodo:

- SQL Editor;
- nessun `db push`;
- nessun `db reset`;
- Production non toccata.

Verifiche read-only:

- `provider_import_runs` esiste;
- RLS attiva;
- policy presenti;
- colonne `import_run_id`/`batch_id` presenti su `provider_import_logs`, `api_usage_logs`, `import_logs`;
- indici presenti;
- `provider_import_runs_count = 0`;
- provider esterni off;
- import disabilitati.

Stato operativo:

- writer reali disabilitati;
- `realWritesEnabled=false`;
- nessuna fetch esterna;
- nessun provider/Apify attivato.

Prossimo step:

- D.7: test RLS/readiness per `provider_import_runs` e visibilità admin.

## D.7 — RLS/readiness provider_import_runs

Stato: preparato localmente.

Creati:

- `supabase/manual/provider_import_runs_rls_d7.sql`;
- `docs/provider_import_runs_rls_test_plan.md`.

Obiettivo:

- verificare manualmente in SQL Editor che `provider_import_runs` sia presente e protetta;
- confermare colonne `batch_id/import_run_id` sui log;
- confermare provider/import ancora spenti;
- preparare eventuale admin visibility read-only.

Non fatto:

- nessuna scrittura DB;
- nessun test insert;
- nessun provider;
- nessun Apify;
- nessun deploy;
- nessuna Production.

## D.7-B — Risultati manuali RLS/readiness documentati

D.7-A è stata eseguita manualmente nel Supabase SQL Editor del progetto staging “Regista Avanzato”.

Risultati confermati:

- `provider_import_runs` presente;
- RLS attiva = `true`;
- `provider_import_runs_count = 0`;
- provider esterni ancora off;
- import ancora disabilitati;
- nessuna policy `DELETE`;
- SQL Editor senza sessione app:
  - `auth.uid() = null`;
  - `is_admin() = false`;
  - `is_editor_or_admin() = false`.

Non fatto:

- nessuna scrittura DB;
- nessun dato reale inserito;
- nessun provider attivato;
- nessun Apify attivato;
- nessun `db push/reset`;
- nessun deploy;
- Production non toccata.

## Punto 22 — Schema Confirmation Dry-Run

Stato: completato localmente.

Aggiunto:

- `docs/manual_import_schema_confirmation_p22.md`;
- `docs/manual_import_rls_audit_review_p22.md`;
- `scripts/provider/manualSchemaConfirmationDryRun.ts`;
- aggiornamento `scripts/provider/manualImportReadinessDryRun.ts`;
- sezione admin read-only “Schema confirmation”;
- `docs/manual_import_point_23_decision_gate_p22.md`;
- `docs/provider_point_22_closure.md`.

Comando:

- `npm run dry-run:manual-schema-confirmation`.

Conferme:

- schema confirmation read-only;
- stato schema ancora `needs_review`;
- `next_write_allowed=false`;
- nessun SQL eseguibile;
- nessuna scrittura DB;
- nessuna migrazione modificata;
- Production non toccata.

## Punto 23 — Schema Review Resolution

Stato: completato localmente.

Aggiunto:

- `docs/manual_import_schema_needs_review_root_cause_p23.md`;
- `docs/manual_import_schema_confidence_matrix_p23.md`;
- aggiornamento `scripts/provider/manualSchemaConfirmationDryRun.ts`;
- aggiornamento `scripts/provider/manualImportReadinessDryRun.ts`;
- sezione admin read-only “Schema review resolution”;
- `docs/manual_import_point_24_decision_p23.md`;
- `docs/provider_point_23_closure.md`.

Esito:

- ready areas: 0;
- needs_review areas: 3;
- blocked areas: 0;
- `next_write_allowed=false`;
- Punto 24 richiede autorizzazione esplicita.

Conferme:

- nessuna scrittura DB;
- nessun SQL eseguibile;
- nessuna migrazione modificata;
- nessun provider reale;
- Production non toccata.

Prossimo step consigliato:

- D.8 — creare un reader admin read-only per `provider_import_runs` in `/admin/imports`, con empty state e senza writer reali.

## D.8 — Admin reader read-only per provider_import_runs

Stato: implementato localmente, non ancora committato.

Creato:

- `lib/admin/adminProviderImportRuns.ts`.

Aggiornato:

- `/admin/imports` mostra una sezione `Provider import runs`.

Comportamento:

- lettura server-side con sessione Supabase;
- RLS rispettata;
- nessuna service role;
- solo `SELECT`;
- massimo 20 run ordinate per `created_at desc`;
- empty state se la tabella è vuota;
- badge sicurezza: `Read-only`, `Provider off`, `Apify off`, `realWritesEnabled=false`.

Non fatto:

- nessuna scrittura DB;
- nessun insert/update/delete/upsert;
- nessun provider;
- nessun Apify;
- nessun import;
- nessun deploy;
- Production non toccata.

Prossimo step consigliato:

- D.9 — verifica Preview della sezione `/admin/imports` e test RLS applicativo read-only.

## D.9 — Verifica Preview `/admin/imports`

Stato: verifica tecnica parziale completata, test admin UI manuale ancora da fare.

Verificato:

- branch locale/remoto `preview` allineato al commit `dbc83703c1364721ecb8a4a88db72067d2ff9734`;
- Vercel Preview Ready;
- target/environment = Preview;
- branch alias disponibile;
- Deployment Protection/Vercel Authentication attiva;
- richiesta non autenticata a `/admin/imports` viene intercettata da Vercel SSO;
- Production non toccata.

Non verificabile automaticamente da questo ambiente:

- UI interna dopo Vercel Authentication;
- login Supabase admin;
- rendering effettivo della sezione `Provider import runs`;
- empty state visuale;
- assenza bottoni lato browser.

Motivo:

- `agent-browser` non disponibile;
- nessuna sessione Vercel/Supabase admin nel browser dell’agente.

Da verificare manualmente:

- `/admin/imports` mostra `Provider import runs`;
- badge sicurezza presenti;
- empty state visibile;
- nessun bottone `Run/Import/Delete/Update`;
- logout/non admin bloccati.

## D.9-B — Preview `/admin/imports` verificata manualmente

Stato: completata.

Verifica manuale utente:

- URL: `https://regista-avanzato-git-preview-davide-matteoli.vercel.app/admin/imports`;
- commit Preview: `dbc83703c1364721ecb8a4a88db72067d2ff9734`;
- `/admin/imports` accessibile da admin;
- sezione `Provider import runs` visibile;
- empty state corretto;
- badge `Read-only`, `Provider off`, `Apify off`, `realWritesEnabled=false` presenti;
- nessun bottone `Run/Import/Delete/Update` o altra scrittura;
- non autenticato bloccato da Vercel Authentication.

Stato sicurezza:

- DB invariato per quanto verificato;
- provider reali spenti;
- Apify spento;
- import spenti;
- `realWritesEnabled=false`;
- Production non toccata.

Residui:

- test applicativo free_user ancora da fare se serve copertura completa;
- writer reali ancora disabilitati.

Prossimo step consigliato:

- D.10 — test RLS applicativo free_user/editor/admin per import runs, senza creare run reali.

## D.10 — Accesso ruoli `/admin/imports`

Stato: audit codice completato, test manuali free_user/editor non eseguiti perché non sono stati creati/modificati utenti o ruoli.

Matrice attesa:

- non autenticato: bloccato da Vercel Authentication o login app;
- `free_user`: bloccato da `requireAdmin()` / `notFound()`;
- `editor` approved: ammesso all’admin layout e sola lettura;
- `admin` approved: ammesso e sola lettura.

Audit codice:

- `app/admin/layout.tsx` usa `requireAdmin()` server-side;
- `requireAdmin()` ammette solo `editor`, `admin`, `super_admin` con `status = approved`;
- `free_user` resta escluso;
- `adminProviderImportRuns` usa client Supabase server-side con sessione utente;
- reader `provider_import_runs` solo `SELECT`;
- nessuna service role;
- `/admin/imports` non contiene bottoni/form di scrittura.

Già verificato da D.9-B:

- admin vede `/admin/imports`;
- non autenticato bloccato da Vercel Authentication;
- empty state e badge sicurezza corretti;
- nessun bottone run/import/delete/update.

Residui:

- test applicativo `free_user` se disponibile utente controllato;
- test applicativo `editor` se disponibile utente controllato;
- nessuna modifica ruoli senza conferma.

## D.11 — Chiusura residui ruoli e gate writer

Stato: documentazione aggiornata, nessuna modifica utenti/ruoli.

Decisione:

- non vengono creati utenti `free_user`/`editor`;
- non vengono modificati ruoli;
- i test `free_user`/`editor` restano residui consapevoli.

La fase resta safe perché:

- admin verificato;
- non autenticato bloccato;
- `requireAdmin()` esclude `free_user`;
- `editor` ammesso solo se approved;
- `/admin/imports` read-only;
- writer reali disabilitati;
- provider/Apify/import spenti.

Readiness gate:

- nessun writer/import reale prima di checklist completa su sicurezza, RLS ruoli, batch/import run, rollback, audit/log, budget Apify e Production readiness.

Documento dedicato:

- `docs/provider_writer_readiness_gate_d11.md`.

## D.12-A — Suite test ruoli controllata

Stato: documentazione preparata, nessun test con nuovi utenti eseguito.

Creato:

- `docs/role_access_test_suite_d12a.md`.

Confermato da audit locale:

- ruoli effettivi: `free_user`, `editor`, `admin`, `super_admin`;
- admin layout accessibile solo con profilo `approved` e ruolo `editor/admin/super_admin`;
- `free_user` escluso da `requireAdmin()`;
- `provider_import_runs` SELECT consentito via RLS solo a `is_editor_or_admin()`;
- INSERT/UPDATE RLS riservati ad admin;
- nessuna DELETE policy;
- `/admin/imports` resta read-only e senza bottoni di scrittura.

Non fatto:

- nessun utente creato;
- nessun ruolo modificato;
- nessuna scrittura DB;
- nessun provider/Apify/import attivato;
- nessuna Production.

Prossimo passo consigliato:

- D.12-B — test applicativo con utenti controllati `free_user` ed `editor`, solo dopo conferma esplicita.

## D.12-B — Piano test applicativo free_user/editor

Stato: piano preparato, test non ancora eseguito.

Creato:

- `docs/role_access_test_suite_d12b.md`.

Piano:

- verificare manualmente se esistono utenti test staging riutilizzabili;
- usare `regista-test-free-user` per test negativo;
- usare `regista-test-editor` per test read-only;
- mantenere admin già verificato;
- confermare DB invariato con query read-only;
- nessuna creazione utente o modifica ruolo senza conferma.

Conferme:

- nessun utente creato;
- nessun ruolo modificato;
- nessuna scrittura DB;
- nessun provider/Apify/import attivato;
- Production non toccata.

## D.13 — Stable provider real-call readiness

Stato: piano documentale preparato, nessuna real-call eseguita.

Creato:

- `docs/stable_provider_real_call_readiness_d13.md`.

Audit:

- `stable_provider` è un wrapper/placeholder disattivato;
- `the_stats_api` e `api_football` sono candidati configurati ma spenti;
- non ci sono adapter real-call specifici;
- gli script attuali sono solo audit/dry-run locali;
- writer e import restano bloccati da guardie.

Decisione provvisoria:

- preferenza provvisoria: `api_football`;
- alternativa: `the_stats_api`;
- scelta finale subordinata a verifica manuale di copertura, costi, rate limit e licenza.

Non fatto:

- nessuna chiamata provider;
- nessuna fetch esterna;
- nessun token letto/stampato;
- nessuna scrittura DB;
- nessun provider/Apify/import attivato;
- nessuna Production.

Prossimo step consigliato:

- D.14 — scelta provider e preparazione script probe read-only, senza eseguirlo.

## D.14-A — Probe provider disabilitata

Stato: script creato e disabilitato.

Creato:

- `scripts/provider/disabledStableProviderProbe.ts`;
- `docs/stable_provider_disabled_probe_d14a.md`.

Comando:

```bash
npm run probe:stable-provider:disabled
```

Conferme:

- `real_provider_probe_enabled=false`;
- `external_fetch=false`;
- `token_read=false`;
- `db_write=false`;
- `provider_activated=false`;
- `import_enabled=false`;
- provider/Apify/import spenti;
- Production non toccata.

## D.16-A — Verifica manuale provider/costi/licenze

Stato: checklist manuale preparata, nessuna real-call.

Creato:

- `docs/provider_manual_verification_checklist_d16a.md`.

Decisione provvisoria:

- provider preferito provvisorio: `api_football`;
- alternativa: `the_stats_api`;
- scelta finale vincolata a verifica manuale di copertura, prezzi, rate limit, licenza, caching e pubblicazione.

Gate prima di D.16-B:

- provider scelto manualmente;
- prezzo/rate limit/licenza verificati;
- endpoint scelto;
- token solo in env sicura;
- repo GitHub Private confermato;
- service role Supabase ruotata/confermata;
- env Vercel solo Preview;
- provider/import/Apify ancora spenti;
- `real_provider_probe_enabled=false` fino a conferma esplicita;
- `realWritesEnabled=false`;
- nessuna scrittura DB;
- Production non toccata.

Conferme:

- nessuna real-call;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- nessun `db push/reset`;
- provider/Apify/import spenti;
- Production non toccata.

## D.16-B — API-Football Free per prima probe futura

Stato: piano documentale preparato, nessuna real-call.

Creato:

- `docs/api_football_free_probe_plan_d16b.md`.

Decisione:

- provider scelto per prima futura probe: `api_football`;
- piano iniziale: Free;
- alternativa mantenuta: `the_stats_api`;
- eventuale upgrade a pagamento solo dopo probe riuscita, payload compatibile, limiti chiari, licenza/caching/pubblicazione confermati e costi sostenibili.

Piano D.16-C:

- massimo una richiesta read-only;
- competizione `serie-a`;
- endpoint candidato `standings` o `fixtures`;
- output sanificato;
- token solo da env sicura;
- nessuna scrittura DB;
- nessun import;
- nessun provider attivato;
- nessun Apify;
- Production non toccata.

Conferme:

- nessuna chiamata API-Football;
- nessuna chiamata TheStatsAPI;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- nessun `db push/reset`;
- provider/Apify/import spenti;
- Production non toccata.

## D.16-C1 — Preparazione sicura API-Football key

Stato: preparazione env/documentazione, nessuna chiave inserita e nessuna real-call.

Creato:

- `docs/api_football_key_setup_d16c1.md`.

Aggiornato:

- `.env.example` con placeholder non segreti per `API_FOOTBALL_API_KEY`, `API_FOOTBALL_BASE_URL` e `API_FOOTBALL_PROBE_ENABLED=false`.

Conferme:

- `.env.local` non letto;
- nessuna API key creata, salvata, letta o stampata;
- nessuna chiamata API-Football;
- nessuna fetch provider;
- nessuna scrittura DB;
- provider/Apify/import spenti;
- Production non toccata.

Prossimo step consigliato:

- D.16-C2 — preparare script probe API-Football ancora disabilitato, senza real-call.

## D.16-C2-A — Verifica setup key API-Football locale

Stato: verifica setup locale completata, nessuna real-call.

Risultati:

- `.env.local` esiste ed è ignorato da Git;
- `.env.example` contiene solo placeholder/default safe;
- `API_FOOTBALL_API_KEY` presente localmente senza stampare valore;
- `API_FOOTBALL_BASE_URL` presente localmente senza stampare valore;
- `API_FOOTBALL_PROBE_ENABLED=false`;
- `token_printed=false`.

Nota sicurezza:

- la key condivisa accidentalmente in chat è considerata esposta;
- usare solo key rigenerata manualmente dall’utente;
- non inserire token in docs, commit, chat o Production.

Conferme:

- nessuna chiamata API-Football;
- nessuna fetch provider;
- nessuna scrittura DB;
- provider/Apify/import spenti;
- Production non toccata.

Prossimo step consigliato:

- D.16-C2-B — preparare script probe reale gated/disabilitato, senza eseguire real-call.

## D.16-C2-B — Script probe API-Football gated

Stato: script preparato, non eseguito.

Creato:

- `scripts/provider/apiFootballProbe.ts`;
- `docs/api_football_probe_script_d16c2b.md`.

Aggiornato:

- `package.json` con `probe:api-football:gated`.

Caratteristiche:

- separato dagli import;
- massimo una richiesta futura;
- default disabled;
- richiede `API_FOOTBALL_PROBE_ENABLED=true` e `REAL_PROVIDER_PROBE_ENABLED=true` per procedere;
- output disabled sanificato;
- nessun token stampato;
- nessuna scrittura DB;
- nessun provider/import attivato.

Conferme D.16-C2-B:

- script non eseguito;
- nessuna chiamata API-Football;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessun DB write;
- provider/Apify/import spenti;
- Production non toccata.

## D.16-C2-C — Checklist finale pre-real-call API-Football

Stato: checklist finale preparata, nessuna real-call.

Creato:

- `docs/api_football_pre_real_call_checklist_d16c2c.md`.

Decisione:

- endpoint consigliato per D.16-C3: standings Serie A;
- endpoint alternativo: fixtures Serie A se standings non è disponibile o non adatto.

Verifica disabled:

- `npm run probe:api-football:gated`;
- `enabled=false`;
- `blocked_reason=API_FOOTBALL_PROBE_DISABLED`;
- `external_fetch=false`;
- `db_write=false`;
- `token_read=false`;
- `token_printed=false`;
- `requests_executed=0`.

Gate:

- key esposta da rigenerare/ruotare;
- nuova key solo in `.env.local`;
- massimo una richiesta futura;
- niente retry/loop/paginazione;
- nessuna scrittura DB;
- nessun provider/import attivato;
- Production non toccata;
- D.16-C3 solo con conferma esplicita.

## D.16-C3 — Tentativo prima real-call API-Football

Stato: bloccata prima della richiesta.

- Documento risultato creato: `docs/api_football_first_real_call_result_d16c3.md`.
- Endpoint previsto: standings Serie A.
- Richieste pianificate: 1.
- Richieste eseguite: 0.
- Motivo blocco: `API_FOOTBALL_API_KEY` non disponibile nel process environment.
- `.env.local` non letto/caricato da Codex.
- Nessuna fetch provider completata.
- Nessun token stampato.
- Nessuna response completa stampata.
- Nessuna scrittura DB.
- Provider/import ancora spenti.
- Apify spento.
- TheStatsAPI non chiamato.
- Production non toccata.

Lo script è stato allineato al report sanificato richiesto da D.16-C3, ma non è stato committato.

## D.16-C3-R1 — Retry prima real-call API-Football

Stato: prima richiesta reale eseguita, risposta provider `403`.

- Script aggiornato con lettura mirata `.env.local` solo per variabili API-Football.
- Gate disabled verificato dopo fix: `token_read=false`, `requests_executed=0`.
- Real-call eseguita una sola volta con gate temporanei.
- Endpoint: standings Serie A.
- `requests_executed=1`.
- `http_status=403`.
- `api_errors_count=2`.
- `response_top_level_keys=get,parameters,errors,results,paging,response`.
- `standings_groups_count=0`.
- `standings_rows_count=0`.
- `mapping_theoretical_possible=false`.
- Nessun token stampato.
- Nessuna response completa stampata.
- Nessuna scrittura DB.
- Provider/import spenti.
- Apify spento.
- TheStatsAPI non chiamato.
- Production non toccata.

Prossimo passo: verificare manualmente nel provider API-Football la causa del `403` e non riprovare senza nuova conferma esplicita.

## D.16-C3-R2 — Readiness retry 403 API-Football

Stato: completata localmente come analisi/preparazione, senza seconda real-call.

Creato:

- `docs/api_football_403_retry_readiness_d16c3r2.md`.

Risultati:

- probe API-Football default ancora disabled;
- `requests_executed=0` nella verifica disabled;
- audit script locale completato;
- base URL/header/endpoint/parametri documentati;
- possibili cause `403` documentate;
- checklist manuale R2 preparata;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- provider/import spenti;
- Apify spento;
- TheStatsAPI non chiamato;
- Production non toccata.

## D.16-C3-R2 manual check — Dashboard API-Football

Stato: completata come checklist manuale, senza fetch.

Creato:

- `docs/api_football_dashboard_manual_check_d16c3r2.md`.

Verifiche:

- branch `preview`;
- working tree pulito prima delle modifiche;
- probe API-Football gated disabled;
- audit provider ok;
- writer guards ok;
- audit statico script confermato.

La checklist manuale copre account, piano Free, API Football v3, key, restrizioni IP/domain, endpoint/header/parametri e scelta futura `season=2026` vs `season=2025`.

Nessuna seconda real-call, nessuna fetch provider, nessun DB write, provider/import spenti, Apify spento, TheStatsAPI non chiamato, Production non toccata.

## D.17-A — Pivot provider verso TheStatsAPI

Stato: completato localmente come preparazione, senza real-call.

Creato:

- `docs/thestatsapi_provider_pivot_d17a.md`.

Aggiornato:

- `.env.example` con placeholder TheStatsAPI non segreti.

Decisione:

- API-Football sospeso per ora dopo HTTP `403`;
- nessun retry API-Football previsto;
- TheStatsAPI scelto per prossimi test provider;
- API-Football resta fallback futuro;
- Apify resta separato e spento.

Conferme:

- nessuna real-call TheStatsAPI;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- provider/import spenti;
- Production non toccata.

## D.17-E/F — TheStatsAPI real probe controllata

Stato: completata con stop sicuro.

Risultato:

- `requests_executed=1`;
- endpoint 1 `/football/competitions`: HTTP `404`;
- top-level keys: `error`;
- competitions count: `0`;
- endpoint 2 standings Serie A: non eseguito;
- `mapping_theoretical_possible=false`;
- `missing_fields=standings_rows_or_expected_fields_not_detected`;
- `useful_fields=unknown_until_successful_standings_payload`.

Conferme:

- nessun retry;
- nessun loop;
- nessuna paginazione;
- nessuna response completa salvata;
- nessun token stampato;
- nessuna scrittura DB;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- Production non toccata.

Prossimo step consigliato: D.17-G — individuare endpoint TheStatsAPI corretto da dashboard/documentazione, senza nuova real-call finché non confermato.

## D.17-G — Debug endpoint 404 TheStatsAPI

Stato: completato senza nuove real-call.

Risultato audit:

- la composizione URL precedente poteva perdere `/api`;
- `competitions_url_shape` corretta: `https://api.thestatsapi.com/api/football/competitions`;
- `standings_url_shape` corretta: `https://api.thestatsapi.com/api/football/competitions/comp_5840/seasons/sn_6199313/standings`;
- `possible_double_api=false`;
- `possible_double_slash=false`.

Script aggiornato:

- `joinUrl()` normalizza base URL e path;
- output disabled mostra URL shape sanificate;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB.

Prossimo step consigliato: D.17-H — retry singolo su `/football/competitions`, solo dopo conferma esplicita.

## D.17-H — Retry singolo TheStatsAPI competitions

Stato: completato con stop sicuro.

Risultato:

- endpoint: `GET /football/competitions`;
- URL shape: `https://api.thestatsapi.com/api/football/competitions`;
- `requests_executed=1`;
- `http_status=403`;
- `api_errors_count=3`;
- `response_top_level_keys=error`;
- `items_count=0`;
- standings non eseguito;
- nessun retry;
- nessuna scrittura DB;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- Production non toccata.

Prossimo step consigliato: debug auth/account/endpoint TheStatsAPI senza retry automatico.

## D.17-J — Debug 403 TheStatsAPI senza retry

Stato: completato localmente.

Risultato:

- nessuna nuova real-call;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- audit statico script completato;
- auth candidate documentata;
- endpoint/path candidati documentati;
- possibili cause `403` documentate;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- Production non toccata.

Prossimo step consigliato: verifica manuale dashboard/documentazione TheStatsAPI prima di qualsiasi retry.

## D.17-K — Verifica manuale/documentale TheStatsAPI

Stato: completata localmente senza API call.

Risultato:

- nessuna real-call;
- nessuna fetch provider endpoint;
- nessun token letto/stampato;
- auth Bearer confermata da docs pubbliche;
- path competitions confermato da docs pubbliche;
- path standings confermato da docs pubbliche;
- base URL da chiarire: `api.thestatsapi.com/api` vs `stats-api.com/api/v1`;
- dashboard/account/piano/key non verificati;
- provider/import spenti;
- Production non toccata.

Prossimo step consigliato: preparare supporto base URL `stats-api.com/api/v1` in modalità disabled, senza real-call.

## D.17-L — Supporto disabled Stats API v1

Stato: completato localmente.

Risultato:

- target `competitions_v1` aggiunto allo script gated;
- base URL alternativa: `https://stats-api.com/api/v1`;
- URL shape: `https://stats-api.com/api/v1/football/competitions?limit=10`;
- probe default ancora disabled;
- `external_fetch=false`;
- `token_read=false`;
- `requests_executed=0`;
- provider/import spenti;
- Production non toccata.

Prossimo step: eventuale D.17-M retry singolo solo con conferma esplicita.

## D.17-M/N/Z — Chiusura completa Punto 17

Stato: completato.

Risultato finale:

- target finale: `competitions_v1`;
- richieste reali finali: `1`;
- HTTP status: `403`;
- top-level keys: `error`;
- items count: `0`;
- mapping teorico: `false`;
- standings non eseguito;
- nessun retry;
- nessuna seconda richiesta;
- nessuna scrittura DB;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- Production non toccata.

Decisione finale: TheStatsAPI/Stats API sospeso finché account/key/piano/base URL non vengono chiariti.

## Punto 18 — Provider fallback + manual/mock data mode

Stato: completato localmente.

Decisione:

- TheStatsAPI / Stats API sospeso;
- API-Football sospeso/no retry;
- Apify spento;
- provider/import reali spenti;
- `realWritesEnabled=false`;
- dati manuali/mock come fallback operativo.

Aggiunto:

- matrice stato provider;
- modalità manual/mock esplicita;
- fixture locali versionate;
- dry-run locale `npm run dry-run:manual-fixtures`;
- checklist futura prima di qualunque provider reale;
- chiusura documentale Punto 18.

Conferme:

- nessuna real-call;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessun `service_role`;
- nessun deploy;
- Production non toccata.

## Punto 19 — Manual Data Admin + Fixture Preview

Stato: completato localmente.

Aggiunto:

- `lib/provider/manualFixtures.ts`;
- preview read-only in `/admin/imports`;
- documentazione `docs/manual_fixture_preview_p19.md`;
- chiusura `docs/provider_point_19_closure.md`.

La preview mostra:

- provider reali sospesi/off;
- manual/mock active/safe;
- summary fixture;
- tabelle competitions/teams/standings locali;
- validazione campi e riferimenti;
- `mapping_theoretical_possible`.

Conferme:

- nessun provider chiamato;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessuna action di import;
- nessun bottone import/run/sync/save/delete;
- Production non toccata.

## Punto 20 — Manual Import Staging Plan

Stato: completato localmente.

Aggiunto:

- `docs/manual_import_approval_definition_p20.md`;
- `docs/manual_import_mapping_plan_p20.md`;
- `scripts/provider/manualImportPlanDryRun.ts`;
- `docs/manual_import_audit_rollback_plan_p20.md`;
- `docs/manual_import_preflight_checklist_p20.md`;
- `docs/provider_point_20_closure.md`.

Comando:

- `npm run dry-run:manual-import-plan`.

Conferme:

- nessun import reale;
- nessuna scrittura DB;
- nessun SQL eseguibile generato;
- nessun provider reale;
- nessun Apify;
- nessun `service_role`;
- Production non toccata.

## Punto 21 — Staging Manual Import Readiness

Stato: completato localmente.

Aggiunto:

- `docs/manual_import_schema_target_review_p21.md`;
- `scripts/provider/manualImportReadinessDryRun.ts`;
- `docs/manual_import_collision_strategy_p21.md`;
- `docs/manual_import_batch_rollback_preview_p21.md`;
- `docs/provider_point_21_closure.md`;
- sezione admin read-only “Staging manual import readiness”.

Comando:

- `npm run dry-run:manual-import-readiness`.

Conferme:

- batch plan simulato;
- batch executable=false;
- nessun SQL eseguibile;
- nessuna scrittura DB;
- nessun provider reale;
- nessun Apify;
- nessun deploy;
- Production non toccata.

## Punto 24 — Local Schema Deep Review

Stato: completato localmente.

Creati:

- `docs/manual_import_local_schema_source_inventory_p24.md`;
- `docs/manual_import_field_by_field_matrix_p24.md`;
- `docs/manual_import_needs_review_classifier_p24.md`;
- `docs/manual_import_point_25_decision_p24.md`;
- `docs/provider_point_24_closure.md`.

Aggiornati:

- `scripts/provider/manualSchemaConfirmationDryRun.ts`;
- `scripts/provider/manualImportReadinessDryRun.ts`;
- `/admin/imports` con sezione read-only “Local schema deep review”.

Risultato:

- competitions/teams/standings restano `needs_review`;
- `ready_areas_count=0`;
- `needs_review_areas_count=3`;
- `blocked_areas_count=0`;
- `ready_fields_count=12`;
- `needs_review_fields_count=6`;
- `blocked_fields_count=0`;
- `migration_recommended=false`;
- `db_read_only_check_recommended=true`;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 25-A — DB read-only schema/data lookup check, ancora no-write.

## Punto 25 — DB Read-Only Schema/Data Lookup Check

Stato: completato localmente con client Supabase anon/pubblico.

Aggiunti:

- `scripts/provider/manualDbReadOnlySchemaCheck.ts`;
- script npm `dry-run:manual-db-schema-check`;
- `docs/manual_import_db_read_only_schema_check_p25.md`;
- `docs/manual_import_point_26_decision_p25.md`;
- `docs/provider_point_25_closure.md`;
- sezione admin read-only “DB read-only schema check”.

Risultato:

- `db_read=true`;
- `db_write=false`;
- `service_role_used=false`;
- `token_printed=false`;
- `db_confirmed_tables_count=0`;
- `db_confirmed_columns_count=0`;
- `missing_columns_count=0`;
- `fixture_competition_lookup_matches=0`;
- `fixture_team_lookup_matches=0`;
- `final_ready_areas_count=0`;
- `final_needs_review_areas_count=0`;
- `final_blocked_areas_count=3`;
- `next_write_allowed=false`.

Interpretazione:

- il check non ha confermato schema/dati target via client anon/pubblico;
- non è autorizzata alcuna write staging;
- Punto 26 consigliato: investigazione read-only accesso/schema Supabase staging.

## Punto 26 — Supabase Read-Only Access Investigation

Stato: completato.

Aggiunti:

- `docs/supabase_read_only_access_root_cause_p26.md`;
- `docs/supabase_read_only_routes_inventory_p26.md`;
- `docs/supabase_future_read_only_view_plan_p26.md`;
- `docs/manual_import_point_27_decision_p26.md`;
- `docs/provider_point_26_closure.md`;
- sezione admin read-only “Supabase read-only access investigation”.

Aggiornati:

- `scripts/provider/manualDbReadOnlySchemaCheck.ts`;
- `scripts/provider/manualSchemaConfirmationDryRun.ts`;
- `scripts/provider/manualImportReadinessDryRun.ts`.

Risultato:

- direct table lookup result: `unknown`;
- public view lookup result: `unknown`;
- admin view lookup result: `not_attempted`;
- likely blocker: `rls_or_missing_view_or_wrong_table_name_or_insufficient_anon_access`;
- requires read-only view: `true`;
- requires service role: `false`;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 27-A, proposta no-write di view read-only dedicate, non applicata.

## Punto 27 — Read-Only View Proposal

Stato: completato in modalità documentale/no-write.

Aggiunti:

- `docs/manual_import_read_only_view_requirements_p27.md`;
- `docs/manual_import_read_only_view_field_mapping_p27.md`;
- `docs/manual_import_read_only_view_pseudo_sql_p27.md`;
- `docs/manual_import_point_28_decision_p27.md`;
- `docs/provider_point_27_closure.md`;
- sezione `/admin/imports` “Read-only view proposal”.

Risultato:

- proposte tre view lookup future per competitions, teams e standings;
- pseudo-SQL marcato `PSEUDO_SQL_NOT_EXECUTABLE / DO NOT RUN / DOCUMENTATION ONLY`;
- nessuna migrazione preparata o applicata;
- nessuna scrittura DB;
- nessun service role;
- provider/import/Apify spenti;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 28, scelta esplicita tra migrazione non applicata per view read-only oppure controlli manuali `SELECT` da SQL Editor staging.

## Punto 28 — Read-Only View Migration Proposal

Stato: completato in modalità no-apply/no-write.

Aggiunti:

- `docs/migration_proposals/manual_import_read_only_views_p28.sql.md`;
- `docs/manual_import_point_29_decision_p28.md`;
- `docs/provider_point_28_closure.md`.

Aggiornati:

- dry-run manual schema/readiness;
- sezione `/admin/imports` “Read-only view proposal”;
- documentazione Punto 27 e readiness generale.

Risultato:

- migration proposal documentale creata fuori da `supabase/migrations`;
- proposta view read-only per competitions, teams e standings;
- ogni blocco marcato `MIGRATION_PROPOSAL_ONLY / DO NOT APPLY / DO NOT RUN / NOT REVIEWED FOR EXECUTION / NO DB WRITE AUTHORIZED`;
- nessuna migrazione reale creata o applicata;
- nessun `db push/reset`;
- nessuna scrittura DB;
- `next_write_allowed=false`;
- Punto 29/write staging non autorizzato.

## Punto 29 — Manual review migration proposal read-only

Stato: completato in modalità no-apply/no-write.

Aggiunti:

- `docs/manual_import_migration_proposal_placeholder_review_p29.md`;
- `docs/manual_import_migration_candidate_sources_p29.md`;
- `docs/manual_import_future_migration_draft_checklist_p29.md`;
- `docs/manual_import_point_30_decision_p29.md`;
- `docs/provider_point_29_closure.md`.

Aggiornati:

- `docs/migration_proposals/manual_import_read_only_views_p28.sql.md`;
- dry-run manual schema/readiness/read-only schema check;
- `/admin/imports` con sezione “Migration proposal review”.

Risultato:

- proposal reviewed: `true`;
- proposal hardened: `true`;
- executable migration created: `false`;
- migration file created: `false`;
- migration applied: `false`;
- placeholders remaining count: `9`;
- dashboard confirmation required: `true`;
- future migration draft allowed: `false`;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 30-B dashboard confirmation manuale no-write. Punto 30/write staging non autorizzato.

## Punto 30-B — Dashboard confirmation manuale no-write

Stato: preparazione documentale completata; verifica dashboard reale dichiarata dall'utente senza valori schema risolutivi.

Aggiunti:

- `docs/manual_import_dashboard_confirmation_p30b.md`;
- `docs/manual_import_point_30c_or_31_decision_p30b.md`;
- `docs/provider_point_30b_closure.md`.

Aggiornati:

- proposal read-only P28;
- docs P29;
- dry-run outputs;
- `/admin/imports` con sezione “Dashboard confirmation”.

Risultato:

- dashboard confirmation completed: `true`;
- SQL executed: `false`;
- DB write: `false`;
- service_role used: `false`;
- placeholders resolved: `0`;
- placeholders unclear: `16`;
- read-only view still required: `true`;
- ready for migration draft: `false`;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 30-C completare dashboard confirmation con valori reali, oppure restare in manual/mock mode. Punto 31 migration draft non è ancora consigliato.

## Punto 30-C — Manual schema values collection

Stato: completato in modalità no-write/no-provider.

Aggiunti:

- `docs/manual_import_schema_values_collection_p30c.md`;
- `docs/manual_import_dashboard_user_checklist_p30c.md`;
- `docs/manual_import_placeholder_status_p30c.md`;
- `docs/manual_import_point_30d_decision_p30c.md`;
- `docs/provider_point_30c_closure.md`.

Aggiornati:

- docs P28/P29/P30-B;
- dry-run manual schema/readiness/read-only schema check;
- `/admin/imports` con sezione “Manual schema values collection”.

Risultato:

- collection prepared: `true`;
- real schema values provided: `false`;
- placeholders resolved: `0`;
- placeholders uncollected: `16`;
- ready for migration draft: `false`;
- no migration `.sql` created;
- no `supabase/migrations` changes;
- no DB write;
- no provider/fetch/Apify;
- Production untouched;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 30-D solo se l'utente fornisce valori reali; altrimenti restare in manual/mock mode.

## Punto 30-D — Local migration schema extraction

Stato: completato in modalità no-write/no-provider.

Aggiunti:

- `docs/manual_import_local_schema_extraction_p30d.md`;
- `docs/manual_import_placeholder_resolution_p30d.md`;
- `docs/manual_import_point_31_decision_p30d.md`;
- `docs/provider_point_30d_closure.md`.

Aggiornati:

- docs P28/P29/P30-C;
- dry-run manual schema/readiness/read-only schema check;
- `/admin/imports` con sezione “Local schema extraction”.

Risultato:

- local schema extraction completed: `true`;
- Supabase Dashboard used: `false`;
- DB query executed: `false`;
- DB write: `false`;
- service_role used: `false`;
- placeholders resolved from local files: `16`;
- placeholders unresolved: `0`;
- placeholders unclear: `0`;
- ready for migration draft: `true`;
- no migration `.sql` created;
- no `supabase/migrations` changes;
- no DB write;
- no provider/fetch/Apify;
- Production untouched;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 31 migration draft non applicata/no-apply, solo su conferma utente.

## Punto 31 — Migration draft no-apply

Stato: completato in modalità no-apply/no-write.

Aggiunti:

- `docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`;
- `docs/manual_import_migration_draft_review_p31.md`;
- `docs/manual_import_point_32_decision_p31.md`;
- `docs/provider_point_31_closure.md`.

Aggiornati:

- docs P28/P29/P30/P31;
- dry-run manual schema/readiness/read-only schema check;
- `/admin/imports` con sezione “Migration draft”.

Risultato:

- migration draft created: `true`;
- draft fuori da `supabase/migrations`;
- migration applied: `false`;
- db push/reset: `false`;
- DB write: `false`;
- service role used: `false`;
- executable for apply: `false`;
- requires manual review: `true`;
- requires explicit authorization: `true`;
- ready for apply: `false`;
- provider/fetch/Apify: off;
- Production untouched;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 32 review manuale no-apply della draft.

## Punto 32 — Review manuale no-apply della migration draft

Stato: completato in modalità no-apply/no-write.

Aggiunti:

- `docs/manual_import_migration_draft_review_p32.md`;
- `docs/manual_import_point_33_decision_p32.md`;
- `docs/provider_point_32_closure.md`.

Aggiornati:

- draft P31 hardenata;
- docs P31/P30-D;
- dry-run manual schema/readiness/read-only schema check;
- `/admin/imports` con sezione “Migration draft review”.

Risultato:

- migration draft reviewed: `true`;
- draft hardened: `true`;
- blocking issues: `0`;
- needs review: `3`;
- ready for staging apply candidate: `true`;
- ready for apply: `false`;
- migration applied: `false`;
- db push/reset: `false`;
- DB write: `false`;
- service role used: `false`;
- provider/fetch/Apify: off;
- Production untouched;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 33 staging apply plan no-apply, non apply diretto.

## Punto 33 — Staging apply plan no-apply

Stato: completato in modalità piano/no-apply/no-write.

Aggiunti:

- `docs/manual_import_staging_apply_plan_p33.md`;
- `docs/manual_import_staging_backup_checklist_p33.md`;
- `docs/manual_import_staging_rollback_checklist_p33.md`;
- `docs/manual_import_staging_pre_apply_checklist_p33.md`;
- `docs/manual_import_staging_post_apply_verification_p33.md`;
- `docs/manual_import_point_34_decision_p33.md`;
- `docs/provider_point_33_closure.md`.

Aggiornati:

- dry-run manual schema/readiness/read-only schema check;
- `/admin/imports` con sezione read-only “Staging apply plan”;
- documentazione provider/manual import/readiness.

Risultato:

- staging apply plan created: `true`;
- backup checklist created: `true`;
- rollback checklist created: `true`;
- pre-apply checklist created: `true`;
- post-apply verification plan created: `true`;
- migration draft path: `docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`;
- draft fuori da `supabase/migrations`;
- nessuna modifica in `supabase/migrations`;
- migration applied: `false`;
- db push/reset: `false`;
- DB write: `false`;
- service role used: `false`;
- ready for apply: `false`;
- provider/fetch/Apify: off;
- Production untouched;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 34 final pre-apply authorization gate no-write.

## Punto 34 — Final pre-apply authorization gate no-write

Stato: completato in modalità gate documentale/no-write.

Aggiunti:

- `docs/manual_import_final_pre_apply_gate_p34.md`;
- `docs/manual_import_apply_authorization_language_p34.md`;
- `docs/manual_import_no_apply_safety_lock_p34.md`;
- `docs/manual_import_point_35_readiness_criteria_p34.md`;
- `docs/manual_import_point_35_decision_p34.md`;
- `docs/provider_point_34_closure.md`.

Aggiornati:

- dry-run manual schema/readiness/read-only schema check;
- `/admin/imports` con sezione read-only “Final pre-apply gate”;
- documentazione P33/P32/provider/readiness.

Risultato:

- final pre-apply gate created: `true`;
- authorization language defined: `true`;
- no-apply safety lock created: `true`;
- point 35 readiness criteria created: `true`;
- explicit user authorization received: `false`;
- point 35 blocked without explicit authorization: `true`;
- migration draft path: `docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`;
- draft fuori da `supabase/migrations`;
- nessuna modifica in `supabase/migrations`;
- migration applied: `false`;
- db push/reset: `false`;
- DB write: `false`;
- service role used: `false`;
- ready for apply: `false`;
- provider/fetch/Apify: off;
- Production untouched;
- `next_write_allowed=false`.

Decisione: default no-apply mode. Punto 35 può partire solo con autorizzazione esplicita secondo frase definita; conferme generiche non bastano.

## Punto 35 — Staging apply reale controllato delle view read-only

Stato: completato con apply bloccato in sicurezza.

Autorizzazione esplicita ricevuta:

- `point_35_explicit_authorization_received=true`.

Risultato:

- staging target confirmed: `true`;
- production excluded: `true`;
- real migration created: `true`;
- real migration path: `supabase/migrations/20260922120000_manual_import_read_only_views.sql`;
- migration applied: `false`;
- db write: `false`;
- db write scope: `none`;
- db push/reset: `false`;
- service role used: `false`;
- provider/import enabled: `false`;
- Apify enabled: `false`;
- views expected count: `3`;
- views verified count: `0`;
- post-apply verification passed: `false`;
- Production touched: `false`;
- `next_write_allowed=false`.

Motivo blocco: le regole del Punto 35 vietano `db push/reset` e non è disponibile un canale alternativo sicuro senza credenziali/prompt ambigui. Nessuna scrittura DB è stata eseguita.

Prossimo step consigliato: Punto 36-Fix/canale apply controllato oppure apply manuale staging separato, senza provider/import e senza Production.

## Punto 36-B — Manual apply result documentation

Stato: apply manuale SQL Editor documentato come riuscito; verifica metadata/colonne completata nel Punto 37.

Risultato:

- explicit authorization received: `true`;
- apply channel: `manual_sql_editor`;
- migration file: `supabase/migrations/20260922120000_manual_import_read_only_views.sql`;
- staging target confirmed in dashboard: `true`;
- production excluded: `true`;
- migration applied: `true`;
- db write: `true`;
- db write scope: `schema_read_only_views_only`;
- db push/reset: `false`;
- service role used: `false`;
- provider/import enabled: `false`;
- Apify enabled: `false`;
- views expected count: `3`;
- views verified count: `3`;
- competitions view status: `verified`;
- teams view status: `verified`;
- standings view status: `verified`;
- column check status: `pass`;
- post apply verification passed: `true`;
- rollback needed: `false`;
- Production touched: `false`;
- `next_write_allowed=false`.

Risultato SQL Editor: `Success. No rows returned`.

Follow-up completato nel Punto 37: verifica read-only metadata/colonne delle 3 view passata.

## Punto 37 — Read-only view/column verification

Stato: completato.

La query read-only su `information_schema.columns`, eseguita manualmente nel Supabase SQL Editor staging “Regista Avanzato”, ha confermato le colonne delle 3 view manual import.

Risultato:

- metadata_verification_completed: `true`;
- query_read_only: `true`;
- db_write: `false`;
- service_role_used: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- views_expected_count: `3`;
- views_verified_count: `3`;
- competitions_view_status: `verified`;
- teams_view_status: `verified`;
- standings_view_status: `verified`;
- column_check_status: `pass`;
- post_apply_verification_passed: `true`;
- `next_write_allowed=false`.

Non sono stati letti dati applicativi, non sono stati attivati provider/import e Production non è stata toccata.

Prossimo step consigliato: Punto 38 — verifica integrazione app/admin read-only, senza provider/import e senza abilitare scritture.

## Punto 38 — App/Admin read-only integration check

Stato: completato.

`/admin/imports` è stato verificato come dashboard read-only coerente con le view manual import applicate e verificate.

Risultato:

- admin_read_only_integration_checked: `true`;
- admin_imports_read_only: `true`;
- migration_applied: `true`;
- metadata_verification_completed: `true`;
- views_expected_count: `3`;
- views_verified_count: `3`;
- competitions_view_status: `verified`;
- teams_view_status: `verified`;
- standings_view_status: `verified`;
- post_apply_verification_passed: `true`;
- db_write: `false`;
- service_role_used: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- `next_write_allowed=false`.

Nessun bottone Run/Import/Execute/Sync/Save to DB è stato aggiunto. Nessuna Server Action write, fetch provider, deploy o Production.

Prossimo step consigliato: Punto 39 — manual fixture/read-only import preview contro le view verificate, senza provider/import e senza DB write.

## Punto 39 — Manual fixture/read-only import preview

Stato: completato.

La preview è stata eseguita in modalità `local_only_unresolved`: fixture locali caricate, view verificate disponibili, nessun lookup DB live eseguito nel Punto 39.

Risultato:

- manual_import_preview_completed: `true`;
- preview_mode: `local_only_unresolved`;
- provider_fetch: `false`;
- external_fetch: `false`;
- db_write: `false`;
- service_role_used: `false`;
- import_real_execution: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- fixtures_loaded: `true`;
- competitions_fixture_count: `1`;
- teams_fixture_count: `2`;
- standings_fixture_count: `2`;
- views_verified_count: `3`;
- view_lookup_executed: `false`;
- create_count: `0`;
- update_count: `0`;
- skip_count: `0`;
- conflict_count: `0`;
- unresolved_count: `5`;
- `next_write_allowed=false`.

Decisione: non procedere a write plan. Prossimo step consigliato: Punto 40-Fix per risolvere fixture/mapping preview in modalità read-only.

## Punto 40-Fix — Read-only live view lookup

Stato: preparato, pending esecuzione manuale.

È stata preparata una query read-only per lookup live contro le view manual import verificate:

- `supabase/manual/manual_import_preview_lookup_p40fix.sql`

Risultato attuale:

- read_only_live_view_lookup_prepared: `true`;
- manual_sql_execution_required: `true`;
- query_read_only: `true`;
- query_executed: `pending`;
- provider_fetch: `false`;
- external_fetch: `false`;
- db_write: `false`;
- service_role_used: `false`;
- import_real_execution: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- fixtures_loaded: `true`;
- views_verified_count: `3`;
- view_lookup_executed: `false`;
- preview_mode: `read_only_lookup_pending`;
- create_count: `0`;
- update_count: `0`;
- skip_count: `0`;
- conflict_count: `0`;
- unresolved_count: `5`;
- `next_write_allowed=false`.

Prossimo step: esecuzione manuale SQL Editor staging e fornitura risultato minimo. Nessun write plan finché `unresolved_count > 0`.

## Punto 40-Fix-B — Read-only live lookup resolved

Stato: completato.

L’utente ha eseguito manualmente in Supabase SQL Editor staging la query read-only:

- `supabase/manual/manual_import_preview_lookup_p40fix.sql`

Risultato:

- query_result: `success_no_rows_returned`;
- read_only_live_view_lookup_executed: `true`;
- query_read_only: `true`;
- db_write: `false`;
- service_role_used: `false`;
- provider_fetch: `false`;
- external_fetch: `false`;
- import_real_execution: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- views_verified_count: `3`;
- view_lookup_executed: `true`;
- live_lookup_rows_count: `0`;
- existing_competitions_rows: `0`;
- existing_teams_rows: `0`;
- existing_standings_rows: `0`;
- preview_mode: `read_only_lookup_completed`;
- create_count: `5`;
- update_count: `0`;
- skip_count: `0`;
- conflict_count: `0`;
- unresolved_count: `0`;
- `next_write_allowed=false`.

Decisione: Punto 40-B può essere preparato come manual import write plan no-apply, ancora senza DB write/provider/import.

## Punto 40-B — Manual import write plan no-apply

Stato: completato.

Creati:

- `docs/manual_import_write_plan_p40b.md`;
- `docs/manual_import_fixture_mapping_p40b.md`;
- `docs/manual_import_write_sql_plan_p40b.md`;
- `docs/manual_import_write_rollback_plan_p40b.md`;
- `docs/manual_import_write_post_verification_plan_p40b.md`;
- `docs/manual_import_point_41_decision_p40b.md`;
- `docs/provider_point_40b_closure.md`.

Risultato:

- write_plan_created: `true`;
- write_plan_mode: `no_apply`;
- create_candidates_count: `5`;
- update_candidates_count: `0`;
- skip_candidates_count: `0`;
- conflict_count: `0`;
- unresolved_count: `0`;
- proposed_write_order: `competitions,teams,standings`;
- rollback_plan_created: `true`;
- post_write_verification_plan_created: `true`;
- db_write: `false`;
- service_role_used: `false`;
- provider_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 41 — final authorization gate for manual fixture write, ancora no-write.
