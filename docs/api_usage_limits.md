# Limiti utilizzo API

## Tabelle

`api_usage_logs` aggrega richieste per provider, endpoint, giorno, competizione e script. `provider_import_logs` e `import_logs` registrano esiti, tempi e record. `data_providers` conserva budget e soglie configurate.

## Controlli futuri

- Quote per provider ed endpoint.
- Rate limit server-side, timeout e retry con backoff.
- Cache e import batch per evitare duplicati.
- Circuit breaker e dati stale dichiarati.
- Alert su errori, latenza, costo e quota residua.
- Hard stop prima del superamento budget.

Lo schema registra i dati ma non intercetta chiamate, non calcola costi e non applica rate limit. Queste responsabilità resteranno nel layer server/import.

## Apify

Il limite è 30 €, con warning a 24 €. P2 viene esclusa al warning; a hard stop non devono partire nuove run. Costo contabilizzato e stimato devono essere considerati insieme.

## Account free

La quota di tre ricerche avanzate mensili è separata dai limiti delle API. Deve essere consumata atomicamente solo dopo che la richiesta è stata autorizzata e prima dell'esecuzione effettiva.

## Da configurare

Piani reali, finestre temporali, endpoint costosi, soglie di errore, destinatari degli alert, retention log e dashboard di monitoraggio.
