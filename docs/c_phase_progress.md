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

## C.4.4 — Admin view con colonne esplicite

Stato: migrazione preparata, non applicata.

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

Da verificare prima di applicare:

- staging corrente;
- nessuna dipendenza SQL dalle quattro view;
- lettura admin dopo migrazione;
- anon/free_user non autorizzati.
