# D.17-J — Debug 403 TheStatsAPI senza retry

Data/ora locale: 2026-09-16 18:03:02 CEST

## Contesto

D.17-H ha eseguito una sola richiesta reale controllata verso TheStatsAPI:

- endpoint: `GET /football/competitions`;
- URL shape corretta: `https://api.thestatsapi.com/api/football/competitions`;
- `requests_executed=1`;
- `http_status=403`;
- `response_top_level_keys=error`;
- `items_count=0`;
- `standings_executed=false`.

Conferme D.17-H:

- nessun retry;
- nessuna chiamata standings;
- nessuna scrittura DB;
- nessun token stampato;
- nessun payload completo salvato;
- provider/import spenti;
- Apify spento;
- API-Football sospeso/no retry;
- Production non toccata.

## Audit statico script

File analizzato:

- `scripts/provider/theStatsApiProbe.ts`

Risultato audit:

- base URL fallback: `https://api.thestatsapi.com/api`;
- competitions path: `/football/competitions`;
- URL finale teorica: `https://api.thestatsapi.com/api/football/competitions`;
- metodo HTTP: `GET`;
- auth candidate: `Authorization: Bearer <token>`;
- header candidate: `Accept: application/json`;
- token letto solo tramite allowlist locale `THESTATSAPI_API_KEY` / `THESTATSAPI_BASE_URL`;
- token letto solo dopo doppio gate:
  - `THESTATSAPI_PROBE_ENABLED=true`;
  - `REAL_PROVIDER_PROBE_ENABLED=true`;
- token non stampato;
- Authorization header completo non stampato;
- response completa non stampata;
- payload completo non scritto su file;
- `requests_planned=1`;
- target ammesso: `competitions`;
- standings non eseguito in D.17-H;
- nessun retry;
- nessun loop;
- nessuna paginazione;
- nessun import Supabase;
- nessun Supabase admin client;
- nessun `service_role`;
- nessun writer DB;
- output sanificato.

## Possibili cause del 403

Il `403` può dipendere da una o più condizioni non confermate:

- key non valida o non attiva;
- account/piano non attivo;
- API Football non inclusa nel piano;
- endpoint non incluso nel piano;
- metodo auth errato;
- header auth errato;
- endpoint diverso dal candidato;
- restrizioni IP/domain;
- quota o rate limit;
- blocco dashboard/account/provider.

Non sono state eseguite nuove real-call per confermare o escludere queste ipotesi.

## Esito verifica manuale/docs

Questa fase non ha eseguito navigazione interattiva o richieste provider. I punti che richiedono dashboard/documentazione provider restano da verificare manualmente.

| Punto | Esito |
| --- | --- |
| Account attivo | non chiaro |
| Piano attivo | non chiaro |
| API Football inclusa | non chiaro |
| Endpoint football incluso nel piano | non chiaro |
| Quota disponibile | non chiaro |
| Rate limit raggiunto | non chiaro |
| Key presente in dashboard | non chiaro |
| Key attiva | non chiaro |
| Key associata al piano/API corretta | non chiaro |
| Key inserita solo in `.env.local` | non chiaro da audit statico, `.env.local` non letto |
| Key copiata/stampata | no |
| Auth Bearer confermata da docs/dashboard | non chiaro |
| Auth alternativa richiesta | non chiaro |
| Endpoint competitions confermato | non chiaro |
| Endpoint standings confermato | non chiaro |
| Restrizioni IP/domain | non chiaro |

## Decisione prima del prossimo retry

Opzione scelta: **C. Serve supporto/verifica provider o dashboard**.

Motivo:

- lo script ora compone correttamente la URL;
- il provider risponde `403`, quindi la rete raggiunge il servizio;
- non è ancora confermato se account/piano/API/key/auth/endpoint siano corretti;
- un retry immediato rischierebbe di consumare richieste senza nuova informazione.

Non procedere con:

- retry automatico;
- standings;
- import;
- mapping operativo;
- DB write;
- provider activation.

## Prossimo step consigliato

D.17-K — verifica manuale dashboard/documentazione TheStatsAPI senza API call:

- confermare piano/account;
- confermare API Football inclusa;
- confermare header auth richiesto;
- confermare endpoint competitions;
- confermare eventuali restrizioni IP/domain;
- decidere se correggere auth/header o fermare TheStatsAPI.

Qualunque nuova real-call richiede conferma esplicita e deve restare massimo una richiesta.

## D.17-K — Verifica documentale pubblica

D.17-K ha consultato solo documentazione pubblica, senza API call.

Risultato:

- Bearer auth confermata da documentazione pubblica;
- `Accept: application/json` confermato;
- path logico competitions confermato;
- path logico standings confermato;
- dashboard/account/piano/key non verificati;
- discrepanza base URL rilevata:
  - sito TheStatsAPI: `https://api.thestatsapi.com/api`;
  - docs Stats API v1: `https://stats-api.com/api/v1`.

Decisione consigliata: preparare correzione base URL/endpoint in uno step separato senza API call, poi valutare un eventuale retry singolo solo dopo conferma esplicita.

## D.17-M/N/Z — Conferma sospensione provider

Il tentativo finale del Punto 17 ha eseguito una sola richiesta e ha restituito `403`.

Non sono stati eseguiti:

- retry;
- standings;
- seconda richiesta;
- DB write.

Decisione finale: TheStatsAPI/Stats API resta sospeso.
