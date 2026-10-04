# Punto 18 — Provider status matrix

Stato: chiusura Punto 18 preparata in modalità sicura.

## Decisione

Dopo Punto 17 nessun provider reale viene considerato attivo o pronto per import.

| Provider | Stato Punto 18 | Motivo | Azioni consentite |
| --- | --- | --- | --- |
| Manual provider | Disponibile | Dati inseriti/curati manualmente, senza fetch esterne | Uso editoriale controllato e dati manuali |
| Mock provider | Disponibile | Demo e sviluppo locale/staging | Mock/dry-run locali |
| Stable provider | Off | Alias futuro, non ancora legato a provider verificato | Solo dry-run locali |
| TheStatsAPI / Stats API | Sospeso | HTTP 403, account/piano/key/base URL non chiariti | Nessun retry; solo analisi documentale futura |
| API-Football | Sospeso | HTTP 403 nel tentativo precedente | Nessun retry |
| Apify / SofaScore | Off | Budget guard e piano non ancora da eseguire | Nessuna run Apify |

## Conferme operative

- `realWritesEnabled=false`.
- Provider/import reali spenti.
- Apify spento.
- Nessun import live.
- Nessuna fetch provider.
- Nessuna scrittura DB.
- Production non toccata.

## Esito

Punto 18 formalizza che il prodotto può proseguire con dati manuali/mock e fixture locali senza dipendere da provider reali attivi.
