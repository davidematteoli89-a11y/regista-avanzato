# Flusso import competizioni e squadre

## Scopo

Questo step prepara il primo flusso di importazione senza collegare Supabase o provider esterni. Il percorso futuro sarà:

```text
script server-side → config → budget/guard → providerRouter → normalizzazione → mapping upsert → log → Supabase
Supabase → sito pubblico
```

Le pagine pubbliche non importano gli script e non chiamano provider. Leggono esclusivamente dati già validati e salvati in Supabase, così credenziali, budget, latenza e indisponibilità dei vendor non dipendono dalla visita di un utente.

## Modalità

### `dry_run`

È il default. Costruisce payload, chiavi di deduplica, warning e riepilogo. Le scritture Supabase, le richieste HTTP e le run Apify sono sempre zero.

### `mock`

Usa esplicitamente il dataset locale per provare mapping e relazioni. Anche questa modalità non scrive e non effettua rete.

### `real_disabled`

Rappresenta il futuro percorso reale mantenuto intenzionalmente bloccato. I guard impediscono chiamate e scritture finché non verrà introdotta una policy separata e approvata.

## Tracking level

- `full_official`: prova il provider stabile configurato; poiché è disattivato, il router usa il mock. Apify è sempre vietato.
- `apify_light_plus_p1`: valuta configurazione e budget P1, ma con Apify inattivo usa il mock o il record competizione minimo.
- `apify_light_plus_p2`: viene valutato dopo tutte le P1 e solo sul budget residuo; in questo step non avvia run.
- `trigger`: crea soltanto il record minimo competizione da config e non importa squadre o statistiche.

Copertura parziale o collezioni squadre vuote producono warning, non dati inventati e non interrompono il resto del batch.

## Payload competizioni

Il mapper prepara i campi della tabella `competitions`, inclusi tracking, provider, frequenza, accesso pubblico/login, highlight manuali, Video Radar, Apify, confidenza e note copertura. La stagione dry-run predefinita è `2026/27-mock` ed è deliberatamente non produttiva.

Le foreign key provider sono UUID nello schema. Finché non esiste il resolver `data_providers.provider_key → id`, restano `null` con warning. Non vengono inventati UUID.

## Payload squadre

Il mapper prepara il subset della tabella `teams`. `external_provider_id` viene conservato nel campo schema `api_team_id`; `source_provider_id` e `competition_id` restano null finché non vengono risolti gli UUID reali. Nome e slug mancanti fanno saltare il record.

## Deduplica

Nel batch corrente:

- competizione: `internal_key + season`;
- squadra con ID esterno: `provider + external ID`;
- squadra senza ID esterno: `competition internal key + slug`.

Il logger scarta chiavi duplicate nello stesso batch. Il futuro writer userà upsert sulle unique key del database e mapping esterni persistenti; solo allora potrà distinguere con certezza `created` da `updated` rispetto allo stato già presente in Supabase.

## Logging e budget

`ImportLogger` produce operazioni leggibili e riepiloghi compatibili concettualmente con `import_logs` e `provider_import_logs`, ma non possiede metodi di persistenza. Ogni fonte registra zero richieste esterne in questo step.

FULL_OFFICIAL usa il controllo budget giornaliero/mensile: budget assente porta a safe mock. Apify usa le soglie 24/30 €, valuta P1 prima di P2 e resta comunque bloccato se il provider è inattivo.

## Cosa manca per l'import reale

1. Approvare stagione e mapping provider/competizioni.
2. Installare e configurare le dipendenze già previste.
3. Implementare un resolver UUID per provider, competizioni e squadre.
4. Creare writer Supabase server-side con transazioni e RLS/service-role isolata.
5. Implementare transport provider e Apify dopo approvazione.
6. Prenotare budget in modo atomico e collegare usage log reali.
7. Aggiungere fixture, validazione schema, retry limitato e test idempotenza.
8. Eseguire prima in staging e mantenere l'ultimo snapshot valido in caso di errore.

Nessuno di questi passaggi è stato eseguito qui. Non sono presenti partite, statistiche o player stats nell'import iniziale.
