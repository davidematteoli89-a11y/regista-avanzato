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
- Le view `admin_*` originali usavano `select *` a livello SQL: C.4.4 prepara una migrazione per restringere le quattro view editoriali admin usate dal codice.
- Le azioni reali dovranno avere audit log e conferme anti-mass-update prima dell’attivazione.

## Verifica Preview C.4.1

Stato: completata online su Vercel Preview.

Deployment:

- Commit: `8a8f8b5`.
- Branch: `preview`.
- Environment: Preview.
- Status: Ready.

Route verificate con utente Supabase admin:

- `/admin/generated-content/articles`;
- `/admin/news-radar`;
- `/admin/story-library`;
- `/admin/historical-echo`.

Risultati:

- i blocchi Supabase staging sono visibili nelle pagine admin editoriali;
- i contenuti demo editoriali pubblicati in staging sono visibili;
- i blocchi mock/dry-run restano separati;
- provider reali spenti;
- Apify spento;
- nessuna azione reale di publish/edit/delete attiva.

Protezione:

- dopo logout Supabase, `/admin` mostra 404;
- il blocco server-side admin è quindi confermato anche online su Preview.
- C.4.2 aggiunge un tasto `Esci` visibile nell'header admin, con logout Supabase server-side e redirect a `/login`.
- La navbar pubblica è stata allineata allo stato Auth: il link `Accedi gratis` era hardcoded e ora diventa `Account` quando esiste una sessione Supabase.

Restano non implementati:

- scrittura manuale admin;
- edit/delete/publish reali;
- audit log per azioni editoriali;
- detail admin puntuali da record Supabase;
- attivazione provider/import.

## C.4.4 / C.4.4-A — View admin editoriali a colonne esplicite

Stato: migrazione preparata, committata e applicata manualmente su Supabase staging.

Migrazione:

- `supabase/migrations/0007_admin_editorial_views_explicit_columns.sql`.

View analizzate:

- `admin_public_articles`;
- `admin_news_archive`;
- `admin_story_library`;
- `admin_historical_echoes`.

Problema:

- le view staff create in `0003_rls_policies.sql` erano generate genericamente con `select *`;
- anche se protette da `public.is_editor_or_admin()`, `select *` aumenta il rischio futuro di esporre colonne nuove o non necessarie alle UI admin.

Colonne mantenute:

- `admin_public_articles`: `id`, `slug`, `title`, `status`, `visibility`, `published_at`, `created_at`, `updated_at`, `reviewed_at`, `internal_notes`;
- `admin_news_archive`: `id`, `slug`, `title`, `status`, `visibility`, `published_at`, `created_at`, `updated_at`, `reviewed_at`, `internal_notes`, `review_status`, `internal_warnings`, `internal_score`;
- `admin_story_library`: `id`, `slug`, `title`, `status`, `visibility`, `published_at`, `created_at`, `updated_at`, `reviewed_at`, `internal_notes`, `story_type`;
- `admin_historical_echoes`: `id`, `slug`, `title`, `status`, `visibility`, `published_at`, `created_at`, `updated_at`, `reviewed_at`, `internal_notes`, `echo_type`, `reviewed_by_human`, `internal_score`, `internal_warnings`.

Colonne escluse:

- body/testi lunghi non necessari alle liste admin;
- raw/source payload;
- relation id non usati dalla UI;
- author/approved ids non mostrati;
- campi futuri non richiesti dai reader;
- qualsiasi token/config/costo/log, non presenti in queste view editoriali.

Compatibilità codice:

- `lib/admin/getAdminEditorialContent.ts` già seleziona solo le colonne mantenute;
- `lib/admin/adminEditorialTypes.ts` non richiede modifiche;
- le pagine admin C.4 restano compatibili.

Rollback manuale:

- se la migrazione crea problemi, ricreare temporaneamente le view con la logica precedente `select * from public.<table> where public.is_editor_or_admin()`;
- poi ripristinare `revoke all` e `grant select ... to authenticated`;
- verificare subito `/admin/generated-content/articles`, `/admin/news-radar`, `/admin/story-library`, `/admin/historical-echo`.

Verifica C.4.4-A su staging:

- la migrazione `0007_admin_editorial_views_explicit_columns.sql` è stata applicata manualmente dal Supabase SQL Editor sul progetto staging Regista Avanzato;
- `information_schema.columns` conferma che le quattro view espongono solo le colonne esplicite previste;
- `pg_views` conferma il filtro RBAC interno `where public.is_editor_or_admin()`;
- `grant select` a `authenticated` è accettabile perché i profili non staff non ricevono righe dal filtro RBAC;
- `anon` non ha grant sulle view admin;
- `postgres` e `service_role` mantengono i permessi tecnici normali Supabase;
- provider reali e Apify restano spenti;
- Production non è stata toccata.

Rischio residuo:

- eventuali altre view `admin_*` fuori scope editoriale potrebbero ancora derivare dal pattern generico `select *` e vanno auditate in una fase successiva.

## C.5.1 — Server Actions admin sicure + audit log

Stato: audit completato, implementazione reale rimandata.

Pagine admin candidate per prime azioni manuali:

- `/admin/generated-content/articles`;
- `/admin/news-radar`;
- `/admin/story-library`;
- `/admin/historical-echo`.

Tabelle editoriali candidate:

- `public_articles`;
- `news_archive`;
- `story_library`;
- `historical_echoes`.

Campi disponibili nelle tabelle:

- `status`;
- `visibility`;
- `internal_notes`;
- `reviewed_at`;
- `approved_by`;
- `published_at`;
- `updated_at`.

Tabella audit disponibile:

- `admin_audit_logs`;
- campi principali: `admin_user_id`, `action`, `entity_type`, `entity_id`, `before_data`, `after_data`, `metadata`, `created_at`;
- RLS append-only: `select` e `insert` solo per admin, nessun `update/delete`.

Decisione tecnica:

- non implementare ancora Server Actions reali da UI;
- il codice client/server può aggiornare le tabelle editoriali via RLS staff, ma non può garantire in modo atomico `update + audit log`;
- per rispettare l’obbligo di audit serve una RPC SQL transazionale o funzione `security definer` controllata;
- gli editor non possono ancora scrivere audit log perché `admin_audit_logs_admin_insert` usa `public.is_admin()`.

Azioni previste per C.5.2:

- `update_editorial_internal_notes(content_type, id, notes)`;
- `unpublish_editorial_content(content_type, id, target_status)`;
- entrambe devono aggiornare un singolo record, scrivere audit log nello stesso blocco SQL e rifiutare input non whitelistato.

Azioni ancora vietate:

- delete reale;
- publish massivo;
- create draft da UI;
- AI generation;
- Substack API;
- provider/import/Apify.

## C.5.2 / C.5.2-A — Migrazione RPC transazionali admin editoriali

Stato: migrazione SQL preparata, applicata manualmente su Supabase staging e verificata lato blocco sicurezza.

Migrazione:

- `supabase/migrations/0008_admin_editorial_transactional_actions.sql`.

RPC preparate:

- `update_editorial_internal_notes(p_content_type text, p_content_id uuid, p_internal_notes text)`;
- `unpublish_editorial_content(p_content_type text, p_content_id uuid, p_target_status text, p_reason text default null)`.

Content type ammessi:

- `article` → `public_articles`;
- `news` → `news_archive`;
- `story` → `story_library`;
- `historical_echo` → `historical_echoes`.

Scelta ruoli:

- prima versione solo `admin`/`super_admin` tramite `public.is_admin()`;
- `editor` escluso intenzionalmente perché `admin_audit_logs` oggi accetta insert solo da admin;
- abilitare editor richiede test dedicato e possibile modifica RLS.

Transazionalità:

- ogni RPC legge `before_data`, aggiorna un solo record con `where id = p_content_id`, legge `after_data` e inserisce `admin_audit_logs` nello stesso blocco funzione;
- se update o audit falliscono, l’intera chiamata SQL viene annullata;
- questo evita modifiche editoriali senza audit log.

Sicurezza:

- funzioni `security definer` con `search_path = public, pg_temp`;
- controllo interno `auth.uid()` + `public.is_admin()`;
- nessun nome tabella libero da input;
- nessun delete;
- nessun publish massivo;
- `before_data`/`after_data` sintetici, senza body, payload grezzi, token o contenuti lunghi;
- `internal_notes` non viene copiato integralmente nell’audit, ma solo presenza e lunghezza.

Permessi:

- `revoke all` da `public`, `anon`, `authenticated`;
- `grant execute` solo a `authenticated`;
- i `free_user` vengono bloccati dentro la funzione dal controllo ruolo.

Verifica C.5.2-A:

- la migrazione `0008_admin_editorial_transactional_actions.sql` è stata applicata manualmente su Supabase staging;
- le RPC risultano create;
- il test diretto da Supabase SQL Editor ha confermato `auth.uid() = null` e `public.is_admin() = false`;
- la chiamata diretta a `update_editorial_internal_notes` dal SQL Editor fallisce correttamente con `admin_editorial_action_forbidden`;
- questo comportamento è atteso perché il SQL Editor non esegue la funzione come sessione Supabase Auth dell’utente admin dell’app;
- non va rimosso `public.is_admin()`;
- non va abbassata la sicurezza;
- `unpublish_editorial_content` non è stata testata e non va chiamata su contenuti demo finché non c’è un piano dedicato.

Test positivo rimandato:

- il test `update + audit log` positivo va eseguito nella fase successiva tramite Server Action o altro contesto che usi davvero la sessione admin Supabase dell’app;
- la UI resta non collegata finché non viene definito il piano C.5.3.

Rollback:

- `drop function if exists public.update_editorial_internal_notes(text, uuid, text);`
- `drop function if exists public.unpublish_editorial_content(text, uuid, text, text);`
- nessun dato va cancellato per rimuovere le funzioni.
