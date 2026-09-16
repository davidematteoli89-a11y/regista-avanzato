# D.17-K — Verifica manuale TheStatsAPI senza API call

Data/ora locale: 2026-09-16

## Obiettivo

Analizzare il `403` ricevuto in D.17-H senza eseguire nuove API call, senza retry, senza fetch provider endpoint e senza leggere/stampare token.

## Fonti consultate

Verifica documentale pubblica, senza eseguire request API:

- sito TheStatsAPI: indica esempi con `https://api.thestatsapi.com/api` e header `Authorization: Bearer ...`;
- documentazione Stats API v1: indica base URL `https://stats-api.com/api/v1`, endpoint competitions `GET /football/competitions?limit=10`, header `Accept: application/json` e `Authorization: Bearer ...`.

Nota: non è stata usata dashboard autenticata e non è stata visualizzata alcuna key.

## Contesto tecnico

Ultima real-call TheStatsAPI:

- endpoint: `GET /football/competitions`;
- URL shape usata: `https://api.thestatsapi.com/api/football/competitions`;
- HTTP status: `403`;
- `requests_executed=1`;
- standings non eseguito;
- nessun retry;
- nessuna scrittura DB;
- token non stampato;
- payload completo non salvato.

## Risultati verifica

| Area | Stato | Note |
|---|---|---|
| account attivo | non chiaro | Non verificato: dashboard autenticata non consultata. |
| piano attivo | non chiaro | Non verificato: dashboard autenticata non consultata. |
| nome piano visibile | non chiaro | Non verificato. |
| API Football inclusa | sì, da documentazione pubblica | Il sito dichiara endpoint football inclusi nei piani, ma non conferma lo specifico account. |
| accesso endpoint football incluso | non chiaro | Da verificare sull'account specifico. |
| quota disponibile | non chiaro | Non verificata in dashboard. |
| rate limit raggiunto | non chiaro | Non verificato in dashboard. |
| API key presente in dashboard | non chiaro | Non verificato; nessuna key visualizzata/coperta/stampata. |
| key attiva | non chiaro | Non verificato. |
| key associata al piano corretto | non chiaro | Non verificato. |
| key associata alla Football API | non chiaro | Non verificato. |
| necessità rigenerare key | non chiaro | Da valutare solo da dashboard. |
| auth Bearer confermata | sì | Entrambe le fonti pubbliche indicano Bearer auth. |
| auth alternativa richiesta | no evidenza | Nessuna evidenza pubblica consultata di `x-api-key`, query param o header alternativo. |
| endpoint competitions confermato | parzialmente | Confermato come path logico `/football/competitions`, ma con base URL divergente tra fonti. |
| endpoint standings confermato | sì, path logico | Confermato il pattern `/football/competitions/{competition_id}/seasons/{season_id}/standings`, ma base URL da chiarire. |
| comp_5840 Serie A | non chiaro | Non verificato senza API/dashboard. |
| sn_6199313 season corretta | non chiaro | Non verificato senza API/dashboard. |
| restrizioni IP attive | non chiaro | Non verificato. |
| restrizioni dominio attive | non chiaro | Non verificato. |
| localhost/terminale autorizzato | non chiaro | Non verificato. |

## Discrepanza principale

Le fonti pubbliche consultate non sono completamente allineate:

1. Il sito TheStatsAPI mostra endpoint sotto:
   - `https://api.thestatsapi.com/api`;
   - esempio: `/football/competitions`.

2. La documentazione Stats API v1 mostra:
   - `https://stats-api.com/api/v1`;
   - esempio: `/football/competitions?limit=10`.

Il `403` potrebbe quindi dipendere non solo da account/key/piano, ma anche da host/base URL differente rispetto alla key attuale.

## Decisione consigliata

Opzione scelta: **A. Preparare correzione base URL/endpoint nello script, senza API call**.

Motivo:

- Bearer auth sembra confermata;
- il path logico `/football/competitions` sembra corretto;
- il punto più sospetto è la base URL: `api.thestatsapi.com/api` vs `stats-api.com/api/v1`;
- non è prudente fare retry finché la base URL e l'account/key non sono confermati.

## Azioni consigliate prima di qualunque retry

1. Verifica dashboard autenticata TheStatsAPI/Stats API:
   - account attivo;
   - piano attivo;
   - key attiva;
   - prodotto/API associata alla key;
   - eventuali restrizioni IP/domain;
   - quota/rate limit.

2. Preparare in uno step separato, senza real-call:
   - supporto a `THESTATSAPI_BASE_URL=https://stats-api.com/api/v1`;
   - output disabled con nuova URL shape;
   - documentazione del cambio base URL.

3. Solo dopo conferma esplicita:
   - massimo una nuova richiesta;
   - endpoint `GET /football/competitions?limit=10`;
   - nessun standings nello stesso step;
   - nessun DB write.

## Conferme sicurezza

- Nessuna API call TheStatsAPI.
- Nessuna fetch provider endpoint.
- Nessun retry.
- Nessun token letto/stampato.
- Nessuna key copiata.
- Nessun prefisso/suffisso/hash/lunghezza key documentato.
- Nessuna scrittura DB.
- Nessun `service_role`.
- Nessun `db push/reset`.
- Provider/import spenti.
- Apify spento.
- API-Football sospeso/no retry.
- Production non toccata.

## D.17-L — Preparazione base URL alternativa

D.17-L ha preparato lo script a rappresentare la base URL alternativa documentata:

- `https://stats-api.com/api/v1`;
- target: `competitions_v1`;
- URL shape: `https://stats-api.com/api/v1/football/competitions?limit=10`.

Nessuna API call è stata eseguita.
