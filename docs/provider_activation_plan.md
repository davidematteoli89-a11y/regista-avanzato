# Provider Activation Plan

## Principio

Il frontend non conosce provider esterni. Solo job server-side chiamano adapter, normalizzano dati e scrivono su Supabase. Le pagine leggono snapshot salvati.

## Stato attuale

- `mock_provider`: usato per sviluppo/demo.
- Stable provider: disattivato.
- TheStatsAPI adapter: placeholder.
- API-Football adapter: placeholder.
- Apify/SofaScore: disattivato.
- Manual provider: disponibile per contenuti/link inseriti manualmente.

## Checklist prima dei provider reali

- [ ] Confermare provider stabile da usare.
- [ ] Definire mapping ID esterni per competizioni/squadre/giocatori/partite.
- [ ] Configurare budget richieste giornaliero/mensile.
- [ ] Verificare logging `api_usage_logs`.
- [ ] Eseguire dry-run senza scrittura.
- [ ] Eseguire import su un sottoinsieme minimo.
- [ ] Verificare deduplica e rollback.
- [ ] Verificare che nessuna pagina pubblica chiami provider.
- [ ] Verificare che il sito legga solo Supabase.
- [ ] Verificare contratto/licenza, attribuzione e diritti di memorizzazione/pubblicazione.

## Pilot FULL consigliato

1. Scegliere una competizione e una stagione.
2. Inserire token e base URL solo nei secret server-side.
3. Implementare endpoint minimi: competitions e teams.
4. Salvare fixture anonimizzate dei payload per i test.
5. Completare mapping ID esterni e normalizzatori conservativi.
6. Eseguire dry-run e confrontare quantità/identità.
7. Attivare upsert su Supabase staging solo dopo conferma.
8. Aggiungere fixtures/results, poi standings, infine statistiche.
9. Misurare richieste e costo prima di ampliare copertura.

## Checklist prima di Apify

- [ ] Lasciare `apify_sofascore` disattivato fino a test budget.
- [ ] Confermare budget 30 €/mese, warning 24 €, hard stop 30 €.
- [ ] Testare `checkApifyMonthlyBudget`.
- [ ] Testare piano weekly import solo latest round.
- [ ] Verificare che priority 1 venga prima di priority 2.
- [ ] Verificare che FULL_OFFICIAL non usi mai Apify.
- [ ] Nessun live scraping.
- [ ] Nessun download/reupload video.
- [ ] Nessuna chiamata lato utente.
- [ ] Verificare termini/licenze di Apify, actor e fonte dati.

## Guardie operative

- Provider disattivato significa nessuna fetch, non solo fallback UI.
- Budget non configurato significa safe/mock.
- Ogni chiamata ha request/run ID e log redatto.
- Budget check e prenotazione quota devono essere atomici.
- Timeout e retry limitati; nessun retry infinito.
- Import idempotenti; correzioni provider aggiornano senza duplicare.
- Fallback all'ultimo snapshot valido; un failure non cancella dati.

## FASE C consigliata

1. Collegare public readers Supabase minimi.
2. Pubblicare seed demo controllato.
3. Rendere admin editoriale manuale utile.
4. Tenere stable provider in dry-run.
5. Attivare primo import reale solo dopo conferma.
6. Tenere Apify spento fino a test budget.
7. Rifinire CTA Substack.

## Go/no-go

Go solo se contratto/licenza, budget, mapper testati, upsert idempotente, monitoraggio e fallback sono tutti verificati. In assenza di uno di questi elementi, mantenere `active: false` e usare mock.

## D.1 — Provider activation dry-run audit

Stato: piano dry-run preparato, nessun provider attivato.

Provider modellati nel codice:

- `mock_provider`: attivo nel catalogo locale, usato come fallback sviluppo/demo;
- `manual_provider`: attivo nel catalogo locale, dedicato a fonti editoriali e link ufficiali manuali;
- `stable_provider`: wrapper astratto per futuro provider stabile FULL_OFFICIAL, disattivato;
- `the_stats_api`: adapter placeholder, disattivato;
- `api_football`: adapter placeholder, disattivato;
- `apify_sofascore`: adapter placeholder/dry-run per campionati minori, disattivato.

Provider seedati nello staging:

- 6 provider base da `0006_seed_base_data.sql`;
- provider reali disattivati;
- Apify disattivato;
- import non abilitati.

Competizioni modellate:

- totale catalogo locale: 43;
- FULL_OFFICIAL: 14;
- APIFY_LIGHT_PLUS_PRIORITY_1: 15;
- APIFY_LIGHT_PLUS_PRIORITY_2: 14;
- TRIGGER concreti: 0.

FULL_OFFICIAL:

- Serie A;
- Premier League;
- LaLiga;
- Bundesliga;
- Ligue 1;
- UEFA Champions League;
- UEFA Europa League;
- Copa Libertadores;
- Brasileirão Série A;
- Argentina Primera División;
- Eredivisie;
- Jupiler Pro League;
- Primeira Liga;
- Süper Lig.

APIFY_LIGHT_PLUS_PRIORITY_1:

- Swiss Super League;
- Austrian Bundesliga;
- Danish Superliga;
- Allsvenskan;
- Eliteserien;
- Ekstraklasa;
- HNL;
- Serbian SuperLiga;
- J1 League;
- K League 1;
- Major League Soccer;
- Uruguayan Primera División;
- Categoría Primera A;
- Chilean Primera División;
- Ligue 2.

APIFY_LIGHT_PLUS_PRIORITY_2:

- Super League Greece;
- Czech First League;
- Ukrainian Premier League;
- Liga I Romania;
- Nemzeti Bajnokság I;
- Slovak Super Liga;
- Slovenian PrvaLiga;
- Premier League Bosnia and Herzegovina;
- Bulgarian First League;
- Liga 1 Peru;
- Paraguayan Primera División;
- Venezuelan Primera División;
- Bolivian División Profesional;
- Russian Premier League.

Admin stato provider/import:

- `/admin/providers` legge `data_providers` da Supabase staging se configurato, fallback mock;
- `/admin/competitions` mostra configurazione descrittiva locale;
- `/admin/imports` resta mock/dry-run;
- `/admin/apify-usage` resta mock/dry-run;
- nessuna pagina pubblica usa provider esterni.

Tabelle principali coinvolte:

- provider: `data_providers`, `provider_competition_config`;
- import/log: `provider_import_logs`, `import_logs`, `api_usage_logs`;
- Apify: `apify_usage_logs`, `apify_budget_status`;
- calcio: `competitions`, `teams`, `players`, `matches`, `match_events`, `standings`;
- statistiche: `team_match_stats`, `team_season_stats`, `player_match_stats`, `player_season_stats`.

Query read-only staging:

```sql
select count(*) as active_providers
from public.data_providers
where is_active = true;

select provider_key, name, provider_type, is_active, priority, monthly_budget_eur, warning_budget_eur, hard_stop_budget_eur
from public.data_providers
order by priority;

select count(*) as enabled_imports
from public.provider_competition_config
where import_enabled = true;

select tracking_level, count(*) as competitions
from public.competitions
group by tracking_level
order by tracking_level;

select c.slug, c.name, c.tracking_level, p.provider_key, pc.import_enabled, pc.priority, pc.data_confidence
from public.provider_competition_config pc
join public.competitions c on c.id = pc.competition_id
join public.data_providers p on p.id = pc.provider_id
order by c.tracking_level, c.slug, pc.priority;

select status, count(*) as runs
from public.import_logs
group by status
order by status;

select status, count(*) as provider_runs
from public.provider_import_logs
group by status
order by status;

select *
from public.apify_budget_status
order by period_start desc
limit 12;

select count(*) as teams_demo from public.public_teams;
select count(*) as matches_demo from public.public_matches;
select count(*) as standings_demo from public.public_standings;
```

Go/no-go D.2:

- non inserire token prima del dry-run;
- non attivare `is_active` o `import_enabled`;
- non aggiungere env su Production;
- prima simulare un provider stabile su una sola competizione demo;
- prima simulare Apify con budget mock e latest round only.

## D.2 — Provider config audit script

Stato: implementato localmente, nessuna chiamata esterna.

File:

- `scripts/provider/auditProviderConfig.ts`;
- comando `npm run audit:providers`.

Cosa fa:

- legge solo file statici versionati;
- analizza `config/providers.ts`;
- analizza `config/competitions.ts`;
- controlla la migrazione seed per `import_enabled=false`;
- controlla che il documento budget Apify citi hard stop;
- stampa report testuale sicuro.

Cosa non fa:

- non legge `.env.local`;
- non stampa env;
- non legge token;
- non chiama provider;
- non chiama Apify;
- non chiama SofaScore;
- non fa scraping;
- non apre connessioni DB;
- non scrive Supabase;
- non attiva import.

Esito corrente:

- provider totali: 6;
- provider reali spenti;
- Apify spento;
- competizioni totali: 43;
- FULL_OFFICIAL: 14;
- APIFY P1: 15;
- APIFY P2: 14;
- TRIGGER: 0;
- warnings: 0.

D.3 consigliato:

- dry-run stabile limitato a `serie-a`, usando solo adapter mock/fallback e payload futuri;
- nessun fetch reale;
- nessun token;
- nessuna scrittura DB.

## D.3 — Stable provider dry-run eseguito

Stato: completato localmente, nessun provider attivato.

Comando:

```bash
npm run dry-run:stable-provider
```

Risultato:

- competizione: `serie-a`;
- tracking level: `full_official`;
- provider candidato: `stable_provider`;
- candidati esterni: `the_stats_api/api_football`;
- mapped teams: 4;
- mapped matches: 2;
- mapped standings: 4;
- planned tables: `teams`, `matches`, `standings`, `provider_import_logs`;
- warnings: 0.

Safety checks:

- `stable_provider` off;
- `the_stats_api` off;
- `api_football` off;
- Apify off;
- fetch esterne 0;
- scritture DB 0;
- token letti/stampati 0.

Questo dry-run non abilita l’import reale. Serve solo a validare forma del piano dati e guardie operative.
