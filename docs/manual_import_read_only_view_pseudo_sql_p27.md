# Punto 27 — Manual import read-only view pseudo-SQL

```text
PSEUDO_SQL_NOT_EXECUTABLE
DO NOT RUN
DOCUMENTATION ONLY
```

Questo file non contiene SQL applicabile. È una bozza concettuale per Punto 28. Non deve essere copiato nel SQL Editor, non deve essere usato con `db push`, non deve essere eseguito.

## Competitions lookup

```text
PSEUDO_SQL_NOT_EXECUTABLE
DO NOT RUN
DOCUMENTATION ONLY

VIEW_CONCEPT manual_import_competitions_lookup
  PURPOSE expose explicit safe competition lookup fields for approved admin/editor manual import checks
  SOURCE_CONCEPT competitions plus optional provider/manual configuration if already present
  COLUMNS competition_id, slug, name, country, season, tracking_level, safe status/visibility, provider/manual id if confirmed
  FILTER only rows that are safe for staging manual import lookup
  ACCESS read-only for approved admin/editor helper
  NO anonymous public access
  NO insert/update/delete/upsert
  NO raw provider payload
  NO token fields
```

## Teams lookup

```text
PSEUDO_SQL_NOT_EXECUTABLE
DO NOT RUN
DOCUMENTATION ONLY

VIEW_CONCEPT manual_import_teams_lookup
  PURPOSE expose explicit safe team lookup fields with competition reference
  SOURCE_CONCEPT teams joined conceptually to competitions
  COLUMNS team_id, competition_id, competition_slug, slug, name, country, provider/manual id if confirmed
  FILTER only rows that are safe for staging manual import lookup
  ACCESS read-only for approved admin/editor helper
  NO anonymous public access
  NO insert/update/delete/upsert
  NO raw provider payload
  NO token fields
```

## Standings lookup

```text
PSEUDO_SQL_NOT_EXECUTABLE
DO NOT RUN
DOCUMENTATION ONLY

VIEW_CONCEPT manual_import_standings_lookup
  PURPOSE expose explicit safe standings lookup fields for manual fixture comparison
  SOURCE_CONCEPT standings joined conceptually to competitions and teams
  COLUMNS standing_id_if_present, competition_id, competition_slug, team_id, team_slug, season, stage, matchday, rank, played, won, drawn, lost, goals_for, goals_against, goal_difference, points
  FILTER only rows that are safe for staging manual import lookup
  ACCESS read-only for approved admin/editor helper
  NO anonymous public access
  NO insert/update/delete/upsert
  NO raw provider payload
  NO token fields
```

## Punto 28 gate

```text
PSEUDO_SQL_NOT_EXECUTABLE
DO NOT RUN
DOCUMENTATION ONLY

POINT_28_OPTIONS
  OPTION_A prepare a real migration file but do not apply it
  OPTION_B run manual SQL Editor SELECT checks only
  OPTION_C remain in manual/mock mode
  OPTION_D first staging write is NOT authorized by this document

DEFAULT_DECISION
  next_write_allowed=false
  migration_prepared=false
  migration_applied=false
```
