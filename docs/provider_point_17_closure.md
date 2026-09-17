# Punto 17 — Chiusura provider TheStatsAPI / Stats API

Data/ora locale: 2026-09-17 11:51:51 CEST

## Sintesi

Il Punto 17 viene chiuso come verifica provider non pronta per import/mapping operativo.

Risultati principali:

- API-Football resta sospeso/no retry dopo precedente `403`.
- TheStatsAPI legacy (`https://api.thestatsapi.com/api`) ha risposto `403`.
- Stats API v1 è stata preparata in modalità gated/disabled.
- Il tentativo finale target `competitions_v1` ha eseguito una sola richiesta, ma l'URL effettiva è stata sovrascritta dal base URL locale legacy e ha restituito ancora `403`.
- Lo script è stato corretto per evitare questa sovrascrittura futura.
- Nessuna scrittura DB.
- Nessun import.
- Nessuna provider activation.
- Nessun deploy.
- Production non toccata.

## Stato finale provider

| Provider | Stato |
| --- | --- |
| API-Football | sospeso/no retry |
| TheStatsAPI legacy | sospeso dopo `403` |
| Stats API v1 | supporto script gated pronto, ma nessuna prova riuscita |
| Apify | spento |
| Provider/import reali | spenti |

## Decisione finale

Punto 17 completato come audit/probe controllata, ma senza provider approvato per dati reali.

TheStatsAPI/Stats API resta sospeso finché non vengono chiariti:

- account attivo;
- piano attivo;
- key attiva;
- prodotto/API Football inclusa;
- base URL corretta;
- eventuali restrizioni IP/domain;
- quota/rate limit.

## Cosa NON è stato fatto

- Nessuna standings call.
- Nessun retry.
- Nessuna seconda richiesta.
- Nessun loop.
- Nessuna paginazione.
- Nessun import.
- Nessuna scrittura DB.
- Nessuna attivazione provider.
- Nessun `service_role`.
- Nessun `db push/reset`.
- Nessun deploy.
- Nessuna Production.
- Nessuna API key stampata o committata.
- Nessun payload completo salvato.

## Prossimo macro-step consigliato

Non procedere a mapping/import reale con TheStatsAPI/Stats API.

Scelte possibili:

1. chiarire account/key/piano con dashboard/supporto provider;
2. mantenere TheStatsAPI sospeso e valutare provider alternativo;
3. continuare con dati manuali/mock finché un provider non è verificato;
4. se si autorizza una futura prova, farla come nuovo punto separato, massimo una richiesta, solo dopo nuova conferma esplicita.
