# D.15 — Provider probe readiness gate

## Stato attuale

D.15 prepara il gate finale prima di una futura probe provider reale.

Stato:

- probe disabilitata presente;
- comando: `npm run probe:stable-provider:disabled`;
- provider provvisorio: `api_football`;
- provider alternativo: `the_stats_api`;
- `real_provider_probe_enabled=false`;
- `external_fetch=false`;
- `token_read=false`;
- `db_write=false`;
- `provider_activated=false`;
- `import_enabled=false`;
- `provider_import_runs_count` atteso ancora 0;
- `/admin/imports` read-only;
- provider/Apify/import spenti;
- Production non toccata.

## Gate obbligatorio prima di D.16 / prima real-call

Prima di qualunque real-call provider devono essere completati:

- scegliere provider definitivo;
- verificare manualmente prezzo;
- verificare manualmente rate limit;
- verificare manualmente licenza/caching/pubblicazione;
- confermare repository GitHub Private;
- confermare service role Supabase ruotata;
- confermare Vercel env limitate a Preview;
- creare token provider solo in env sicura;
- non committare token;
- non stampare token;
- una sola request;
- nessuna scrittura DB;
- nessun `import_enabled=true`;
- provider in `data_providers` ancora off;
- `realWritesEnabled=false`;
- `/admin/imports` read-only;
- `provider_import_runs_count = 0` prima della probe;
- Production non toccata.

## Prima probe futura

La prima probe reale dovrà essere un nuovo step separato.

Forma richiesta:

- script separato;
- endpoint candidate: standings o fixtures;
- `competition_slug=serie-a`;
- massimo 1 richiesta;
- timeout breve;
- output sanificato;
- solo shape summary;
- non stampare payload completo se contiene metadata sensibili;
- nessun dato salvato;
- nessuna scrittura DB;
- nessun import;
- nessun Apify.

Stop immediato se:

- token assente;
- token rischia di essere stampato;
- rate limit incerto;
- costo incerto;
- licenza incerta;
- endpoint non documentato;
- qualsiasi codice tenta DB write.

## Criteri di successo

- Risposta ricevuta.
- Payload comprensibile.
- Nessun token stampato.
- Nessuna scrittura DB.
- Costo/rate limit sotto controllo.
- Mapping possibile verso Supabase.
- Provider/import restano spenti.
- Production non toccata.

## Criteri di fallimento

- `401`/`403`.
- Rate limit o quota non chiara.
- Payload non documentato.
- Costo/licenza non chiari.
- Endpoint non adatto.
- Qualsiasi tentativo di scrittura DB.
- Qualsiasi tentativo di attivare provider/import.

## D.17-B2 — TheStatsAPI key setup locale

TheStatsAPI è il provider scelto per la prossima probe futura dopo il pivot D.17-A.

Verifica locale completata:

- `THESTATSAPI_API_KEY` presente in `.env.local`;
- `THESTATSAPI_BASE_URL` presente in `.env.local`;
- `THESTATSAPI_PROBE_ENABLED=false`;
- nessun valore stampato;
- nessun token committato;
- nessuna real-call;
- nessuna fetch provider;
- nessuna scrittura DB.

Il gate resta chiuso: la futura probe TheStatsAPI dovrà essere preparata con script separato, default disabled e una sola richiesta solo dopo conferma esplicita.

## D.17-C — TheStatsAPI probe gated preparata

Script preparato:

- `scripts/provider/theStatsApiProbe.ts`;
- comando: `npm run probe:thestatsapi:gated`.

La modalità default deve restare:

- `enabled=false`;
- `blocked_reason=THESTATSAPI_PROBE_DISABLED`;
- `external_fetch=false`;
- `db_write=false`;
- `token_read=false`;
- `token_printed=false`;
- `requests_planned=1`;
- `requests_executed=0`.

Gate per futura real-call:

- `THESTATSAPI_PROBE_ENABLED=true`;
- `REAL_PROVIDER_PROBE_ENABLED=true`;
- conferma manuale esplicita;
- endpoint confermato;
- piano/licenza/rate limit confermati.

Finché il gate è chiuso non deve essere letto alcun token e non deve essere fatta alcuna fetch.

## D.17-D — Checklist finale TheStatsAPI

Documento aggiunto:

- `docs/thestatsapi_pre_real_call_checklist_d17d.md`.

La checklist blocca D.17-E finché non sono confermati:

- endpoint TheStatsAPI;
- base URL;
- header/auth;
- parametri;
- piano/rate limit/licenza;
- massimo una richiesta;
- output sanificato;
- nessun token stampato;
- nessuna scrittura DB;
- provider/import ancora spenti;
- Production esclusa.

Lo script è stato verificato solo in modalità disabled:

- `enabled=false`;
- `blocked_reason=THESTATSAPI_PROBE_DISABLED`;
- `external_fetch=false`;
- `db_write=false`;
- `token_read=false`;
- `token_printed=false`;
- `requests_executed=0`.

## Prossimo step consigliato

Opzione A:

- D.16-A — verifica manuale provider/costi/licenze.

Opzione B:

- D.15-B — completare test utenti staging `free_user`/`editor` prima della probe reale.

## Conferme D.15

- Nessuna real-call.
- Nessuna fetch provider.
- Nessun token letto/stampato.
- Nessuna scrittura DB.
- Nessun insert/update/delete/upsert.
- Nessun db push/reset.
- Provider/Apify/import spenti.
- Production non toccata.

## D.16-A — Checklist manuale provider/costi/licenze

Documento aggiunto:

- `docs/provider_manual_verification_checklist_d16a.md`.

D.16-A non apre la probe reale: prepara solo la verifica manuale aggiornata di provider, prezzo, rate limit, licenza, caching, pubblicazione e copertura.

Decisione provvisoria:

- provider preferito provvisorio: `api_football`;
- alternativa: `the_stats_api`;
- scelta finale subordinata a verifica manuale su fonti ufficiali.

Gate aggiornato prima di D.16-B:

- provider scelto manualmente;
- prezzo/piano verificato;
- rate limit verificato;
- licenza/caching/pubblicazione verificati;
- endpoint scelto;
- token creato solo in env sicura, mai committato e mai stampato;
- GitHub repo Private confermato;
- service role Supabase ruotata/confermata;
- env Supabase solo Preview;
- provider ancora off;
- nessun `import_enabled=true`;
- `real_provider_probe_enabled=false` fino a conferma esplicita;
- `realWritesEnabled=false`;
- nessuna scrittura DB;
- Production non toccata.

Conferme D.16-A:

- nessuna real-call;
- nessuna fetch provider;
- nessun token letto/stampato;
- nessuna scrittura DB;
- provider/Apify/import spenti.

## D.16-B — API-Football Free scelto per prima probe futura

Documento aggiunto:

- `docs/api_football_free_probe_plan_d16b.md`.

Decisione:

- provider della futura prima probe: `api_football`;
- piano iniziale: Free;
- alternativa: `the_stats_api`;
- nessun upgrade a pagamento prima di probe riuscita, payload compatibile, limiti chiari, licenza/caching/pubblicazione confermati e costi sostenibili.

D.16-B non esegue la probe. Il gate resta chiuso:

- `real_provider_probe_enabled=false`;
- `external_fetch=false`;
- `token_read=false`;
- `db_write=false`;
- provider/import off;
- `realWritesEnabled=false`;
- `/admin/imports` read-only;
- Production non toccata.

D.16-C potrà essere aperta solo con conferma esplicita, token in env sicura, massimo una richiesta read-only e nessuna scrittura DB.

## D.16-C1 — Preparazione env API-Football

Documento:

- `docs/api_football_key_setup_d16c1.md`.

Stato:

- nessuna API key inserita;
- nessun token letto/stampato;
- nessuna real-call;
- nessuna fetch provider;
- nessuna scrittura DB.

## D.16-C3 — Tentativo bloccato prima della real-call

- D.16-C3 è stata avviata con conferma dell'utente sulla rotazione della key.
- La real-call non è stata completata.
- Lo script si è fermato prima della fetch perché `API_FOOTBALL_API_KEY` non era disponibile nel process environment.
- `.env.local` non è stato letto/caricato da Codex.
- `requests_executed=0`.
- Nessuna fetch provider completata.
- Nessuna key/token stampata.
- Nessuna response completa stampata.
- Nessuna scrittura DB.

Residuo:

- riprovare solo con key disponibile nel process environment sicuro, senza stampare valori e senza caricare `.env.local` da Codex.

## D.16-C3-R1 — Prima richiesta API-Football controllata

- Script corretto con lettura mirata `.env.local` solo per `API_FOOTBALL_API_KEY` e `API_FOOTBALL_BASE_URL`.
- Lettura key consentita solo con `API_FOOTBALL_PROBE_ENABLED=true` e `REAL_PROVIDER_PROBE_ENABLED=true`.
- Real-call eseguita una sola volta.
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
- Provider/import non attivati.
- Apify spento.
- TheStatsAPI non chiamato.
- Production non toccata.

Residuo:

- verificare manualmente nel provider perché la key/piano restituisce `403`, senza condividere token.

## D.16-C3-R2 — Readiness retry senza real-call

Creato:

- `docs/api_football_403_retry_readiness_d16c3r2.md`.

La fase:

- analizza localmente lo script;
- documenta possibili cause del `403`;
- prepara checklist manuale per eventuale R2;
- non esegue nessuna seconda richiesta;
- non legge/stampa token;
- non scrive DB;
- non attiva provider/import.

Provider/import restano spenti, Apify spento, TheStatsAPI non chiamato, Production non toccata.

## D.16-C3-R2 manual check — Dashboard API-Football

Creato:

- `docs/api_football_dashboard_manual_check_d16c3r2.md`.

La fase non fa fetch provider e non legge token.

Checklist manuale copre:

- account/email;
- piano Free;
- API Football v3;
- key;
- restrizioni IP/domain;
- endpoint/header/parametri;
- verifica `season=2026` o possibile scelta `season=2025`.

R2 reale resta bloccato finché l'utente non conferma questi punti e autorizza una sola richiesta.

## D.17-A — Pivot readiness TheStatsAPI

La prossima probe provider non prosegue con API-Football.

Decisione:

- API-Football sospeso dopo `403`;
- nessun retry API-Football previsto ora;
- TheStatsAPI scelto per il prossimo percorso di test;
- TheStatsAPI ancora senza real-call;
- key/setup TheStatsAPI da preparare in step separato;
- default previsto: `THESTATSAPI_PROBE_ENABLED=false`.

Gate invariato:

- massimo una richiesta futura;
- output sanificato;
- nessun token stampato;
- nessuna scrittura DB;
- provider/import spenti;
- Apify spento;
- Production esclusa.

Nomi env futuri:

- `API_FOOTBALL_API_KEY`;
- `API_FOOTBALL_BASE_URL`;
- `API_FOOTBALL_PROBE_ENABLED=false`.

Il gate D.16-C2 resta chiuso finché la chiave non viene preparata manualmente in env sicura e la real-call non viene autorizzata esplicitamente.

## D.16-C2-A — Verifica key locale senza real-call

Risultato:

- `.env.local` ignorato da Git;
- `.env.example` solo placeholder/default safe;
- `API_FOOTBALL_API_KEY` presente localmente senza valore stampato;
- `API_FOOTBALL_BASE_URL` presente localmente senza valore stampato;
- `API_FOOTBALL_PROBE_ENABLED=false`;
- `token_printed=false`.

Nota sicurezza:

- una key condivisa accidentalmente in chat è da considerare esposta;
- usare solo una key rigenerata manualmente;
- non committare, non stampare e non incollare token in chat.

Il gate resta chiuso:

- nessuna real-call;
- nessuna fetch provider;
- nessuna scrittura DB;
- provider/import spenti;
- Production non toccata.

## D.16-C2-B — Script probe API-Football gated

Preparato:

- `scripts/provider/apiFootballProbe.ts`;
- comando `npm run probe:api-football:gated`;
- documento `docs/api_football_probe_script_d16c2b.md`.

Lo script è separato da import, writer e UI. In modalità default deve fermarsi prima di leggere la key e prima di qualunque fetch.

Gate richiesti per una futura real-call:

- `API_FOOTBALL_PROBE_ENABLED=true`;
- `REAL_PROVIDER_PROBE_ENABLED=true`;
- massimo una richiesta;
- output sanificato;
- nessuna scrittura DB;
- provider/import off;
- Production off.

D.16-C2-B non esegue lo script.

## D.16-C2-C — Gate finale pre-real-call

Documento:

- `docs/api_football_pre_real_call_checklist_d16c2c.md`.

Decisione finale pre-probe:

- D.16-C3 consigliata su endpoint standings Serie A;
- fixtures Serie A resta alternativa.

Gate ancora chiuso:

- key esposta da rigenerare;
- `API_FOOTBALL_PROBE_ENABLED=false`;
- `REAL_PROVIDER_PROBE_ENABLED=false`;
- `enabled=false`;
- `requests_executed=0`;
- nessuna fetch provider;
- nessuna scrittura DB;
- provider/import off;
- Production off.
