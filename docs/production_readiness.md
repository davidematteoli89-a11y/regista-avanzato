# Production Readiness

## Verdetto

Regista Avanzato non è ancora pronto per produzione reale.

È pronto per staging/Preview protetto, con Supabase Auth/RLS e admin server-side funzionanti, ma non per utenti o dati reali non controllati.

## Stato dopo FASE B

Pronto per staging/Preview protetto:

- UI mock/staging online.
- Supabase Auth collegato a Preview.
- Account, preferenze, quota ricerca e admin protetto verificati.
- Vercel Authentication attiva.
- Provider reali spenti.
- Apify spento.

Non pronto per Production:

- Dati calcistici reali non ancora importati.
- Public readers Supabase non ancora completati per tutte le entità.
- Admin operativo ancora parzialmente mock/dry-run.
- Migration tracking Supabase da decidere.
- Security hardening finale non automatizzato in CI.
- Repo privacy da confermare manualmente.
- Env Production non configurate per Supabase staging, correttamente.

## Gate di rilascio Production

| Area | Stato B.9 | Gate obbligatorio |
|---|---|---|
| Build | Lint/typecheck/build verdi | Verifica CI su branch dedicato |
| GitHub | Da confermare Private | Repository privato o politica di pubblicazione esplicita |
| Vercel | Preview funzionante | Production Branch `production`, env separate, niente promozioni accidentali |
| Supabase | Staging funzionante | Migration tracking deciso e test RLS ripetibili |
| Auth | Login/account ok | Recovery, email policy e utenti reali testati |
| Admin | Protetto server-side | Ruoli, audit log e blocchi su ogni azione reale |
| Ricerca | RPC quota ok | Test concorrenza e anti-abuso |
| Provider | Spenti | Dry-run, budget, logging, licenza e fallback |
| Apify | Spento | Budget hard stop e test latest-round only |
| Contenuti | Mock/manuali | Workflow review, publish state e takedown |

## Checklist prima della Production

- [ ] Repository GitHub confermato Private.
- [ ] Production Branch confermato `production`.
- [ ] Deployment Protection/Access Control definito per ambienti non Production.
- [ ] Service role ruotata e mai esposta nel client.
- [ ] Tipi Supabase generati o validati.
- [ ] RLS test automatizzati per anon/free/editor/admin.
- [ ] Public views controllate per leakage colonne interne.
- [ ] Admin protetto server-side su ogni route sensibile.
- [ ] Seed demo pubblicato controllato.
- [ ] Provider reali ancora disattivati fino a dry-run approvato.
- [ ] Apify ancora disattivato fino a test budget approvato.
- [ ] Backup/restore e procedura incidenti definiti.
- [ ] Test e2e principali su Preview.

## Vietato prima della readiness

- `vercel --prod`.
- Promozione manuale Preview a Production.
- Token provider reali in Production.
- Token Apify in Production.
- Import automatici.
- Pubblicazione dati non verificati.
- Download/reupload highlights video.

## Nota C.4

L’admin editoriale può leggere contenuti manuali da Supabase staging, ma questo non rende il progetto pronto per Production.

Prima della produzione restano obbligatori:

- view admin con colonne esplicite o audit di `admin_*`;
- Server Actions sicure per ogni scrittura;
- audit log per create/update/unpublish;
- test RLS per editor/admin/free_user/anon;
- workflow di review editoriale;
- conferma repository privato e branch Production isolato;
- provider e Apify ancora spenti fino a dry-run approvati.

## Nota C.4.3 — Auth Preview

La verifica Preview ha confermato:

- navbar auth-aware funzionante;
- CTA `Accedi` e `Registrati gratis` funzionanti da non loggato;
- `Account` visibile dopo login;
- `/admin` accessibile solo all'account admin;
- logout admin funzionante;
- `/admin` bloccato dopo logout;
- provider e Apify spenti;
- Production non toccata.

Prima della Production resta obbligatorio:

- configurare Supabase Auth `Site URL` e `Redirect URLs` per il dominio Production reale;
- mantenere separati URL locali, Preview e Production;
- rigenerare eventuali email/link dopo ogni cambio URL Auth;
- testare registrazione, conferma email, login, logout e recovery password sul dominio finale;
- misurare performance login/logout senza Vercel Preview Protection.

## Nota C.4.4 / C.4.4-A — View admin esplicite

Lo hardening delle view admin editoriali è stato applicato e verificato manualmente su Supabase staging:

- `admin_public_articles`;
- `admin_news_archive`;
- `admin_story_library`;
- `admin_historical_echoes`.

La migrazione `0007_admin_editorial_views_explicit_columns.sql` restringe queste view alle colonne effettivamente usate dalla UI admin.

Verifiche completate su staging:

- controllo colonne esposte tramite `information_schema.columns`;
- conferma del filtro RBAC interno `where public.is_editor_or_admin()` tramite `pg_views`;
- `anon` senza grant;
- `authenticated` con `select`, ma senza righe per utenti non staff grazie al filtro RBAC;
- provider e Apify spenti;
- Production non toccata.

Gate ancora obbligatori prima della Production:

- audit delle altre view `admin_*` fuori scope editoriale;
- verifica admin/editor sul dominio Preview aggiornato;
- verifica blocco anon/free_user in Preview;
- rollback plan disponibile;
- nessun uso di `select *` nelle view admin editoriali usate dal codice.

## Nota C.5.1 — Scritture admin e audit log

Le scritture editoriali admin non sono ancora pronte per Production.

Audit C.5.1:

- tabelle editoriali idonee a note interne e rollback manuale;
- RLS staff presente sulle tabelle operative;
- `admin_audit_logs` append-only presente;
- insert audit consentito solo ad admin/super_admin;
- nessuna RPC transazionale ancora disponibile per garantire `update + audit log`.

Gate obbligatori prima di attivare scritture reali:

- RPC SQL transazionali per ogni mutazione editoriale;
- audit log scritto nello stesso blocco della modifica;
- niente update massivi;
- niente delete reale;
- test ruoli anon/free_user/editor/admin;
- UI con conferma esplicita per rollback/unpublish;
- nessun uso di `SUPABASE_SERVICE_ROLE_KEY` nel client o per bypassare RLS.

## Nota C.5.2 — RPC transazionali preparate

La migrazione `0008_admin_editorial_transactional_actions.sql` prepara due RPC admin-only:

- `update_editorial_internal_notes`;
- `unpublish_editorial_content`.

È stata applicata manualmente su Supabase staging.

La scelta iniziale è prudente:

- solo admin/super_admin;
- editor esclusi fino a test dedicato;
- nessuna UI o Server Action reale ancora collegata;
- nessun publish o delete.

Verifica C.5.2-A:

- il SQL Editor Supabase non ha sessione Auth admin dell’app: `auth.uid()` è `null`;
- `public.is_admin()` risulta `false`;
- la chiamata diretta alla RPC dal SQL Editor fallisce con `admin_editorial_action_forbidden`;
- questo conferma il blocco sicurezza, non un bug;
- non va rimosso né indebolito il controllo `public.is_admin()`.

Prima della Production resta obbligatorio:

- testare chiamata positiva tramite Server Action/sessione admin reale;
- verificare audit log per ogni mutazione;
- testare rollback su dati demo;
- confermare comportamento anon/free_user/editor/admin;
- collegare Server Actions solo dopo test RPC positivo;
- mantenere provider e Apify disattivati fino alle rispettive fasi.

## Nota C.5.3 — Prima Server Action editoriale

È stata preparata localmente una prima Server Action per aggiornare solo note interne:

- `updateAdminEditorialInternalNotesAction`;
- usa sessione Supabase server-side;
- chiama solo la RPC `update_editorial_internal_notes`;
- non scrive direttamente le tabelle;
- non scrive direttamente audit log;
- non usa service role.

Questa modifica non rende ancora il progetto pronto per Production.

Gate obbligatori:

- test positivo su Preview con account admin;
- verifica riga `admin_audit_logs`;
- test blocco anon/free_user;
- gestione errori senza leakage;
- nessun unpublish/publish/delete finché non viene pianificata C.5.4;
- revisione UX prima di rendere le azioni disponibili fuori dallo staging.

## Nota C.5.3-A — Verifica Preview completata

La verifica Preview della Server Action note interne è stata completata con sessione admin reale dell’app.

Confermato:

- deployment Preview del commit `91e3e89` Ready;
- login admin riuscito;
- `/admin/generated-content/articles` accessibile;
- form note interne visibile nell’admin protetto;
- salvataggio note riuscito;
- riga audit log creata dalla RPC `update_editorial_internal_notes`;
- `before_data`, `after_data`, `metadata` e `created_at` recente presenti;
- nessun pulsante unpublish/publish/delete/create esposto;
- provider/Apify spenti;
- Production non toccata.

Le scritture admin restano comunque staging-only finché non saranno completati i test multi-entità, rollback e hardening operativo pre-produzione.

## Nota C.6 — Chiusura MVP staging tecnico

Stato: staging tecnico solido, non pronto per Production.

Pronto in Preview/staging:

- frontend pubblico con dati demo Supabase;
- Auth Supabase Preview funzionante;
- account e preferenze funzionanti;
- quota ricerca 3/3 reale;
- `/admin` protetto server-side;
- view pubbliche e view admin editoriali verificate;
- prima Server Action admin reale verificata;
- audit log transazionale confermato.

Non pronto per Production:

- provider reali non attivati;
- Apify non attivato;
- import non attivati;
- Substack API non collegata;
- publish/unpublish/delete/create draft non attivi;
- migration tracking non ancora normalizzato;
- policy privacy/cookie da preparare;
- revisione legale highlights/fonti da completare;
- altre view admin fuori scope editoriale da audire.

Gate Production obbligatori:

1. confermare repo GitHub Private;
2. confermare rotazione service role key;
3. separare env Preview/Production;
4. definire migration tracking;
5. testare RLS con matrice anon/free_user/editor/admin;
6. completare privacy/cookie/legal;
7. eseguire provider dry-run prima di qualsiasi dato reale;
8. approvare manualmente ogni passaggio verso Production.

## Nota C.5.4 — Unpublish staging-only

È stata preparata localmente una prima azione manuale per rimuovere dalla pubblicazione un contenuto editoriale demo.

Non rende il progetto pronto per Production.

Vincoli:

- solo admin;
- solo Server Action server-side;
- solo RPC `unpublish_editorial_content`;
- solo record `published`;
- target limitato a `draft`/`archived`;
- nessun delete;
- nessun publish inverso;
- nessuna azione massiva.

Prima della Production servirà:

- test Preview completo;
- audit log verificato;
- UX con conferma più forte se si useranno contenuti reali;
- piano rollback;
- test anon/free_user;
- eventuale separazione permessi admin/editor;
- revisione legale/editoriale prima di rimuovere contenuti reali.

## Nota C.5.4-A — Preview unpublish validato funzionalmente

Il deployment Preview del commit `08d03bd` è Ready e l’azione reale di unpublish è stata verificata manualmente con sessione admin.

Confermato:

- unpublish su contenuto demo published;
- status finale `draft`;
- `visibility = private_admin`;
- `published_at = null`;
- audit log `unpublish_editorial_content`;
- assenza di publish/delete/create draft/bulk;
- provider/Apify spenti;
- Production non toccata.

Production resta comunque bloccata finché non sono completati:

- rollback/piano ripristino demo;
- test multi-entità;
- privacy/cookie/legal;
- migration tracking;
- revisione finale admin UX;
- piano contenuti reali.

## Nota D.1 — Provider reali non pronti per Production

Il piano provider è stato preparato solo in modalità dry-run.

Stato:

- stable provider disattivato;
- TheStatsAPI disattivato;
- API-Football disattivato;
- Apify/SofaScore disattivato;
- import disattivati;
- provider/manual/mock disponibili solo come fallback o contenuto controllato.

Prima di Production è obbligatorio:

- dry-run provider stabile su una sola competizione;
- budget giornaliero/mensile configurato;
- mapping ID esterni verificato;
- logging `api_usage_logs`/`provider_import_logs`;
- rollback batch;
- nessuna pagina pubblica con provider diretto;
- revisione licenze/diritti dati;
- Apify test separato con budget hard stop.

## Nota D.2 — Audit provider locale

È stato aggiunto uno script read-only:

- `npm run audit:providers`.

Esito corrente:

- provider reali spenti;
- Apify spento;
- import spenti;
- warnings `0`.

Questo è un controllo preflight utile, ma non rende il progetto pronto per dati reali.

Prima della Production resta obbligatorio:

- dry-run provider con payload;
- controllo licenze;
- budget enforcement reale;
- logging su Supabase;
- rollback;
- test staging con una sola competizione.

## Nota D.3 — Dry-run stable provider completato

È stato completato un dry-run locale per `serie-a`.

Confermato:

- nessun provider reale chiamato;
- nessun token letto;
- nessuna fetch;
- nessuna scrittura DB;
- payload futuri simulati per team, partite e classifica;
- warnings `0`.

Production resta bloccata perché mancano ancora:

- scelta provider reale;
- verifica licenza/contratto;
- mapping ID esterni;
- budget enforcement;
- logging persistito;
- import writer controllato;
- rollback batch;
- test staging con dati reali minimi e approvazione esplicita.

## Nota D.4 — Logging/budget provider solo simulato

È stato preparato un dry-run locale per verificare la forma futura di log provider e budget guard:

- comando: `npm run dry-run:provider-logging`;
- `provider_import_logs` simulato;
- `api_usage_logs` simulato;
- budget guard Apify simulato con 30 €/24 €/30 €;
- scenario hard stop confermato in memoria.

Questo non sblocca la Production.

Restano bloccanti:

- nessun writer Supabase reale per log/import;
- nessun provider reale scelto;
- nessuna licenza dati verificata;
- nessun token configurato;
- nessun import reale approvato;
- nessun monitoraggio costi reale;
- Apify ancora spento;
- migration tracking Supabase ancora da decidere.

## Nota D.5 — Writer provider ancora disabilitati

È stato preparato un layer di guardie per i futuri writer provider/import:

- `realWritesEnabled=false`;
- tentativi di scrittura bloccati;
- nessun client Supabase;
- nessun service role;
- nessuna chiamata provider;
- nessuna chiamata Apify.

Production resta non pronta perché:

- i log non vengono ancora persistiti;
- `batch_id/import_run_id` non è ancora modellato nello schema;
- non esiste writer transazionale di import;
- non esiste rollback reale per batch;
- provider e import restano spenti;
- serve un piano dati/licenze prima di qualunque chiamata reale.
