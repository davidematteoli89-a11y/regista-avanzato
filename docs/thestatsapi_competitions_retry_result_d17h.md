# D.17-H — TheStatsAPI competitions retry result

Data/ora locale: 2026-09-16 16:25:03 CEST

## Obiettivo

Eseguire una singola richiesta reale controllata verso TheStatsAPI dopo la correzione D.17-G della composizione URL.

Endpoint autorizzato:

- provider: TheStatsAPI;
- metodo: `GET`;
- path: `/football/competitions`;
- URL shape sanificata: `https://api.thestatsapi.com/api/football/competitions`;
- target: `competitions`.

## Gate e limiti

- `THESTATSAPI_PROBE_ENABLED=true`;
- `REAL_PROVIDER_PROBE_ENABLED=true`;
- `THESTATSAPI_PROBE_TARGET=competitions`;
- massimo 1 richiesta;
- nessun retry automatico;
- nessun loop;
- nessuna paginazione;
- standings non eseguito;
- nessuna scrittura DB;
- nessun import;
- nessuna provider activation;
- nessun `service_role`.

## Risultato real-call

Output sanificato:

```text
mode=thestatsapi_probe
provider=the_stats_api
plan=d17h_competitions_single_request
target=competitions
endpoint=football_competitions
path=/football/competitions
url_shape=https://api.thestatsapi.com/api/football/competitions
enabled=true
external_fetch=true
db_write=false
token_read=true
token_printed=false
requests_planned=1
requests_executed=1
http_status=403
api_errors_count=3
response_top_level_keys=error
items_count=0
sample_fields_only=none
mapping_theoretical_possible=false
standings_executed=false
warnings=1
```

## Interpretazione

La correzione URL ha preservato `/api`, quindi il precedente problema di URL composition è stato risolto.

Il nuovo risultato `403` indica che l'endpoint è raggiunto ma la richiesta viene rifiutata lato provider. Le cause possibili restano da verificare senza retry automatico:

- key non abilitata al prodotto/endpoint;
- piano o account non autorizzato;
- header/auth non conforme alla documentazione effettiva;
- endpoint richiede path/versione diversa o parametri aggiuntivi;
- restrizioni dashboard/account.

## Sicurezza

- Token letto solo durante la real probe: `token_read=true`.
- Token stampato: `token_printed=false`.
- Nessuna key stampata.
- Nessun prefisso/suffisso/hash/lunghezza key documentato.
- Nessun Authorization header stampato.
- Response completa non stampata.
- Payload completo non salvato.
- `.env.local` non committato.
- `db_write=false`.
- Nessuna scrittura su `provider_import_runs`.
- Nessuna scrittura su `api_usage_logs`.
- Nessuna scrittura su `provider_import_logs`.
- Nessuna scrittura su `import_logs`.
- Provider/import spenti.
- Apify spento.
- API-Football sospeso/no retry.
- Production non toccata.

## Decisione

D.17-H è completata con stop sicuro:

- richiesta reale eseguita: 1;
- endpoint eseguito: solo `/football/competitions`;
- standings non eseguito;
- nessun retry;
- nessun mapping reale possibile per ora.

## Prossimo step consigliato

Poiché il risultato è `403`, non procedere a D.17-I standings.

Prossimo step consigliato: debug auth/endpoint/account TheStatsAPI senza retry automatico e senza ulteriori real-call finché non viene chiarita la causa del `403`.

## D.17-J — Debug 403 senza retry

D.17-J ha analizzato il `403` senza nuove chiamate provider.

Risultato:

- URL composition confermata corretta;
- auth candidate nello script: `Authorization: Bearer <token>`;
- `Accept: application/json`;
- token letto solo dopo doppio gate;
- token non stampato;
- `requests_planned=1`;
- nessun retry/loop/paginazione;
- nessun DB writer;
- nessun `service_role`.

Decisione: non fare ulteriori retry finché dashboard/documentazione TheStatsAPI non confermano account, piano, API inclusa, auth/header ed endpoint.

## D.17-K — Nota post-verifica manuale

La verifica documentale pubblica suggerisce che il path `/football/competitions` e Bearer auth siano corretti, ma ha rilevato una possibile discrepanza di base URL:

- `https://api.thestatsapi.com/api`;
- `https://stats-api.com/api/v1`.

Non è stato eseguito alcun retry. La prossima azione consigliata è preparare un aggiornamento gated della base URL, senza chiamata provider.
