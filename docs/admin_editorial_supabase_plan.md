# Admin editorial Supabase plan

## Stato C.4

Implementazione minima di lettura admin predisposta in locale.

Le sezioni admin editoriali ora possono mostrare contenuti da Supabase staging tramite view `admin_*`, mantenendo le code mock/dry-run esistenti come contesto operativo.

## Sezioni collegate

- `/admin/generated-content/articles`;
- `/admin/news-radar`;
- `/admin/story-library`;
- `/admin/historical-echo`.

## Reader creati

File:

- `lib/admin/getAdminEditorialContent.ts`;
- `lib/admin/adminEditorialTypes.ts`.

Reader:

- `getAdminEditorialArticles()`;
- `getAdminNewsItems()`;
- `getAdminStories()`;
- `getAdminHistoricalEchoes()`;
- `getAdminEditorialSummary()`.

## View usate

- `admin_public_articles`;
- `admin_news_archive`;
- `admin_story_library`;
- `admin_historical_echoes`.

Queste view sono disponibili solo ad authenticated staff tramite RLS/RBAC. Il codice le usa server-side con il client Supabase della sessione utente, non con service role.

## Campi mostrati

I blocchi admin mostrano:

- titolo;
- area;
- status;
- visibility;
- review status;
- published date;
- conteggio warning;
- presenza di note admin;
- fonte `Supabase staging` o fallback mock.

## Cosa resta mock/dry-run

- Bozze articolo generate;
- News Radar automatico/candidate queue;
- import Story Library da Markdown/PDF;
- motore Historical Echo;
- generatori AI;
- Substack API;
- upload media;
- publish/delete/edit reali.

## Azioni future, non implementate in C.4

- creare draft manuale;
- aggiornare status;
- aggiornare visibility;
- aggiungere review note;
- unpublish/rollback controllato;
- scrivere `admin_audit_logs`;
- form admin con validazione;
- test RLS scrittura editor/admin.

## Sicurezza

- `/admin` resta protetto server-side da `requireAdmin()`;
- nessun reader admin è importato da route pubbliche;
- nessuna service role viene usata nel client;
- nessun provider o Apify viene chiamato;
- nessuna automazione di pubblicazione è attiva;
- nessun dato admin viene aggiunto alle public view.

## Rischi residui

- I detail admin specifici restano in buona parte mock e non leggono ancora il record Supabase puntuale.
- Le view `admin_*` usano `select *` a livello SQL: accettabile solo perché protette da RBAC, ma in futuro conviene creare view admin con colonne esplicite per area.
- Le azioni reali dovranno avere audit log e conferme anti-mass-update prima dell’attivazione.
