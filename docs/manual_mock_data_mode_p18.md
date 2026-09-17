# Punto 18 — Manual/mock data mode

Stato: modalità manual/mock rafforzata.

## Modalità consentite

- Manual data mode: consentita.
- Mock data mode: consentita.
- Real provider mode: disabilitata.
- Real provider imports: disabilitati.
- Real provider writes: disabilitati.

La costante locale `PROVIDER_DATA_MODES` esplicita questo stato in `lib/provider/providerModes.ts`.

## Fixture locali

Sono state aggiunte fixture statiche e versionate:

- `fixtures/provider/manual/competitions.sample.json`;
- `fixtures/provider/manual/teams.sample.json`;
- `fixtures/provider/manual/standings.sample.json`.

Le fixture sono esempi locali e non provengono da provider reali.

## Dry-run locale

Comando:

```bash
npm run dry-run:manual-fixtures
```

Il dry-run:

- legge solo fixture locali versionate;
- non legge `.env.local`;
- non legge o stampa token;
- non fa fetch;
- non chiama TheStatsAPI, Stats API v1, API-Football, Apify o SofaScore;
- non usa Supabase client;
- non scrive nel database;
- non attiva provider/import;
- verifica campi minimi e riferimenti tra competition/team/standings;
- produce solo un report testuale sanificato.

## Output atteso

Il report deve includere:

- `mode=manual_fixture_dry_run`;
- `source=local_fixtures`;
- `external_fetch=false`;
- `db_write=false`;
- `token_read=false`;
- `token_printed=false`;
- conteggi fixture;
- `references_valid=true`;
- `provider_activated=false`;
- `import_enabled=false`.

## Limiti

Questa modalità non sostituisce un provider reale. Serve per mantenere UI, mapping teorico e readiness senza consumo API, licenze o costi.
