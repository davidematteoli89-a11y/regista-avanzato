# Punto 24 — Needs review classifier

Data: 2026-09-17  
Modalità: no-write.

Categorie ammesse:

1. `schema_missing`
2. `column_missing`
3. `naming_mismatch`
4. `dedup_key_unclear`
5. `fk_unclear`
6. `type_transform_needed`
7. `audit_requirement_unclear`
8. `documentation_only`
9. `safe_to_mark_ready`

## Competitions

| Problema | Categoria | Severità | Serve per risolvere | Migrazione futura | Conferma documentale | DB read-only futuro |
|---|---|---:|---|---:|---:|---:|
| `provider_competition_id` non è dedup primaria | `dedup_key_unclear` | medium | Policy per `internal_key`, `slug`, `season` e relazione con `api_competition_id`. | no | sì | sì |
| `continent` non presente in fixture | `type_transform_needed` | low | Default documentato o mapping paese→continente. | no | sì | no |
| `tracking_level`/`update_frequency` non presenti in fixture | `documentation_only` | low | Default manual/mock coerente con strategia provider. | no | sì | no |
| `category/status` non coincide con enum DB | `type_transform_needed` | medium | Mapping verso `status`, `visibility`, `public_stats_enabled` se mai usati in write. | no | sì | sì |

Decisione: `competitions` resta `needs_review`, non `blocked`.

## Teams

| Problema | Categoria | Severità | Serve per risolvere | Migrazione futura | Conferma documentale | DB read-only futuro |
|---|---|---:|---|---:|---:|---:|
| `competition_id` richiede lookup da fixture competition | `fk_unclear` | high | Scelta lookup tra `api_competition_id`, `provider_competition_config` o `slug/season`. | no | sì | sì |
| Dedup reale `(competition_id, slug)` non usa `provider_team_id` | `dedup_key_unclear` | medium | Policy slug e collision handling. | no | sì | sì |
| `provider_team_id` verso `api_team_id` non basta per update idempotente | `documentation_only` | medium | Definire se mantenerlo solo come riferimento provider. | no | sì | sì |

Decisione: `teams` resta `needs_review`, non `blocked`.

## Standings

| Problema | Categoria | Severità | Serve per risolvere | Migrazione futura | Conferma documentale | DB read-only futuro |
|---|---|---:|---|---:|---:|---:|
| `competition_id` richiede lookup UUID | `fk_unclear` | high | Stessa policy di lookup competizione usata per teams. | no | sì | sì |
| `team_id` richiede lookup UUID | `fk_unclear` | high | Lookup team entro competizione. | no | sì | sì |
| `wins/draws/losses` hanno nomi diversi da `won/drawn/lost` | `naming_mismatch` | low | Mapping deterministico documentato. | no | sì | no |
| `season`, `stage`, `matchday` non presenti in fixture | `dedup_key_unclear` | medium | Default stagione e contesto classifica prima di dedup. | no | sì | sì |
| `goal_difference` non presente in fixture | `type_transform_needed` | low | Confermare calcolo `goals_for - goals_against`. | no | sì | no |

Decisione: `standings` resta `needs_review`, non `blocked`.

## Classificazione complessiva

- `schema_missing`: nessuno.
- `column_missing`: nessuno.
- `blocked`: nessuno.
- Migrazione consigliata ora: no.
- DB read-only check consigliato: sì, come Punto 25-A, per verificare dati/UUID/drift senza write.
- Write staging autorizzata: no.
