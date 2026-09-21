# Punto 27 — Manual import read-only view field mapping

Stato: mapping documentale, no-write.

Questa matrice descrive quali campi servono alle future view read-only. Non conferma che le view esistano già e non autorizza scritture.

| Area | Fixture field | Future read-only view | Proposed view column | Required | Purpose | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Competitions | `provider_competition_id` | `manual_import_competitions_lookup` | provider/manual competition id da confermare | sì | Dedup e lookup competizione | Nome colonna reale da confermare in Punto 28 |
| Competitions | `name` | `manual_import_competitions_lookup` | `name` | sì | Verifica umana | Solo read-only |
| Competitions | `country` | `manual_import_competitions_lookup` | `country` | sì | Disambiguazione | Default/manual mapping se assente |
| Competitions | `status` | `manual_import_competitions_lookup` | stato/visibilità sicuri | no | Controllo pubblicazione/import | Non deve attivare publish |
| Competitions | default manuale | `manual_import_competitions_lookup` | `season` | sì | Evitare stagione ambigua | Valore da confermare |
| Teams | `provider_team_id` | `manual_import_teams_lookup` | provider/manual team id da confermare | sì | Dedup team | Nome colonna reale da confermare |
| Teams | `provider_competition_id` | `manual_import_teams_lookup` | `competition_id`, `competition_slug` | sì | FK competition | Deve evitare lookup ambiguo |
| Teams | `name` | `manual_import_teams_lookup` | `name` | sì | Verifica umana | Solo read-only |
| Teams | `country` | `manual_import_teams_lookup` | `country` | no | Disambiguazione | Se disponibile |
| Standings | `provider_competition_id` | `manual_import_standings_lookup` | `competition_id`, `competition_slug` | sì | FK competition | Da risolvere via view |
| Standings | `provider_team_id` | `manual_import_standings_lookup` | `team_id`, `team_slug` | sì | FK team | Da risolvere via view |
| Standings | `rank` | `manual_import_standings_lookup` | `rank` | sì | Classifica | Numeric safe |
| Standings | `played` | `manual_import_standings_lookup` | `played` | sì | Statistica | Numeric safe |
| Standings | `wins` | `manual_import_standings_lookup` | `won` | sì | Statistica | Naming locale confermato da review locale |
| Standings | `draws` | `manual_import_standings_lookup` | `drawn` | sì | Statistica | Naming locale confermato da review locale |
| Standings | `losses` | `manual_import_standings_lookup` | `lost` | sì | Statistica | Naming locale confermato da review locale |
| Standings | `goals_for` | `manual_import_standings_lookup` | `goals_for` | sì | Statistica | Numeric safe |
| Standings | `goals_against` | `manual_import_standings_lookup` | `goals_against` | sì | Statistica | Numeric safe |
| Standings | derivato | `manual_import_standings_lookup` | `goal_difference` | sì | Validazione | Calcolo da confermare: goals_for - goals_against |
| Standings | `points` | `manual_import_standings_lookup` | `points` | sì | Classifica | Numeric safe |
| Standings | default manuale | `manual_import_standings_lookup` | `season`, `stage`, `matchday` | sì | Chiave logica | Default da confermare in Punto 28 |

## Esclusioni

- Token.
- Raw payload provider.
- Response complete.
- Colonne interne non necessarie.
- Campi write-only.
- Service role metadata.

## Stato

- `requires_new_read_only_view=true`
- `migration_prepared=false`
- `migration_applied=false`
- `next_write_allowed=false`
