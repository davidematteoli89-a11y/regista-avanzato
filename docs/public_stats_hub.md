# Public Stats Hub

## Accesso pubblico

Un visitatore anonimo può consultare elenco e pagina base delle competizioni, classifiche, risultati, calendario e anteprime di squadre, giocatori e statistiche. Quando una sezione contiene metriche profonde, link highlights o Video Radar completo, vede un'anteprima e la CTA:

> Accedi gratis per vedere statistiche complete, link highlights ufficiali e Video Radar.

Un account free autenticato può visualizzare le statistiche complete disponibili, i profili completi di giocatori e squadre, la scheda partita, il riepilogo gara e gli eventuali link ufficiali verificati. I preferiti restano futuri.

## Quota ricerca separata

Navigare nello Stats Hub, aprire una scheda, una classifica, statistiche, highlights o Video Radar non consuma le tre ricerche avanzate mensili. La quota appartiene esclusivamente all'invio intenzionale del form in `/ricerca`; nessun componente dello Stats Hub importa o chiama il contatore.

## Livelli di copertura

Le competizioni `full_official` mostrano il badge “Statistiche complete disponibili”: in futuro saranno alimentate dal provider stabile tramite import. Le `apify_light_plus_p1/p2` mostrano “Aggiornamento settimanale da fonte esterna” e possono avere copertura parziale. I badge descrivono la strategia, non garantiscono che ogni metrica esista.

In questo step ogni record mostra “Dati dimostrativi”. Valori mancanti restano assenti o `null`; non vengono inventati link ufficiali, statistiche o squadre per riempire le pagine.

## Architettura di lettura

Le pagine importano soltanto funzioni `getPublic...` da `lib/publicData`. Oggi queste leggono un piccolo snapshot mock in memoria. In futuro dovranno leggere viste/tabelle pubblicabili in Supabase:

```text
provider/import batch → validazione/upsert Supabase → getPublic... server-side → pagina pubblica
```

Le pagine non possono importare `providerRouter`, `FootballDataProvider`, adapter vendor, moduli Apify o script di import. Non esistono fetch verso TheStatsAPI, API-Football, SofaScore o altri provider durante una visita.

## Collegamento futuro a Supabase

Prima del collegamento servono:

- dipendenze installate e client server-side verificato;
- viste o query pubbliche con soli contenuti approvati;
- RLS per anonimo e authenticated;
- mapping UUID e dati seed/staging;
- filtri, paginazione, cache e gestione not-found;
- freshness timestamp e copertura leggibile, senza log tecnici pubblici;
- test che impediscano regressioni verso chiamate provider lato pagina;
- test di accesso anonimo/free su statistiche e highlights.

Nessuna query, policy, scrittura o connessione Supabase è stata attivata in questo step.
