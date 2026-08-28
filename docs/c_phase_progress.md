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
