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

Stato: implementato localmente, non committato.

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

Stato: bug Preview individuato sul CTA pubblico, fix locale preparato e da verificare dopo push.

Deployment verificato:

- Commit atteso: `9690fa2`.
- Branch: `preview`.
- Environment: Preview.
- Status: Ready.
- URL Preview individuato: `https://regista-avanzato-ao7cjk4xf-davide-matteoli.vercel.app`.
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

Limite della verifica automatica:

- il connettore Vercel non ha permesso di listare i deployment del progetto `regista-avanzato`;
- `agent-browser` non è disponibile localmente;
- senza sessione browser Vercel autenticata e senza password Supabase, non è possibile completare automaticamente login, click su `Esci` admin e controllo visuale della navbar.

Test manuali da completare sul Preview dopo commit/push:

- da utente Supabase non loggato: homepage mostra `Accedi` e `Registrati gratis`, non `Account`;
- click su `Accedi` apre `/login`;
- click su `Registrati gratis` apre `/registrati`;
- dopo login Supabase: homepage mostra `Account` e non `Accedi`/`Registrati gratis`;
- `/account` apre correttamente;
- `/admin` apre per utente admin;
- il tasto `Esci` è visibile nell'header admin;
- click su `Esci` reindirizza a `/login`;
- dopo logout, `/admin` mostra 404/blocco equivalente;
- dopo logout, homepage torna a mostrare `Accedi` e `Registrati gratis`.
