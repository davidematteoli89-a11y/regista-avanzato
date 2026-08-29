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
