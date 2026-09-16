# D.17-L — Supporto base URL alternativa Stats API v1 disabled

Data/ora locale: 2026-09-16

## Obiettivo

Preparare lo script gated TheStatsAPI a rappresentare anche la base URL alternativa documentata da Stats API v1, senza eseguire API call e senza leggere token.

Base URL alternativa:

- `https://stats-api.com/api/v1`

Endpoint alternativo:

- `GET /football/competitions?limit=10`

URL shape sanificata:

- `https://stats-api.com/api/v1/football/competitions?limit=10`

## Modifica script

File aggiornato:

- `scripts/provider/theStatsApiProbe.ts`

Modifiche:

- aggiunto `BASE_URL_V1_FALLBACK=https://stats-api.com/api/v1`;
- aggiunto `COMPETITIONS_V1_ENDPOINT=/football/competitions?limit=10`;
- aggiunto target `THESTATSAPI_PROBE_TARGET=competitions_v1`;
- output disabled con:
  - `competitions_v1_target=competitions_v1`;
  - `competitions_v1_base_url_shape=https://stats-api.com/api/v1`;
  - `competitions_v1_path=/football/competitions?limit=10`;
  - `competitions_v1_url_shape=https://stats-api.com/api/v1/football/competitions?limit=10`.

## Stato disabled verificato

Output atteso:

```text
enabled=false
external_fetch=false
db_write=false
token_read=false
token_printed=false
requests_executed=0
competitions_v1_url_shape=https://stats-api.com/api/v1/football/competitions?limit=10
```

## Sicurezza

- Nessuna API call TheStatsAPI.
- Nessuna API call Stats API v1.
- Nessuna fetch provider.
- Nessun retry.
- Nessun token letto/stampato.
- Nessuna key documentata.
- Nessun prefisso/suffisso/hash/lunghezza key.
- Nessuna scrittura DB.
- Nessun `service_role`.
- Nessun `db push/reset`.
- Provider/import spenti.
- Apify spento.
- API-Football sospeso/no retry.
- Production non toccata.

## Decisione

D.17-L non autorizza una real-call.

Prossimo step consigliato: D.17-M — eventuale retry singolo su `competitions_v1`, solo dopo conferma esplicita dell'utente e mantenendo:

- massimo 1 richiesta;
- nessun standings;
- nessun retry;
- nessuna paginazione;
- nessun DB write;
- output sanificato.
