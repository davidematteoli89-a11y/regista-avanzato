# Production Readiness

## Nota P90-B — Full public path verification stabilization

P90-B ha stabilizzato il dry-run `full-public-path-verification`, senza merge, deploy, Production touch, DB write o provider/import.

Esito:

- `point_90b_full_public_path_verification_stabilized=true`
- `full_public_path_dry_run_diagnostic_states=true`
- `p90_can_be_retried=true`
- `production_polish_released=false`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`

Il dry-run ora distingue server non raggiungibile, HTTP error, empty public dataset, detail not found, data visible e markup unexpected. Senza server fallisce con `server_unreachable`; con server locale attivo passa con `/`, `/competitions` e `/competitions/manual-serie-a` verificate.

P90 può essere riprovato solo con nuova autorizzazione esplicita.

## Nota P90-A — Preview public data visibility diagnosis

P90-A ha diagnosticato lo stop condition che aveva bloccato P90 prima del merge.

Esito:

- `point_90a_preview_public_data_visibility_diagnosis_completed=true`
- `p90_remains_blocked=true`
- `production_polish_released=false`
- `p90b_recommended=true`
- `diagnosis_category=fixture_local_data_not_available_in_this_execution`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`

La diagnosi non ha trovato modifiche app/components/scripts tra P88 e P90, solo docs P89. I reader pubblici restano filtrati su `public_free`. Il dry-run è passato in P90-A con dev server locale attivo, indicando una dipendenza runtime/local data availability più che una regressione del polish.

P90 resta bloccato. Prossimo step consigliato: P90-B — harden full public path dry-run o ripetere il gate con precondizione dev server/data visibility esplicita.

## Nota P89 — Production polish release gate no-apply

P89 ha preparato il gate di rilascio Production per il public product polish, senza applicarlo.

Esito:

- `point_89_production_polish_release_gate_completed=true`
- `production_polish_release_gate_ready=true`
- `p90_requires_explicit_authorization=true`
- `candidate_preview_commit=8ec5be6b8087cacb559ed85796c30d17e4637f9f`
- `current_main_commit=690742762615b6cd5dcd434d1635968269a9dacd`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `no_code_change=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`

P90 richiede autorizzazione esplicita con commit e scope. I comandi generici “procedi”, “vai”, “continua” o “ok” non autorizzano merge/deploy Production.

## Nota P88 — Preview verification public polish

P88 ha verificato localmente il polish pubblico implementato in P87, senza modificare codice e senza deploy Production.

Esito:

- `point_88_preview_verification_completed=true`
- `public_product_polish_preview_verified=true`
- `p89_recommended=production_polish_release_gate`
- `no_code_change=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`

Route verificate in locale/no-auth:

- `/` → HTTP 200;
- `/competitions` → HTTP 200, dati visibili;
- `/competitions/manual-serie-a` → HTTP 200, dati visibili.

Safety confermata: nessun `private_admin`, admin link, debug/raw payload o bottone operativo rilevato. Provider/import e Apify restano spenti.

## Nota P87 — Public product polish implementation

P87 ha implementato il polish UI/copy pubblico pianificato in P86, senza deploy Production.

Esito:

- `point_87_public_product_polish_implemented=true`
- `public_product_polish_implemented=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`

Modifiche limitate a homepage, `/competitions`, `/competitions/[slug]` e componenti pubblici condivisi. Nessun reader DB, filtro visibility, schema/RLS/migration, provider/import, Apify o Vercel config/env/root directory è stato modificato. Prossimo step consigliato: P88 — Preview verification public polish.

## Nota P86 — Public product polish plan

P86 ha creato il piano di polish prodotto pubblico post-MVP, senza modificare codice o Production.

Esito:

- `point_86_public_product_polish_plan_completed=true`
- `public_product_polish_plan_created=true`
- `p87_recommended=implement_public_product_polish`
- `no_code_change=true`
- `no_deploy=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`

Il piano P87 consigliato riguarda solo UI/copy pubblico: homepage più chiara, CTA newsletter senza URL inventata, pagine `/competitions` più editoriali e microcopy trasparente su MVP/dati manuali. Provider/import, Apify, DB write e deploy Production restano fuori scope.

## Nota P85 — Phase 2 backlog + priorities

P85 ha definito il backlog Fase 2 post-MVP e la priorità operativa iniziale.

Esito:

- `point_85_phase_2_backlog_completed=true`
- `phase_2_backlog_created=true`
- `sprint_1_recommended=public_product_polish`
- `no_code_change=true`
- `no_deploy=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`

La priorità consigliata è Sprint 1 — Public product polish. Provider/import e Apify restano off fino ad autorizzazione esplicita futura.

## Nota P84 — Production monitoring checklist

P84 ha creato la checklist di monitoraggio Production post-release, senza codice, deploy o scritture.

Esito:

- `point_84_production_monitoring_checklist_completed=true`
- `production_monitoring_ready=true`
- `production_release_stable_baseline=true`
- `no_code_change=true`
- `no_deploy=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `rollback_executed=false`

Monitoraggio definito per route principali, dati pubblici, sicurezza esposizione, provider/import, Vercel, Supabase read-only e rollback readiness.

## Nota P83 — Post-production verification + MVP Production freeze

P83 ha verificato la Production e congelato il MVP Production.

Esito:

- `point_83_post_production_verification_completed=true`
- `production_release_verified=true`
- `mvp_production_freeze=true`
- `production_url=https://regista-avanzato-rouge.vercel.app`
- `production_home_working=true`
- `production_competitions_working=true`
- `production_competition_detail_working=true`
- `public_competitions_count=1`
- `public_teams_count=2`
- `public_standings_count=2`
- `public_bundle_status=ready`
- `private_admin_publicly_exposed=false`
- `admin_links_visible=false`
- `debug_payload_visible=false`
- `operational_buttons_visible=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `db_write_additional=false`
- `rollback_executed=false`
- `vercel_config_changed=false`
- `vercel_env_changed=false`
- `vercel_root_directory_changed=false`

Production MVP è verificata sulle route pubbliche principali. Provider/import e Apify restano spenti.

## Nota P82-A — Vercel Production Git integration investigation

P82-A ha diagnosticato in sola lettura perché il push di `main` non ha aggiornato la Production URL.

Esito:

- `point_82a_vercel_git_integration_investigation_completed=true`
- `p81b_merge_executed=true`
- `p81b_main_pushed=true`
- `origin/main=ab5067ca2f40c434d13ada87a71be0024069e8bd`
- `origin/preview=ccaf417357ee6159a6fe96504893d12f4b65cd3a`
- `main_contains_competitions_locally=true`
- `main_local_build_passed=true`
- `main_local_competitions_http_status=200`
- `main_local_competition_detail_http_status=200`
- `production_url_still_old=true`
- `production_competitions_404=true`
- `deployment_for_ab5067_exists=unknown`
- `vercel_project_correct=unknown`
- `repository_linked_correct=unknown`
- `likely_cause=G_OR_A`
- `deploy_executed=false`
- `vercel_config_changed=false`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `rollback_executed=false`

La diagnosi locale esclude un problema di route nel commit `main`: `/competitions` e `/competitions/manual-serie-a` sono presenti, buildano e rispondono 200 in locale. Il dominio Production continua invece a servire una versione vecchia. Prossimo step consigliato: verifica manuale Dashboard Vercel di progetto/dominio/Git integration prima di autorizzare qualunque deploy o modifica.

## Nota P81-A — Main untracked cleanup no-deploy

P81 è stato fermato prima del merge perché `main` conteneva untracked locali.

P81-A ha ripulito solo i path esplicitamente autorizzati, senza merge, senza push main e senza deploy.

Esito:

- `point_81a_main_untracked_cleanup_completed=true`
- `main_untracked_cleanup_performed=true`
- `main_working_tree_clean_after_cleanup=true`
- `merge_executed=false`
- `main_pushed=false`
- `production_deploy_executed=false`
- `production_touched=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `db_write_additional=false`
- `rollback_executed=false`

I path rimossi dal working tree sono stati spostati fuori repo in una directory temporanea recuperabile. P81 resta da ripetere solo con nuova autorizzazione esplicita.

## Nota P80 — Production authorization gate no-apply

P80 ha preparato il gate autorizzativo finale per Production senza eseguire merge o deploy.

Esito:

- `point_80_production_authorization_gate_completed=true`
- `production_authorization_gate_completed=true`
- `production_deploy_authorized=false`
- `merge_authorized=false`
- `production_deploy_executed=false`
- `merge_executed=false`
- `production_touched=false`
- `ready_for_controlled_production_release_authorization=true`
- `generic_proceed_authorizes_production=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `db_write_additional=false`
- `rollback_executed=false`

P80 non autorizza merge, push su main, deploy Production, provider/import, Apify o DB write aggiuntive. P81 richiede la frase autorizzativa completa con commit target.

## Nota P79 — Production release plan no-apply

P79 ha preparato il piano di rilascio Production senza eseguirlo.

Esito:

- `point_79_production_release_plan_completed=true`
- `production_release_plan_created=true`
- `merge_executed=false`
- `production_deploy_executed=false`
- `production_touched=false`
- `ready_for_production_authorization_gate=true`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `db_write_additional=false`
- `rollback_executed=false`

Strategia consigliata: P80 authorization gate, poi P81 solo con frase esplicita per merge controllato `preview` → `main` e deploy Production.

P79 non autorizza merge, deploy, provider/import, Apify o DB write aggiuntive.

## Nota P78 — Preview release closure / MVP freeze

P78 chiude la release MVP in Preview, senza aggiornare Production/main.

Esito:

- `point_78_preview_release_closure_completed=true`
- `preview_release_verified=true`
- `preview_url=https://regista-avanzato-kw9gtwlc4-davide-matteoli.vercel.app`
- `preview_competitions_working=true`
- `preview_competition_detail_working=true`
- `production_still_old_main=true`
- `production_touched=false`
- `production_deploy_executed=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `rollback_executed=false`
- `mvp_preview_freeze=true`
- `next_step_requires_explicit_production_authorization=true`

Il dominio `https://regista-avanzato-rouge.vercel.app` resta Production/main vecchia. Il 404 su `/competitions` e `/competitions/manual-serie-a` era dovuto all'ambiente osservato, non al codice del commit Preview verificato.

P78 non autorizza deploy Production, merge main, provider/import, Apify o DB write aggiuntive.

## Nota P76 — Preview authenticated verification

P76 ha verificato la Preview protetta in modalità no-deploy/no-secret.

Esito:

- `point_76_preview_authenticated_verification_completed=true`
- `preview_authenticated_verification_mode=no_deploy_no_secret`
- `preview_authenticated_access_available=false`
- `preview_authenticated_verification_result=blocked_by_missing_authorized_session`
- `preview_no_auth_blocked_by_vercel_auth=true`
- `auth_cookie_used=false`
- `cookies_printed=false`
- `headers_printed=false`
- `token_printed=false`
- `env_local_read=false`
- `production_touched=false`
- `manual_deploy_executed=false`
- `db_write=false`
- `rollback_executed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `vercel_auth_changed=false`
- `vercel_config_changed=false`

P76 non autorizza deploy. La verifica autenticata reale resta da completare manualmente o con sessione autorizzata sicura.

## Nota P75 — Deploy authorization gate

P75 ha preparato il gate di autorizzazione deploy senza eseguire deploy.

Decisione:

- `point_75_deploy_authorization_gate_completed=true`
- `deploy_authorization_gate_completed=true`
- `deploy_authorized=false`
- `deploy_executed=false`
- `ready_for_controlled_deploy_authorization=true`
- `generic_proceed_authorizes_deploy=false`
- `authorization_phrase_created=true`
- `production_touched=false`
- `manual_deploy_executed=false`
- `point_75_db_write=false`
- `rollback_executed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `vercel_auth_changed=false`
- `vercel_config_changed=false`

P75 non autorizza deploy. Il deploy reale richiede P76 con frase esplicita completa, branch e commit target.

## Nota P74 — Final env checklist no-secret

P74 ha completato la checklist finale env/config senza leggere o stampare valori sensibili.

Decisione:

- `point_74_final_env_checklist_no_secret_completed=true`
- `env_checklist_mode=no_secret_no_deploy`
- `supabase_public_env_category_documented=true`
- `service_role_app_usage=false`
- `provider_import_flags_expected_off=true`
- `provider_fetch_expected=false`
- `apify_expected_off=true`
- `writer_flags_expected_off=true`
- `provider_writer_guards_required=true`
- `vercel_project_category_documented=true`
- `vercel_auth_changed=false`
- `vercel_config_changed=false`
- `secrets_hygiene_pass=true`
- `final_env_checklist_created=true`
- `ready_for_deploy=false`
- `ready_for_deploy_authorization_gate=true`

P74 non autorizza deploy. Serve ancora gate esplicito separato.

## Nota P73 — Deploy plan no-apply

P73 ha creato il piano di deploy controllato senza eseguire deploy.

Decisione:

- `point_73_deploy_plan_no_apply_completed=true`
- `deploy_plan_created=true`
- `deploy_executed=false`
- `deploy_authorized=false`
- `ready_for_deploy=false`
- `ready_for_deploy_authorization_gate=true`
- `production_touched=false`
- `manual_deploy_executed=false`
- `point_73_db_write=false`
- `rollback_executed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `service_role_used=false`
- `env_verification_plan_created=true`
- `post_deploy_verification_plan_created=true`
- `rollback_plan_created=true`

P73 non autorizza deploy reale. Il prossimo passaggio consigliato è un gate autorizzativo esplicito o una checklist env no-secret.

## Verdetto

Regista Avanzato non è ancora pronto per produzione reale.

È pronto per staging/Preview protetto, con Supabase Auth/RLS e admin server-side funzionanti, ma non per utenti o dati reali non controllati.

## Nota P72 — Production readiness final review

P72 ha completato la review finale di readiness senza deploy e senza scritture.

Decisione:

- `point_72_production_readiness_final_review_completed=true`
- `readiness_result=ready_for_deploy_plan_no_apply`
- `ready_for_deploy=false`
- `deploy_authorized=false`
- `public_path_verified=true`
- `public_routes_current_state=data_visible`
- `public_competitions_count=1`
- `public_teams_count=2`
- `public_standings_count=2`
- `public_bundle_status=ready`
- `rollback_file_available=true`
- `rollback_executed=false`
- `preview_protected=true`
- `preview_auth_changed=false`
- `production_touched=false`
- `manual_deploy_executed=false`
- `point_72_db_write=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`

P72 autorizza solo la preparazione di un deploy plan no-apply. Il deploy reale resta non autorizzato e richiede una frase esplicita separata.

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

## Punto 22 — Production esclusa

Punto 22 non avvicina Production.

Confermato:

- schema confirmation solo locale;
- nessuna write;
- nessun SQL eseguibile;
- nessuna migrazione;
- nessun deploy;
- provider reali sospesi.

Production resta esclusa finché non esiste un processo staging verificato e approvato.

## Punto 23 — Production ancora esclusa

Punto 23 conferma che nessuna area è pronta per write.

Production resta esclusa:

- ready areas: 0;
- needs_review areas: 3;
- next write allowed=false;
- nessun deploy;
- nessun provider reale;
- nessun import reale.

## Punto 24 — Production ancora esclusa

Punto 24 è una review locale no-write e non cambia la readiness Production.

Confermato:

- nessuna query DB;
- nessuna write;
- nessun SQL eseguibile;
- nessuna migrazione;
- nessun provider reale;
- nessun deploy;
- Production non toccata.

Il sistema resta in manual/mock mode. Prima di qualunque discussione Production serve almeno un Punto 25-A read-only su staging, seguito da autorizzazioni esplicite separate per eventuali write staging.

## Punto 25 — Production ancora esclusa

Punto 25 conferma che Production resta completamente fuori scope.

Il check DB read-only non abilita alcuna write:

- schema target non confermato dal client anon/pubblico;
- final blocked areas: `3`;
- write preconditions met: `false`;
- next write allowed: `false`;
- nessun deploy;
- nessun provider reale;
- nessun import reale;
- nessuna migrazione.

Prima di Production serve risolvere il blocco read-only su staging e completare eventuali write staging controllate in fasi separate.

## Punto 26 — Production ancora esclusa

Punto 26 è solo investigazione read-only.

Confermato:

- nessuna write DB;
- nessun service role;
- nessuna migrazione;
- nessun SQL eseguibile;
- nessun provider reale;
- nessun deploy;
- Production non toccata.

Production resta esclusa finché non esistono read-only lookup affidabili e una sequenza staging verificata con backup/rollback/audit.

## Punto 27 — Production ancora esclusa

Punto 27 è solo proposta documentale di view read-only.

Confermato:

- nessuna migrazione applicata;
- nessun SQL eseguibile prodotto;
- nessuna scrittura DB;
- nessun service role;
- nessun provider reale;
- nessun Apify;
- nessun deploy;
- Production non toccata.

Production resta fuori scope finché Punto 28 e le fasi staging successive non confermano view lookup, RLS, backup, rollback e audit.

## Punto 28 — Production ancora esclusa

Punto 28 produce solo una migration proposal documentale.

Confermato:

- nessun file in `supabase/migrations`;
- nessuna migrazione applicata;
- nessun `db push/reset`;
- nessuna scrittura DB;
- nessun service role;
- nessun provider reale;
- nessun deploy;
- Production non toccata.

Production resta fuori scope. Punto 29/write staging non è autorizzato.

## Punto 29 — Production ancora esclusa

Punto 29 è solo review documentale della proposal read-only.

Confermato:

- nessun file migration `.sql`;
- nessuna migrazione applicata;
- nessun `db push/reset`;
- nessuna scrittura DB;
- nessun provider reale;
- nessun deploy;
- Production non toccata;
- `next_write_allowed=false`.

Production resta esclusa. Punto 30/write staging non è autorizzato.

## Punto 30-B — Production ancora esclusa

Punto 30-B registra una conferma manuale dichiarata dall'utente, senza valori schema risolutivi, e non abilita migration draft.

Confermato:

- nessuna migration `.sql`;
- nessuna migration applicata;
- nessun `db push/reset`;
- nessuna scrittura DB;
- nessun provider reale;
- nessun deploy;
- Production non toccata;
- `next_write_allowed=false`.

Production resta esclusa. Punto 31 migration draft e qualunque write staging restano non autorizzati.

## Punto 30-C — Production ancora esclusa

Punto 30-C prepara solo raccolta manuale valori schema e non abilita import o migration.

Confermato:

- valori reali schema non forniti;
- placeholders resolved count: `0`;
- placeholders uncollected count: `16`;
- ready for migration draft: `false`;
- `next_write_allowed=false`;
- nessuna migration `.sql`;
- nessuna scrittura DB;
- nessun provider/import attivato;
- Production non toccata.

Prima di Production servono raccolta valori, nuova verifica no-write, migration review separata e checklist Production dedicata.

## Punto 30-D — Production ancora esclusa

Punto 30-D risolve i placeholder rispetto allo schema locale versionato, ma non tocca Production.

Confermato:

- local schema extraction completed: `true`;
- DB query executed: `false`;
- DB write: `false`;
- service_role used: `false`;
- ready for migration draft: `true`;
- `next_write_allowed=false`;
- nessuna migration `.sql` creata;
- nessuna migration applicata;
- nessun provider/import attivato;
- Production non toccata.

Production resta esclusa anche se Punto 31 preparasse una draft non applicata.

## Punto 31 — Production ancora esclusa

Punto 31 crea una migration draft SQL fuori da `supabase/migrations`, non applicata.

Confermato:

- migration_draft_created: `true`;
- migration_applied: `false`;
- db_push_reset: `false`;
- db_write: `false`;
- service_role_used: `false`;

## Punto 33 — Production readiness impact

Punto 33 non cambia la readiness Production perché è solo piano documentale no-apply.

Conferme:

- Production non toccata;
- nessun deploy;
- nessuna migration applicata;
- nessun `db push/reset`;
- nessuna scrittura DB;
- provider/import/Apify spenti;
- ready for apply: `false`;
- `next_write_allowed=false`.

Prima di qualunque apply staging futuro resta richiesto un gate separato no-write.

## Punto 34 — Production readiness impact

Punto 34 mantiene Production esclusa.

Conferme:

- nessun deploy;
- nessuna migration applicata;
- nessuna modifica in `supabase/migrations`;
- nessuna scrittura DB;
- provider/import/Apify spenti;
- explicit user authorization received: `false`;
- point 35 blocked without explicit authorization: `true`;
- ready for apply: `false`;
- `next_write_allowed=false`.

Production non deve essere toccata in Punto 35.

## Punto 35 — Production non toccata

Punto 35 ha creato una migration reale locale per view read-only, ma non l’ha applicata.

Conferme:

- Production untouched: `true`;
- migration applied: `false`;
- db write: `false`;
- provider/import off;
- Apify off;
- no deploy;
- ready for Production: `false`.

Production resta esclusa. Serve un canale apply staging controllato prima di qualunque verifica applicativa successiva.

## Punto 36-B — Production ancora esclusa

Punto 36-B non tocca Production:

- apply manuale SQL Editor staging riuscito;
- migration applied: `true`;
- db write: `true`;
- db write scope: `schema_read_only_views_only`;
- provider/import off;
- Apify off;
- no deploy.

Production resta non pronta e fuori scope.

## Punto 37 — Production impact

Punto 37 è stato solo una verifica read-only metadata su Supabase staging.

Conferme:

- metadata_verification_completed: `true`;
- query_read_only: `true`;
- db_write: `false`;
- service_role_used: `false`;
- provider/import off;
- Apify off;
- no deploy;
- Production touched: `false`;
- views_verified_count: `3`;
- post_apply_verification_passed: `true`;
- next_write_allowed: `false`.

Production resta esclusa. Punto 38 deve rimanere una verifica app/admin read-only prima di qualunque decisione successiva.

## Punto 38 — Production impact

Punto 38 è stato solo una verifica app/admin read-only.

Conferme:

- admin_read_only_integration_checked: `true`;
- db_write: `false`;
- service_role_used: `false`;
- provider/import off;
- Apify off;
- no deploy;
- Production touched: `false`;
- next_write_allowed: `false`.

Production resta esclusa. Punto 39 deve restare read-only prima di qualunque decisione su scritture reali.

## Punto 39 — Production impact

Punto 39 è stato solo preview local-only.

Conferme:

- db_write: `false`;
- service_role_used: `false`;
- provider/import off;
- Apify off;
- no deploy;
- Production touched: `false`;
- unresolved_count: `5`;
- next_write_allowed: `false`.

Production resta esclusa. Punto 40 deve essere un fix/mapping read-only se si vuole risolvere la preview.

## Punto 40-Fix — Production impact

Punto 40-Fix prepara solo una query read-only per Supabase staging.

Conferme:

- deploy: `false`;
- Production touched: `false`;
- db_write: `false`;
- provider/import off;
- Apify off;
- service_role_used: `false`;
- next_write_allowed: `false`.

Production resta esclusa.

## Punto 43 — Production ancora esclusa

Punto 43 è solo verifica UI/admin read-only dopo il write manuale staging del Punto 42.

- point_43_db_write: `false`;
- deploy_executed: `false`;
- production_touched: `false`;
- provider_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- service_role_used: `false`;
- rollback_executed: `false`;
- next_write_allowed: `false`.

Production resta esclusa. Nessuna autorizzazione a provider/import o deploy deriva dal Punto 43.

## Punto 40-Fix-B — Production impact

Punto 40-Fix-B registra solo il risultato di una query read-only manuale su Supabase staging.

Conferme:

- deploy: `false`;
- Production touched: `false`;
- db_write: `false`;
- service_role_used: `false`;
- provider/import off;
- Apify off;
- query_result: `success_no_rows_returned`;
- live_lookup_rows_count: `0`;
- preview_mode: `read_only_lookup_completed`;
- create_count: `5`;
- conflict_count: `0`;
- unresolved_count: `0`;
- next_write_allowed: `false`.

Production resta esclusa. Punto 40-B, se aperto, deve restare un write plan no-apply.

## Punto 40-B — Production impact

Punto 40-B crea solo un manual import write plan no-apply.

Conferme:

- deploy: `false`;
- Production touched: `false`;
- db_write: `false`;
- service_role_used: `false`;
- provider/import off;
- Apify off;
- write_plan_mode: `no_apply`;
- proposed_write_order: `competitions,teams,standings`;
- next_write_allowed: `false`.

Production resta esclusa. Punto 41 deve restare gate no-write prima di qualunque autorizzazione futura.

## Punto 42 — Production impact

Punto 42 è stato autorizzato ed eseguito solo su Supabase staging tramite SQL Editor manuale.

Conferme:

- Production touched: `false`;
- deploy_executed: `false`;
- provider/import off;
- Apify off;
- service_role_used: `false`;
- manual_fixture_write_executed: `true`;
- db_write: `true`;
- written rows: `5`;
- post_write_verification_passed: `true`;
- rollback_executed: `false`.

Production resta esclusa.
- ready_for_apply: `false`;
- `next_write_allowed=false`;
- nessun provider/import attivato;
- Production non toccata.

Production resta esclusa. Punto 32 deve essere solo review manuale no-apply.

## Punto 32 — Production ancora esclusa

Punto 32 è solo review/hardening statico della draft.

Confermato:

- migration_draft_reviewed: `true`;
- draft_hardened: `true`;
- blocking issues: `0`;
- ready_for_staging_apply_candidate: `true`;
- ready_for_apply: `false`;
- migration_applied: `false`;
- db_write: `false`;
- service_role_used: `false`;
- Production non toccata;
- `next_write_allowed=false`.

Production resta esclusa anche in qualunque Punto 33 no-apply.

## Punto 44 — Production ancora esclusa

Punto 44 crea solo un piano read-only di consumo dati manuali.

- point_44_db_write: `false`;
- provider_fetch: `false`;
- external_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- public_exposure_enabled: `false`;
- current_visibility: `private_admin`;
- deploy_executed: `false`;
- production_touched: `false`;
- service_role_used: `false`.

I dati manuali non devono essere esposti pubblicamente finché `visibility=private_admin` e finché non esiste una decisione esplicita di policy.

## Punto 45 — Production ancora esclusa

Punto 45 implementa solo superfici admin read-only.

- public_exposure_enabled: `false`;
- current_visibility: `private_admin`;
- point_45_db_write: `false`;
- provider_fetch: `false`;
- external_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- deploy_executed: `false`;
- production_touched: `false`;
- service_role_used: `false`.

Nessuna route pubblica è stata aggiunta. Production resta esclusa.

## Punto 46-B — Production ancora esclusa

Punto 46-B è stato solo un tentativo di verifica browser/admin real session.

- browser_admin_verification_result: `pending_no_admin_session`;
- point_46b_db_write: `false`;
- provider_fetch: `false`;
- external_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- public_exposure_enabled: `false`;
- current_visibility: `private_admin`;
- deploy_executed: `false`;
- production_touched: `false`;
- service_role_used: `false`.

Production resta esclusa.
## Punto 46-C — Admin read-only browser verification still pending

La verifica browser/admin real session della superficie admin read-only è stata ritentata nel Punto 46-C.

Risultato:

- browser_admin_verification_result: `pending_no_admin_session`;
- verification_channel: `unavailable`;
- admin_session_available: `false`;
- admin data routes browser verified: `false`;
- displayed competitions/teams/standings: `0/0/0`;
- public_exposure_enabled: `false`;
- current_visibility: `private_admin`;
- point_46c_db_write: `false`;
- provider_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- deploy_executed: `false`;
- production_touched: `false`.

Production readiness resta bloccata per questa parte finché una sessione admin reale non verifica:

- `/admin/data`;
- `/admin/data/competitions`;
- `/admin/data/competitions/manual-serie-a`;
- `/admin/imports`.

Nessun dato `private_admin` deve essere esposto pubblicamente prima di una decisione dedicata.

## Punto 46-D — Verification channel prepared, Production unchanged

Punto 46-D non cambia lo stato Production.

- admin_session_channel_status: `manual_user_browser_session`;
- recommended_verification_channel: `manual_user_browser_session`;
- browser_admin_verification_result: `pending_admin_session_channel`;
- user_created: `false`;
- role_modified: `false`;
- rls_modified: `false`;
- db_write: `false`;
- provider_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- deploy_executed: `false`;
- production_touched: `false`.

La verifica admin browser resta necessaria prima di considerare qualunque passo di UX/public exposure.

## Punto 46-E — Admin browser verification still pending

Punto 46-E non cambia la readiness Production.

- browser_admin_verification_result: `pending_no_admin_session`;
- admin_session_available: `false`;
- route browser verified: `false`;
- displayed competitions/teams/standings: `0/0/0`;
- public_exposure_enabled: `false`;
- current_visibility: `private_admin`;
- db_write: `false`;
- provider_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- deploy_executed: `false`;
- production_touched: `false`.

Prima di qualsiasi passo successivo di esposizione pubblica o UX polish finale, serve ancora verifica browser admin reale con dati manuali visibili.

## Punto 47 — UX polish plan does not change readiness

Punto 47 ha creato un piano UX/read-only, non una verifica browser passata.

- admin_ux_polish_mode: `read_only_plan`;
- browser_admin_verification_result: `pending_no_admin_session`;
- public_exposure_enabled: `false`;
- current_visibility: `private_admin`;
- point_47_db_write: `false`;
- provider_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- deploy_executed: `false`;
- production_touched: `false`.

Production readiness resta invariata: nessun dato `private_admin` deve diventare pubblico senza policy dedicata e nuova autorizzazione.

## Punto 48 — Admin read-only UX polish

Punto 48 non cambia la readiness Production: nessun deploy e nessuna Production touch.

Modifiche:

- link diretto `/admin/data` aggiunto in `/admin/imports`;
- link `/admin/data/competitions` confermato;
- voce `Manual Data` aggiunta alla navigazione admin;
- modifica solo UI/read-only;
- nessuna DB write nel Punto 48;
- nessun provider/import;
- Apify off;
- dati `private_admin` non esposti pubblicamente.

Production resta non pronta per pubblicazione live finché non saranno completate le checklist dedicate e la verifica browser admin reale post-polish.

## Punto 49 — Browser/admin verification after polish

La verifica admin reale resta non conclusa:

- risultato: `pending_no_admin_session`;
- admin session disponibile: `false`;
- Production: non toccata;
- deploy: non eseguito;
- provider/import: spenti;
- DB write Punto 49: `false`.

La verifica non autenticata della Preview ha mostrato login Vercel e non ha esposto dati `private_admin`.

## Punto 50 — Public exposure policy plan

Punto 50 non cambia la readiness Production: nessun deploy e nessuna Production touch.

Stato:

- policy futura di esposizione pubblica documentata;
- public exposure ancora `false`;
- dati `private_admin` non pubblici;
- visibility invariata;
- nessuna DB write;
- nessun provider/import;
- Apify off;
- nessuna route pubblica operativa nuova;
- nessun public reader implementato.

Production resta bloccata finché non esistono public reader separati, filtro `visibility='public_free'`, test incognito, checklist sicurezza e autorizzazione deploy dedicata.
- Punto 51 — public reader design dry-run:
  - readiness Production invariata;
  - nessuna route pubblica nuova;
  - nessun public reader operativo;
  - nessun collegamento da pagine pubbliche reali;
  - nessun dato `private_admin` esposto;
  - nessun cambio visibility;
  - nessuna DB write;
  - nessun provider/import;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

Prima di qualunque esposizione pubblica reale resta obbligatoria una fase separata con public reader implementato in namespace dedicato, filtro `visibility='public_free'`, test incognito e verifica che non importi admin reader.

- Punto 52 — public reader contract skeleton:
  - readiness Production invariata;
  - nessuna route pubblica creata;
  - nessun reader pubblico operativo;
  - nessuna query Supabase nel nuovo skeleton;
  - nessun dato `private_admin` esposto;
  - nessun cambio visibility;
  - nessuna DB write;
  - nessun provider/import;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

Il file `lib/public-data/contracts.ts` è solo un contratto di tipi/costanti. Non deve essere interpretato come autorizzazione a creare route pubbliche o query operative.

- Punto 53 — public reader implementation no-route:
  - readiness Production invariata;
  - reader pubblici implementati ma non collegati a route;
  - query filtrate su `visibility='public_free'`;
  - nessuna route pubblica creata;
  - nessun dato `private_admin` esposto;
  - nessun cambio visibility;
  - nessuna DB write;
  - nessun provider/import;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

Prima di qualsiasi route pubblica resta obbligatoria una fase dedicata con test incognito e conferma che il dataset `private_admin` produca empty state pubblico.

- Punto 54 — public reader tests hardening:
  - readiness Production invariata;
  - audit no-route rafforzato;
  - dry-run assertivo conferma `0/0/0`;
  - nessuna route pubblica creata;
  - nessun dato `private_admin` esposto;
  - nessun cambio visibility;
  - nessuna DB write;
  - nessun provider/import;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

- Punto 55 — public routes mock/empty-state:
  - readiness Production ancora non concessa;
  - create route pubbliche minimali `/competitions` e `/competitions/[slug]`;
  - route collegate solo ai public reader filtrati `visibility='public_free'`;
  - dataset corrente `private_admin` produce empty state;
  - nessun dato `private_admin` esposto;
  - nessun cambio visibility;
  - nessuna DB write;
  - nessun provider/import;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

Prima di rendere le route parte della readiness Production serve verifica browser locale/Preview e incognito, con conferma che `/competitions/manual-serie-a` non esponga dati privati.

- Punto 56 — public routes browser verification no-auth:
  - verifica locale completata con Chrome headless no-auth;
  - `/competitions` mostra empty state;
  - `/competitions/manual-serie-a` mostra not found/empty;
  - nessun dato `private_admin` esposto;
  - nessun cambio visibility;
  - nessuna DB write;
  - nessun provider/import;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

Readiness Production resta non concessa: manca ancora decisione sul primo dato pubblico reale e/o polish UI pubblico dedicato.

- Punto 57 — public routes UI polish:
  - readiness Production ancora non concessa;
  - UI polish only sulle route `/competitions` e `/competitions/[slug]`;
  - route ancora empty-state/not_found;
  - nessun dato `private_admin` esposto;
  - nessun cambio visibility;
  - nessuna DB write;
  - nessun provider/import;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

Prima della Production resta necessaria una decisione dedicata su dati pubblici reali, promotion plan e verifica browser finale.

- Punto 58 — public routes browser verification after UI polish:
  - verifica browser no-auth locale passata;
  - `/competitions` resta empty state;
  - `/competitions/manual-serie-a` resta not_found/empty;
  - nessun dato `private_admin` esposto;
  - nessun link admin pubblico;
  - nessun debug/raw payload;
  - nessun bottone operativo;
  - nessuna DB write;
  - nessun cambio visibility;
  - nessun provider/import;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

Readiness Production resta non concessa: prima servono promotion plan, autorizzazione dedicata e verifica finale sui dati pubblici reali.


- Punto 59 — public data promotion plan only:
  - readiness Production ancora non concessa;
  - nessuna promotion eseguita;
  - nessun cambio visibility;
  - nessuna DB write;
  - dati `private_admin` restano non pubblici;
  - candidate futura `manual-serie-a` documentata solo come piano;
  - rollback e post-verification plan creati;
  - nessun provider/import;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

Production resta bloccata finché non esistono dati public verificati, promotion autorizzata e checklist dedicata.


- Punto 60 — public data promotion dry-run/no-apply:
  - readiness Production ancora non concessa;
  - scope 1/2/2 confermato solo in dry-run locale;
  - nessuna promotion eseguita;
  - nessun cambio visibility;
  - nessuna DB write;
  - nessun provider/import;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

Production resta bloccata finché una promotion reale non sarà autorizzata, verificata e coperta da checklist dedicata.


- Punto 61 — SQL/manual pack no-apply finale:
  - readiness Production ancora non concessa;
  - pack SQL/manual solo documentale;
  - nessuna promotion eseguita;
  - nessun SQL eseguito;
  - nessuna DB write;
  - nessun cambio visibility;
  - nessun provider/import;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

Production resta bloccata finché non saranno completate autorizzazione esplicita, eventuale staging promotion, rollback readiness e verifica post-promotion.


- Punto 62 — authorization review no-write:
  - readiness Production ancora non concessa;
  - candidate `manual-serie-a` rivista solo come futura promotion staging;
  - scope atteso confermato: 1 competition / 2 teams / 2 standings;
  - `explicit_authorization_required=true`;
  - `generic_proceed_authorizes_write=false`;
  - nessuna promotion eseguita;
  - nessun SQL reale eseguito;
  - nessuna DB write;
  - nessun cambio visibility;
  - nessun provider/import;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

Production resta bloccata finché una promotion staging non sarà esplicitamente autorizzata, applicata in modo controllato, verificata e coperta da rollback/readiness dedicati.


- Punto 63 — final pre-apply checklist no-write:
  - readiness Production ancora non concessa;
  - candidate `manual-serie-a` confermata solo per futura promotion staging;
  - scope atteso: 1 competition / 2 teams / 2 standings;
  - public readers attuali: 0/0/0;
  - route pubbliche attuali: empty/not_found;
  - nessuna promotion eseguita;
  - nessun SQL reale eseguito;
  - nessuna DB write;
  - nessun cambio visibility;
  - provider/import spenti;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

Production resta bloccata finché non saranno completati apply staging esplicitamente autorizzato, verifica post-apply e checklist Production separata.


- Punto 64 — public UI/product polish senza promotion:
  - readiness Production ancora non concessa;
  - route pubbliche migliorate solo lato UI/copy;
  - public readers attuali: 0/0/0;
  - route pubbliche attuali: empty/not_found;
  - nessuna promotion eseguita;
  - nessun SQL reale eseguito;
  - nessuna DB write;
  - nessun cambio visibility;
  - provider/import spenti;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

Production resta bloccata: il polish UI non equivale a dati public approvati né a readiness Production.


- Punto 65 — browser verification no-auth after product polish:
  - readiness Production ancora non concessa;
  - `/competitions` verificata localmente come empty;
  - `/competitions/manual-serie-a` verificata localmente come not_found/empty;
  - nessun dato `private_admin` esposto;
  - nessuna promotion eseguita;
  - nessun SQL reale eseguito;
  - nessuna DB write;
  - nessun cambio visibility;
  - provider/import spenti;
  - Apify off;
  - deploy non eseguito;
  - Production non toccata.

Production resta bloccata: la verifica P65 conferma sicurezza no-auth, non pubblicazione dati reali.

## Punto 66 — Public data promotion apply staging

Punto 66 ha completato la promotion manuale staging della fixture `manual-serie-a` dopo correzione del target enum da `public` a `public_free`.

- `point_66_public_data_promotion_apply_completed=true`
- `public_data_promotion_mode=real_apply_staging_only`
- `corrected_visibility=public_free`
- `old_invalid_visibility=public`
- `enum_verified=true`
- `authorization_phrase_received=true`
- `promotion_candidate=manual-serie-a`
- `promotion_executed=true`
- `real_sql_executed=true`
- `visibility_changed=true`
- `db_write=true`
- `db_write_scope=manual-serie-a_competition_teams_standings`
- `updated_competitions_count=1`
- `updated_teams_count=2`
- `updated_standings_count=2`
- `public_competitions_count=1`
- `public_teams_count=2`
- `public_standings_count=2`
- `public_bundle_status=ready`
- `public_routes_current_state=data_visible`
- `private_admin_publicly_exposed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `service_role_used=false`
- `rollback_file_created=true`
- `rollback_executed=false`

La verifica post-apply è stata eseguita manualmente in Supabase SQL Editor staging e ha confermato `competitions=1`, `teams=2`, `standings=2` con `visibility=public_free`. Nessun rollback eseguito perché l'apply è riuscito.

## Punto 67 — Browser verification after real promotion

Punto 67 ha verificato via HTTP locale no-auth le route pubbliche dopo la promotion P66 a `public_free`.

- `point_67_public_routes_browser_after_promotion_completed=true`
- `public_routes_browser_verification_mode=no_auth_local_http`
- `environment=localhost`
- `production=false`
- `auth=no-auth`
- `verification_source=manual_sql_staging_plus_route_http_check`
- `public_competitions_http_status=200`
- `public_competitions_page_reached=true`
- `public_competitions_page_state=data_visible`
- `public_competition_detail_http_status=200`
- `public_competition_detail_reached=true`
- `public_competition_detail_state=data_visible`
- `public_competitions_count=1`
- `public_teams_count=2`
- `public_standings_count=2`
- `public_bundle_status=ready`
- `serie_a_manual_sample_visible=true`
- `manual_team_one_visible=true`
- `manual_team_two_visible=true`
- `standings_visible=true`
- `forbidden_private_text_visible=false`
- `public_routes_admin_links_visible=false`
- `public_routes_debug_payload_visible=false`
- `public_routes_operational_buttons=false`
- `private_admin_publicly_exposed=false`
- `point_67_db_write=false`
- `rollback_executed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `service_role_used=false`
- `browser_verification_pass=true`

Nessun deploy, nessuna Production e nessuna ulteriore DB write sono stati eseguiti nel Punto 67.
## Punto 68 — Public data UI polish visible data

Punto 68 migliora la UI pubblica dopo la promotion staging P66, senza cambiare dati e senza deploy.

- `public_data_ui_polish_mode=visible_data_no_write`
- `public_routes_current_state=data_visible`
- `public_competitions_count=1`
- `public_teams_count=2`
- `public_standings_count=2`
- `public_bundle_status=ready`
- `private_admin_publicly_exposed=false`
- `point_68_db_write=false`
- `provider_fetch=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`

Production resta non toccata. Prima di qualsiasi Production serve checklist dedicata.
## Punto 69 — Preview no-auth verification

Punto 69 ha verificato la Preview URL del branch `preview` senza deploy manuale.

- `preview_url_available=true`
- `preview_no_auth_blocked_by_vercel_auth=true`
- `preview_verification_result=partial_blocked_by_vercel_auth`
- `preview_data_visible=false`
- `local_p68_verification_still_valid=true`
- `point_69_db_write=false`
- `provider_fetch=false`
- `production_touched=false`
- `deploy_executed=false`

Production resta non toccata. La Preview resta protetta da Vercel Authentication.
## Punto 70 — Homepage/navigation polish without deployment

Punto 70 migliora il percorso pubblico locale senza deploy e senza cambiare configurazioni Vercel.

- `point_70_homepage_navigation_polish_completed=true`
- `public_path_verification_mode=local_no_auth_http`
- `private_admin_publicly_exposed=false`
- `point_70_db_write=false`
- `provider_fetch=false`
- `production_touched=false`
- `deploy_executed=false`
- `vercel_auth_changed=false`

Production resta non toccata. La Preview resta protetta da Vercel Authentication.
