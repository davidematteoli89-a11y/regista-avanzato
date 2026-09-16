# D.17-G — Debug endpoint 404 TheStatsAPI

Stato: completato senza nuove real-call.

## Contesto

D.17-E/F ha eseguito una sola richiesta reale controllata:

- endpoint provato: `GET /football/competitions`;
- risultato: HTTP `404`;
- `requests_executed=1`;
- standings non eseguito;
- nessun retry;
- nessuna seconda richiesta;
- nessuna response completa salvata;
- nessuna scrittura DB.

## Audit URL composition

Prima della correzione lo script usava `new URL(endpoint, baseUrl)` con:

- base URL: `https://api.thestatsapi.com/api`;
- endpoint: `/football/competitions`.

In JavaScript, quando l'endpoint inizia con `/`, `new URL()` sostituisce il path del base URL. Quindi lo script poteva generare:

- `https://api.thestatsapi.com/football/competitions`;
- `https://api.thestatsapi.com/football/competitions/comp_5840/seasons/sn_6199313/standings`.

La forma attesa è:

- `https://api.thestatsapi.com/api/football/competitions`;
- `https://api.thestatsapi.com/api/football/competitions/comp_5840/seasons/sn_6199313/standings`.

## Correzione script

Correzione applicata:

- funzione `joinUrl(baseUrl, endpoint)`;
- normalizzazione slash finale del base URL;
- normalizzazione slash iniziale del path;
- preservazione del segmento `/api`;
- output sanificato delle URL shape in modalità disabled.

Output disabled atteso:

```text
base_url_shape=https://api.thestatsapi.com/api
competitions_path=/football/competitions
competitions_url_shape=https://api.thestatsapi.com/api/football/competitions
standings_path=/football/competitions/comp_5840/seasons/sn_6199313/standings
standings_url_shape=https://api.thestatsapi.com/api/football/competitions/comp_5840/seasons/sn_6199313/standings
possible_double_api=false
possible_double_slash=false
token_printed=false
```

## Decisione prossimo retry

Scelta consigliata: retry leggero su `/football/competitions`.

Motivo:

- il `404` precedente è probabilmente spiegato dalla perdita del segmento `/api`;
- il retry deve essere una fase separata;
- massimo una richiesta;
- nessun standings nello stesso step.

## Condizioni obbligatorie prima della prossima real-call

- Massimo 1 richiesta.
- Solo TheStatsAPI.
- Endpoint: `GET /football/competitions`.
- Nessun retry.
- Nessun loop.
- Nessuna paginazione.
- Nessun DB write.
- Nessun import.
- Nessuna provider activation.
- Nessun `service_role`.
- `token_printed=false`.
- Response completa non stampata.
- Production non toccata.
- API-Football sospeso/no retry.
- Apify spento.

## Conferme D.17-G

- Nessuna nuova real-call TheStatsAPI.
- Nessuna fetch provider.
- Nessun token letto/stampato.
- Nessuna scrittura DB.
- Nessun `service_role`.
- Nessun `db push/reset`.
- Provider/import spenti.
- Apify spento.
- API-Football sospeso/no retry.
- Production non toccata.

## Prossimo step consigliato

D.17-H — retry singolo su endpoint leggero corretto `GET /football/competitions`, solo dopo conferma esplicita.
