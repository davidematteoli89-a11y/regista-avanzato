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

## Nota D.17-B2 — TheStatsAPI solo locale

TheStatsAPI è stato scelto come provider candidato dopo la sospensione API-Football, ma non è pronto per Production.

Stato:

- key presente solo in `.env.local`;
- `.env.local` ignorato e non committato;
- `THESTATSAPI_PROBE_ENABLED=false`;
- nessuna real-call TheStatsAPI;
- nessuna fetch provider;
- nessuna scrittura DB;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- Production non toccata.

Prima della Production resta obbligatorio completare probe gated, licenza, rate limit, mapping, log, RLS e readiness writer.

## Nota D.17-C — Script TheStatsAPI non abilita Production

Lo script TheStatsAPI gated è solo preparatorio:

- default disabled;
- nessuna real-call;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessun token stampato;
- nessun import;
- provider spenti;
- Apify spento.

Production resta bloccata fino a real-call controllata, mapping validato, licenza/costi verificati, RLS/readiness e writer guard completati.

## Nota D.17-D — Checklist TheStatsAPI non abilita Production

D.17-D è solo checklist finale pre-real-call.

Confermato:

- nessuna real-call TheStatsAPI;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- nessun `service_role`;
- nessun `db push/reset`;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- endpoint TheStatsAPI ancora da confermare;
- Production non toccata.

D.17-E non può procedere senza conferma esplicita, endpoint verificato e garanzia di una sola richiesta read-only.

## Nota D.17-E0 — Endpoint TheStatsAPI verificato fuori Production

D.17-E0 ha verificato solo documentazione pubblica TheStatsAPI.

Confermato:

- base URL `https://api.thestatsapi.com/api`;
- auth `Authorization: Bearer <token>`;
- endpoint candidato finale per una sola prova read-only: `GET /football/competitions/comp_5840/seasons/sn_6199313/standings`;
- nessuna real-call;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- Production non toccata.

Production resta bloccata: D.17-E dovrà essere locale/Preview-safe, con una sola richiesta e output sanificato.

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

## Nota D.6 — Schema import run solo pianificato

È stata preparata una migrazione per `provider_import_runs`, ma non applicata.

Production resta bloccata perché:

- la migrazione 0009 non è ancora testata su staging;
- i writer reali sono ancora disabilitati;
- i provider reali sono spenti;
- non esiste ancora un flusso import reale approvato;
- i log devono essere testati con RLS prima di dati reali;
- serve decisione retention/privacy sui log.

Prima di Production:

1. applicare e verificare 0009 su staging;
2. mantenere `realWritesEnabled=false`;
3. testare solo writer mock/staging;
4. confermare nessuna pagina pubblica accede ai log;
5. definire rollback batch;
6. solo dopo valutare provider reali.

## Nota D.6-B — 0009 applicata su staging

La migrazione `0009_provider_import_runs.sql` è stata applicata manualmente su Supabase staging.

Questo migliora la tracciabilità futura, ma non rende il progetto pronto per Production.

Confermato:

- `provider_import_runs` presente;
- colonne `batch_id/import_run_id` presenti sui log;
- RLS attiva;
- nessuna riga reale inserita;
- provider reali spenti;
- Apify spento;
- import spenti;
- no `db push/reset`;
- Production non toccata.

Restano bloccanti:

- test RLS applicativo su `provider_import_runs`;
- writer reali ancora disabilitati;
- retention/privacy log non finalizzate;
- provider/licenze non approvati;
- rollback batch non ancora testato.

## Nota D.7 — RLS/readiness in preparazione

È stato preparato un test read-only per `provider_import_runs`.

Production resta bloccata finché non sono verificati:

- RLS effettiva su staging;
- assenza accesso anon/free_user;
- lettura admin/editor;
- nessuna policy delete;
- nessun dato sensibile nei log;
- writer reali ancora disabilitati;
- provider/import ancora spenti.

## Nota D.7-B — Readiness provider_import_runs verificata in staging

D.7-A è stata verificata manualmente su Supabase staging “Regista Avanzato” con sole query read-only.

Confermato:

- `provider_import_runs` presente;
- RLS attiva;
- `provider_import_runs_count = 0`;
- provider esterni ancora off;
- import ancora disabilitati;
- nessuna policy `DELETE`;
- SQL Editor senza sessione applicativa:
  - `auth.uid() = null`;
  - `is_admin() = false`;
  - `is_editor_or_admin() = false`.

Production resta non pronta perché:

- manca ancora test RLS con sessione applicativa admin/editor/free_user;
- non esiste ancora reader admin read-only per import run;
- writer reali sono disabilitati;
- provider e Apify restano spenti;
- migration history Supabase resta manuale;
- privacy/retention dei log non è ancora chiusa.

Blocco operativo invariato:

- nessun provider reale;
- nessun Apify;
- nessun import;
- nessun `db push/reset`;
- nessun passaggio Production.

## Nota D.8 — Admin visibility read-only per import runs

È stato aggiunto un reader admin read-only per mostrare `provider_import_runs` in `/admin/imports`.

Questo non cambia lo stato Production.

Confermato a livello di implementazione locale:

- solo lettura;
- nessuna service role;
- nessun writer;
- nessun comando import;
- nessun provider reale;
- nessun Apify;
- `realWritesEnabled=false`;
- empty state atteso perché `provider_import_runs_count = 0`.

Production resta bloccata finché non sono completati:

- test Preview della sezione `/admin/imports`;
- test RLS applicativo con admin/editor/free_user;
- piano retention/privacy log;
- writer staging con rollback;
- approvazione legale/licenze provider.

## Nota D.9 — Preview `/admin/imports` pronta per test manuale

La build Preview che include `/admin/imports` read-only è Ready e protetta da Vercel Authentication.

Questo non rende Production pronta.

Confermato:

- Preview Ready;
- branch alias attivo;
- accesso non autenticato intercettato da SSO;
- nessun deploy Production;
- nessun provider/Apify/import;
- nessuna scrittura DB.

Ancora necessario:

- test manuale admin della sezione `Provider import runs`;
- test manuale empty state;
- test assenza azioni di scrittura;
- test blocco non-admin/free_user.

## Nota D.9-B — Verifica Preview admin imports completata

La verifica manuale Preview di `/admin/imports` è stata completata.

Confermato:

- admin accede a `/admin/imports`;
- `Provider import runs` visibile;
- empty state corretto;
- badge sicurezza presenti;
- nessun bottone `Run/Import/Delete/Update`;
- non autenticato bloccato da Vercel Authentication;
- provider reali spenti;
- Apify spento;
- import spenti;
- `realWritesEnabled=false`;
- Production non toccata.

Production resta non pronta perché:

- test free_user applicativo ancora da completare;
- writer provider/import reali ancora disabilitati;
- provider/licenze/budget non approvati;
- retention/privacy log ancora da chiudere.

## Nota D.10 — Accesso ruoli `/admin/imports`

Audit codice completato.

Risultato:

- admin/editor/super_admin approved sono ammessi all’admin layout;
- `free_user` è bloccato;
- non autenticato è bloccato da Vercel Authentication e/o login app;
- reader import runs è solo read-only;
- nessuna service role;
- nessuna azione writer in UI.

Production resta bloccata perché:

- test manuale `free_user` non ancora eseguito;
- test manuale `editor` non ancora eseguito;
- writer/import/provider reali ancora disabilitati;
- nessun piano dati reali/licenze approvato.

## Nota D.11 — Gate prima dei writer reali

D.11 formalizza che i residui `free_user`/`editor` non vengono risolti creando utenti o modificando ruoli in questa fase.

Production e writer reali restano bloccati finché non sono completati:

- test ruoli controllati;
- verifica repo GitHub Private;
- conferma service role Supabase ruotata;
- env Supabase solo Preview;
- migrazioni manuali tracciate;
- `realWritesEnabled=false` come default;
- import con `import_run_id`, `batch_id`, lifecycle, rollback, audit/log;
- budget Apify con warning 24 €/mese e hard stop 30 €/mese;
- nessuna chiamata provider/Apify lato utente;
- checklist Production dedicata.

Fino ad allora:

- nessun writer reale;
- nessun provider reale;
- nessun import live;
- nessun import storico massivo;
- nessun deploy Production.

## Nota D.12-A — Suite test ruoli controllata

D.12-A documenta una suite di test per `/admin/imports` senza creare utenti e senza modificare ruoli.

Production resta bloccata finché non saranno completati:

- test applicativo `free_user` negativo;
- test applicativo `editor` read-only;
- riconferma admin/non autenticato;
- verifica che nessuna UI provider/import esponga azioni run/import/delete/update;
- conferma che `realWritesEnabled=false` resta default;
- conferma provider/Apify/import spenti.

Nessuna Production readiness viene aumentata da D.12-A: è una fase di preparazione e controllo.

## Nota D.12-B — Test ruoli staging pianificato

D.12-B prepara la procedura per utenti staging `free_user` ed `editor`, ma non crea utenti e non modifica ruoli.

Production resta bloccata finché:

- non viene verificato `free_user` end-to-end come non autorizzato all’admin;
- non viene verificato `editor` end-to-end come read-only;
- non viene confermato che le query post-test lasciano provider/import spenti;
- non viene completato un piano cleanup utenti test;
- non viene confermato che nessuna service role è usata nel client o nelle azioni non necessarie.

## Nota D.13 — Provider real-call readiness

D.13 prepara la readiness per una futura prima chiamata provider, senza chiamarla.

Production resta bloccata perché:

- nessun provider reale è stato scelto definitivamente;
- prezzi/rate limit/licenza non sono ancora verificati;
- non esiste ancora script probe approvato;
- non è stata completata alcuna real-call read-only controllata;
- nessun writer reale è abilitato;
- `realWritesEnabled=false`;
- provider/import/Apify restano spenti.

Qualunque futura real-call deve restare fuori Production, limitata a una richiesta, senza DB write e con token mai stampato.

## Nota D.14-A — Probe disabilitata

D.14-A aggiunge uno script preparatorio disabilitato.

Production resta bloccata:

- nessuna real-call eseguita;
- nessun token provider configurato o letto;
- nessuna fetch;
- nessun DB write;
- provider/import/Apify spenti;
- `real_provider_probe_enabled=false`;
- `realWritesEnabled=false`.

## Nota D.14-B — Checklist manuale ruoli

D.14-B prepara la checklist finale per verificare `free_user` ed `editor` su `/admin/imports`.

Production resta non pronta finché:

- il test `free_user` non conferma blocco;
- il test `editor` non conferma accesso read-only;
- DB post-test non resta invariato;
- non viene chiuso il cleanup utenti test;
- provider/Apify/import restano non approvati.

D.14-B non crea utenti e non modifica ruoli.

## Nota D.14-C — Test ruoli da eseguire manualmente

D.14-C prepara l’esecuzione manuale della checklist ruoli.

Production resta bloccata finché:

- `free_user` non viene verificato come bloccato;
- `editor` non viene verificato come read-only;
- DB invariato non viene riconfermato;
- eventuali utenti test non hanno piano cleanup;
- provider/import/Apify restano non approvati.

Nessuna creazione utente o modifica ruolo viene eseguita automaticamente.

## Nota D.14-D — Utenti test mancanti

La verifica manuale read-only ha confermato che non sono presenti utenti `regista-test-*` nello staging.

Production resta bloccata perché:

- i test `free_user`/`editor` non sono ancora eseguiti;
- serve piano D.14-E per utenti test staging;
- nessuna creazione utente o modifica ruolo è stata autorizzata;
- provider/import/Apify restano non approvati.

## Nota D.14-E — Piano utenti test staging

D.14-E documenta come creare utenti test staging, ma non li crea.

Production resta bloccata finché:

- utenti `free_user`/`editor` non sono testati end-to-end;
- eventuale promozione editor non è documentata e rollbackabile;
- DB invariato non è confermato dopo test;
- provider/import/Apify restano non approvati.

## Nota D.15 — Provider probe readiness

D.15 non rende il progetto pronto per Production.

Prima di Production restano obbligatori:

- nessuna real-call senza gate D.15 completato;
- provider scelto e licenza verificata;
- token non committato e non stampato;
- probe reale solo Preview/locale;
- nessuna scrittura DB nella prima probe;
- provider/import/Apify ancora spenti;
- test ruoli staging completati o consapevolmente differiti.

## Nota D.16-A — Verifica manuale provider/costi/licenze

D.16-A non avvicina ancora il progetto alla Production: aggiunge solo una checklist manuale per confrontare `api_football` e `the_stats_api`.

Production resta bloccata finché:

- provider definitivo non è scelto manualmente;
- prezzo/piano non è verificato;
- rate limit non è verificato;
- licenza/caching/pubblicazione non sono verificati;
- endpoint della prima probe non è scelto;
- token provider non è gestito solo in env sicura;
- repo GitHub Private non è confermato;
- service role Supabase ruotata/confermata non è documentata;
- Vercel env restano solo Preview;
- `real_provider_probe_enabled=false` non viene sbloccato con fase dedicata;
- `realWritesEnabled=false` resta default;
- provider/import/Apify restano spenti;
- nessuna scrittura DB viene introdotta.

D.16-A conferma:

- nessuna real-call;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessun DB write;
- nessun deploy;
- Production non toccata.

## Nota D.16-B — API-Football Free scelto per probe futura

D.16-B non rende il progetto pronto per Production.

Decisione:

- usare `api_football` piano Free per la prima futura probe read-only;
- mantenere `the_stats_api` come alternativa;
- valutare piano a pagamento solo dopo probe riuscita e verifica di limiti, licenza, caching, pubblicazione e costi.

Production resta bloccata perché:

- nessuna real-call è stata ancora eseguita;
- nessun token provider deve essere in Production;
- provider/import/Apify restano spenti;
- `real_provider_probe_enabled=false`;
- `realWritesEnabled=false`;
- nessuna scrittura DB è autorizzata;
- D.16-C richiede conferma separata e massimo una richiesta read-only fuori Production.

## Nota D.16-C1 — Preparazione API-Football key

D.16-C1 documenta dove mettere in futuro la chiave API-Football Free, ma non inserisce né legge token.

Production resta esclusa:

- nessun token in Production;
- nessun token in All Environments;
- nessuna real-call;
- nessuna fetch provider;
- nessuna scrittura DB;
- provider/import/Apify spenti;
- `API_FOOTBALL_PROBE_ENABLED=false`;
- `realWritesEnabled=false`.

## Nota D.16-C3 — Real-call API-Football bloccata prima della fetch

D.16-C3 non produce readiness Production.

- La richiesta API-Football non è stata eseguita.
- `requests_executed=0`.
- Blocco sanificato: key non disponibile nel process environment.
- `.env.local` non letto/caricato.
- Nessuna response completa stampata.
- Nessuna scrittura DB.
- Provider/import ancora spenti.
- Apify spento.
- TheStatsAPI non chiamato.
- Production non toccata.

Prima di Production resta necessario completare una probe reale con procedura sicura, output sanificato e nessuna scrittura DB.

## Nota D.16-C3-R1 — API-Football 403, nessuna readiness Production

La probe ha eseguito una sola richiesta read-only verso API-Football standings Serie A.

Risultato:

- `http_status=403`;
- `requests_executed=1`;
- nessun dato mappabile;
- nessuna scrittura DB;
- nessun import;
- provider/import non attivati.

Production resta bloccata:

- il provider reale non è ancora validato;
- il motivo del `403` va verificato manualmente fuori dal codice;
- nessun token deve essere inserito in Production;
- nessun writer reale deve essere abilitato.

## Nota D.16-C3-R2 — Retry readiness non cambia Production

D.16-C3-R2 è solo documentazione/readiness.

- Nessuna seconda real-call.
- Nessuna fetch provider.
- Nessun token letto/stampato.
- Nessuna scrittura DB.
- Nessun provider/import attivato.
- Apify spento.
- TheStatsAPI non chiamato.
- Production non toccata.

Il `403` di R1 resta un blocco provider da risolvere manualmente prima di qualunque avanzamento verso Production.

## Nota D.16-C3-R2 manual check — Production ancora esclusa

La checklist dashboard API-Football non cambia lo stato Production.

- Nessuna seconda real-call.
- Nessuna fetch provider.
- Nessun token letto/stampato.
- Nessuna scrittura DB.
- Provider/import spenti.
- Apify spento.
- TheStatsAPI non chiamato.
- Production non toccata.

Il `403` deve essere risolto su staging/local prima di qualunque decisione Production.

## Nota D.17-A — Pivot TheStatsAPI non cambia Production

D.17-A documenta solo il pivot provider.

- API-Football sospeso dopo HTTP `403`.
- TheStatsAPI scelto per prossimi test.
- Nessuna real-call TheStatsAPI.
- Nessuna fetch provider.
- Nessun token letto/stampato.
- Nessuna scrittura DB.
- Provider/import spenti.
- Apify spento.
- Production non toccata.

Production resta bloccata finché non saranno completati probe, mapping, licenza/costi, writer guard e test RLS/readiness.

## Nota D.16-C2-A — Key locale verificata senza token output

La verifica D.16-C2-A conferma solo il setup locale:

- `.env.local` ignorato;
- nomi env API-Football presenti localmente;
- `API_FOOTBALL_PROBE_ENABLED=false`;
- nessun valore token mostrato;
- key accidentalmente condivisa in chat considerata esposta e da rigenerare manualmente.

Production resta bloccata:

- nessun token provider in Production;
- nessuna real-call provider;
- nessuna fetch provider;
- nessun DB write;
- provider/import/Apify spenti.

## Nota D.16-C2-B — Script probe gated, non Production

D.16-C2-B prepara lo script tecnico `scripts/provider/apiFootballProbe.ts`, ma non lo esegue.

Production resta esclusa:

- nessuna env provider in Production;
- nessuna real-call;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessun provider/import attivato;
- `API_FOOTBALL_PROBE_ENABLED=false` default;
- `realWritesEnabled=false`.

Una futura real-call richiede fase separata, massimo una richiesta e conferma esplicita.

## Nota D.16-C2-C — Checklist finale pre-real-call

D.16-C2-C crea solo checklist finale per una futura real-call API-Football Free.

Endpoint consigliato:

- standings Serie A.

Production resta esclusa:

- nessuna env provider Production;
- nessuna real-call;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessun provider/import attivato;
- key esposta da rigenerare prima della probe;
- D.16-C3 richiede conferma esplicita.

## Nota D.17-E/F — Probe TheStatsAPI non abilita Production

La real probe TheStatsAPI ha restituito HTTP `404` sulla prima richiesta.

Confermato:

- `requests_executed=1`;
- standings non eseguito;
- nessun retry;
- nessuna scrittura DB;
- nessun import;
- nessuna attivazione provider;
- nessun token stampato;
- API-Football sospeso/no retry;
- Apify spento;
- Production non toccata.

Production resta non pronta. Prima di ulteriori step serve endpoint TheStatsAPI valido e mapping dry-run senza DB write.

## Nota D.17-G — Debug senza Production

D.17-G ha corretto solo la composizione URL nello script TheStatsAPI.

Confermato:

- nessuna nuova real-call;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- nessun deploy;
- Production non toccata.

Production resta bloccata.

## D.17-H — Nessuna readiness Production

D.17-H ha eseguito una sola probe read-only TheStatsAPI su `/football/competitions`:

- URL shape corretta;
- HTTP `403`;
- token non stampato;
- nessuna response completa salvata;
- nessuna scrittura DB;
- nessun import;
- nessun deploy;
- Production non toccata.

Production resta non pronta. Serve debug provider/auth/endpoint e una nuova autorizzazione esplicita prima di qualsiasi ulteriore real-call.

## D.17-J — Production ancora esclusa

D.17-J non modifica readiness Production:

- nessuna real-call;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessun deploy;
- nessuna Production.

Production resta bloccata finché il provider non è verificato in staging/read-only.

## D.17-K — Production ancora bloccata

D.17-K è sola verifica documentale.

Production resta bloccata perché:

- TheStatsAPI non ha ancora una probe riuscita;
- base URL da chiarire;
- account/piano/key non verificati;
- nessun import reale consentito;
- nessun writer reale consentito.

## D.17-L — Production invariata

D.17-L aggiunge solo supporto disabled a una URL shape alternativa.

Production resta bloccata:

- nessuna real-call riuscita;
- nessun import;
- nessun DB write;
- nessun deploy.

## D.17-M/N/Z — Production ancora non pronta

Il Punto 17 non abilita Production:

- nessun provider reale verificato;
- nessun import reale;
- nessuna pipeline dati;
- nessuna garanzia costi/provider;
- Production non toccata.

## Punto 18 — Production ancora bloccata sui provider

Punto 18 chiude la strategia fallback, ma non abilita Production.

Production resta non pronta per provider/import perché:

- TheStatsAPI / Stats API è sospeso;
- API-Football è sospeso/no retry;
- Apify è spento;
- nessun provider reale è verificato;
- nessun import reale è attivo;
- nessun writer reale è abilitato;
- `realWritesEnabled=false`;
- la modalità consentita è manual/mock con fixture locali.

Prima di Production serve una checklist dedicata per provider, costi, licenze, mapping, logging, rollback e sicurezza.

## Punto 19 — Production invariata

Punto 19 aggiunge solo una preview admin read-only di fixture locali.

Production resta non pronta e non toccata:

- nessun import reale;
- nessuna scrittura DB;
- nessun provider reale attivo;
- nessuna pipeline dati live;
- nessun deploy;
- nessun cambio Production.

La preview admin non è una funzionalità di import: è solo controllo dati manual/mock.

## Punto 20 — Production ancora esclusa

Punto 20 prepara un piano staging, non Production.

Production resta esclusa perché:

- import manuale non autorizzato;
- DB write non autorizzata;
- mapping non ancora confermato su staging live;
- backup/rollback non ancora eseguiti;
- nessuna checklist Production dedicata;
- provider reali sospesi.

Ogni eventuale import manuale dovrà nascere come step staging separato.

## Punto 21 — Production ancora esclusa

Punto 21 è readiness staging, non Production.

Production resta esclusa:

- batch plan simulato;
- batch executable=false;
- SQL eseguibile non generato;
- nessuna scrittura DB;
- nessun deploy;
- provider reali sospesi.

Punto 22, se autorizzato, dovrà comunque restare staging prima di qualunque discussione Production.
