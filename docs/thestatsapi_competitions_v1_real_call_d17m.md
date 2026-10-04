# D.17-M — Stats API v1 competitions real-call result

Data/ora locale: 2026-09-17 11:51:51 CEST

## Obiettivo

Eseguire una singola real-call controllata per chiudere il Punto 17 provider, target previsto:

- `THESTATSAPI_PROBE_TARGET=competitions_v1`;
- URL shape prevista: `https://stats-api.com/api/v1/football/competitions?limit=10`;
- massimo una richiesta;
- nessun standings;
- nessun retry;
- nessuna scrittura DB.

## Esito reale

La real-call ha rispettato il limite di una richiesta, ma ha rivelato una criticità di configurazione: `THESTATSAPI_BASE_URL` locale ha sovrascritto il fallback v1.

Output sanificato:

```text
mode=thestatsapi_probe
provider=the_stats_api
target=competitions_v1
endpoint=football_competitions_v1
path=/football/competitions?limit=10
url_shape=https://api.thestatsapi.com/api/football/competitions?limit=10
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

- La richiesta reale totale è stata una sola.
- Nessuna chiamata standings è stata eseguita.
- Nessun retry è stato eseguito.
- La URL shape effettiva non è stata quella v1 attesa, perché la configurazione locale ha mantenuto `https://api.thestatsapi.com/api`.
- Lo script è stato corretto dopo la call per fare in modo che il target `competitions_v1` usi sempre `https://stats-api.com/api/v1` e non venga sovrascritto dal base URL legacy.
- Non è stata eseguita una seconda real-call dopo la correzione.

## Sicurezza

- Token letto solo durante la real probe: `token_read=true`.
- Token stampato: `token_printed=false`.
- Nessuna key stampata.
- Nessun prefisso/suffisso/hash/lunghezza key documentato.
- Nessun Authorization header completo stampato.
- Nessuna response completa salvata.
- Nessun payload completo salvato.
- `db_write=false`.
- Nessuna scrittura su provider/import logs.
- Nessun `service_role`.
- Nessun `db push/reset`.
- Provider/import spenti.
- Apify spento.
- API-Football sospeso/no retry.
- Production non toccata.

## Decisione

Punto 17 chiuso come verifica provider non utilizzabile per ora.

Motivo:

- TheStatsAPI legacy ha restituito `403`;
- il tentativo `competitions_v1` ha evidenziato un override locale del base URL e ha restituito ancora `403`;
- account/piano/key/API inclusa non sono ancora confermati;
- non è prudente eseguire altri retry automatici.

## Prossimo step consigliato

Non procedere a standings o mapping reale.

Opzioni future:

1. chiarire account/key/piano con dashboard/supporto provider;
2. solo dopo conferma esplicita, valutare una singola richiesta v1 reale usando la URL shape corretta;
3. in alternativa, sospendere TheStatsAPI/Stats API e proseguire con dati manuali/mock o altro provider.
