# D.17-E/F — TheStatsAPI real probe controllata + valutazione mapping

Data/ora locale prova: 2026-09-16 13:23:25 CEST  
Stato: completata con stop sicuro dopo la prima richiesta.

## Obiettivo

Eseguire una prova reale TheStatsAPI controllata, con massimo due richieste read-only:

1. `GET /football/competitions`;
2. `GET /football/competitions/comp_5840/seasons/sn_6199313/standings`, solo se la prima richiesta ha successo.

Nessuna scrittura DB, nessun import e nessuna attivazione provider.

## Risultato probe

- Provider: TheStatsAPI.
- Mode: `thestatsapi_probe`.
- Gate attivi solo durante la prova.
- `external_fetch=true`.
- `db_write=false`.
- `token_read=true`.
- `token_printed=false`.
- `requests_planned=2`.
- `requests_executed=1`.
- `stopped_after=competitions_error`.

### Richiesta 1 — competitions

- Endpoint: `GET /football/competitions`.
- Esito HTTP: `404`.
- Top-level keys: `error`.
- Count elementi principali: `0`.

La prima richiesta non è risultata valida per la API/documentazione corrente. Come previsto dal gate, non è stata eseguita la seconda richiesta standings.

### Richiesta 2 — standings Serie A

- Endpoint: `GET /football/competitions/comp_5840/seasons/sn_6199313/standings`.
- Eseguita: no.
- HTTP status: `not_executed`.
- Top-level keys: `not_executed`.
- Rows count: `0`.
- Groups count: `0`.

## Mapping teorico

- `mapping_theoretical_possible=false`.
- Motivo: lo step `competitions` è fallito con `404`, quindi non è stato possibile verificare una shape standings reale.
- `missing_fields=standings_rows_or_expected_fields_not_detected`.
- `useful_fields=unknown_until_successful_standings_payload`.
- `recommended_next_mapping_step=inspect_sanitized_shape_or_choose_lighter_endpoint`.

Campi mapping attesi da verificare in una futura prova riuscita:

- competition;
- season;
- team;
- rank/position;
- played;
- wins;
- draws;
- losses;
- goals_for;
- goals_against;
- points;
- form, se presente;
- metadata utili;
- ID esterni provider.

## Conferme sicurezza

- Nessun token stampato.
- Nessuna key stampata.
- Nessun prefisso/suffisso/hash/lunghezza key stampato.
- Nessuna response completa stampata o salvata.
- Nessun payload completo scritto su file.
- `.env.local` non committato.
- Nessuna scrittura DB.
- Nessun insert/update/delete/upsert.
- Nessun `provider_import_runs` write.
- Nessun `api_usage_logs` write.
- Nessun `provider_import_logs` write.
- Nessun `import_logs` write.
- Nessun `service_role`.
- Nessun `db push/reset`.
- Provider/import non attivati.
- Apify spento.
- API-Football sospeso/no retry.
- Production non toccata.

## Interpretazione

Il risultato `404` su `/football/competitions` indica che l'endpoint leggero scelto non è valido oppure richiede un path/versione differente rispetto alla documentazione pubblica consultata.

La logica di sicurezza ha funzionato:

- stop dopo errore della prima richiesta;
- standings non eseguito;
- nessun retry;
- nessun loop;
- nessuna paginazione;
- nessun DB write.

## Prossimo step consigliato

D.17-G — revisione manuale documentazione/dashboard TheStatsAPI per individuare endpoint valido più leggero, senza ulteriori real-call finché non viene confermato il path corretto.

## D.17-G — Debug 404 senza real-call

Il debug D.17-G ha individuato una causa probabile del `404`: lo script usava `new URL(endpoint, baseUrl)` con endpoint che iniziava con `/`, perdendo il segmento `/api` del base URL.

Correzione:

- aggiunta funzione `joinUrl()`;
- `competitions_url_shape=https://api.thestatsapi.com/api/football/competitions`;
- `standings_url_shape=https://api.thestatsapi.com/api/football/competitions/comp_5840/seasons/sn_6199313/standings`;
- `possible_double_api=false`;
- `possible_double_slash=false`.

Nessuna nuova real-call è stata eseguita.

## D.17-H — Retry competitions dopo fix URL

Retry singolo completato:

- endpoint: `GET /football/competitions`;
- URL shape: `https://api.thestatsapi.com/api/football/competitions`;
- richieste eseguite: `1`;
- HTTP status: `403`;
- top-level keys: `error`;
- items count: `0`;
- standings: non eseguito;
- mapping teorico: `false`;
- response completa: non salvata;
- token stampato: `false`;
- DB write: `false`.

Decisione: non procedere a standings finché non viene chiarita la causa del `403`.

## D.17-J — Interpretazione 403

Il `403` viene trattato come blocco auth/account/endpoint, non come problema di mapping.

D.17-J non ha eseguito retry e non ha chiamato standings.

Possibili cause ancora aperte:

- piano/account non attivo;
- API Football non inclusa;
- key non valida/non abilitata;
- auth/header non corretto;
- endpoint non incluso;
- restrizioni IP/domain;
- quota/rate limit.

Serve verifica manuale provider prima di qualsiasi nuova real-call.
