# Punto 20 — Mapping fixture → Supabase

Stato: mapping teorico preparato da schema locale, senza DB live e senza scritture.

## Fonti fixture

- `fixtures/provider/manual/competitions.sample.json`
- `fixtures/provider/manual/teams.sample.json`
- `fixtures/provider/manual/standings.sample.json`

## Tabelle candidate confermate da schema locale

Da `supabase/migrations/0001_base_schema.sql`:

- `public.competitions`
- `public.teams`
- `public.standings`
- `public.provider_import_logs`
- `public.import_logs`

## Competitions

| Fixture field | Target table candidata | Target column candidata | Trasformazione | Obbligatorio | Deduplica | Rischio | Audit | Stato |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `provider_competition_id` | `competitions` | `api_competition_id` / `internal_key` | decidere se usarlo come ID esterno o chiave manuale | sì | `internal_key + season` oppure `slug + season` | collisione con demo/staging esistenti | batch id + before/after | needs review |
| `name` | `competitions` | `name` | stringa diretta | sì | n/a | basso | log valore precedente se update | ready |
| `country` | `competitions` | `country` | stringa diretta | sì | n/a | basso | log valore precedente se update | ready |
| `category` | `competitions` | `tracking_level` o `coverage_notes` | mapping da definire: fixture `league` non coincide con enum `tracking_level` | sì | n/a | medio | log mapping rule | needs review |
| `status` | `competitions` | `status` | mapping verso enum `content_status` da confermare | sì | n/a | medio | log mapping rule | needs review |

Campi target obbligatori non presenti in fixture e da definire prima di import:

- `slug`
- `continent`
- `season`
- `tracking_level`
- `update_frequency`

## Teams

| Fixture field | Target table candidata | Target column candidata | Trasformazione | Obbligatorio | Deduplica | Rischio | Audit | Stato |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `provider_team_id` | `teams` | `api_team_id` | stringa diretta | sì | `source_provider_id + api_team_id` oppure `competition_id + slug` | collisione se provider/manual id cambia | batch id + before/after | needs review |
| `provider_competition_id` | `teams` | `competition_id` | lookup via competition fixture/import result | sì | n/a | alto se competition non risolta | log lookup | needs review |
| `name` | `teams` | `name` | stringa diretta | sì | n/a | basso | log valore precedente se update | ready |
| `country` | `teams` | `country` | stringa diretta | no | n/a | basso | log valore precedente se update | ready |

Campi target obbligatori non presenti in fixture e da definire prima di import:

- `slug`

## Standings

| Fixture field | Target table candidata | Target column candidata | Trasformazione | Obbligatorio | Deduplica | Rischio | Audit | Stato |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `provider_competition_id` | `standings` | `competition_id` | lookup via competition fixture/import result | sì | parte della unique key | alto se competition non risolta | log lookup | needs review |
| `provider_team_id` | `standings` | `team_id` | lookup via team fixture/import result | sì | parte della unique key | alto se team non risolto | log lookup | needs review |
| `rank` | `standings` | `rank` | numero diretto | sì | n/a | basso | before/after | ready |
| `played` | `standings` | `played` | numero diretto | sì | n/a | basso | before/after | ready |
| `wins` | `standings` | `won` | rinomina campo | sì | n/a | basso | before/after | ready |
| `draws` | `standings` | `drawn` | rinomina campo | sì | n/a | basso | before/after | ready |
| `losses` | `standings` | `lost` | rinomina campo | sì | n/a | basso | before/after | ready |
| `goals_for` | `standings` | `goals_for` | numero diretto | sì | n/a | basso | before/after | ready |
| `goals_against` | `standings` | `goals_against` | numero diretto | sì | n/a | basso | before/after | ready |
| `points` | `standings` | `points` | numero diretto | sì | n/a | basso | before/after | ready |

Campi target obbligatori non presenti in fixture e da definire prima di import:

- `season`
- `stage`
- `matchday`
- `goal_difference` calcolabile ma da confermare

Unique key candidate schema:

- `competition_id, season, stage, matchday, team_id`

## Log/audit candidate

- `provider_import_logs`: da usare solo se manual import futuro viene trattato come import controllato, senza provider reale.
- `import_logs`: candidate per summary run.
- `provider_import_runs`: già presente da Punto 9, ma il suo uso per manual import richiede conferma.

## Conclusione mapping

Il mapping è parzialmente pronto, ma prima di qualsiasi scrittura servono:

- conferma schema target live staging;
- decisione su `season`, `slug`, `continent`, `tracking_level`, `update_frequency`;
- decisione su chiave deduplica;
- piano audit/rollback;
- approvazione esplicita alla scrittura.
