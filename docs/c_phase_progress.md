# C phase progress

## P99-C — Vercel Production deployment/alias check

Stato: completato.

Conferme:

- `point_99c_vercel_production_alias_check_completed=true`;
- `p99_still_incomplete=true`;
- `production_editorial_pages_released=false`;
- `diagnosis_category=A_deployment_8d20c0e_exists_ready_but_domain_not_assigned`;
- `p99d_recommended=manual_promote_or_assign_domain_gate`;
- `no_deploy=true`;
- `no_promote=true`;
- `no_alias_assignment=true`;
- `no_merge=true`;
- `production_touched=false`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `rollback_executed=false`;
- `vercel_config_changed=false`;
- `vercel_env_changed=false`;
- `vercel_root_directory_changed=false`.

Risultato: deployment `dpl_C8icKQYUPNxvhELo9e9b2LkQ4Up4` per commit `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` esiste ed è `READY`, ma il dominio Production `regista-avanzato-rouge.vercel.app` punta ancora al deployment vecchio `dpl_9wA5xFVNtrEHtXJWDEKVdi34fsP7` / commit `ab5067ca2f40c434d13ada87a71be0024069e8bd`.

Prossimo step consigliato: P99-D — gate esplicito per promote/assegnazione dominio Production al deployment corretto.

## P99-B — Production editorial pages deploy diagnosis

Stato: completato.

Conferme:

- `point_99b_production_deploy_diagnosis_completed=true`;
- `p99_still_incomplete=true`;
- `production_editorial_pages_released=false`;
- `diagnosis_category=8_cause_not_determined_deployment_or_alias_not_serving_main_commit`;
- `p99c_recommended=true`;
- `no_merge=true`;
- `no_deploy=true`;
- `production_touched=false`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `rollback_executed=false`;
- `vercel_config_changed=false`;
- `vercel_env_changed=false`;
- `vercel_root_directory_changed=false`.

Risultato: `main` locale contiene `/manifesto` e `/rubriche`, build/check passano e le route rispondono HTTP 200 localmente. Production continua a restituire HTTP 404 cached per `/manifesto` e `/rubriche`, mentre `/competitions` e dettaglio restano HTTP 200. La causa precisa richiede controllo Vercel Dashboard/deployment state.

Prossimo step consigliato: P99-C — Vercel deployment/alias read-only check o gate dedicato per promote/redeploy solo con autorizzazione esplicita.

## P98 — Production editorial pages release gate

Stato: completato.

Conferme:

- `point_98_production_editorial_pages_release_gate_completed=true`;
- `production_editorial_pages_release_gate_ready=true`;
- `p99_requires_explicit_authorization=true`;
- `candidate_preview_commit=750ab823056c4e63b258a7014637899e8578fcc0`;
- `current_main_commit=4a0b4f190e9e118bb770545742b9ad56cf295789`;
- `no_merge=true`;
- `no_deploy=true`;
- `production_touched=false`;
- `no_code_change=true`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `substack_auto_published=false`.

Risultato: creato gate no-apply per il rilascio Production delle pagine editoriali `/manifesto` e `/rubriche`; documentata la frase esatta richiesta per P99; nessun merge/deploy/DB write/provider/import/Apify/Substack auto-publish eseguito.

Prossimo step consigliato: P99 — merge controllato preview → main + deploy Production pagine editoriali, solo con autorizzazione esplicita esatta.

## P97 — Editorial pages preview verification

Stato: completato.

Conferme:

- `point_97_editorial_pages_preview_verification_completed=true`;
- `editorial_pages_preview_verified=true`;
- `p98_recommended=production_editorial_pages_release_gate`;
- `no_code_change=true`;
- `no_deploy=true`;
- `production_touched=false`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`.

Risultato: verificate homepage, `/manifesto`, `/rubriche`, `/competitions` e `/competitions/manual-serie-a`; manifesto/rubriche/navigation/footer/responsive base passati; nessun `private_admin`, link admin, debug/raw payload, URL Substack inventato o bottone operativo rilevato.

Prossimo step consigliato: P98 — Production editorial pages release gate.

## P96 — Editorial pages implementation

Stato: completato.

Conferme:

- `point_96_editorial_pages_implemented=true`;
- `editorial_pages_created=true`;
- `manifesto_page_created=true`;
- `rubriche_page_created=true`;
- `p97_recommended=preview_verification_editorial_pages`;
- `no_deploy=true`;
- `production_touched=false`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`.

Risultato: create le pagine pubbliche statiche `/manifesto` e `/rubriche`, aggiornati link in navigazione pubblica, homepage e footer. Nessun link Substack inventato e nessuna pubblicazione automatica.

Prossimo step consigliato: P97 — Preview verification editorial pages.

## P95 — Substack launch pack

Stato: completato.

Conferme:

- `point_95_substack_launch_pack_completed=true`;
- `substack_launch_pack_created=true`;
- `newsletter_zero_finalized=true`;
- `p96_recommended=implement_editorial_pages_or_substack_manual_launch`;
- `no_code_change=true`;
- `no_deploy=true`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`.

Risultato: preparati newsletter zero finalizzata, subject/preview text, nome e sottotitolo pubblicazione, tre bio, about page, CTA, piano dei prossimi 3 post e checklist pubblicazione manuale Substack.

Prossimo step consigliato: P96 — Substack manual launch checklist oppure Implement editorial pages on site.

## P94 — Editorial content review + publication plan

Stato: completato.

Conferme:

- `point_94_editorial_publication_plan_completed=true`;
- `editorial_publication_plan_created=true`;
- `first_site_content_selected=manifesto`;
- `first_substack_content_selected=newsletter_zero`;
- `p95_recommended=substack_launch_pack`;
- `no_code_change=true`;
- `no_deploy=true`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`.

Risultato: revisionato il pacchetto editoriale P93, scelti i primi contenuti sito/Substack/social, selezionate le rubriche iniziali e creato il piano pubblicazione 14 giorni.

Prossimo step consigliato: P95 — Substack launch pack.

## P93 — First editorial content pack + voice samples

Stato: completato.

Conferme:

- `point_93_first_editorial_content_pack_completed=true`;
- `first_editorial_content_pack_created=true`;
- `voice_samples_created=true`;
- `p94_recommended=editorial_content_review_or_publication_plan`;
- `no_code_change=true`;
- `no_deploy=true`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`.

Risultato: creati manifesto, newsletter zero, voice cards, voice samples, rubriche pilota, idee articolo, idee social/reel e guida operativa per scegliere la voce editoriale.

Prossimo step consigliato: P94 — Editorial content review + publication plan.

## P92 — Editorial content plan + voices architecture

Stato: completato.

Conferme:

- `point_92_editorial_content_plan_completed=true`;
- `editorial_content_plan_created=true`;
- `editorial_voices_architecture_created=true`;
- `p93_recommended=first_editorial_content_pack`;
- `no_code_change=true`;
- `no_deploy=true`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`.

Risultato: creati identità editoriale, tono generale, sei voci editoriali interne, rubriche iniziali, architettura sito/Substack, piano 4 settimane, template contenuti e regole editoriali/safety.

Prossimo step consigliato: P93 — First editorial content pack + voice samples.

## P91 — Post-production polish verification

Stato: completato.

Conferme:

- `point_91_post_production_polish_verification_completed=true`;
- `production_polish_verified_stable=true`;
- `production_polish_released=true`;
- `no_merge=true`;
- `no_deploy=true`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `rollback_executed=false`;
- `p92_recommended=editorial_content_plan`.

Production verificata su `/`, `/competitions`, `/competitions/manual-serie-a`: HTTP 200, polish visibile, dati pubblici visibili, nessun `private_admin`, admin link, debug/raw payload o bottone operativo rilevato.

Verifiche locali passate: final env checklist, full public path con server, audit provider, writer guards, lint, typecheck e build.

Prossimo step consigliato: P92 — Editorial content plan.

## P90-Retry — Production polish release

Stato: completato.

Conferme:

- `point_90_retry_production_polish_release_completed=true`;
- `production_polish_released=true`;
- `candidate_preview_commit=659c2c88fe62f9f5a8a83414cc8fb6daf9b1d70c`;
- `main_before_merge=690742762615b6cd5dcd434d1635968269a9dacd`;
- `main_after_merge=d890f6e8f68f6d76ef12d659930855971c72d627`;
- `pushed_main_commit=d890f6e8f68f6d76ef12d659930855971c72d627`;
- `merge_executed=true`;
- `main_pushed=true`;
- `production_deploy_verified=true`;
- `stabilized_dry_run_used=true`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `vercel_config_changed=false`;
- `vercel_env_changed=false`;
- `vercel_root_directory_changed=false`;
- `rollback_executed=false`.

Production verificata su `/`, `/competitions`, `/competitions/manual-serie-a`: HTTP 200, polish visibile, dati pubblici visibili, nessun `private_admin`, admin link, debug/raw payload o bottone operativo rilevato.

Prossimo step consigliato: P91 — Post-production polish verification.

## P90-B — Full public path verification stabilization

Stato: completato.

Conferme:

- `point_90b_full_public_path_verification_stabilized=true`;
- `full_public_path_dry_run_diagnostic_states=true`;
- `p90_can_be_retried=true`;
- `production_polish_released=false`;
- `no_merge=true`;
- `no_deploy=true`;
- `production_touched=false`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`.

Risultato: `dry-run:full-public-path-verification` ora produce stati diagnostici distinti. Senza runtime locale segnala `server_unreachable`; con server locale attivo passa e conferma `data_visible` su `/competitions` e `/competitions/manual-serie-a`.

Prossimo step consigliato: ripetere P90 solo con nuova autorizzazione esplicita.

## P90-A — Preview public data visibility diagnosis

Stato: completato come diagnosi no-write/no-deploy.

Conferme:

- `point_90a_preview_public_data_visibility_diagnosis_completed=true`;
- `p90_remains_blocked=true`;
- `production_polish_released=false`;
- `p90b_recommended=true`;
- `diagnosis_category=fixture_local_data_not_available_in_this_execution`;
- `no_merge=true`;
- `no_deploy=true`;
- `production_touched=false`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`.

Risultato: nessuna regressione app/components/scripts identificata. Il diff P88→HEAD contiene solo docs P89. I reader pubblici restano su `public_free`. Il dry-run full public path è passato con dev server attivo in P90-A, quindi lo stop P90 è classificato come problema di disponibilità runtime/local data o precondizione dry-run non esplicita.

Prossimo step consigliato: P90-B — rendere il dry-run più diagnostico/stabile prima di ripetere P90.

## P89 — Production polish release gate no-apply

Stato: completato come release gate no-apply.

Conferme:

- `point_89_production_polish_release_gate_completed=true`;
- `production_polish_release_gate_ready=true`;
- `p90_requires_explicit_authorization=true`;
- `candidate_preview_commit=8ec5be6b8087cacb559ed85796c30d17e4637f9f`;
- `current_main_commit=690742762615b6cd5dcd434d1635968269a9dacd`;
- `no_merge=true`;
- `no_deploy=true`;
- `production_touched=false`;
- `no_code_change=true`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`.

P89 ha documentato candidato release, baseline Production, piano P90, stop conditions e frase esatta di autorizzazione. Nessun merge, deploy, codice, DB write o provider/import è stato eseguito.

Prossimo step consigliato: P90 — merge preview to main + Production polish deploy solo con autorizzazione esplicita.

## P88 — Preview verification public polish

Stato: completato come verifica locale/no-auth e documentazione.

Conferme:

- `point_88_preview_verification_completed=true`;
- `public_product_polish_preview_verified=true`;
- `p89_recommended=production_polish_release_gate`;
- `no_code_change=true`;
- `no_deploy=true`;
- `production_touched=false`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`.

Route verificate:

- `/` HTTP 200;
- `/competitions` HTTP 200, dati visibili;
- `/competitions/manual-serie-a` HTTP 200, dati visibili.

Verifiche tecniche passate: final env checklist, full public path verification, audit provider, writer guards, lint, typecheck e build.

Prossimo step consigliato: P89 — Production polish release gate.

## P87 — Public product polish implementation

Stato: completato come implementazione UI/copy pubblica.

Conferme:

- `point_87_public_product_polish_implemented=true`;
- `public_product_polish_implemented=true`;
- `no_deploy=true`;
- `production_touched=false`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`.

Homepage, `/competitions` e dettaglio competizione sono stati resi più chiari/editoriali, con CTA e microcopy MVP/dati manuali. Nessuna nuova DB write, nessun provider/import, nessun Apify e nessun deploy Production.

Prossimo step consigliato: P88 — Preview verification public polish.

## P86 — Public product polish plan

Stato: completato come piano/documentazione.

Conferme:

- `point_86_public_product_polish_plan_completed=true`;
- `public_product_polish_plan_created=true`;
- `p87_recommended=implement_public_product_polish`;
- `no_code_change=true`;
- `no_deploy=true`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`.

P86 definisce il primo polish pubblico post-MVP: homepage più chiara, messaggio prodotto più forte, CTA newsletter/Substack senza URL inventata, `/competitions` più leggibile, dettaglio competizione più editoriale e microcopy trasparente su dati MVP/manuali.

Prossimo step consigliato: P87 — implement public product polish, solo UI/copy e senza DB write/provider/import/Apify.

## P85 — Fase 2 backlog + priorità

Stato: completato.

Conferme:

- `point_85_phase_2_backlog_completed=true`;
- `phase_2_backlog_created=true`;
- `sprint_1_recommended=public_product_polish`;
- `no_code_change=true`;
- `no_deploy=true`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`.

Backlog creato per: prodotto pubblico, contenuti/editoriale, login/free quota, admin workflow, dati manuali e provider futuri.

Prossimo step consigliato: P86 — Public product polish plan.

## P84 — Production monitoring checklist

Stato: completato.

Conferme:

- `point_84_production_monitoring_checklist_completed=true`;
- `production_monitoring_ready=true`;
- `production_release_stable_baseline=true`;
- `no_code_change=true`;
- `no_deploy=true`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `rollback_executed=false`.

La checklist copre monitoraggio per route Production, dati pubblici, assenza di esposizione privata/admin/debug, provider/import off, controlli Vercel, controlli Supabase read-only e rollback readiness.

Prossimo step consigliato: P85 — Fase 2 backlog + priorità.

## P83 — Post-production verification + MVP Production freeze

Stato: completato.

Conferme:

- `point_83_post_production_verification_completed=true`;
- `production_release_verified=true`;
- `mvp_production_freeze=true`;
- `production_url=https://regista-avanzato-rouge.vercel.app`;
- `/` Production: HTTP 200;
- `/competitions` Production: HTTP 200;
- `/competitions/manual-serie-a` Production: HTTP 200;
- `public_competitions_count=1`;
- `public_teams_count=2`;
- `public_standings_count=2`;
- `public_bundle_status=ready`;
- `private_admin_publicly_exposed=false`;
- `admin_links_visible=false`;
- `debug_payload_visible=false`;
- `operational_buttons_visible=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `db_write_additional=false`;
- `rollback_executed=false`;
- `vercel_config_changed=false`;
- `vercel_env_changed=false`;
- `vercel_root_directory_changed=false`.

Prossimo step consigliato: P84 — production monitoring checklist oppure post-release product polish, senza provider/import e senza DB write salvo nuova autorizzazione esplicita.

## P82-A — Vercel Production Git integration investigation

Stato: completato in sola lettura, senza deploy e senza modifiche Vercel.

Conferme:

- `point_82a_vercel_git_integration_investigation_completed=true`;
- `origin/main=ab5067ca2f40c434d13ada87a71be0024069e8bd`;
- `origin/preview=ccaf417357ee6159a6fe96504893d12f4b65cd3a`;
- `main_contains_competitions_locally=true`;
- `main_local_build_passed=true`;
- `main_local_competitions_http_status=200`;
- `main_local_competition_detail_http_status=200`;
- `production_url_still_old=true`;
- `production_competitions_404=true`;
- `deployment_for_ab5067_exists=unknown`;
- `likely_cause=G_OR_A`;
- `deploy_executed=false`;
- `vercel_config_changed=false`;
- `production_touched=false`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `rollback_executed=false`.

Il problema non risulta nel codice del commit `main`: la build locale contiene e serve le route nuove. Il prossimo step consigliato è controllare manualmente in Vercel quale progetto/dominio/Git integration governa `regista-avanzato-rouge.vercel.app`.

## P81-A — Main untracked cleanup no-deploy

Stato: completato senza merge, senza deploy e senza Production.

Conferme:

- `point_81a_main_untracked_cleanup_completed=true`;
- `main_untracked_cleanup_performed=true`;
- `main_working_tree_clean_after_cleanup=true`;
- `merge_executed=false`;
- `main_pushed=false`;
- `production_deploy_executed=false`;
- `production_touched=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `db_write_additional=false`;
- `rollback_executed=false`.

Untracked rimossi dal working tree di `main`:

- `AGENTS.md`;
- `CLAUDE.md`;
- `supabase/.temp/`.

I file sono stati spostati fuori repo in una directory temporanea recuperabile. Prossimo step consigliato: ripetere P81 con nuova autorizzazione esplicita.

## P80 — Production authorization gate no-apply

Stato: completato come gate no-apply.

Conferme:

- `point_80_production_authorization_gate_completed=true`;
- `production_authorization_gate_completed=true`;
- `production_deploy_authorized=false`;
- `merge_authorized=false`;
- `production_deploy_executed=false`;
- `merge_executed=false`;
- `production_touched=false`;
- `ready_for_controlled_production_release_authorization=true`;
- `generic_proceed_authorizes_production=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `db_write_additional=false`;
- `rollback_executed=false`.

Il prossimo step consigliato è P81 — merge `preview` → `main` + Production deploy solo con autorizzazione esplicita completa.

## P79 — Production release plan no-apply

Stato: completato come piano no-apply.

Conferme:

- `point_79_production_release_plan_completed=true`;
- `production_release_plan_created=true`;
- `merge_executed=false`;
- `production_deploy_executed=false`;
- `production_touched=false`;
- `ready_for_production_authorization_gate=true`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `db_write_additional=false`;
- `rollback_executed=false`.

Production resta vecchia/main su `regista-avanzato-rouge.vercel.app`. La Preview P78 resta il freeze MVP verificato. Prossimo step consigliato: P80 — Production authorization gate.

## P76 — Preview authenticated verification

Stato: completato in modalità no-deploy/no-secret con accesso autenticato non disponibile.

Conferme:

- `point_76_preview_authenticated_verification_completed=true`;
- `preview_authenticated_access_available=false`;
- `preview_authenticated_verification_result=blocked_by_missing_authorized_session`;
- Preview protetta da Vercel Auth;
- nessun deploy manuale;
- Production non toccata;
- nessuna DB write;
- rollback non eseguito;
- provider/import off;
- Apify off;
- nessun token/cookie/header auth stampato.

Prossimo step consigliato: Punto 77 — manual authenticated Preview report oppure deploy controllato solo con autorizzazione esplicita.

## P75 — Deploy authorization gate

Stato: completato senza deploy, senza Production e senza scritture.

Conferme:

- `point_75_deploy_authorization_gate_completed=true`;
- `deploy_authorization_gate_completed=true`;
- `deploy_authorized=false`;
- `deploy_executed=false`;
- `ready_for_controlled_deploy_authorization=true`;
- `generic_proceed_authorizes_deploy=false`;
- `authorization_phrase_created=true`;
- Production non toccata;
- nessun deploy manuale;
- nessuna DB write nel Punto 75;
- rollback non eseguito;
- provider/import off;
- Apify off;
- Vercel Auth/config invariati.

Prossimo step consigliato: Punto 76 — controlled deploy solo con autorizzazione esplicita, oppure Preview authenticated verification.

## P74 — Final env checklist no-secret

Stato: completato senza deploy, senza Production e senza segreti stampati.

Conferme:

- `point_74_final_env_checklist_no_secret_completed=true`;
- `env_checklist_mode=no_secret_no_deploy`;
- Supabase public env category documentata;
- `service_role_app_usage=false`;
- provider/import flags attesi off;
- writer flags attesi off;
- Vercel Auth/config invariati;
- `.env.local` non letto/stampato;
- `secrets_hygiene_pass=true`;
- `ready_for_deploy=false`;
- `ready_for_deploy_authorization_gate=true`.

Prossimo step consigliato: Punto 75 — Deploy authorization gate.

## P73 — Deploy plan no-apply

Stato: completato senza deploy e senza scritture.

Conferme:

- `point_73_deploy_plan_no_apply_completed=true`;
- `deploy_plan_created=true`;
- `deploy_executed=false`;
- `deploy_authorized=false`;
- `ready_for_deploy=false`;
- `ready_for_deploy_authorization_gate=true`;
- Production non toccata;
- nessun deploy manuale;
- nessuna DB write nel Punto 73;
- rollback non eseguito;
- provider/import off;
- Apify off;
- env verification plan creato senza valori;
- post-deploy verification plan creato;
- rollback plan creato.

Prossimo step consigliato: Punto 74 — Deploy authorization gate oppure final env checklist no-secret.

## P72 — Production readiness final review

Stato: completato senza deploy e senza scritture.

Conferme:

- `ready_for_deploy_plan_no_apply=true`;
- `ready_for_deploy=false`;
- `deploy_authorized=false`;
- Production non toccata;
- nessun deploy manuale;
- nessuna DB write nel Punto 72;
- provider/import off;
- Apify off;
- Preview protetta;
- rollback disponibile e non eseguito;
- percorso pubblico locale verificato con dati visibili.

Prossimo step consigliato: Punto 73 — Deploy plan no-apply.

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

## D.17-B2 — Setup locale TheStatsAPI

Stato: completato senza real-call.

Verificato:

- `.env.local` ignorato da Git e non staged;
- `THESTATSAPI_API_KEY` presente senza stampare valori;
- `THESTATSAPI_BASE_URL` presente senza stampare valori;
- `THESTATSAPI_PROBE_ENABLED=false`;
- `token_printed=false`;
- `external_fetch=false`;
- `db_write=false`.

Conferme:

- nessuna chiamata TheStatsAPI;
- nessuna chiamata API-Football;
- API-Football resta sospeso/no retry;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessun `service_role`;
- provider/import spenti;
- Apify spento;
- Production non toccata.

Prossimo step consigliato: D.17-C — preparare script TheStatsAPI probe gated, senza esecuzione real-call.

## D.17-C — Script TheStatsAPI probe gated

Stato: preparato localmente, nessuna real-call.

Creato:

- `scripts/provider/theStatsApiProbe.ts`;
- comando `npm run probe:thestatsapi:gated`.

Comportamento default:

- `THESTATSAPI_PROBE_ENABLED=false`;
- `enabled=false`;
- `blocked_reason=THESTATSAPI_PROBE_DISABLED`;
- `external_fetch=false`;
- `db_write=false`;
- `token_read=false`;
- `token_printed=false`;
- `requests_executed=0`.

Restano confermati:

- API-Football sospeso/no retry;
- provider/import spenti;
- Apify spento;
- `realWritesEnabled=false`;
- Production non toccata.

## D.17-D — Checklist pre-real-call TheStatsAPI

Stato: completata localmente, senza real-call.

Creato:

- `docs/thestatsapi_pre_real_call_checklist_d17d.md`.

Audit statico script:

- endpoint candidato: `/football/standings`;
- metodo candidato: `GET`;
- header/auth candidato: `Authorization: Bearer <token>`;
- parametro candidato: `competition=serie-a`;
- endpoint non ancora definitivo e da confermare da documentazione/dashboard TheStatsAPI;
- hard limit una richiesta;
- nessun retry/loop/paginazione;
- nessun Supabase client;
- nessun DB writer;
- output sanificato.

Verifica disabled:

- `enabled=false`;
- `blocked_reason=THESTATSAPI_PROBE_DISABLED`;
- `external_fetch=false`;
- `db_write=false`;
- `token_read=false`;
- `token_printed=false`;
- `requests_executed=0`.

Restano confermati:

- nessuna real-call TheStatsAPI;
- nessuna fetch provider;
- API-Football sospeso/no retry;
- provider/import spenti;
- Apify spento;
- Production non toccata.

## D.17-E0 — Verifica endpoint TheStatsAPI

Stato: completata da documentazione pubblica, senza real-call.

Verificato:

- base URL: `https://api.thestatsapi.com/api`;
- auth: `Authorization: Bearer <token>`;
- header consigliato: `Accept: application/json`;
- endpoint candidate leggero: `GET /football/competitions`;
- endpoint candidato finale Serie A standings: `GET /football/competitions/comp_5840/seasons/sn_6199313/standings`;
- risposta attesa: JSON con `data`;
- rischio payload: basso/medio per standings singola.

Script aggiornato:

- `scripts/provider/theStatsApiProbe.ts` usa ora endpoint/path documentato;
- nessuna fetch eseguita;
- probe resta disabled.

Conferme:

- nessuna real-call TheStatsAPI;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- Production non toccata.

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

## C.4.4 / C.4.4-A — Admin view con colonne esplicite

Stato: migrazione preparata, committata e applicata manualmente su Supabase staging.

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

Verifica C.4.4-A completata:

- la migrazione `0007_admin_editorial_views_explicit_columns.sql` è stata applicata manualmente su Supabase staging Regista Avanzato;
- le quattro view admin editoriali sono state ricreate correttamente con colonne esplicite;
- `information_schema.columns` conferma le colonne previste;
- `pg_views` conferma il filtro interno `where public.is_editor_or_admin()`;
- `grant select` a `authenticated` resta accettabile perché il filtro RBAC non restituisce righe ai `free_user`;
- `anon` non ha grant sulle view admin;
- provider reali e Apify restano spenti;
- Production non è stata toccata.

Resta fuori scope:

- audit e bonifica di eventuali altre view `admin_*` non editoriali create in origine con `select *`.

## C.5.1 — Server Actions admin sicure + audit log

Stato: audit completato, nessuna Server Action reale attivata.

Risultato audit:

- le pagine admin editoriali candidate sono `/admin/generated-content/articles`, `/admin/news-radar`, `/admin/story-library`, `/admin/historical-echo`;
- le tabelle `public_articles`, `news_archive`, `story_library` e `historical_echoes` hanno già campi per `status`, `visibility`, `internal_notes`, `reviewed_at`, `approved_by`, `published_at` e `updated_at`;
- `admin_audit_logs` supporta audit append-only con `before_data`, `after_data` e `metadata`;
- RLS permette gestione editoriale a `is_editor_or_admin()`;
- l’audit log permette insert solo a `is_admin()`.

Perché non è stata implementata la mutazione reale:

- una Server Action TypeScript farebbe almeno due operazioni separate: update contenuto e insert audit log;
- senza una RPC SQL transazionale non si può garantire che ogni update abbia sempre il relativo audit log;
- estendere le scritture agli editor richiede una decisione RLS esplicita perché oggi l’audit insert è solo admin.

Piano C.5.2:

- creare una migrazione SQL non applicata con RPC transazionali per `update_internal_notes` e `unpublish/rollback`;
- mantenere whitelist dei content type;
- aggiornare solo record singoli via UUID;
- scrivere audit log nello stesso blocco SQL;
- testare ruoli prima di aggiungere form operativi alla UI.

Provider, Apify, Production e import restano spenti/non toccati.

## C.5.2 / C.5.2-A — Migrazione RPC transazionali admin editoriali

Stato: migrazione preparata, applicata manualmente su Supabase staging e verificata lato blocco sicurezza.

File creato:

- `supabase/migrations/0008_admin_editorial_transactional_actions.sql`.

RPC incluse:

- `update_editorial_internal_notes`;
- `unpublish_editorial_content`.

Audit schema:

- `content_status`: `draft`, `review_needed`, `approved`, `published`, `archived`, `rejected`;
- `content_visibility`: `private_admin`, `public_free`, `public_login_required`, `public_preview`, `substack_free`, `substack_paid`;
- le quattro tabelle editoriali hanno campi compatibili per note interne e rollback;
- `admin_audit_logs` ha campi sufficienti per audit sintetico.

Decisione ruoli:

- prima versione limitata ad admin/super_admin;
- editor escluso fino a test/policy dedicati;
- `grant execute` solo ad authenticated, con blocco interno per free_user.

Garanzia transazionale:

- ogni funzione esegue lettura before, update singolo, lettura after e insert audit nella stessa chiamata SQL;
- se l’audit fallisce, fallisce anche la modifica;
- non ci sono delete o update massivi.

Verifica C.5.2-A:

- migrazione `0008_admin_editorial_transactional_actions.sql` applicata manualmente su staging;
- RPC create;
- `select auth.uid(), public.is_admin();` dal Supabase SQL Editor restituisce `auth.uid = null` e `is_admin = false`;
- la chiamata diretta a `update_editorial_internal_notes` dal SQL Editor fallisce con `admin_editorial_action_forbidden`;
- il risultato è corretto: il SQL Editor non simula la sessione Supabase Auth dell’utente admin dell’app;
- il controllo `public.is_admin()` non va rimosso né indebolito;
- `unpublish_editorial_content` non è stata eseguita.

Non implementato:

- UI form;
- Server Actions app;
- publish;
- create draft;
- delete;
- provider/import/Apify;
- deploy o Production.

Prossima sottofase:

- C.5.3: piano e test tramite Server Action/admin session reale per verificare `update + audit log` positivo senza abbassare la sicurezza.

## C.5.3 — Server Action minima per test RPC update note + audit

Stato: implementata localmente, non deployata e non committata.

Implementato:

- Server Action `updateAdminEditorialInternalNotesAction`;
- UI minima nella tabella admin Supabase staging;
- salvataggio note interne tramite RPC `update_editorial_internal_notes`.

Percorso dati:

1. admin autenticato apre una sezione admin editoriale;
2. il form invia `contentType`, `contentId`, `internalNotes`;
3. la Server Action valida input e chiama `requireAdmin()`;
4. il client Supabase server-side usa i cookie della sessione reale;
5. la RPC aggiorna il record e scrive audit log nello stesso blocco SQL.

Non implementato:

- unpublish;
- publish;
- delete;
- create draft;
- upload;
- AI generation;
- Substack;
- provider/import/Apify.

Da testare manualmente:

- salvataggio nota da admin;
- riga `admin_audit_logs` creata;
- blocco anon/free_user;
- nessun impatto sulle public view salvo aggiornamento metadati admin;
- comportamento Preview dopo eventuale commit/push.

## C.5.3-A — Verifica Preview Server Action note interne

Stato: verificata manualmente su Vercel Preview.

Commit verificato:

- `91e3e89`.

Risultati confermati:

- deployment Preview del commit `91e3e89` Ready;
- login admin riuscito;
- `/admin/generated-content/articles` accessibile;
- blocco Supabase staging visibile;
- textarea `Note interne` visibile;
- bottone `Salva note` visibile;
- badge `Staging manual action` visibile;
- modifica nota interna demo riuscita;
- pagina aggiornata senza errore;
- `admin_audit_logs` contiene una nuova riga `update_editorial_internal_notes`;
- `before_data`, `after_data`, `metadata` e `created_at` recente presenti;
- unpublish/publish/delete/create draft non presenti;
- provider/Apify spenti;
- Production non toccata.

Nota operativa:

- il test positivo non va completato dal SQL Editor perché `auth.uid()` lì è `null`;
- non richiedere o condividere password in chat.

Esito audit atteso e confermato:

- `action = update_editorial_internal_notes`;
- `entity_type = article`;
- `before_data`, `after_data`, `metadata` presenti;
- `created_at` recente.

## C.6 — MVP staging closure audit

Stato: audit finale staging completato a livello documentale.

Percentuale stimata MVP staging tecnico: 80%.

Completo per staging:

- frontend pubblico buildabile e disponibile su Preview;
- login, registrazione, account e preferenze collegati a Supabase staging;
- navbar pubblica auth-aware verificata;
- quota ricerca 3/3 verificata via RPC;
- `/admin` protetto server-side con ruolo admin;
- dati demo competizioni/squadre/partite/classifica letti da public views;
- contenuti editoriali demo letti da public views;
- view admin editoriali con colonne esplicite applicate in staging;
- RPC 0008 applicate in staging;
- Server Action `updateAdminEditorialInternalNotesAction` verificata su Preview;
- audit log `update_editorial_internal_notes` scritto correttamente.

Resta spento/non implementato:

- provider stabile reale;
- Apify/SofaScore;
- import automatici;
- Substack API;
- AI generation;
- publish/unpublish/delete/create draft;
- Production deploy.

Rischi residui:

- confermare repo GitHub Private;
- confermare service role key ruotata;
- mantenere env Supabase solo Preview finché Production non è pronta;
- migration history manuale da allineare;
- altre view `admin_*` fuori scope editoriale da audire;
- legal/privacy/cookie ancora da preparare.

Prossimo passo consigliato:

- C.5.4 piano/test controllato per `unpublish_editorial_content`, oppure provider stable dry-run se si preferisce chiudere prima il lato dati.

## C.5.4 — Unpublish manuale controllato

Stato: implementato localmente, non committato e non deployato.

Implementato:

- Server Action `unpublishAdminEditorialContentAction`;
- UI minima nelle tabelle admin editoriali Supabase staging;
- visibilità azione solo per contenuti `published`;
- target consentiti `draft` e `archived`;
- checkbox di conferma obbligatoria;
- motivo opzionale, massimo 1000 caratteri;
- chiamata esclusiva alla RPC `unpublish_editorial_content`.

Garanzie mantenute:

- nessun uso di service role;
- nessuna scrittura diretta alle tabelle editoriali;
- nessuna scrittura diretta ad audit log;
- audit log gestito dalla RPC transazionale;
- nessun delete;
- nessun publish;
- nessun create draft;
- provider/Apify/import spenti;
- Production non toccata.

## D.14-B — Checklist manuale ruoli

Stato: checklist preparata, test non ancora eseguito.

Creato:

- `docs/role_access_manual_test_checklist_d14b.md`.

La checklist copre:

- verifica utenti test staging;
- test `free_user` bloccato;
- test `editor` read-only;
- query read-only per DB invariato;
- cleanup non distruttivo.

Non fatto:

- nessun utente creato;
- nessun ruolo modificato;
- nessuna scrittura DB;
- nessun provider/Apify/import attivato;
- nessuna Production.

## D.14-C — Guida esecuzione manuale ruoli

Stato: guida preparata, test non ancora eseguito.

Creato:

- `docs/role_access_manual_test_d14c.md`.

Nota tecnica:

- `users_profile` non contiene `email`;
- query read-only aggiornata con join su `auth.users` e mascheramento email.

Resta da fare manualmente:

- verificare se gli utenti test esistono;
- testare `free_user` bloccato;
- testare `editor` read-only;
- confermare DB invariato.

## D.14-D — Verifica utenti test mancanti

Stato: verifica manuale read-only registrata.

Risultato:

- query `regista-test-*` su Supabase staging: `Success. No rows returned`;
- nessun utente test trovato;
- nessun utente creato;
- nessun ruolo modificato;
- nessuna scrittura DB;
- provider/Apify/import spenti;
- Production non toccata.

Prossimo passo:

- D.14-E — piano creazione controllata utenti test staging.

## D.14-E — Piano creazione controllata utenti test

Stato: piano documentale preparato, nessuna azione su utenti.

Creato:

- `docs/staging_test_users_creation_plan_d14e.md`.

Utenti previsti:

- `free_user` con email mascherata `davide.m***@funcode.it`;
- `editor` con email mascherata `caffe1***@gmail.com`.

Non fatto:

- nessun utente creato;
- nessun ruolo modificato;
- nessuna scrittura DB;
- nessun provider/Apify/import attivato;
- Production non toccata.

## D.15 — Provider probe readiness gate

Stato: piano documentale preparato.

Creato:

- `docs/provider_probe_readiness_d15.md`.

Confermato:

- probe disabilitata;
- `real_provider_probe_enabled=false`;
- `external_fetch=false`;
- `token_read=false`;
- `db_write=false`;
- provider/Apify/import spenti;
- Production non toccata.

Prossimo step consigliato:

- D.16-A — verifica manuale provider/costi/licenze;
- oppure D.15-B — completare test utenti staging prima della probe reale.

Verifica locale:

- `npm run lint`: ok;
- `npm run typecheck`: ok;
- `npm run build`: ok.

Da verificare manualmente su Preview:

- rimuovere dalla pubblicazione un contenuto demo published;
- confermare che sparisca dalle public views;
- confermare che resti visibile in admin con status `draft` o `archived`;
- confermare audit log `unpublish_editorial_content`;
- confermare che publish/delete/create draft restino assenti.

## C.5.4-A — Verifica Preview unpublish manuale

Stato: verificata manualmente su Vercel Preview.

Confermato:

- commit C.5.4 `08d03bd`;
- branch `preview`;
- deployment Vercel Preview Ready;
- target `preview`;
- alias `https://regista-avanzato-git-preview-davide-matteoli.vercel.app`;
- login admin riuscito;
- unpublish manuale controllato riuscito;
- RPC `unpublish_editorial_content` funzionante;
- update + audit log avvenuti correttamente;
- contenuto demo rimosso dalla pubblicazione;
- publish/delete/create draft/bulk restano disabilitati;
- provider/Apify spenti;
- Production non toccata.

Audit log:

- `action = unpublish_editorial_content`;
- `entity_type = article`;
- `entity_id = f528beb7-6c57-4cb3-9c0b-4cca9757bd38`;
- `before_data.status = published`;
- `before_data.visibility = public_free`;
- `after_data.status = draft`;
- `after_data.visibility = private_admin`;
- `after_data.published_at = null`;
- `created_at` recente.

Nota `reason`:

- audit metadata: `reason_present = false`, `reason_preview = ""`;
- codice verificato: il form invia `reason` e la Server Action lo passa come `p_reason`;
- se il motivo era vuoto, comportamento ok;
- se il motivo era compilato, preparare micro-fix per renderlo obbligatorio e ritestare.

## D.1 — Provider activation dry-run plan

Stato: audit/piano preparato, nessuna attivazione.

Risultati audit:

- provider modellati: mock, manual, stable wrapper, TheStatsAPI, API-Football, Apify/SofaScore;
- provider seedati: 6;
- provider reali spenti;
- Apify spento;
- import spenti;
- competizioni catalogo locale: 43;
- FULL_OFFICIAL: 14;
- APIFY P1: 15;
- APIFY P2: 14;
- TRIGGER concreti: 0.

Script esistenti:

- import competizioni/squadre/partite/eventi/statistiche;
- weekly Apify light import;
- full stats import;
- tutti da mantenere dry-run/mock finché non autorizzati.

Documenti D.1:

- `docs/provider_activation_plan.md`;
- `docs/provider_dry_run_plan.md`;
- `docs/apify_budget_safety_plan.md`.

Prossimo step consigliato:

- D.2: creare o eseguire solo un audit script provider config, senza fetch e senza DB write.

## D.2 — Provider config audit script

Stato: implementato localmente e verificato.

Creato:

- `scripts/provider/auditProviderConfig.ts`;
- script npm `audit:providers`.

Output principale:

- provider totali: 6;
- provider state: stable/the_stats_api/api_football/apify off, manual/mock on;
- competizioni totali: 43;
- FULL_OFFICIAL: 14;
- APIFY P1: 15;
- APIFY P2: 14;
- TRIGGER: 0;
- seed import enabled default: false;
- budget doc Apify: presente;
- warnings: 0.

Conferme:

- nessuna fetch esterna;
- nessuna chiamata provider;
- nessuna chiamata Apify/SofaScore;
- nessuna scrittura DB;
- nessun token letto o stampato;
- `.env.local` non letto.

Verifiche:

- `npm run audit:providers`: ok;
- `npm run lint`: ok;
- `npm run typecheck`: ok;
- `npm run build`: ok.

Prossimo step consigliato:

- D.3: dry-run stable provider su una singola competizione, senza fetch reale e senza Supabase write.

## D.3 — Stable provider dry-run su `serie-a`

Stato: implementato ed eseguito localmente.

Creato:

- `scripts/provider/dryRunStableProvider.ts`;
- script npm `dry-run:stable-provider`.

Output principale:

- `competition_slug=serie-a`;
- `competition_name=Serie A`;
- `tracking_level=full_official`;
- `provider_candidate=stable_provider`;
- `external_provider_candidates=the_stats_api/api_football`;
- `mapped_teams_count=4`;
- `mapped_matches_count=2`;
- `mapped_standings_count=4`;
- `planned_tables=teams,matches,standings,provider_import_logs`;
- `warnings=0`.

Conferme:

- nessuna fetch esterna;
- nessuna chiamata provider;
- nessuna chiamata Apify/SofaScore;
- nessuna scrittura DB;
- nessun token letto/stampato;
- `.env.local` non letto;
- provider/import restano spenti;
- Production non toccata.

D.4 consigliato:

- simulazione budget/logging provider stabile in memoria, preparando forma futura di `api_usage_logs` e `provider_import_logs` senza scrivere Supabase.

## D.4 — Provider logging/budget dry-run

Stato: implementato localmente, non committato finché non confermato.

Creato:

- `scripts/provider/dryRunProviderLogging.ts`;
- script npm `dry-run:provider-logging`.

Risultato atteso:

- run simulata su `serie-a`;
- provider `stable_provider`;
- fetch esterne `false`;
- DB write `false`;
- shape `provider_import_logs` ok;
- shape `api_usage_logs` ok;
- budget guard Apify ok;
- soglie budget: 30 €/mese, warning 24 €, hard stop 30 €;
- warnings `0`.

Conferme:

- provider reali spenti;
- Apify spento;
- import spenti;
- nessun token letto/stampato;
- nessuna scrittura Supabase;
- Production non toccata.

Prossimo step consigliato:

- D.5: progettare writer log/import ancora spenti, prima di qualunque attivazione reale.

## D.5 — Provider writer/log guard disabilitati

Stato: implementato localmente, non committato finché non confermato.

Creato:

- `lib/provider/providerWriteGuards.ts`;
- `lib/provider/providerImportWriter.ts`;
- `scripts/provider/dryRunProviderWriterGuards.ts`;
- script npm `dry-run:provider-writer-guards`.

Confermato:

- `realWritesEnabled=false`;
- tentativo scrittura bloccato;
- preview `provider_import_logs` ok;
- preview `api_usage_logs` ok;
- preview rollback ok;
- nessuna fetch esterna;
- nessuna scrittura DB;
- nessun token letto/stampato;
- provider/Apify/import restano spenti;
- Production non toccata.

Nota:

- `batch_id` è preview-only perché non esiste ancora nello schema staging.

## D.6 — Batch/import run schema plan

Stato: preparato localmente, non applicato.

Creato:

- `supabase/migrations/0009_provider_import_runs.sql`;
- `docs/provider_import_runs_schema_plan.md`.

Aggiornati:

- `lib/provider/providerImportWriter.ts`;
- `scripts/provider/dryRunProviderLogging.ts`;
- `scripts/provider/dryRunProviderWriterGuards.ts`.

Risultato:

- le preview ora includono `import_run_preview=ok`;
- `provider_import_logs` e `api_usage_logs` preview hanno `import_run_id`/`batch_id`;
- rollback preview considera `provider_import_runs`;
- scritture reali ancora bloccate.

Non fatto:

- nessuna applicazione migrazione;
- nessun `db push/reset`;
- nessuna scrittura Supabase;
- nessuna attivazione provider/Apify/import.

## D.6-B — Applicazione manuale 0009 documentata

Stato: completata manualmente su Supabase staging “Regista Avanzato”.

Applicata:

- `supabase/migrations/0009_provider_import_runs.sql`.

Metodo:

- SQL Editor;
- nessun `db push`;
- nessun `db reset`;
- Production non toccata.

Verifiche read-only:

- `provider_import_runs` esiste;
- RLS attiva;
- policy presenti;
- colonne `import_run_id`/`batch_id` presenti su `provider_import_logs`, `api_usage_logs`, `import_logs`;
- indici presenti;
- `provider_import_runs_count = 0`;
- provider esterni off;
- import disabilitati.

Stato operativo:

- writer reali disabilitati;
- `realWritesEnabled=false`;
- nessuna fetch esterna;
- nessun provider/Apify attivato.

Prossimo step:

- D.7: test RLS/readiness per `provider_import_runs` e visibilità admin.

## D.7 — RLS/readiness provider_import_runs

Stato: preparato localmente.

Creati:

- `supabase/manual/provider_import_runs_rls_d7.sql`;
- `docs/provider_import_runs_rls_test_plan.md`.

Obiettivo:

- verificare manualmente in SQL Editor che `provider_import_runs` sia presente e protetta;
- confermare colonne `batch_id/import_run_id` sui log;
- confermare provider/import ancora spenti;
- preparare eventuale admin visibility read-only.

Non fatto:

- nessuna scrittura DB;
- nessun test insert;
- nessun provider;
- nessun Apify;
- nessun deploy;
- nessuna Production.

## D.7-B — Risultati manuali RLS/readiness documentati

D.7-A è stata eseguita manualmente nel Supabase SQL Editor del progetto staging “Regista Avanzato”.

Risultati confermati:

- `provider_import_runs` presente;
- RLS attiva = `true`;
- `provider_import_runs_count = 0`;
- provider esterni ancora off;
- import ancora disabilitati;
- nessuna policy `DELETE`;
- SQL Editor senza sessione app:
  - `auth.uid() = null`;
  - `is_admin() = false`;
  - `is_editor_or_admin() = false`.

Non fatto:

- nessuna scrittura DB;
- nessun dato reale inserito;
- nessun provider attivato;
- nessun Apify attivato;
- nessun `db push/reset`;
- nessun deploy;
- Production non toccata.

## Punto 22 — Schema Confirmation Dry-Run

Stato: completato localmente.

Aggiunto:

- `docs/manual_import_schema_confirmation_p22.md`;
- `docs/manual_import_rls_audit_review_p22.md`;
- `scripts/provider/manualSchemaConfirmationDryRun.ts`;
- aggiornamento `scripts/provider/manualImportReadinessDryRun.ts`;
- sezione admin read-only “Schema confirmation”;
- `docs/manual_import_point_23_decision_gate_p22.md`;
- `docs/provider_point_22_closure.md`.

Comando:

- `npm run dry-run:manual-schema-confirmation`.

Conferme:

- schema confirmation read-only;
- stato schema ancora `needs_review`;
- `next_write_allowed=false`;
- nessun SQL eseguibile;
- nessuna scrittura DB;
- nessuna migrazione modificata;
- Production non toccata.

## Punto 23 — Schema Review Resolution

Stato: completato localmente.

Aggiunto:

- `docs/manual_import_schema_needs_review_root_cause_p23.md`;
- `docs/manual_import_schema_confidence_matrix_p23.md`;
- aggiornamento `scripts/provider/manualSchemaConfirmationDryRun.ts`;
- aggiornamento `scripts/provider/manualImportReadinessDryRun.ts`;
- sezione admin read-only “Schema review resolution”;
- `docs/manual_import_point_24_decision_p23.md`;
- `docs/provider_point_23_closure.md`.

Esito:

- ready areas: 0;
- needs_review areas: 3;
- blocked areas: 0;
- `next_write_allowed=false`;
- Punto 24 richiede autorizzazione esplicita.

Conferme:

- nessuna scrittura DB;
- nessun SQL eseguibile;
- nessuna migrazione modificata;
- nessun provider reale;
- Production non toccata.

Prossimo step consigliato:

- D.8 — creare un reader admin read-only per `provider_import_runs` in `/admin/imports`, con empty state e senza writer reali.

## D.8 — Admin reader read-only per provider_import_runs

Stato: implementato localmente, non ancora committato.

Creato:

- `lib/admin/adminProviderImportRuns.ts`.

Aggiornato:

- `/admin/imports` mostra una sezione `Provider import runs`.

Comportamento:

- lettura server-side con sessione Supabase;
- RLS rispettata;
- nessuna service role;
- solo `SELECT`;
- massimo 20 run ordinate per `created_at desc`;
- empty state se la tabella è vuota;
- badge sicurezza: `Read-only`, `Provider off`, `Apify off`, `realWritesEnabled=false`.

Non fatto:

- nessuna scrittura DB;
- nessun insert/update/delete/upsert;
- nessun provider;
- nessun Apify;
- nessun import;
- nessun deploy;
- Production non toccata.

Prossimo step consigliato:

- D.9 — verifica Preview della sezione `/admin/imports` e test RLS applicativo read-only.

## D.9 — Verifica Preview `/admin/imports`

Stato: verifica tecnica parziale completata, test admin UI manuale ancora da fare.

Verificato:

- branch locale/remoto `preview` allineato al commit `dbc83703c1364721ecb8a4a88db72067d2ff9734`;
- Vercel Preview Ready;
- target/environment = Preview;
- branch alias disponibile;
- Deployment Protection/Vercel Authentication attiva;
- richiesta non autenticata a `/admin/imports` viene intercettata da Vercel SSO;
- Production non toccata.

Non verificabile automaticamente da questo ambiente:

- UI interna dopo Vercel Authentication;
- login Supabase admin;
- rendering effettivo della sezione `Provider import runs`;
- empty state visuale;
- assenza bottoni lato browser.

Motivo:

- `agent-browser` non disponibile;
- nessuna sessione Vercel/Supabase admin nel browser dell’agente.

Da verificare manualmente:

- `/admin/imports` mostra `Provider import runs`;
- badge sicurezza presenti;
- empty state visibile;
- nessun bottone `Run/Import/Delete/Update`;
- logout/non admin bloccati.

## D.9-B — Preview `/admin/imports` verificata manualmente

Stato: completata.

Verifica manuale utente:

- URL: `https://regista-avanzato-git-preview-davide-matteoli.vercel.app/admin/imports`;
- commit Preview: `dbc83703c1364721ecb8a4a88db72067d2ff9734`;
- `/admin/imports` accessibile da admin;
- sezione `Provider import runs` visibile;
- empty state corretto;
- badge `Read-only`, `Provider off`, `Apify off`, `realWritesEnabled=false` presenti;
- nessun bottone `Run/Import/Delete/Update` o altra scrittura;
- non autenticato bloccato da Vercel Authentication.

Stato sicurezza:

- DB invariato per quanto verificato;
- provider reali spenti;
- Apify spento;
- import spenti;
- `realWritesEnabled=false`;
- Production non toccata.

Residui:

- test applicativo free_user ancora da fare se serve copertura completa;
- writer reali ancora disabilitati.

Prossimo step consigliato:

- D.10 — test RLS applicativo free_user/editor/admin per import runs, senza creare run reali.

## D.10 — Accesso ruoli `/admin/imports`

Stato: audit codice completato, test manuali free_user/editor non eseguiti perché non sono stati creati/modificati utenti o ruoli.

Matrice attesa:

- non autenticato: bloccato da Vercel Authentication o login app;
- `free_user`: bloccato da `requireAdmin()` / `notFound()`;
- `editor` approved: ammesso all’admin layout e sola lettura;
- `admin` approved: ammesso e sola lettura.

Audit codice:

- `app/admin/layout.tsx` usa `requireAdmin()` server-side;
- `requireAdmin()` ammette solo `editor`, `admin`, `super_admin` con `status = approved`;
- `free_user` resta escluso;
- `adminProviderImportRuns` usa client Supabase server-side con sessione utente;
- reader `provider_import_runs` solo `SELECT`;
- nessuna service role;
- `/admin/imports` non contiene bottoni/form di scrittura.

Già verificato da D.9-B:

- admin vede `/admin/imports`;
- non autenticato bloccato da Vercel Authentication;
- empty state e badge sicurezza corretti;
- nessun bottone run/import/delete/update.

Residui:

- test applicativo `free_user` se disponibile utente controllato;
- test applicativo `editor` se disponibile utente controllato;
- nessuna modifica ruoli senza conferma.

## D.11 — Chiusura residui ruoli e gate writer

Stato: documentazione aggiornata, nessuna modifica utenti/ruoli.

Decisione:

- non vengono creati utenti `free_user`/`editor`;
- non vengono modificati ruoli;
- i test `free_user`/`editor` restano residui consapevoli.

La fase resta safe perché:

- admin verificato;
- non autenticato bloccato;
- `requireAdmin()` esclude `free_user`;
- `editor` ammesso solo se approved;
- `/admin/imports` read-only;
- writer reali disabilitati;
- provider/Apify/import spenti.

Readiness gate:

- nessun writer/import reale prima di checklist completa su sicurezza, RLS ruoli, batch/import run, rollback, audit/log, budget Apify e Production readiness.

Documento dedicato:

- `docs/provider_writer_readiness_gate_d11.md`.

## D.12-A — Suite test ruoli controllata

Stato: documentazione preparata, nessun test con nuovi utenti eseguito.

Creato:

- `docs/role_access_test_suite_d12a.md`.

Confermato da audit locale:

- ruoli effettivi: `free_user`, `editor`, `admin`, `super_admin`;
- admin layout accessibile solo con profilo `approved` e ruolo `editor/admin/super_admin`;
- `free_user` escluso da `requireAdmin()`;
- `provider_import_runs` SELECT consentito via RLS solo a `is_editor_or_admin()`;
- INSERT/UPDATE RLS riservati ad admin;
- nessuna DELETE policy;
- `/admin/imports` resta read-only e senza bottoni di scrittura.

Non fatto:

- nessun utente creato;
- nessun ruolo modificato;
- nessuna scrittura DB;
- nessun provider/Apify/import attivato;
- nessuna Production.

Prossimo passo consigliato:

- D.12-B — test applicativo con utenti controllati `free_user` ed `editor`, solo dopo conferma esplicita.

## D.12-B — Piano test applicativo free_user/editor

Stato: piano preparato, test non ancora eseguito.

Creato:

- `docs/role_access_test_suite_d12b.md`.

Piano:

- verificare manualmente se esistono utenti test staging riutilizzabili;
- usare `regista-test-free-user` per test negativo;
- usare `regista-test-editor` per test read-only;
- mantenere admin già verificato;
- confermare DB invariato con query read-only;
- nessuna creazione utente o modifica ruolo senza conferma.

Conferme:

- nessun utente creato;
- nessun ruolo modificato;
- nessuna scrittura DB;
- nessun provider/Apify/import attivato;
- Production non toccata.

## D.13 — Stable provider real-call readiness

Stato: piano documentale preparato, nessuna real-call eseguita.

Creato:

- `docs/stable_provider_real_call_readiness_d13.md`.

Audit:

- `stable_provider` è un wrapper/placeholder disattivato;
- `the_stats_api` e `api_football` sono candidati configurati ma spenti;
- non ci sono adapter real-call specifici;
- gli script attuali sono solo audit/dry-run locali;
- writer e import restano bloccati da guardie.

Decisione provvisoria:

- preferenza provvisoria: `api_football`;
- alternativa: `the_stats_api`;
- scelta finale subordinata a verifica manuale di copertura, costi, rate limit e licenza.

Non fatto:

- nessuna chiamata provider;
- nessuna fetch esterna;
- nessun token letto/stampato;
- nessuna scrittura DB;
- nessun provider/Apify/import attivato;
- nessuna Production.

Prossimo step consigliato:

- D.14 — scelta provider e preparazione script probe read-only, senza eseguirlo.

## D.14-A — Probe provider disabilitata

Stato: script creato e disabilitato.

Creato:

- `scripts/provider/disabledStableProviderProbe.ts`;
- `docs/stable_provider_disabled_probe_d14a.md`.

Comando:

```bash
npm run probe:stable-provider:disabled
```

Conferme:

- `real_provider_probe_enabled=false`;
- `external_fetch=false`;
- `token_read=false`;
- `db_write=false`;
- `provider_activated=false`;
- `import_enabled=false`;
- provider/Apify/import spenti;
- Production non toccata.

## D.16-A — Verifica manuale provider/costi/licenze

Stato: checklist manuale preparata, nessuna real-call.

Creato:

- `docs/provider_manual_verification_checklist_d16a.md`.

Decisione provvisoria:

- provider preferito provvisorio: `api_football`;
- alternativa: `the_stats_api`;
- scelta finale vincolata a verifica manuale di copertura, prezzi, rate limit, licenza, caching e pubblicazione.

Gate prima di D.16-B:

- provider scelto manualmente;
- prezzo/rate limit/licenza verificati;
- endpoint scelto;
- token solo in env sicura;
- repo GitHub Private confermato;
- service role Supabase ruotata/confermata;
- env Vercel solo Preview;
- provider/import/Apify ancora spenti;
- `real_provider_probe_enabled=false` fino a conferma esplicita;
- `realWritesEnabled=false`;
- nessuna scrittura DB;
- Production non toccata.

Conferme:

- nessuna real-call;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- nessun `db push/reset`;
- provider/Apify/import spenti;
- Production non toccata.

## D.16-B — API-Football Free per prima probe futura

Stato: piano documentale preparato, nessuna real-call.

Creato:

- `docs/api_football_free_probe_plan_d16b.md`.

Decisione:

- provider scelto per prima futura probe: `api_football`;
- piano iniziale: Free;
- alternativa mantenuta: `the_stats_api`;
- eventuale upgrade a pagamento solo dopo probe riuscita, payload compatibile, limiti chiari, licenza/caching/pubblicazione confermati e costi sostenibili.

Piano D.16-C:

- massimo una richiesta read-only;
- competizione `serie-a`;
- endpoint candidato `standings` o `fixtures`;
- output sanificato;
- token solo da env sicura;
- nessuna scrittura DB;
- nessun import;
- nessun provider attivato;
- nessun Apify;
- Production non toccata.

Conferme:

- nessuna chiamata API-Football;
- nessuna chiamata TheStatsAPI;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- nessun `db push/reset`;
- provider/Apify/import spenti;
- Production non toccata.

## D.16-C1 — Preparazione sicura API-Football key

Stato: preparazione env/documentazione, nessuna chiave inserita e nessuna real-call.

Creato:

- `docs/api_football_key_setup_d16c1.md`.

Aggiornato:

- `.env.example` con placeholder non segreti per `API_FOOTBALL_API_KEY`, `API_FOOTBALL_BASE_URL` e `API_FOOTBALL_PROBE_ENABLED=false`.

Conferme:

- `.env.local` non letto;
- nessuna API key creata, salvata, letta o stampata;
- nessuna chiamata API-Football;
- nessuna fetch provider;
- nessuna scrittura DB;
- provider/Apify/import spenti;
- Production non toccata.

Prossimo step consigliato:

- D.16-C2 — preparare script probe API-Football ancora disabilitato, senza real-call.

## D.16-C2-A — Verifica setup key API-Football locale

Stato: verifica setup locale completata, nessuna real-call.

Risultati:

- `.env.local` esiste ed è ignorato da Git;
- `.env.example` contiene solo placeholder/default safe;
- `API_FOOTBALL_API_KEY` presente localmente senza stampare valore;
- `API_FOOTBALL_BASE_URL` presente localmente senza stampare valore;
- `API_FOOTBALL_PROBE_ENABLED=false`;
- `token_printed=false`.

Nota sicurezza:

- la key condivisa accidentalmente in chat è considerata esposta;
- usare solo key rigenerata manualmente dall’utente;
- non inserire token in docs, commit, chat o Production.

Conferme:

- nessuna chiamata API-Football;
- nessuna fetch provider;
- nessuna scrittura DB;
- provider/Apify/import spenti;
- Production non toccata.

Prossimo step consigliato:

- D.16-C2-B — preparare script probe reale gated/disabilitato, senza eseguire real-call.

## D.16-C2-B — Script probe API-Football gated

Stato: script preparato, non eseguito.

Creato:

- `scripts/provider/apiFootballProbe.ts`;
- `docs/api_football_probe_script_d16c2b.md`.

Aggiornato:

- `package.json` con `probe:api-football:gated`.

Caratteristiche:

- separato dagli import;
- massimo una richiesta futura;
- default disabled;
- richiede `API_FOOTBALL_PROBE_ENABLED=true` e `REAL_PROVIDER_PROBE_ENABLED=true` per procedere;
- output disabled sanificato;
- nessun token stampato;
- nessuna scrittura DB;
- nessun provider/import attivato.

Conferme D.16-C2-B:

- script non eseguito;
- nessuna chiamata API-Football;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessun DB write;
- provider/Apify/import spenti;
- Production non toccata.

## D.16-C2-C — Checklist finale pre-real-call API-Football

Stato: checklist finale preparata, nessuna real-call.

Creato:

- `docs/api_football_pre_real_call_checklist_d16c2c.md`.

Decisione:

- endpoint consigliato per D.16-C3: standings Serie A;
- endpoint alternativo: fixtures Serie A se standings non è disponibile o non adatto.

Verifica disabled:

- `npm run probe:api-football:gated`;
- `enabled=false`;
- `blocked_reason=API_FOOTBALL_PROBE_DISABLED`;
- `external_fetch=false`;
- `db_write=false`;
- `token_read=false`;
- `token_printed=false`;
- `requests_executed=0`.

Gate:

- key esposta da rigenerare/ruotare;
- nuova key solo in `.env.local`;
- massimo una richiesta futura;
- niente retry/loop/paginazione;
- nessuna scrittura DB;
- nessun provider/import attivato;
- Production non toccata;
- D.16-C3 solo con conferma esplicita.

## D.16-C3 — Tentativo prima real-call API-Football

Stato: bloccata prima della richiesta.

- Documento risultato creato: `docs/api_football_first_real_call_result_d16c3.md`.
- Endpoint previsto: standings Serie A.
- Richieste pianificate: 1.
- Richieste eseguite: 0.
- Motivo blocco: `API_FOOTBALL_API_KEY` non disponibile nel process environment.
- `.env.local` non letto/caricato da Codex.
- Nessuna fetch provider completata.
- Nessun token stampato.
- Nessuna response completa stampata.
- Nessuna scrittura DB.
- Provider/import ancora spenti.
- Apify spento.
- TheStatsAPI non chiamato.
- Production non toccata.

Lo script è stato allineato al report sanificato richiesto da D.16-C3, ma non è stato committato.

## D.16-C3-R1 — Retry prima real-call API-Football

Stato: prima richiesta reale eseguita, risposta provider `403`.

- Script aggiornato con lettura mirata `.env.local` solo per variabili API-Football.
- Gate disabled verificato dopo fix: `token_read=false`, `requests_executed=0`.
- Real-call eseguita una sola volta con gate temporanei.
- Endpoint: standings Serie A.
- `requests_executed=1`.
- `http_status=403`.
- `api_errors_count=2`.
- `response_top_level_keys=get,parameters,errors,results,paging,response`.
- `standings_groups_count=0`.
- `standings_rows_count=0`.
- `mapping_theoretical_possible=false`.
- Nessun token stampato.
- Nessuna response completa stampata.
- Nessuna scrittura DB.
- Provider/import spenti.
- Apify spento.
- TheStatsAPI non chiamato.
- Production non toccata.

Prossimo passo: verificare manualmente nel provider API-Football la causa del `403` e non riprovare senza nuova conferma esplicita.

## D.16-C3-R2 — Readiness retry 403 API-Football

Stato: completata localmente come analisi/preparazione, senza seconda real-call.

Creato:

- `docs/api_football_403_retry_readiness_d16c3r2.md`.

Risultati:

- probe API-Football default ancora disabled;
- `requests_executed=0` nella verifica disabled;
- audit script locale completato;
- base URL/header/endpoint/parametri documentati;
- possibili cause `403` documentate;
- checklist manuale R2 preparata;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- provider/import spenti;
- Apify spento;
- TheStatsAPI non chiamato;
- Production non toccata.

## D.16-C3-R2 manual check — Dashboard API-Football

Stato: completata come checklist manuale, senza fetch.

Creato:

- `docs/api_football_dashboard_manual_check_d16c3r2.md`.

Verifiche:

- branch `preview`;
- working tree pulito prima delle modifiche;
- probe API-Football gated disabled;
- audit provider ok;
- writer guards ok;
- audit statico script confermato.

La checklist manuale copre account, piano Free, API Football v3, key, restrizioni IP/domain, endpoint/header/parametri e scelta futura `season=2026` vs `season=2025`.

Nessuna seconda real-call, nessuna fetch provider, nessun DB write, provider/import spenti, Apify spento, TheStatsAPI non chiamato, Production non toccata.

## D.17-A — Pivot provider verso TheStatsAPI

Stato: completato localmente come preparazione, senza real-call.

Creato:

- `docs/thestatsapi_provider_pivot_d17a.md`.

Aggiornato:

- `.env.example` con placeholder TheStatsAPI non segreti.

Decisione:

- API-Football sospeso per ora dopo HTTP `403`;
- nessun retry API-Football previsto;
- TheStatsAPI scelto per prossimi test provider;
- API-Football resta fallback futuro;
- Apify resta separato e spento.

Conferme:

- nessuna real-call TheStatsAPI;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- provider/import spenti;
- Production non toccata.

## D.17-E/F — TheStatsAPI real probe controllata

Stato: completata con stop sicuro.

Risultato:

- `requests_executed=1`;
- endpoint 1 `/football/competitions`: HTTP `404`;
- top-level keys: `error`;
- competitions count: `0`;
- endpoint 2 standings Serie A: non eseguito;
- `mapping_theoretical_possible=false`;
- `missing_fields=standings_rows_or_expected_fields_not_detected`;
- `useful_fields=unknown_until_successful_standings_payload`.

Conferme:

- nessun retry;
- nessun loop;
- nessuna paginazione;
- nessuna response completa salvata;
- nessun token stampato;
- nessuna scrittura DB;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- Production non toccata.

Prossimo step consigliato: D.17-G — individuare endpoint TheStatsAPI corretto da dashboard/documentazione, senza nuova real-call finché non confermato.

## D.17-G — Debug endpoint 404 TheStatsAPI

Stato: completato senza nuove real-call.

Risultato audit:

- la composizione URL precedente poteva perdere `/api`;
- `competitions_url_shape` corretta: `https://api.thestatsapi.com/api/football/competitions`;
- `standings_url_shape` corretta: `https://api.thestatsapi.com/api/football/competitions/comp_5840/seasons/sn_6199313/standings`;
- `possible_double_api=false`;
- `possible_double_slash=false`.

Script aggiornato:

- `joinUrl()` normalizza base URL e path;
- output disabled mostra URL shape sanificate;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB.

Prossimo step consigliato: D.17-H — retry singolo su `/football/competitions`, solo dopo conferma esplicita.

## D.17-H — Retry singolo TheStatsAPI competitions

Stato: completato con stop sicuro.

Risultato:

- endpoint: `GET /football/competitions`;
- URL shape: `https://api.thestatsapi.com/api/football/competitions`;
- `requests_executed=1`;
- `http_status=403`;
- `api_errors_count=3`;
- `response_top_level_keys=error`;
- `items_count=0`;
- standings non eseguito;
- nessun retry;
- nessuna scrittura DB;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- Production non toccata.

Prossimo step consigliato: debug auth/account/endpoint TheStatsAPI senza retry automatico.

## D.17-J — Debug 403 TheStatsAPI senza retry

Stato: completato localmente.

Risultato:

- nessuna nuova real-call;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- audit statico script completato;
- auth candidate documentata;
- endpoint/path candidati documentati;
- possibili cause `403` documentate;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- Production non toccata.

Prossimo step consigliato: verifica manuale dashboard/documentazione TheStatsAPI prima di qualsiasi retry.

## D.17-K — Verifica manuale/documentale TheStatsAPI

Stato: completata localmente senza API call.

Risultato:

- nessuna real-call;
- nessuna fetch provider endpoint;
- nessun token letto/stampato;
- auth Bearer confermata da docs pubbliche;
- path competitions confermato da docs pubbliche;
- path standings confermato da docs pubbliche;
- base URL da chiarire: `api.thestatsapi.com/api` vs `stats-api.com/api/v1`;
- dashboard/account/piano/key non verificati;
- provider/import spenti;
- Production non toccata.

Prossimo step consigliato: preparare supporto base URL `stats-api.com/api/v1` in modalità disabled, senza real-call.

## D.17-L — Supporto disabled Stats API v1

Stato: completato localmente.

Risultato:

- target `competitions_v1` aggiunto allo script gated;
- base URL alternativa: `https://stats-api.com/api/v1`;
- URL shape: `https://stats-api.com/api/v1/football/competitions?limit=10`;
- probe default ancora disabled;
- `external_fetch=false`;
- `token_read=false`;
- `requests_executed=0`;
- provider/import spenti;
- Production non toccata.

Prossimo step: eventuale D.17-M retry singolo solo con conferma esplicita.

## D.17-M/N/Z — Chiusura completa Punto 17

Stato: completato.

Risultato finale:

- target finale: `competitions_v1`;
- richieste reali finali: `1`;
- HTTP status: `403`;
- top-level keys: `error`;
- items count: `0`;
- mapping teorico: `false`;
- standings non eseguito;
- nessun retry;
- nessuna seconda richiesta;
- nessuna scrittura DB;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- Production non toccata.

Decisione finale: TheStatsAPI/Stats API sospeso finché account/key/piano/base URL non vengono chiariti.

## Punto 18 — Provider fallback + manual/mock data mode

Stato: completato localmente.

Decisione:

- TheStatsAPI / Stats API sospeso;
- API-Football sospeso/no retry;
- Apify spento;
- provider/import reali spenti;
- `realWritesEnabled=false`;
- dati manuali/mock come fallback operativo.

Aggiunto:

- matrice stato provider;
- modalità manual/mock esplicita;
- fixture locali versionate;
- dry-run locale `npm run dry-run:manual-fixtures`;
- checklist futura prima di qualunque provider reale;
- chiusura documentale Punto 18.

Conferme:

- nessuna real-call;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessun `service_role`;
- nessun deploy;
- Production non toccata.

## Punto 19 — Manual Data Admin + Fixture Preview

Stato: completato localmente.

Aggiunto:

- `lib/provider/manualFixtures.ts`;
- preview read-only in `/admin/imports`;
- documentazione `docs/manual_fixture_preview_p19.md`;
- chiusura `docs/provider_point_19_closure.md`.

La preview mostra:

- provider reali sospesi/off;
- manual/mock active/safe;
- summary fixture;
- tabelle competitions/teams/standings locali;
- validazione campi e riferimenti;
- `mapping_theoretical_possible`.

Conferme:

- nessun provider chiamato;
- nessuna fetch provider;
- nessuna scrittura DB;
- nessuna action di import;
- nessun bottone import/run/sync/save/delete;
- Production non toccata.

## Punto 20 — Manual Import Staging Plan

Stato: completato localmente.

Aggiunto:

- `docs/manual_import_approval_definition_p20.md`;
- `docs/manual_import_mapping_plan_p20.md`;
- `scripts/provider/manualImportPlanDryRun.ts`;
- `docs/manual_import_audit_rollback_plan_p20.md`;
- `docs/manual_import_preflight_checklist_p20.md`;
- `docs/provider_point_20_closure.md`.

Comando:

- `npm run dry-run:manual-import-plan`.

Conferme:

- nessun import reale;
- nessuna scrittura DB;
- nessun SQL eseguibile generato;
- nessun provider reale;
- nessun Apify;
- nessun `service_role`;
- Production non toccata.

## Punto 21 — Staging Manual Import Readiness

Stato: completato localmente.

Aggiunto:

- `docs/manual_import_schema_target_review_p21.md`;
- `scripts/provider/manualImportReadinessDryRun.ts`;
- `docs/manual_import_collision_strategy_p21.md`;
- `docs/manual_import_batch_rollback_preview_p21.md`;
- `docs/provider_point_21_closure.md`;
- sezione admin read-only “Staging manual import readiness”.

Comando:

- `npm run dry-run:manual-import-readiness`.

Conferme:

- batch plan simulato;
- batch executable=false;
- nessun SQL eseguibile;
- nessuna scrittura DB;
- nessun provider reale;
- nessun Apify;
- nessun deploy;
- Production non toccata.

## Punto 24 — Local Schema Deep Review

Stato: completato localmente.

Creati:

- `docs/manual_import_local_schema_source_inventory_p24.md`;
- `docs/manual_import_field_by_field_matrix_p24.md`;
- `docs/manual_import_needs_review_classifier_p24.md`;
- `docs/manual_import_point_25_decision_p24.md`;
- `docs/provider_point_24_closure.md`.

Aggiornati:

- `scripts/provider/manualSchemaConfirmationDryRun.ts`;
- `scripts/provider/manualImportReadinessDryRun.ts`;
- `/admin/imports` con sezione read-only “Local schema deep review”.

Risultato:

- competitions/teams/standings restano `needs_review`;
- `ready_areas_count=0`;
- `needs_review_areas_count=3`;
- `blocked_areas_count=0`;
- `ready_fields_count=12`;
- `needs_review_fields_count=6`;
- `blocked_fields_count=0`;
- `migration_recommended=false`;
- `db_read_only_check_recommended=true`;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 25-A — DB read-only schema/data lookup check, ancora no-write.

## Punto 25 — DB Read-Only Schema/Data Lookup Check

Stato: completato localmente con client Supabase anon/pubblico.

Aggiunti:

- `scripts/provider/manualDbReadOnlySchemaCheck.ts`;
- script npm `dry-run:manual-db-schema-check`;
- `docs/manual_import_db_read_only_schema_check_p25.md`;
- `docs/manual_import_point_26_decision_p25.md`;
- `docs/provider_point_25_closure.md`;
- sezione admin read-only “DB read-only schema check”.

Risultato:

- `db_read=true`;
- `db_write=false`;
- `service_role_used=false`;
- `token_printed=false`;
- `db_confirmed_tables_count=0`;
- `db_confirmed_columns_count=0`;
- `missing_columns_count=0`;
- `fixture_competition_lookup_matches=0`;
- `fixture_team_lookup_matches=0`;
- `final_ready_areas_count=0`;
- `final_needs_review_areas_count=0`;
- `final_blocked_areas_count=3`;
- `next_write_allowed=false`.

Interpretazione:

- il check non ha confermato schema/dati target via client anon/pubblico;
- non è autorizzata alcuna write staging;
- Punto 26 consigliato: investigazione read-only accesso/schema Supabase staging.

## Punto 26 — Supabase Read-Only Access Investigation

Stato: completato.

Aggiunti:

- `docs/supabase_read_only_access_root_cause_p26.md`;
- `docs/supabase_read_only_routes_inventory_p26.md`;
- `docs/supabase_future_read_only_view_plan_p26.md`;
- `docs/manual_import_point_27_decision_p26.md`;
- `docs/provider_point_26_closure.md`;
- sezione admin read-only “Supabase read-only access investigation”.

Aggiornati:

- `scripts/provider/manualDbReadOnlySchemaCheck.ts`;
- `scripts/provider/manualSchemaConfirmationDryRun.ts`;
- `scripts/provider/manualImportReadinessDryRun.ts`.

Risultato:

- direct table lookup result: `unknown`;
- public view lookup result: `unknown`;
- admin view lookup result: `not_attempted`;
- likely blocker: `rls_or_missing_view_or_wrong_table_name_or_insufficient_anon_access`;
- requires read-only view: `true`;
- requires service role: `false`;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 27-A, proposta no-write di view read-only dedicate, non applicata.

## Punto 27 — Read-Only View Proposal

Stato: completato in modalità documentale/no-write.

Aggiunti:

- `docs/manual_import_read_only_view_requirements_p27.md`;
- `docs/manual_import_read_only_view_field_mapping_p27.md`;
- `docs/manual_import_read_only_view_pseudo_sql_p27.md`;
- `docs/manual_import_point_28_decision_p27.md`;
- `docs/provider_point_27_closure.md`;
- sezione `/admin/imports` “Read-only view proposal”.

Risultato:

- proposte tre view lookup future per competitions, teams e standings;
- pseudo-SQL marcato `PSEUDO_SQL_NOT_EXECUTABLE / DO NOT RUN / DOCUMENTATION ONLY`;
- nessuna migrazione preparata o applicata;
- nessuna scrittura DB;
- nessun service role;
- provider/import/Apify spenti;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 28, scelta esplicita tra migrazione non applicata per view read-only oppure controlli manuali `SELECT` da SQL Editor staging.

## Punto 28 — Read-Only View Migration Proposal

Stato: completato in modalità no-apply/no-write.

Aggiunti:

- `docs/migration_proposals/manual_import_read_only_views_p28.sql.md`;
- `docs/manual_import_point_29_decision_p28.md`;
- `docs/provider_point_28_closure.md`.

Aggiornati:

- dry-run manual schema/readiness;
- sezione `/admin/imports` “Read-only view proposal”;
- documentazione Punto 27 e readiness generale.

Risultato:

- migration proposal documentale creata fuori da `supabase/migrations`;
- proposta view read-only per competitions, teams e standings;
- ogni blocco marcato `MIGRATION_PROPOSAL_ONLY / DO NOT APPLY / DO NOT RUN / NOT REVIEWED FOR EXECUTION / NO DB WRITE AUTHORIZED`;
- nessuna migrazione reale creata o applicata;
- nessun `db push/reset`;
- nessuna scrittura DB;
- `next_write_allowed=false`;
- Punto 29/write staging non autorizzato.

## Punto 29 — Manual review migration proposal read-only

Stato: completato in modalità no-apply/no-write.

Aggiunti:

- `docs/manual_import_migration_proposal_placeholder_review_p29.md`;
- `docs/manual_import_migration_candidate_sources_p29.md`;
- `docs/manual_import_future_migration_draft_checklist_p29.md`;
- `docs/manual_import_point_30_decision_p29.md`;
- `docs/provider_point_29_closure.md`.

Aggiornati:

- `docs/migration_proposals/manual_import_read_only_views_p28.sql.md`;
- dry-run manual schema/readiness/read-only schema check;
- `/admin/imports` con sezione “Migration proposal review”.

Risultato:

- proposal reviewed: `true`;
- proposal hardened: `true`;
- executable migration created: `false`;
- migration file created: `false`;
- migration applied: `false`;
- placeholders remaining count: `9`;
- dashboard confirmation required: `true`;
- future migration draft allowed: `false`;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 30-B dashboard confirmation manuale no-write. Punto 30/write staging non autorizzato.

## Punto 30-B — Dashboard confirmation manuale no-write

Stato: preparazione documentale completata; verifica dashboard reale dichiarata dall'utente senza valori schema risolutivi.

Aggiunti:

- `docs/manual_import_dashboard_confirmation_p30b.md`;
- `docs/manual_import_point_30c_or_31_decision_p30b.md`;
- `docs/provider_point_30b_closure.md`.

Aggiornati:

- proposal read-only P28;
- docs P29;
- dry-run outputs;
- `/admin/imports` con sezione “Dashboard confirmation”.

Risultato:

- dashboard confirmation completed: `true`;
- SQL executed: `false`;
- DB write: `false`;
- service_role used: `false`;
- placeholders resolved: `0`;
- placeholders unclear: `16`;
- read-only view still required: `true`;
- ready for migration draft: `false`;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 30-C completare dashboard confirmation con valori reali, oppure restare in manual/mock mode. Punto 31 migration draft non è ancora consigliato.

## Punto 30-C — Manual schema values collection

Stato: completato in modalità no-write/no-provider.

Aggiunti:

- `docs/manual_import_schema_values_collection_p30c.md`;
- `docs/manual_import_dashboard_user_checklist_p30c.md`;
- `docs/manual_import_placeholder_status_p30c.md`;
- `docs/manual_import_point_30d_decision_p30c.md`;
- `docs/provider_point_30c_closure.md`.

Aggiornati:

- docs P28/P29/P30-B;
- dry-run manual schema/readiness/read-only schema check;
- `/admin/imports` con sezione “Manual schema values collection”.

Risultato:

- collection prepared: `true`;
- real schema values provided: `false`;
- placeholders resolved: `0`;
- placeholders uncollected: `16`;
- ready for migration draft: `false`;
- no migration `.sql` created;
- no `supabase/migrations` changes;
- no DB write;
- no provider/fetch/Apify;
- Production untouched;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 30-D solo se l'utente fornisce valori reali; altrimenti restare in manual/mock mode.

## Punto 30-D — Local migration schema extraction

Stato: completato in modalità no-write/no-provider.

Aggiunti:

- `docs/manual_import_local_schema_extraction_p30d.md`;
- `docs/manual_import_placeholder_resolution_p30d.md`;
- `docs/manual_import_point_31_decision_p30d.md`;
- `docs/provider_point_30d_closure.md`.

Aggiornati:

- docs P28/P29/P30-C;
- dry-run manual schema/readiness/read-only schema check;
- `/admin/imports` con sezione “Local schema extraction”.

Risultato:

- local schema extraction completed: `true`;
- Supabase Dashboard used: `false`;
- DB query executed: `false`;
- DB write: `false`;
- service_role used: `false`;
- placeholders resolved from local files: `16`;
- placeholders unresolved: `0`;
- placeholders unclear: `0`;
- ready for migration draft: `true`;
- no migration `.sql` created;
- no `supabase/migrations` changes;
- no DB write;
- no provider/fetch/Apify;
- Production untouched;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 31 migration draft non applicata/no-apply, solo su conferma utente.

## Punto 31 — Migration draft no-apply

Stato: completato in modalità no-apply/no-write.

Aggiunti:

- `docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`;
- `docs/manual_import_migration_draft_review_p31.md`;
- `docs/manual_import_point_32_decision_p31.md`;
- `docs/provider_point_31_closure.md`.

Aggiornati:

- docs P28/P29/P30/P31;
- dry-run manual schema/readiness/read-only schema check;
- `/admin/imports` con sezione “Migration draft”.

Risultato:

- migration draft created: `true`;
- draft fuori da `supabase/migrations`;
- migration applied: `false`;
- db push/reset: `false`;
- DB write: `false`;
- service role used: `false`;
- executable for apply: `false`;
- requires manual review: `true`;
- requires explicit authorization: `true`;
- ready for apply: `false`;
- provider/fetch/Apify: off;
- Production untouched;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 32 review manuale no-apply della draft.

## Punto 32 — Review manuale no-apply della migration draft

Stato: completato in modalità no-apply/no-write.

Aggiunti:

- `docs/manual_import_migration_draft_review_p32.md`;
- `docs/manual_import_point_33_decision_p32.md`;
- `docs/provider_point_32_closure.md`.

Aggiornati:

- draft P31 hardenata;
- docs P31/P30-D;
- dry-run manual schema/readiness/read-only schema check;
- `/admin/imports` con sezione “Migration draft review”.

Risultato:

- migration draft reviewed: `true`;
- draft hardened: `true`;
- blocking issues: `0`;
- needs review: `3`;
- ready for staging apply candidate: `true`;
- ready for apply: `false`;
- migration applied: `false`;
- db push/reset: `false`;
- DB write: `false`;
- service role used: `false`;
- provider/fetch/Apify: off;
- Production untouched;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 33 staging apply plan no-apply, non apply diretto.

## Punto 33 — Staging apply plan no-apply

Stato: completato in modalità piano/no-apply/no-write.

Aggiunti:

- `docs/manual_import_staging_apply_plan_p33.md`;
- `docs/manual_import_staging_backup_checklist_p33.md`;
- `docs/manual_import_staging_rollback_checklist_p33.md`;
- `docs/manual_import_staging_pre_apply_checklist_p33.md`;
- `docs/manual_import_staging_post_apply_verification_p33.md`;
- `docs/manual_import_point_34_decision_p33.md`;
- `docs/provider_point_33_closure.md`.

Aggiornati:

- dry-run manual schema/readiness/read-only schema check;
- `/admin/imports` con sezione read-only “Staging apply plan”;
- documentazione provider/manual import/readiness.

Risultato:

- staging apply plan created: `true`;
- backup checklist created: `true`;
- rollback checklist created: `true`;
- pre-apply checklist created: `true`;
- post-apply verification plan created: `true`;
- migration draft path: `docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`;
- draft fuori da `supabase/migrations`;
- nessuna modifica in `supabase/migrations`;
- migration applied: `false`;
- db push/reset: `false`;
- DB write: `false`;
- service role used: `false`;
- ready for apply: `false`;
- provider/fetch/Apify: off;
- Production untouched;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 34 final pre-apply authorization gate no-write.

## Punto 34 — Final pre-apply authorization gate no-write

Stato: completato in modalità gate documentale/no-write.

Aggiunti:

- `docs/manual_import_final_pre_apply_gate_p34.md`;
- `docs/manual_import_apply_authorization_language_p34.md`;
- `docs/manual_import_no_apply_safety_lock_p34.md`;
- `docs/manual_import_point_35_readiness_criteria_p34.md`;
- `docs/manual_import_point_35_decision_p34.md`;
- `docs/provider_point_34_closure.md`.

Aggiornati:

- dry-run manual schema/readiness/read-only schema check;
- `/admin/imports` con sezione read-only “Final pre-apply gate”;
- documentazione P33/P32/provider/readiness.

Risultato:

- final pre-apply gate created: `true`;
- authorization language defined: `true`;
- no-apply safety lock created: `true`;
- point 35 readiness criteria created: `true`;
- explicit user authorization received: `false`;
- point 35 blocked without explicit authorization: `true`;
- migration draft path: `docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`;
- draft fuori da `supabase/migrations`;
- nessuna modifica in `supabase/migrations`;
- migration applied: `false`;
- db push/reset: `false`;
- DB write: `false`;
- service role used: `false`;
- ready for apply: `false`;
- provider/fetch/Apify: off;
- Production untouched;
- `next_write_allowed=false`.

Decisione: default no-apply mode. Punto 35 può partire solo con autorizzazione esplicita secondo frase definita; conferme generiche non bastano.

## Punto 35 — Staging apply reale controllato delle view read-only

Stato: completato con apply bloccato in sicurezza.

Autorizzazione esplicita ricevuta:

- `point_35_explicit_authorization_received=true`.

Risultato:

- staging target confirmed: `true`;
- production excluded: `true`;
- real migration created: `true`;
- real migration path: `supabase/migrations/20260922120000_manual_import_read_only_views.sql`;
- migration applied: `false`;
- db write: `false`;
- db write scope: `none`;
- db push/reset: `false`;
- service role used: `false`;
- provider/import enabled: `false`;
- Apify enabled: `false`;
- views expected count: `3`;
- views verified count: `0`;
- post-apply verification passed: `false`;
- Production touched: `false`;
- `next_write_allowed=false`.

Motivo blocco: le regole del Punto 35 vietano `db push/reset` e non è disponibile un canale alternativo sicuro senza credenziali/prompt ambigui. Nessuna scrittura DB è stata eseguita.

Prossimo step consigliato: Punto 36-Fix/canale apply controllato oppure apply manuale staging separato, senza provider/import e senza Production.

## Punto 36-B — Manual apply result documentation

Stato: apply manuale SQL Editor documentato come riuscito; verifica metadata/colonne completata nel Punto 37.

Risultato:

- explicit authorization received: `true`;
- apply channel: `manual_sql_editor`;
- migration file: `supabase/migrations/20260922120000_manual_import_read_only_views.sql`;
- staging target confirmed in dashboard: `true`;
- production excluded: `true`;
- migration applied: `true`;
- db write: `true`;
- db write scope: `schema_read_only_views_only`;
- db push/reset: `false`;
- service role used: `false`;
- provider/import enabled: `false`;
- Apify enabled: `false`;
- views expected count: `3`;
- views verified count: `3`;
- competitions view status: `verified`;
- teams view status: `verified`;
- standings view status: `verified`;
- column check status: `pass`;
- post apply verification passed: `true`;
- rollback needed: `false`;
- Production touched: `false`;
- `next_write_allowed=false`.

Risultato SQL Editor: `Success. No rows returned`.

Follow-up completato nel Punto 37: verifica read-only metadata/colonne delle 3 view passata.

## Punto 37 — Read-only view/column verification

Stato: completato.

La query read-only su `information_schema.columns`, eseguita manualmente nel Supabase SQL Editor staging “Regista Avanzato”, ha confermato le colonne delle 3 view manual import.

Risultato:

- metadata_verification_completed: `true`;
- query_read_only: `true`;
- db_write: `false`;
- service_role_used: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- views_expected_count: `3`;
- views_verified_count: `3`;
- competitions_view_status: `verified`;
- teams_view_status: `verified`;
- standings_view_status: `verified`;
- column_check_status: `pass`;
- post_apply_verification_passed: `true`;
- `next_write_allowed=false`.

Non sono stati letti dati applicativi, non sono stati attivati provider/import e Production non è stata toccata.

Prossimo step consigliato: Punto 38 — verifica integrazione app/admin read-only, senza provider/import e senza abilitare scritture.

## Punto 38 — App/Admin read-only integration check

Stato: completato.

`/admin/imports` è stato verificato come dashboard read-only coerente con le view manual import applicate e verificate.

Risultato:

- admin_read_only_integration_checked: `true`;
- admin_imports_read_only: `true`;
- migration_applied: `true`;
- metadata_verification_completed: `true`;
- views_expected_count: `3`;
- views_verified_count: `3`;
- competitions_view_status: `verified`;
- teams_view_status: `verified`;
- standings_view_status: `verified`;
- post_apply_verification_passed: `true`;
- db_write: `false`;
- service_role_used: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- `next_write_allowed=false`.

Nessun bottone Run/Import/Execute/Sync/Save to DB è stato aggiunto. Nessuna Server Action write, fetch provider, deploy o Production.

Prossimo step consigliato: Punto 39 — manual fixture/read-only import preview contro le view verificate, senza provider/import e senza DB write.

## Punto 39 — Manual fixture/read-only import preview

Stato: completato.

La preview è stata eseguita in modalità `local_only_unresolved`: fixture locali caricate, view verificate disponibili, nessun lookup DB live eseguito nel Punto 39.

Risultato:

- manual_import_preview_completed: `true`;
- preview_mode: `local_only_unresolved`;
- provider_fetch: `false`;
- external_fetch: `false`;
- db_write: `false`;
- service_role_used: `false`;
- import_real_execution: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- fixtures_loaded: `true`;
- competitions_fixture_count: `1`;
- teams_fixture_count: `2`;
- standings_fixture_count: `2`;
- views_verified_count: `3`;
- view_lookup_executed: `false`;
- create_count: `0`;
- update_count: `0`;
- skip_count: `0`;
- conflict_count: `0`;
- unresolved_count: `5`;
- `next_write_allowed=false`.

Decisione: non procedere a write plan. Prossimo step consigliato: Punto 40-Fix per risolvere fixture/mapping preview in modalità read-only.

## Punto 40-Fix — Read-only live view lookup

Stato: preparato, pending esecuzione manuale.

È stata preparata una query read-only per lookup live contro le view manual import verificate:

- `supabase/manual/manual_import_preview_lookup_p40fix.sql`

Risultato attuale:

- read_only_live_view_lookup_prepared: `true`;
- manual_sql_execution_required: `true`;
- query_read_only: `true`;
- query_executed: `pending`;
- provider_fetch: `false`;
- external_fetch: `false`;
- db_write: `false`;
- service_role_used: `false`;
- import_real_execution: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- fixtures_loaded: `true`;
- views_verified_count: `3`;
- view_lookup_executed: `false`;
- preview_mode: `read_only_lookup_pending`;
- create_count: `0`;
- update_count: `0`;
- skip_count: `0`;
- conflict_count: `0`;
- unresolved_count: `5`;
- `next_write_allowed=false`.

Prossimo step: esecuzione manuale SQL Editor staging e fornitura risultato minimo. Nessun write plan finché `unresolved_count > 0`.

## Punto 40-Fix-B — Read-only live lookup resolved

Stato: completato.

L’utente ha eseguito manualmente in Supabase SQL Editor staging la query read-only:

- `supabase/manual/manual_import_preview_lookup_p40fix.sql`

Risultato:

- query_result: `success_no_rows_returned`;
- read_only_live_view_lookup_executed: `true`;
- query_read_only: `true`;
- db_write: `false`;
- service_role_used: `false`;
- provider_fetch: `false`;
- external_fetch: `false`;
- import_real_execution: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- views_verified_count: `3`;
- view_lookup_executed: `true`;
- live_lookup_rows_count: `0`;
- existing_competitions_rows: `0`;
- existing_teams_rows: `0`;
- existing_standings_rows: `0`;
- preview_mode: `read_only_lookup_completed`;
- create_count: `5`;
- update_count: `0`;
- skip_count: `0`;
- conflict_count: `0`;
- unresolved_count: `0`;
- `next_write_allowed=false`.

Decisione: Punto 40-B può essere preparato come manual import write plan no-apply, ancora senza DB write/provider/import.

## Punto 40-B — Manual import write plan no-apply

Stato: completato.

Creati:

- `docs/manual_import_write_plan_p40b.md`;
- `docs/manual_import_fixture_mapping_p40b.md`;
- `docs/manual_import_write_sql_plan_p40b.md`;
- `docs/manual_import_write_rollback_plan_p40b.md`;
- `docs/manual_import_write_post_verification_plan_p40b.md`;
- `docs/manual_import_point_41_decision_p40b.md`;
- `docs/provider_point_40b_closure.md`.

Risultato:

- write_plan_created: `true`;
- write_plan_mode: `no_apply`;
- create_candidates_count: `5`;
- update_candidates_count: `0`;
- skip_candidates_count: `0`;
- conflict_count: `0`;
- unresolved_count: `0`;
- proposed_write_order: `competitions,teams,standings`;
- rollback_plan_created: `true`;
- post_write_verification_plan_created: `true`;
- db_write: `false`;
- service_role_used: `false`;
- provider_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- `next_write_allowed=false`.

Prossimo step consigliato: Punto 41 — final authorization gate for manual fixture write, ancora no-write.

## Punto 42-B — Apply manual fixture write in staging completato

Stato: completato.

Autorizzazione utente ricevuta per scrittura manuale delle 5 fixture solo in Supabase staging. L’utente ha eseguito manualmente `supabase/manual/manual_import_fixture_write_p42.sql` in Supabase SQL Editor staging con esito `Success. No rows returned`.

File creati:

- `supabase/manual/manual_import_fixture_write_p42.sql`;
- `supabase/manual/manual_import_fixture_rollback_p42.sql`;
- `supabase/manual/manual_import_fixture_post_verify_p42.sql`;
- `docs/manual_import_fixture_write_apply_result_p42.md`.

Risultato operativo:

- point_42_authorized: `true`;
- write_sql_prepared: `true`;
- rollback_sql_prepared: `true`;
- post_verify_sql_prepared: `true`;
- manual_fixture_write_executed: `true`;
- execution_channel: `manual_sql_editor_staging`;
- db_write: `true`;
- written_competitions_count: `1`;
- written_teams_count: `2`;
- written_standings_count: `2`;
- total_written_rows: `5`;
- post_write_verification_executed: `true`;
- post_write_verification_passed: `true`;
- rollback_executed: `false`;
- provider_fetch: `false`;
- external_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- deploy_executed: `false`;
- service_role_used: `false`.

Rollback non eseguito perché la verifica è passata. Prossimo step consigliato: Punto 43 — read-only UI/admin verification after manual fixture write.

## Punto 43 — Read-only UI/admin verification after manual fixture write

Stato: completato.

File principali:

- `supabase/manual/manual_import_fixture_ui_verify_p43.sql`;
- `docs/manual_import_ui_admin_verification_p43.md`;
- `docs/manual_import_point_44_decision_p43.md`;
- `docs/provider_point_43_closure.md`;
- `app/admin/imports/page.tsx`.

Risultato:

- point_43_ui_admin_read_only_verification_completed: `true`;
- ui_admin_verification_mode: `read_only`;
- manual_fixture_write_executed: `true`;
- written_competitions_count: `1`;
- written_teams_count: `2`;
- written_standings_count: `2`;
- total_written_rows: `5`;
- post_write_verification_passed: `true`;
- rollback_executed: `false`;
- point_43_db_write: `false`;
- provider_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- deploy_executed: `false`;
- service_role_used: `false`.

Prossimo step consigliato: Punto 44 — read-only public/admin data consumption plan.

## Punto 44 — Read-only data consumption plan for manual fixtures

Stato: completato.

File principali:

- `docs/manual_data_consumption_plan_p44.md`;
- `docs/manual_data_readers_plan_p44.md`;
- `docs/manual_data_routes_plan_p44.md`;
- `docs/manual_import_point_45_decision_p44.md`;
- `docs/provider_point_44_closure.md`;
- `app/admin/imports/page.tsx`.

Risultato:

- point_44_manual_data_consumption_plan_created: `true`;
- data_consumption_mode: `read_only_plan`;
- available_competitions_count: `1`;
- available_teams_count: `2`;
- available_standings_count: `2`;
- admin_consumption_planned: `true`;
- public_consumption_planned: `true`;
- public_exposure_enabled: `false`;
- current_visibility: `private_admin`;
- point_44_db_write: `false`;
- provider_fetch: `false`;
- external_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- deploy_executed: `false`;
- service_role_used: `false`.

Prossimo step consigliato: Punto 45 — implement admin read-only data surface for manual competitions.

## Punto 45 — Implement admin read-only data surface for manual competitions

Stato: completato.

File principali:

- `lib/manual-data/readers.ts`;
- `app/admin/data/page.tsx`;
- `app/admin/data/competitions/page.tsx`;
- `app/admin/data/competitions/[slug]/page.tsx`;
- `app/admin/imports/page.tsx`;
- `docs/manual_data_admin_surface_p45.md`;
- `docs/manual_import_point_46_decision_p45.md`;
- `docs/provider_point_45_closure.md`.

Risultato:

- point_45_admin_read_only_surface_implemented: `true`;
- admin_manual_competitions_route_created: `true`;
- admin_manual_competition_detail_route_created: `true`;
- admin_imports_link_created: `true`;
- readers_created_or_updated: `true`;
- displayed_competitions_count_expected: `1`;
- displayed_teams_count_expected: `2`;
- displayed_standings_count_expected: `2`;
- public_exposure_enabled: `false`;
- current_visibility: `private_admin`;
- point_45_db_write: `false`;
- provider_fetch: `false`;
- external_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- deploy_executed: `false`;
- service_role_used: `false`.

Prossimo step consigliato: Punto 46 — read-only admin surface verification with manual fixture data.

## Punto 46-B — Browser/admin real session verification

Stato: pending.

File principali:

- `docs/manual_data_admin_browser_verification_p46b.md`;
- `docs/manual_import_point_47_decision_p46.md`;
- `docs/provider_point_46b_closure.md`.

Risultato:

- point_46b_browser_admin_verification_completed: `false`;
- browser_admin_verification_result: `pending_no_admin_session`;
- verification_channel: `unavailable`;
- browser_automation_available: `false`;
- admin_session_available: `false`;
- local_http_auth_redirect_checked: `true`;
- admin_data_route_browser_verified: `false`;
- admin_competitions_route_browser_verified: `false`;
- admin_competition_detail_route_browser_verified: `false`;
- admin_imports_link_browser_verified: `false`;
- point_46b_db_write: `false`;
- provider_fetch: `false`;
- external_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- deploy_executed: `false`;
- service_role_used: `false`;
- public_exposure_enabled: `false`.

Prossimo step consigliato: Punto 46-C — ottenere sessione admin reale e ripetere la verifica browser.
## Punto 46-C — Real admin session browser verification

Punto 46-C ha ritentato la verifica browser/admin real session della superficie admin read-only introdotta nel Punto 45.

Esito reale:

- point_46c_real_admin_session_verification_completed: `false`;
- browser_admin_verification_result: `pending_no_admin_session`;
- verification_channel: `unavailable`;
- admin_session_available: `false`;
- admin_data_route_browser_verified: `false`;
- admin_competitions_route_browser_verified: `false`;
- admin_competition_detail_route_browser_verified: `false`;
- admin_imports_link_browser_verified: `false`;
- browser_displayed_competitions_count: `0`;
- browser_displayed_teams_count: `0`;
- browser_displayed_standings_count: `0`.

Non è stata inventata una verifica positiva. Il canale browser `agent-browser` non è disponibile nel PATH locale e non è disponibile una sessione admin reale da riusare.

Sicurezza:

- db_write nel Punto 46-C: `false`;
- provider_fetch: `false`;
- external_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- deploy_executed: `false`;
- production_touched: `false`;
- service_role_used: `false`;
- public_exposure_enabled: `false`;
- current_visibility: `private_admin`.

Prossimo step consigliato: Punto 46-Fix / 46-D per predisporre un canale browser/admin session verificabile e ripetere la verifica read-only.

## Punto 46-D — Prepare verifiable real admin session channel

Punto 46-D ha risolto il blocco operativo preparando un canale verificabile, senza eseguire login o acquisire segreti.

Audit auth/admin:

- `/login` usa `loginAction` con Supabase Auth server-side;
- `/admin/*` passa da `requireAdmin()` nel layout admin;
- `requireAdmin()` richiede utente Supabase autenticato;
- profilo `users_profile` deve avere `status=approved`;
- ruoli ammessi: `editor`, `admin`, `super_admin`;
- il client server usa anon key pubblica e cookie di sessione utente, non service role.

Decisione:

- point_46d_admin_session_channel_prepared: `true`;
- admin_session_channel_status: `manual_user_browser_session`;
- recommended_verification_channel: `manual_user_browser_session`;
- browser_admin_verification_result: `pending_admin_session_channel`;
- admin_session_available: `false`.

Sicurezza:

- user_created: `false`;
- role_modified: `false`;
- rls_modified: `false`;
- db_write: `false`;
- provider_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- deploy_executed: `false`;
- production_touched: `false`;
- public_exposure_enabled: `false`;
- current_visibility: `private_admin`.

Prossimo step consigliato: Punto 46-E — user-guided admin browser verification.

## Punto 46-E — Direct assistant admin browser verification attempt

Punto 46-E ha tentato la verifica diretta dall’assistente della superficie admin read-only.

Esito reale:

- point_46e_user_guided_admin_browser_verification_completed: `false`;
- browser_admin_verification_result: `pending_no_admin_session`;
- admin_session_available: `false`;
- admin_data_route_browser_verified: `false`;
- admin_competitions_route_browser_verified: `false`;
- admin_competition_detail_route_browser_verified: `false`;
- admin_imports_link_browser_verified: `false`;
- browser_displayed_competitions_count: `0`;
- browser_displayed_teams_count: `0`;
- browser_displayed_standings_count: `0`.

Motivo:

- tool browser `agent-browser` non disponibile nel PATH locale;
- nessuna sessione admin reale disponibile all’assistente;
- nessuna password/cookie/token/header auth richiesta o letta.

Sicurezza:

- db_write nel Punto 46-E: `false`;
- provider_fetch: `false`;
- external_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- deploy_executed: `false`;
- production_touched: `false`;
- service_role_used: `false`;
- public_exposure_enabled: `false`;
- current_visibility: `private_admin`.

Prossimo step consigliato: Punto 46-E2 / 46-Fix per rendere disponibile un canale browser autenticato verificabile senza condividere segreti.

## Punto 47 — Admin read-only UX polish plan

Punto 47 ha creato il piano di polish UX per la superficie admin read-only, senza implementare nuove azioni.

Superfici analizzate:

- `/admin/data`;
- `/admin/data/competitions`;
- `/admin/data/competitions/[slug]`;
- link da `/admin/imports`;
- reader `lib/manual-data/readers.ts`.

Esito:

- point_47_admin_read_only_ux_polish_plan_created: `true`;
- admin_ux_polish_mode: `read_only_plan`;
- browser_admin_verification_result: `pending_no_admin_session`;
- public_exposure_enabled: `false`;
- current_visibility: `private_admin`;
- point_47_db_write: `false`;
- provider_fetch: `false`;
- external_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- deploy_executed: `false`;
- service_role_used: `false`.

Migliorie raccomandate per Punto 48:

- breadcrumb admin;
- badge read-only/private_admin più evidenti;
- box provider/import off;
- warning public exposure disabled;
- warning browser verification pending;
- summary cards/counts;
- empty/error state più chiari;
- standings table più leggibile.

Nessuna nuova scrittura DB, nessun provider/import, nessun deploy e nessuna Production.

## Punto 48 — Implement admin read-only UX polish

Completato.

Modifiche implementate:

- `/admin/imports`: aggiunto link diretto `View admin data hub` verso `/admin/data`;
- `/admin/imports`: mantenuto link verso `/admin/data/competitions`;
- `lib/admin/adminRoutes.ts`: aggiunta voce `Manual Data` nel gruppo data;
- documentazione Punto 48 creata;
- dry-run output aggiornati con marker Punto 48.

Safety:

- `point_48_admin_read_only_ux_polish_implemented=true`;
- `admin_imports_data_hub_link_added=true`;
- `admin_imports_competitions_link_present=true`;
- `admin_ux_polish_mode=read_only_ui`;
- `public_exposure_enabled=false`;
- `current_visibility=private_admin`;
- `db_write=false`;
- `provider_fetch=false`;

### Punto 62 — Explicit authorization review for real staging promotion

Completata la review autorizzativa per la futura promotion di `manual-serie-a`, senza applicazione.

- `point_62_public_data_promotion_authorization_review_completed=true`;
- `public_data_promotion_mode=authorization_review_no_write`;
- `promotion_candidate=manual-serie-a`;
- `expected_promotion_competitions_count=1`;
- `expected_promotion_teams_count=2`;
- `expected_promotion_standings_count=2`;
- `explicit_authorization_required=true`;
- `generic_proceed_authorizes_write=false`;
- `promotion_executed=false`;
- `real_sql_executed=false`;
- `point_62_db_write=false`;
- `visibility_changed=false`;
- `provider_fetch=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `production_touched=false`;
- `deploy_executed=false`;
- `service_role_used=false`.

Decisione: un generico “procedi” non autorizza DB write, SQL reale, promotion o cambio visibility. Il prossimo punto può essere P63 final pre-apply no-write checklist, oppure promotion reale solo con autorizzazione esplicita completa.

### Punto 63 — Final pre-apply no-write checklist

Completata la checklist finale no-write prima di una possibile promotion reale di `manual-serie-a`.

- `point_63_public_data_promotion_final_pre_apply_checklist_completed=true`;
- `public_data_promotion_mode=final_pre_apply_no_write`;
- `promotion_candidate=manual-serie-a`;
- `expected_promotion_competitions_count=1`;
- `expected_promotion_teams_count=2`;
- `expected_promotion_standings_count=2`;
- `current_public_competitions_count=0`;
- `current_public_teams_count=0`;
- `current_public_standings_count=0`;
- `current_public_bundle_status=not_found`;
- `public_routes_current_state=empty_not_found`;
- `explicit_authorization_required=true`;
- `generic_proceed_authorizes_write=false`;
- `promotion_executed=false`;
- `real_sql_executed=false`;
- `point_63_db_write=false`;
- `visibility_changed=false`;
- `provider_fetch=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `production_touched=false`;
- `deploy_executed=false`;
- `service_role_used=false`.

Decisione: Punto 63 non autorizza la promotion. Punto 64 richiede una nuova autorizzazione esplicita completa per qualunque DB write.

### Punto 64 — Continue public UI/product polish without promotion

Completato polish UI/prodotto pubblico senza promotion.

- `/competitions` aggiornata con copy editoriale e card statiche sicure;
- `/competitions/[slug]` aggiornata con empty state più chiaro;
- navigazione pubblica aggiornata con link “Competizioni”;
- `point_64_public_ui_product_polish_completed=true`;
- `public_ui_product_polish_mode=no_promotion`;
- `promotion_candidate=manual-serie-a`;
- `current_public_competitions_count=0`;
- `current_public_teams_count=0`;
- `current_public_standings_count=0`;
- `current_public_bundle_status=not_found`;
- `public_routes_current_state=empty_not_found`;
- `explicit_authorization_required=true`;
- `generic_proceed_authorizes_write=false`;
- `promotion_executed=false`;
- `real_sql_executed=false`;
- `point_64_db_write=false`;
- `visibility_changed=false`;
- `provider_fetch=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `production_touched=false`;
- `deploy_executed=false`;
- `service_role_used=false`.

Decisione: Punto 64 migliora il prodotto pubblico ma non autorizza promotion, SQL reale, DB write o cambio visibility.

### Punto 65 — Browser verification after product polish

Completata verifica no-auth locale delle route pubbliche dopo il polish P64.

- `point_65_public_routes_browser_verification_completed=true`;
- `public_routes_browser_verification_mode=no_auth_local_http`;
- `environment=localhost`;
- `production=false`;
- `auth=no-auth`;
- `/competitions` status 200 e state `empty`;
- `/competitions/manual-serie-a` status 200 e state `not_found`;
- `public_competitions_count=0`;
- `public_teams_count=0`;
- `public_standings_count=0`;
- `public_bundle_status=not_found`;
- `serie_a_manual_sample_visible=false`;
- `manual_serie_a_visible=false`;
- `manual_team_one_visible=false`;
- `manual_team_two_visible=false`;
- `public_routes_admin_links_visible=false`;
- `public_routes_debug_payload_visible=false`;
- `public_routes_operational_buttons=false`;
- `private_admin_publicly_exposed=false`;
- `point_65_db_write=false`;
- `visibility_changed=false`;
- `promotion_executed=false`;
- `real_sql_executed=false`;
- `provider_fetch=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `production_touched=false`;
- `deploy_executed=false`;
- `service_role_used=false`.

Decisione: Punto 65 conferma che il polish P64 resta sicuro no-auth e non autorizza promotion o write.
- `external_fetch=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `production_touched=false`;
- `deploy_executed=false`;
- `service_role_used=false`.

Nessun bottone Run/Import/Execute/Sync/Save/Apply è stato aggiunto. Nessuna Server Action write, fetch provider, deploy o Production.

Prossimo step consigliato: Punto 49 — repeat browser admin verification after UX polish.

## Punto 49 — Repeat browser admin verification after UX polish

Tentato.

Esito:

- `point_49_browser_admin_verification_after_polish_completed=false`;
- `browser_admin_verification_result=pending_no_admin_session`;
- `environment=preview-url`;
- `admin_session_available=false`;
- `admin_data_route_verified=false`;
- `admin_competitions_route_verified=false`;
- `admin_competition_detail_route_verified=false`;
- `admin_imports_route_verified=false`;
- `admin_imports_data_hub_link_verified=false`;
- `admin_imports_competitions_link_verified=false`;
- `admin_sidebar_manual_data_verified=false`;
- `browser_displayed_competitions_count=0`;
- `browser_displayed_teams_count=0`;
- `browser_displayed_standings_count=0`;
- `incognito_result=redirect_login_vercel`;
- `public_exposure_enabled=false`;
- `current_visibility=private_admin`;
- `point_49_db_write=false`;
- `provider_fetch=false`;
- `external_fetch=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `production_touched=false`;
- `deploy_executed=false`;
- `service_role_used=false`.

La Preview non autenticata ha mostrato `Login – Vercel`; nessun dato `private_admin` è stato osservato pubblicamente. La verifica admin reale resta da ripetere con sessione admin disponibile.

## Punto 50 — Public exposure policy plan

Completato.

Punto 50 è solo policy/plan:

- `point_50_public_exposure_policy_plan_created=true`;
- `public_exposure_policy_mode=plan_only`;
- `public_exposure_enabled=false`;
- `private_admin_publicly_exposed=false`;
- `visibility_changed=false`;
- `public_routes_enabled=false`;
- `public_readers_implemented=false`;
- `point_50_db_write=false`;
- `provider_fetch=false`;
- `external_fetch=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `production_touched=false`;
- `deploy_executed=false`;
- `service_role_used=false`.

Documenti creati:

- `docs/public_exposure_policy_plan_p50.md`;
- `docs/public_exposure_safety_checklist_p50.md`;
- `docs/manual_import_point_51_decision_p50.md`;
- `docs/provider_point_50_closure.md`.

Nessuna route pubblica operativa è stata aggiunta. Nessun dato `private_admin` è stato esposto pubblicamente.
- Punto 51 completato: Public reader design dry-run.

Output:

- creato `docs/public_reader_design_dry_run_p51.md`;
- definita separazione futura fra admin reader e public reader;
- namespace futuro consigliato: `lib/public-data/readers.ts`;
- API proposta:
  - `getPublicCompetitions()`;
  - `getPublicCompetitionBySlug(slug)`;
  - `getPublicTeamsByCompetitionSlug(slug)`;
  - `getPublicStandingsByCompetitionSlug(slug)`;
- nessun reader pubblico operativo;
- nessuna route pubblica creata o collegata;
- nessun dato `private_admin` esposto;
- nessun cambio visibility;
- nessuna DB write;
- provider/import spenti;
- Apify off;
- Production non toccata;
- deploy non eseguito.

Marker:

- `point_51_public_reader_design_dry_run_created=true`;
- `public_reader_design_mode=dry_run_only`;
- `public_readers_implemented=false`;
- `public_reader_skeleton_operational=false`;
- `public_routes_enabled=false`;
- `public_routes_created=false`;
- `public_reader_connected_to_routes=false`;
- `private_admin_publicly_exposed=false`;
- `visibility_changed=false`;
- `point_51_db_write=false`;
- `service_role_used=false`.

- Punto 52 completato: Public reader contract skeleton.

Output:

- creato `lib/public-data/contracts.ts`;
- creato `scripts/provider/auditPublicReaderContracts.ts`;
- aggiunto `npm run audit:public-reader-contracts`;
- definito solo contract skeleton con tipi/costanti;
- nessun reader operativo;
- nessuna query Supabase;
- nessuna route pubblica;
- nessun collegamento a pagine reali;
- nessun dato `private_admin` esposto;
- nessun cambio visibility;
- nessuna DB write;
- provider/import spenti;
- Apify off;
- Production non toccata;
- deploy non eseguito.

Marker:

- `point_52_public_reader_contract_skeleton_created=true`;
- `public_reader_contract_mode=contract_skeleton_only`;
- `public_readers_implemented=false`;
- `public_reader_operational=false`;
- `public_reader_skeleton_operational=false`;
- `public_routes_enabled=false`;
- `public_routes_created=false`;
- `public_reader_connected_to_routes=false`;
- `supabase_queries_implemented=false`;
- `admin_reader_imported=false`;
- `private_admin_publicly_exposed=false`;
- `visibility_changed=false`;
- `point_52_db_write=false`;
- `service_role_used=false`.

- Punto 53 completato: Public reader implementation no-route.

Output:

- creato `lib/public-data/readers.ts`;
- aggiornato `scripts/provider/auditPublicReaderContracts.ts`;
- public reader reali implementati ma non collegati a route;
- funzioni:
  - `getPublicCompetitions()`;
  - `getPublicCompetitionBySlug(slug)`;
  - `getPublicTeamsByCompetitionSlug(slug)`;
  - `getPublicStandingsByCompetitionSlug(slug)`;
  - `getPublicCompetitionBundleBySlug(slug)`;
- filtro obbligatorio `visibility='public_free'`;
- nessun import admin reader;
- nessuna route pubblica creata;
- nessun cambio visibility;
- nessuna DB write;
- provider/import spenti;
- Apify off;
- Production non toccata;
- deploy non eseguito.

Marker:

- `point_53_public_readers_no_route_implemented=true`;
- `public_reader_mode=no_route`;
- `public_readers_implemented=true`;
- `public_reader_operational=true`;
- `public_routes_enabled=false`;
- `public_routes_created=false`;
- `public_reader_connected_to_routes=false`;
- `supabase_queries_implemented=true`;
- `supabase_queries_visibility_filtered=true`;
- `admin_reader_imported=false`;
- `private_admin_publicly_exposed=false`;
- `visibility_changed=false`;
- `point_53_db_write=false`;
- `service_role_used=false`.

- Punto 54 completato: Public reader tests hardening.

Output:

- creato `scripts/provider/auditPublicReadersNoRoute.ts`;
- creato `docs/public_reader_hardening_tests_p54.md`;
- creato `docs/public_reader_hardening_safety_checklist_p54.md`;
- creato `docs/manual_import_point_55_decision_p54.md`;
- creato `docs/provider_point_54_closure.md`;
- dry-run public readers reso assertivo;
- audit no-route verifica import admin, service_role, write operation, provider fetch, visibility e route wiring;
- `public_competitions_count=0`;
- `public_teams_count=0`;
- `public_standings_count=0`;
- `public_bundle_status=not_found`;
- nessuna route pubblica creata;
- nessun dato `private_admin` esposto;
- nessun cambio visibility;
- nessuna DB write;
- provider/import spenti;
- Apify off;
- Production non toccata;
- deploy non eseguito.

Marker:

- `point_54_public_reader_tests_hardened=true`;
- `public_reader_hardening_mode=static_audit_and_assertive_dry_run`;
- `public_reader_no_route_verified=true`;
- `public_reader_route_wiring_detected=false`;
- `public_reader_dry_run_assertions_enabled=true`;
- `dry_run_assertions_pass=true`;
- `private_admin_publicly_exposed=false`;
- `visibility_changed=false`;
- `point_54_db_write=false`;
- `service_role_used=false`.

- Punto 55 completato: Public routes mock/empty-state.

Output:

- create route pubbliche minimali:
  - `/competitions`;
  - `/competitions/[slug]`;
- le route leggono solo tramite `lib/public-data/readers.ts`;
- con dataset corrente `private_admin`, mostrano empty state pubblico;
- nessun dato manuale privato esposto;
- nessun import admin reader;
- nessun fallback verso admin/private;
- nessuna DB write;
- nessun cambio visibility;
- provider/import spenti;
- Apify off;
- Production non toccata;
- deploy non eseguito.

Marker:

- `point_55_public_routes_empty_state_created=true`;
- `public_routes_mode=public_reader_empty_state_only`;
- `public_routes_enabled=true`;
- `public_routes_created=true`;
- `public_reader_connected_to_routes=true`;
- `private_admin_publicly_exposed=false`;
- `visibility_changed=false`;
- `point_55_db_write=false`;
- `service_role_used=false`.

- Punto 56 completato: Public routes browser verification no-auth.

Output:

- verifica eseguita su `localhost` con Chrome headless e profilo temporaneo isolato;
- `/competitions` carica e mostra empty state;
- `/competitions/manual-serie-a` carica e mostra not found/empty;
- nessun dato `private_admin` visibile;
- nessun bottone operativo;
- nessun admin link pubblico;
- nessun provider/import trigger;
- nessuna DB write;
- nessun cambio visibility;
- provider/import spenti;
- Apify off;
- Production non toccata;
- deploy non eseguito.

Marker:

- `point_56_public_routes_browser_verification_completed=true`;
- `public_routes_browser_verification_result=passed_no_auth_empty_state`;
- `public_routes_no_auth_verified=true`;
- `public_competitions_page_browser_state=empty`;
- `public_competition_detail_browser_state=not_found`;
- `private_admin_publicly_exposed=false`;
- `visibility_changed=false`;
- `point_56_db_write=false`;
- `service_role_used=false`.

- Punto 57 completato: Public routes UI polish.

Output:

- applicato polish UI/testi alle route pubbliche empty-state;
- `/competitions` resta empty-state;
- `/competitions/[slug]` resta not_found/empty;
- nessun dato `private_admin` visibile;
- nessun admin link pubblico;
- nessun debug raw payload;
- nessun bottone operativo;
- public readers invariati e filtrati `visibility='public_free'`;
- nessun cambio visibility;
- nessuna DB write;
- provider/import spenti;
- Apify off;
- Production non toccata;
- deploy non eseguito.

Marker:

- `point_57_public_routes_ui_polish_completed=true`;
- `public_routes_ui_polish_mode=empty_state_polish`;
- `public_routes_still_empty_state=true`;
- `public_routes_use_public_readers=true`;
- `public_routes_private_admin_hardcoded=false`;
- `public_routes_admin_links_visible=false`;
- `public_routes_debug_payload_visible=false`;
- `public_routes_operational_buttons=false`;
- `public_competitions_page_state=empty`;
- `public_competition_detail_state=not_found`;
- `private_admin_publicly_exposed=false`;
- `visibility_changed=false`;
- `point_57_db_write=false`.

## Punto 58 — Public routes browser verification after UI polish

Stato: completato.

Output:

- verifica browser no-auth eseguita su localhost;
- `/competitions` caricata e rimasta empty state pubblico;
- `/competitions/manual-serie-a` caricata e rimasta not_found/empty pubblico;
- nessun dato `private_admin` visibile;
- nessun admin link pubblico;
- nessun debug/raw payload;
- nessun bottone operativo;
- nessun provider/import trigger visibile;
- nessun cambio visibility;
- nessuna DB write;
- provider/import spenti;
- Apify off;
- Production non toccata;
- deploy non eseguito.

Marker:

- `point_58_public_routes_browser_verification_after_ui_polish_completed=true`;
- `public_routes_browser_verification_result=passed_no_auth_empty_state_after_ui_polish`;
- `public_routes_no_auth_verified=true`;
- `public_competitions_page_browser_state=empty`;
- `public_competition_detail_browser_state=not_found`;
- `private_admin_publicly_exposed=false`;
- `visibility_changed=false`;
- `point_58_db_write=false`;
- `provider_fetch=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `production_touched=false`;
- `deploy_executed=false`.


## Punto 59 — Public data promotion plan only

Stato: completato.

Output:

- piano di promotion pubblica creato;
- nessuna promotion eseguita;
- nessun cambio visibility;
- nessuna DB write;
- candidate futura: `manual-serie-a`;
- scope atteso futuro: 1 competition, 2 teams, 2 standings;
- promotion order definito: competition → teams → standings;
- rollback plan creato;
- post-promotion verification plan creato;
- dati `private_admin` restano non pubblici;
- route pubbliche restano empty/not_found;
- provider/import spenti;
- Apify off;
- Production non toccata;
- deploy non eseguito.

Marker:

- `point_59_public_data_promotion_plan_created=true`;
- `public_data_promotion_mode=plan_only`;
- `public_data_promotion_executed=false`;
- `visibility_changed=false`;
- `public_routes_current_state=empty_not_found`;
- `public_competitions_count=0`;
- `public_teams_count=0`;
- `public_standings_count=0`;
- `future_promotion_candidate=manual-serie-a`;
- `future_promotion_expected_competitions_count=1`;
- `future_promotion_expected_teams_count=2`;
- `future_promotion_expected_standings_count=2`;
- `rollback_plan_created=true`;
- `post_promotion_verification_plan_created=true`;
- `point_59_db_write=false`;
- `provider_fetch=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `production_touched=false`;
- `deploy_executed=false`.


## Punto 60 — Public data promotion dry-run/no-apply

Stato: completato.

Output:

- dry-run tecnico no-apply creato;
- scope candidate `manual-serie-a` calcolato da fixture locali;
- expected scope 1/2/2 confermato;
- promotion SQL/manual instructions preparate solo no-apply;
- rollback SQL/manual instructions preparate solo no-apply;
- post-promotion verification plan preparato solo no-apply;
- nessuna promotion eseguita;
- nessun cambio visibility;
- nessuna DB write;
- provider/import spenti;
- Apify off;
- Production non toccata;
- deploy non eseguito.

Marker:

- `point_60_public_data_promotion_dry_run_created=true`;
- `public_data_promotion_mode=dry_run_no_apply`;
- `public_data_promotion_executed=false`;
- `candidate_slug=manual-serie-a`;
- `expected_competitions_count=1`;
- `expected_teams_count=2`;
- `expected_standings_count=2`;
- `candidate_competitions_count=1`;
- `candidate_teams_count=2`;
- `candidate_standings_count=2`;
- `scope_matches_expected=true`;
- `promotion_sql_no_apply_prepared=true`;
- `rollback_sql_no_apply_prepared=true`;
- `post_promotion_verification_no_apply_prepared=true`;
- `real_sql_executed=false`;
- `point_60_db_write=false`;
- `visibility_changed=false`;
- `provider_fetch=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `production_touched=false`;
- `deploy_executed=false`.


## Punto 61 — Public data promotion SQL/manual pack no-apply finale

Stato: completato.

Output:

- pack SQL/manual finale no-apply creato;
- promotion SQL outline preparato solo come documento;
- rollback SQL outline preparato solo come documento;
- post-verification SQL outline preparato solo come documento;
- gate autorizzazione esplicita Punto 62 documentato;
- nessuna promotion eseguita;
- nessun SQL eseguito;
- nessuna DB write;
- nessun cambio visibility;
- provider/import spenti;
- Apify off;
- Production non toccata;
- deploy non eseguito.

Marker:

- `point_61_public_data_promotion_sql_manual_pack_created=true`;
- `promotion_sql_pack_mode=no_apply`;
- `promotion_sql_outline_prepared=true`;
- `rollback_sql_outline_prepared=true`;
- `post_verification_sql_outline_prepared=true`;
- `requires_explicit_p62_authorization=true`;
- `generic_proceed_authorizes_write=false`;
- `public_data_promotion_executed=false`;
- `real_sql_executed=false`;
- `point_61_db_write=false`;
- `visibility_changed=false`;
- `provider_fetch=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `production_touched=false`;
- `deploy_executed=false`.

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
## Punto 68 — Public data UI polish with visible data

- `point_68_public_data_ui_polish_completed=true`
- `public_data_ui_polish_mode=visible_data_no_write`
- `public_routes_current_state=data_visible`
- `public_competitions_count=1`
- `public_teams_count=2`
- `public_standings_count=2`
- `public_bundle_status=ready`
- `public_competitions_page_state=data_visible`
- `public_competition_detail_state=data_visible`
- `manual_serie_a_visible=true`
- `public_competition_visible=true`
- `public_teams_visible=true`
- `public_standings_visible=true`
- `private_admin_publicly_exposed=false`
- `point_68_db_write=false`
- `rollback_executed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- Prossimo step consigliato: Punto 69 — verifica Preview no-auth dopo polish, senza deploy manuale.
## Punto 69 — Preview no-auth verification after visible-data UI polish

- `point_69_public_preview_verification_completed=true`
- `preview_verification_mode=no_auth_preview_http`
- `preview_url_available=true`
- `preview_url_source=known_branch_alias_docs`
- `manual_deploy_executed=false`
- `production_touched=false`
- `preview_no_auth_blocked_by_vercel_auth=true`
- `preview_verification_result=partial_blocked_by_vercel_auth`
- `preview_data_visible=false`
- `local_p68_verification_still_valid=true`
- `point_69_db_write=false`
- `rollback_executed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `deploy_executed=false`
- Prossimo step consigliato: Punto 70 — decidere se mantenere Preview protetta o predisporre test no-auth controllato.
## Punto 70 — Homepage/navigation polish without deployment

- `point_70_homepage_navigation_polish_completed=true`
- `public_path_verification_mode=local_no_auth_http`
- `home_links_competitions=true`
- `competitions_links_detail=true`
- `competition_detail_links_back=true`
- `competitions_page_state=data_visible`
- `competition_detail_state=data_visible`
- `public_competitions_count=1`
- `public_teams_count=2`
- `public_standings_count=2`
- `public_bundle_status=ready`
- `private_admin_publicly_exposed=false`
- `public_routes_admin_links_visible=false`
- `public_routes_debug_payload_visible=false`
- `public_routes_operational_buttons=false`
- `point_70_db_write=false`
- `rollback_executed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `vercel_auth_changed=false`
- Prossimo step consigliato: Punto 71 — SEO/copy metadata o verifica Preview autenticata, senza deploy manuale.

## Punto 78 — Preview release closure / MVP freeze

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

La Preview corretta è stata verificata manualmente dall'utente con `/competitions` e `/competitions/manual-serie-a` funzionanti e dati visibili. Il dominio `regista-avanzato-rouge.vercel.app` resta Production/main vecchia: il 404 osservato lì è spiegato dall'ambiente, non dal codice.

P78 chiude l'MVP Preview e ferma il lavoro prima di Production, merge main, provider/import, Apify o ulteriori DB write.
