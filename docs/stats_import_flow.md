# Import statistiche FULL_OFFICIAL

## Ambito

Il modulo prepara quattro flussi distinti:

- statistiche squadra per partita;
- statistiche squadra stagionali;
- statistiche giocatore per partita;
- statistiche giocatore stagionali.

Sono ammesse esclusivamente le 14 competizioni `full_official`. Le 29 competizioni Apify P1/P2 vengono contate come saltate e il livello `trigger` è escluso. Apify non viene importato né consultato per statistiche profonde.

## Flusso

```text
script server-side → filtro FULL_OFFICIAL → budget stabile → providerRouter → mapper → log → Supabase
Supabase → sito pubblico autenticato
```

Le pagine pubbliche non importano questi moduli e non interrogano provider. Il sito leggerà soltanto gli snapshot già persistiti in Supabase.

## Modalità

- `dry_run`, default: mock, payload e log in memoria, zero scritture;
- `mock`: test esplicito con dataset locale;
- `real_disabled`: percorso futuro mantenuto bloccato per rete e database.

La stagione di default è `2026/27-mock` e non deve essere usata in produzione.

## Perché soltanto FULL_OFFICIAL

Queste statistiche richiedono copertura continua, mapping affidabili, metriche coerenti e un provider con licenza e stabilità adeguate. I campionati Apify light hanno copertura variabile e sono pensati per risultati, calendario ed eventi essenziali, non per promettere statistiche profonde comparabili.

## Match stats e season stats

Le match stats descrivono una singola partita e si deduplicano tramite match/team/player/provider. Le season stats aggregano una stagione e si deduplicano tramite competition/season/team o player/provider.

I nomi vengono tradotti sui campi schema esistenti. Metriche senza colonna dedicata — key pass, dribbling, duelli, cartellini, xG/xA aggiuntivi, forma e medie di possesso — entrano in `extra_stats` solo se realmente disponibili.

## Dati mancanti

- xG e xA non vengono derivati o impostati a zero;
- starter, passaggi, tackle, intercetti e parate restano null se assenti;
- le parate consentono record portiere senza obbligarle per i giocatori di movimento;
- clean sheet stagionali mancanti restano null nel payload dry-run, anche se lo schema attuale richiederà una decisione prima della scrittura;
- collezioni vuote generano warning e non interrompono le altre competizioni.

Le foreign key provider, competition, match, team e player rimangono null finché non esiste un resolver UUID. Poiché diverse FK sono `not null`, i guard impediscono qualsiasi inserimento prematuro.

## Logging e fallback

`StatsImportLogger` produce riepiloghi leggibili, deduplica il batch e definisce il contratto del futuro collegamento a `import_logs` e `provider_import_logs`. Non possiede un writer Supabase.

Il budget stabile non configurato forza safe mock. Se il provider fallisce, il batch continua e il precedente snapshot non viene cancellato. Il router non può selezionare Apify per questo modulo.

## Deduplica futura

- `team_match_stats`: match + team + provider;
- `team_season_stats`: competition + season + team + provider;
- `player_match_stats`: match + player + provider;
- `player_season_stats`: competition + season + player + team + provider.

Gli upsert reali dovranno usare le unique key già presenti nello schema e distinguere create/update confrontando il database.

## Cosa manca

Scelta del provider stabile, fixture reali, mapping metriche, resolver UUID, writer Supabase, budget persistente, usage log, validazione dei range, test portieri/movimento, upsert idempotenti, staging, retry e scheduler. Non sono stati installati pacchetti, applicato SQL, modificati accessi login o pubblicati contenuti.
