# Provider dry-run plan — D.1

Stato: piano preparato, nessuna chiamata reale.

## Obiettivo

Preparare test provider calcio reali in modalità dry-run, senza fetch esterne, senza scritture Supabase e senza consumo budget.

## Provider stabile futuro

Provider candidati:

- TheStatsAPI;
- API-Football.

Wrapper:

- `stableFootballProvider`.

Adapter già presenti:

- `lib/dataProvider/stableFootballProvider.ts`;
- `lib/dataProvider/theStatsApiProvider.ts`;
- `lib/dataProvider/apiFootballProvider.ts`;
- `lib/dataProvider/stableProviderConfig.ts`;
- `lib/dataProvider/stableProviderMappers.ts`.

Variabili env future, senza valori:

- `STABLE_PROVIDER_NAME`;
- `STATSAPI_KEY`;
- `STATSAPI_BASE_URL`;
- `API_FOOTBALL_KEY`;
- `API_FOOTBALL_BASE_URL`;
- `STABLE_PROVIDER_DAILY_BUDGET_REQUESTS`;
- `STABLE_PROVIDER_MONTHLY_BUDGET_REQUESTS`.

Ambiente:

- configurare prima solo Vercel Preview;
- non configurare Production;
- non stampare token;
- non usare service role nel client.

## Piano dry-run stabile

1. Lasciare `stable_provider`, `the_stats_api`, `api_football` disattivati.
2. Scegliere una competizione test, preferibilmente `serie-a`.
3. Eseguire solo mapping locale/mock:
   - competizione;
   - squadre;
   - fixtures;
   - standings.
4. Verificare payload Supabase futuri senza scrivere:
   - `competitions`;
   - `teams`;
   - `matches`;
   - `standings`;
   - `provider_import_logs`;
   - `api_usage_logs`.
5. Loggare report locale safe:
   - provider risolto;
   - fallback usato;
   - numero record previsti;
   - warning;
   - scritture Supabase = 0;
   - chiamate esterne = 0.
6. Solo dopo approvazione futura, preparare un dry-run con fixture payload reale salvato localmente e redatto, senza token.

## Script già disponibili

Non duplicare per ora:

- `scripts/runInitialImport.ts`;
- `scripts/importCompetitions.ts`;
- `scripts/importTeams.ts`;
- `scripts/importFixtures.ts`;
- `scripts/runDailyMatchesImport.ts`;
- `scripts/runFullStatsImport.ts`;
- `scripts/importMatchStats.ts`;
- `scripts/importPlayerStats.ts`;
- `scripts/importPlayerSeasonStats.ts`;
- `scripts/importTeamSeasonStats.ts`.

Questi script sono stati progettati come dry-run/mock e devono restare senza fetch reali finché non viene approvata una fase dedicata.

## Script proposti per D.2

Stato D.2: creato script locale read-only.

Script disponibile:

- `scripts/provider/auditProviderConfig.ts`.

Comando:

```bash
npm run audit:providers
```

Lo script controlla:

- provider modellati in `config/providers.ts`;
- stato atteso provider:
  - `mock_provider` on;
  - `manual_provider` on;
  - `stable_provider` off;
  - `the_stats_api` off;
  - `api_football` off;
  - `apify_sofascore` off;
- conteggio competizioni totali;
- conteggio FULL_OFFICIAL;
- conteggio APIFY P1;
- conteggio APIFY P2;
- conteggio TRIGGER;
- seed `import_enabled=false`;
- presenza documentazione guardie budget Apify.

Output D.2 verificato:

```text
providers_total=6
providers_state=stable_provider:off, the_stats_api:off, api_football:off, apify_sofascore:off, manual_provider:on, mock_provider:on
competitions_total=43
full_official=14
apify_light_plus_p1=15
apify_light_plus_p2=14
trigger=0
seed_import_enabled_default=false
apify_budget_doc=present
warnings=0
```

Regole per ogni script:

- nessun output env;
- nessun token;
- nessuna fetch;
- nessuna scrittura DB;
- nessun import reale;
- report leggibile e sicuro.

Script futuri, solo se necessari:

- `scripts/provider/checkProviderBudget.ts`.

## D.3 — Stable provider dry-run singola competizione

Stato: implementato localmente e verificato.

Script:

- `scripts/provider/dryRunStableProvider.ts`;
- comando `npm run dry-run:stable-provider`;
- default competition: `serie-a`.

Uso:

```bash
npm run dry-run:stable-provider
```

Oppure:

```bash
npm run dry-run:stable-provider -- --competition=serie-a
```

Cosa simula:

- futuro provider `stable_provider`;
- candidati esterni `the_stats_api/api_football`;
- mapping verso payload futuri:
  - `teams`;
  - `matches`;
  - `standings`;
  - `provider_import_logs`;
- 4 squadre demo;
- 2 partite demo;
- 4 righe classifica demo;
- summary import mock.

Cosa non fa:

- non legge `.env.local`;
- non legge `process.env`;
- non stampa token;
- non chiama TheStatsAPI;
- non chiama API-Football;
- non chiama Apify;
- non chiama SofaScore;
- non fa fetch;
- non apre client Supabase;
- non scrive DB;
- non attiva provider/import.

Output verificato:

```text
competition_slug=serie-a
competition_name=Serie A
tracking_level=full_official
provider_candidate=stable_provider
external_provider_candidates=the_stats_api/api_football
mode=dry_run
fetch_external=false
db_write=false
mapped_teams_count=4
mapped_matches_count=2
mapped_standings_count=4
planned_tables=teams,matches,standings,provider_import_logs
safety_checks=stable_provider_off:ok, the_stats_api_off:ok, api_football_off:ok, apify_off:ok, no_external_fetch:ok, no_db_write:ok, no_token_read:ok
warnings=0
```

Limiti:

- payload statico/demo, non proveniente da provider reale;
- nessun confronto con Supabase live;
- nessun mapping ID esterno reale;
- nessuna deduplica DB effettiva;
- nessun log persistito.

D.4 consigliato:

- dry-run provider budget/logging: simulare request budget e provider_import_logs/api_usage_logs in memoria, senza token e senza DB write.

## Rollback

In dry-run non serve rollback dati perché non si scrive.

Quando verrà autorizzato un import reale:

- usare batch id;
- scrivere `provider_import_logs`;
- scrivere `import_logs`;
- mantenere dati precedenti finché il batch non è validato;
- prevedere query rollback per batch;
- non cancellare snapshot precedente su errore.

## Regola anti chiamata lato utente

Le pagine pubbliche devono continuare a leggere solo Supabase/public views.

Vietato:

- importare `providerRouter` in pagine pubbliche;
- chiamare provider da route pubbliche;
- fare fetch provider su render pagina;
- usare Apify per richieste utente.

## D.4 — Provider logging/budget dry-run

Stato: preparato localmente, nessuna chiamata reale.

Comando:

```bash
npm run dry-run:provider-logging
```

Lo script simula in memoria:

- una run futura su `serie-a`;
- provider candidato `stable_provider`;
- shape futura per `provider_import_logs`;
- shape futura per `api_usage_logs`;
- budget guard Apify con soglie 30/24/30 €.

Output atteso:

```text
mode=dry_run
competition_slug=serie-a
provider=stable_provider
external_fetch=false
db_write=false
provider_import_log_shape=ok
api_usage_log_shape=ok
apify_budget_guard=ok
monthly_budget_limit=30
warning_threshold=24
hard_stop=30
estimated_cost=0
should_run=true reason=budget_available_for_dry_run
warnings=0
```

Campi simulati per `provider_import_logs`:

- `provider_id`;
- `competition_id`;
- `script_name`;
- `status`;
- `started_at`;
- `finished_at`;
- `items_imported`;
- `errors`;
- `notes`.

Campi simulati per `api_usage_logs`:

- `provider_id`;
- `endpoint`;
- `request_count`;
- `date`;
- `competition_id`;
- `script_name`;
- `response_status`;
- `estimated_cost_eur`;
- `notes`.

Lo script non fa:

- lettura `.env.local`;
- lettura/stampa token;
- fetch esterne;
- chiamate TheStatsAPI/API-Football;
- chiamate Apify/SofaScore;
- scritture Supabase;
- attivazione provider/import.

Limiti:

- non valida ancora UUID reali Supabase;
- non scrive record su `provider_import_logs` o `api_usage_logs`;
- non misura costi reali;
- non sostituisce il futuro writer transazionale.

D.5 consigliato:

- progettare writer/import log server-side in modalità ancora disabilitata, con batch id, rollback e flag esplicito prima di ogni scrittura.
