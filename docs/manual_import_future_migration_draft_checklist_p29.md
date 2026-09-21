# Punto 29 — Future migration draft checklist

Stato: checklist documentale, no-apply/no-write.

Questa checklist non autorizza applicazione, non crea migration draft e non autorizza Punto 30/write staging.

## Prima di creare un futuro migration draft

- [ ] Confermare tabella competitions reale in staging.
- [ ] Confermare tabella teams reale in staging.
- [ ] Confermare tabella standings reale in staging.
- [ ] Confermare colonne id.
- [ ] Confermare colonne provider/external id.
- [ ] Confermare colonne name/slug/country.
- [ ] Confermare season/stage/matchday se richiesti.
- [ ] Confermare naming `rank`/position.
- [ ] Confermare mapping `wins/draws/losses` → `won/drawn/lost`.
- [ ] Confermare policy `goal_difference`.
- [ ] Confermare RLS/policy.
- [ ] Confermare ruoli lettura admin/editor.
- [ ] Confermare comportamento non autenticato/free user.
- [ ] Confermare assenza di dati sensibili/raw payload.
- [ ] Confermare staging.
- [ ] Confermare backup/rollback plan.
- [ ] Ottenere approvazione esplicita utente.
- [ ] Confermare nessuna Production.
- [ ] Eseguire dry-run e build appropriati senza leggere/stampare token.

## Sequenza futura obbligatoria

1. Punto separato per dashboard confirmation no-write.
2. Punto separato per migration draft `.sql` non applicata, solo se i placeholder critici sono risolti.
3. Punto ancora successivo per eventuale applicazione staging, con autorizzazione esplicita.

## Stato attuale

- `future_migration_draft_allowed=false`
- `migration_file_created=false`
- `migration_applied=false`
- `db_write=false`
- `next_write_allowed=false`

## Dashboard confirmation P30-A

La checklist resta non soddisfatta perché la dashboard confirmation reale non è stata eseguita da Codex.

- placeholders resolved count: `0`
- placeholders unclear count: `16`
- ready for migration draft: `false`

Prima di creare un migration draft serve Punto 30-B o equivalente verifica manuale no-write.
