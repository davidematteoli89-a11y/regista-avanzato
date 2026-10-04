# Punto 40-B — Manual import fixture mapping

## Scope

Mapping teorico fixture → tabelle/view per futura scrittura manuale staging. Nessuna query write, nessun SQL eseguibile, nessun provider/import.

## Competitions

| Fixture field | Target table/view column | Required | Notes |
|---|---|---:|---|
| derived | `id` | yes | Generato dal database o risolto dopo create futura. |
| `provider_competition_id` | `internal_key` | yes | Valore logico manuale usato per dedup/lookup. |
| `provider_competition_id` | `api_competition_id` | yes | Valore manuale, non da provider reale. |
| derived | `slug` | yes | Da derivare in modo deterministico da fixture/name o provider id. |
| `name` | `name` | yes | Nome competition fixture. |
| `country` | `country` | yes | Paese fixture. |
| derived | `continent` | review | Derivabile da country; per Italy atteso Europe se policy confermata. |
| derived | `season` | review | Da definire prima di write reale. |
| derived | `tracking_level` | review | Valore manual/mock da confermare prima di write reale. |
| `status` | `status` | yes | Fixture status; richiede conferma enum/policy. |
| derived | `visibility` | yes | Da impostare con policy staging/manuale sicura. |
| derived | `created_at` | no | Gestito dal database. |
| derived | `updated_at` | no | Gestito dal database o trigger. |

## Teams

| Fixture field | Target table/view column | Required | Notes |
|---|---|---:|---|
| derived | `id` | yes | Generato dal database o risolto dopo create futura. |
| resolved | `competition_id` | yes | ID della competition appena creata/risolta da `provider_competition_id`. |
| `provider_team_id` | `api_team_id` | yes | Valore manuale, non da provider reale. |
| derived | `slug` | yes | Da derivare in modo deterministico da fixture/name o provider id. |
| `name` | `name` | yes | Nome team fixture. |
| derived | `short_name` | review | Da derivare dal nome o definire prima di write reale. |
| `country` | `country` | yes | Paese fixture. |
| derived | `status` | yes | Valore staging/manuale da confermare. |
| derived | `visibility` | yes | Da impostare con policy staging/manuale sicura. |
| derived | `created_at` | no | Gestito dal database. |
| derived | `updated_at` | no | Gestito dal database o trigger. |

## Standings

| Fixture field | Target table/view column | Required | Notes |
|---|---|---:|---|
| derived | `id` | yes | Generato dal database o risolto dopo create futura. |
| resolved | `competition_id` | yes | ID della competition appena creata/risolta. |
| resolved | `team_id` | yes | ID del team appena creato/risolto. |
| derived | `season` | review | Da allineare alla competition prima di write reale. |
| derived | `stage` | review | Da definire prima di write reale. |
| derived | `matchday` | review | Da definire prima di write reale o lasciare null se ammesso. |
| `rank` | `rank` | yes | Fixture standing. |
| `played` | `played` | yes | Fixture standing. |
| `wins` | `won` | yes | Rinominato da fixture. |
| `draws` | `drawn` | yes | Rinominato da fixture. |
| `losses` | `lost` | yes | Rinominato da fixture. |
| `goals_for` | `goals_for` | yes | Fixture standing. |
| `goals_against` | `goals_against` | yes | Fixture standing. |
| derived | `goal_difference` | yes | `goals_for - goals_against`. |
| `points` | `points` | yes | Fixture standing. |
| derived | `status` | yes | Valore staging/manuale da confermare. |
| derived | `visibility` | yes | Da impostare con policy staging/manuale sicura. |
| derived | `created_at` | no | Gestito dal database. |
| derived | `updated_at` | no | Gestito dal database o trigger. |

## Safety

- db_write: `false`
- SQL write generated: `false`
- service_role_used: `false`
- provider_fetch: `false`
- next_write_allowed: `false`
