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

Solo se serve maggiore osservabilità:

- `scripts/provider/auditProviderConfig.ts`;
- `scripts/provider/dryRunStableProvider.ts`;
- `scripts/provider/checkProviderBudget.ts`.

Regole per ogni script:

- nessun output env;
- nessun token;
- nessuna fetch;
- nessuna scrittura DB;
- nessun import reale;
- report leggibile e sicuro.

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
