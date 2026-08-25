# Strategia Data Provider

## Architettura astratta

`FootballDataProvider` è il contratto comune per competizioni, squadre, calendario, risultati, classifiche, eventi e statistiche. I tipi normalizzati isolano il resto del progetto dai nomi campo e dagli ID specifici di ciascun fornitore.

Il percorso previsto è sempre:

```text
job server-side → router → provider → normalizzazione → validazione → Supabase → sito pubblico
```

Il percorso `pagina pubblica → provider esterno` è vietato. Le pagine leggono solo dati persistiti in Supabase: questo protegge credenziali e budget, evita latenze esterne durante la visita e permette di mantenere l'ultimo dato valido quando una fonte non risponde.

## Implementazioni disponibili

### Mock provider

`mockProvider.ts` è funzionante e non richiede env. Restituisce un dataset coerente con due squadre, quattro giocatori, una gara conclusa 3-2, una gara programmata, classifica, eventi e statistiche base. Serve per sviluppare e testare i futuri import senza consumi né rete.

### Manual provider

`manualProvider.ts` riceve dati già inseriti e validati dall'area editoriale. Di default restituisce collezioni vuote tipizzate. Può rappresentare link ufficiali agli highlights e metadati editoriali; non effettua scraping, non chiama Apify e non scarica né ospita video.

### Provider stabile futuro

`stable_provider`, `the_stats_api` e `api_football` hanno ora adapter placeholder compatibili con il contratto, ma nessun trasporto HTTP. Prima di attivarne uno vanno verificati piano, copertura, licenza di pubblicazione, rate limit, SLA, mapping ID e budget. Le credenziali resteranno server-side; fino ad allora ogni adapter usa il mock con errore controllato.

### Apify/SofaScore futuro

`apify_sofascore` ha un adapter placeholder senza trasporto e resta disattivato. Accetta soltanto una competizione minore esplicitamente abilitata, altrimenti restituisce un errore controllato. Un futuro transport potrà essere usato solo dai job settimanali autorizzati, dopo il controllo budget. Non potrà essere invocato in tempo reale o durante l'apertura di una pagina.

## Router e fallback

`providerRouter.ts` legge `config/competitions.ts` e `config/providers.ts`, percorre `provider_priority` e seleziona soltanto provider attivi con un adapter implementato. Il provider manuale non sostituisce dati statistici; è selezionabile con lo scopo esplicito `manual_editorial`.

Il comportamento è safe by default:

- provider reale inattivo → mock;
- provider attivo ma adapter assente → mock;
- competizione sconosciuta → mock;
- Apify disattivato globalmente o sulla competizione → mai selezionato;
- flusso manuale non disponibile → mock vuoto/coerente, senza rete.

La decisione espone provider configurato, provider risolto, motivo e indicatore di fallback per rendere verificabile il comportamento nei futuri log di import.

## Normalizzazione ed errori

`normalizers.ts` contiene trasformazioni pure con default conservativi. Ogni entità conserva provider, ID esterno, livello di confidenza e data di aggiornamento. `errors.ts` definisce errori serializzabili e distingue gli errori ritentabili.

## Confini di questo step

Non sono presenti chiamate a TheStatsAPI, API-Football, Apify o Supabase. Non sono implementati import, scritture database, retry, schedulazione o caching reale. L'interfaccia è pronta per questi passaggi, ma l'attivazione richiederà una decisione separata.
