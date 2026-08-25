# Provider Activation Plan

## Principio

Il frontend non conosce provider esterni. Solo job server-side chiamano adapter, normalizzano dati e scrivono su Supabase. Le pagine leggono snapshot salvati.

## Scelta del provider stabile

Prima di scegliere TheStatsAPI o API-Football, confrontare con prova documentata:

- copertura dei 14 campionati FULL;
- disponibilità storica e frequenza aggiornamento;
- match, eventi, standings, team/player stats e qualità degli ID;
- rate limit, costo, overage e SLA;
- termini di memorizzazione, pubblicazione e attribuzione;
- supporto, stabilità payload e ambiente sandbox.

Non attivare entrambi nella prima integrazione.

## Pilot FULL consigliato

1. Scegliere una competizione e una stagione.
2. Inserire token e base URL solo nei secret server-side.
3. Implementare endpoint minimi: competitions e teams.
4. Salvare fixture anonimizzate dei payload per i test.
5. Completare mapping ID esterni e normalizzatori conservativi.
6. Eseguire dry-run e confrontare quantità/identità.
7. Attivare upsert su Supabase dev con chiavi univoche.
8. Aggiungere fixtures/results, poi standings, infine statistiche.
9. Misurare richieste e costo prima di ampliare copertura.

## Guardie operative

- Provider disattivato significa nessuna fetch, non solo fallback UI.
- Budget non configurato significa safe/mock.
- Ogni chiamata ha request/run ID e log redatto.
- Budget check e prenotazione quota devono essere atomici.
- Timeout e retry limitati; nessun retry infinito.
- Import idempotenti; correzioni provider aggiornano senza duplicare.
- Fallback all'ultimo snapshot valido; un failure non cancella dati.

## Piano Apify/SofaScore

Apify resta separato dal provider FULL:

- solo P1/P2, mai FULL;
- una run settimanale, latest round only;
- P1 prima di P2;
- sotto 24 €: P1 e P2 se resta budget;
- da 24 € a meno di 30 €: solo P1 essenziali;
- da 30 €: hard stop;
- nessuna live call, storico massivo o video.

Prima del pilot verificare licenze e termini sia di Apify/actor sia della fonte dati. Iniziare con una sola competizione P1 e almeno quattro run controllate prima di considerare P2.

## Mapping e deduplica

- Conservare `(provider_id, external_id, entity_type)` in una tabella/mappa stabile.
- Non usare il nome visuale come unica chiave.
- Gestire cambi nome, promozioni/retrocessioni, fusioni e squadre omonime.
- Per i match combinare external ID, stagione, competizione e provider.
- Registrare mapper version e payload hash per riconciliazione.

## Go/no-go

Go solo se contratto/licenza, budget, mapper testati, upsert idempotente, monitoraggio e fallback sono tutti verificati. In assenza di uno di questi elementi, mantenere `active: false` e usare mock.
