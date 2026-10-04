# Editorial demo seed plan C.3

## Obiettivo

Pubblicare manualmente nello staging un dataset editoriale minimo e chiaramente demo:

- 1 articolo demo;
- 1 news demo;
- 1 story demo;
- 1 Historical Echo demo.

Il seed serve solo a testare public view e public readers. Non attiva provider, import, Apify o automazioni.

## File SQL

Percorso:

- `supabase/manual/editorial_seed_c3.sql`

Il file contiene:

- SEZIONE 1 — seed editoriale demo;
- SEZIONE 2 — verifica public views;
- SEZIONE 3 — rollback.

## Contenuti demo

- Articolo: `articolo-demo-c3`.
- News: `news-demo-c3`.
- Story: `storia-demo-c3`.
- Historical Echo: `echo-demo-c3`.

Tutti i contenuti sono etichettati `[DEMO/STAGING]`, hanno `status = published`, `visibility = public_free` e `published_at` valorizzato.

## Sicurezza

Il seed:

- non inserisce URL o fonti inventate;
- non pubblica rumor;
- non usa dati live;
- non scarica o carica video;
- non tocca utenti o ruoli;
- non attiva `import_enabled`;
- non attiva provider;
- non attiva Apify.

## Rollback

La sezione rollback cancella solo le righe demo tramite slug:

- `echo-demo-c3`;
- `storia-demo-c3`;
- `news-demo-c3`;
- `articolo-demo-c3`.

Non tocca altre competizioni, contenuti, utenti, ruoli o configurazioni.

## Verifiche dopo applicazione manuale

Verificare:

- `public_articles_published` restituisce 1 articolo demo;
- `public_news_published` restituisce 1 news demo;
- `public_stories_published` restituisce 1 story demo;
- `public_historical_echoes` restituisce 1 echo demo;
- `active_providers = 0`;
- `enabled_imports = 0`.

Poi testare:

- `/articoli`;
- `/articoli/articolo-demo-c3`;
- `/news`;
- `/news/news-demo-c3`;
- `/storie`;
- `/storie/storia-demo-c3`;
- `/il-calcio-si-ripete`;
- `/il-calcio-si-ripete/echo-demo-c3`.
