# Punto 23 — Schema confidence matrix

Stato: matrice disponibile, no-write.

| Area | Table confirmed | Required columns confirmed | FK/References confirmed | Dedup key confirmed | Status before | Status after | Reason |
|---|---|---|---|---|---|---|---|
| Competitions | yes | yes | n/a / provider FK optional | partial | needs_review | needs_review | Tabelle/colonne ok; mancano policy `season`, `continent`, `tracking_level`, `slug` |
| Teams | yes | yes | partial | partial | needs_review | needs_review | Tabella/colonne ok; lookup competition, slug e manual provider id da confermare |
| Standings | yes | yes | partial | partial | needs_review | needs_review | Tabella/colonne ok; lookup competition/team, `season`, `stage/matchday`, `goal_difference` da confermare |

## Conteggi

- ready areas: 0
- needs_review areas: 3
- blocked areas: 0

## Interpretazione

Lo schema locale è sufficiente per continuare la progettazione, ma non sufficiente per autorizzare una write staging.

La causa non è assenza di tabelle/colonne, ma decisioni operative non ancora bloccate in modo auditabile.
