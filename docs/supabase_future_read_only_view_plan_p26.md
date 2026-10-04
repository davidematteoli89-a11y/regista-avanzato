# Punto 26 — Future read-only view plan

Data: 2026-09-18  
Modalità: piano, nessuna migrazione creata.

## Scopo

Preparare solo il piano per eventuali view read-only dedicate al manual import lookup. Nessun SQL eseguibile viene generato.

## View candidate future

### Competitions import lookup

- Scopo: risolvere `provider_competition_id` verso `competitions.id`, `slug`, `season`.
- Campi minimi: `id`, `api_competition_id`, `internal_key`, `slug`, `name`, `country`, `season`, `status`, `visibility`.
- Lettori: admin/editor o ruolo autenticato approvato, da decidere.
- RLS/policy: grant SELECT controllato; nessuna write.
- Perché non ora: richiede migrazione/view dedicata e review RLS.
- Punto futuro: Punto 27-A.

### Teams import lookup

- Scopo: risolvere `provider_team_id` verso `teams.id` entro competizione.
- Campi minimi: `id`, `competition_id`, `api_team_id`, `slug`, `name`, `country`, `status`, `visibility`.
- Lettori: admin/editor o ruolo autenticato approvato, da decidere.
- RLS/policy: grant SELECT controllato; nessuna write.
- Perché non ora: serve decidere esposizione di `api_team_id`.
- Punto futuro: Punto 27-A.

### Standings import lookup

- Scopo: verificare dedup `(competition_id, season, stage, matchday, team_id)` prima di ogni write futura.
- Campi minimi: `id`, `competition_id`, `team_id`, `season`, `stage`, `matchday`, `rank`, `updated_at`.
- Lettori: admin/editor o script controllato con sessione approvata.
- RLS/policy: SELECT only.
- Perché non ora: richiede view dedicata e piano RLS.
- Punto futuro: Punto 27-A.

### Provider mapping lookup

- Scopo: leggere provider manual/mock e `provider_competition_config` senza esporre segreti.
- Campi minimi: `provider_key`, `provider_type`, `is_active`, `competition_id`, `external_competition_id`, `import_enabled`.
- Lettori: admin/editor.
- RLS/policy: SELECT only, nessun token/base secret.
- Perché non ora: serve definire esattamente cosa esporre.
- Punto futuro: Punto 27-A.

## Pseudo-SQL

```text
PSEUDO_SQL_NOT_EXECUTABLE
Create read-only views with explicit columns and safe grants.
No insert/update/delete/upsert.
No service role.
No provider activation.
```

## Decisione

Non viene creata alcuna migrazione nel Punto 26. Se il progetto vuole proseguire senza SQL Editor manuale, il prossimo step consigliato è una proposta migrazione read-only non applicata.
