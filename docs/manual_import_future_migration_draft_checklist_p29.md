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

## Dashboard confirmation P30-B

La checklist resta non soddisfatta perché la dashboard confirmation dichiarata dall'utente non include valori schema risolutivi.

- placeholders resolved count: `0`
- placeholders unclear count: `16`
- ready for migration draft: `false`

Prima di creare un migration draft serve Punto 30-B o equivalente verifica manuale no-write.

## Manual schema values collection P30-C

- schema values collection prepared: `true`
- real schema values provided: `false`
- placeholders resolved count: `0`
- placeholders uncollected count: `16`
- ready for migration draft: `false`
- next_write_allowed: `false`
- recommended next step: user provides real schema values from dashboard

La checklist futura resta bloccata: nessun draft migration può essere preparato senza valori reali forniti dall'utente.

## Local migration schema extraction P30-D

- local schema extraction completed: `true`
- Supabase Dashboard used: `false`
- DB query executed: `false`
- DB write: `false`
- service_role used: `false`
- placeholders resolved from local files count: `16`
- placeholders unresolved count: `0`
- placeholders unclear count: `0`
- ready for migration draft: `true`
- next_write_allowed: `false`

La checklist consente ora di valutare Punto 31 come migration draft non applicata/no-apply. Non consente applicazione, db write o Production.

## Punto 31 — Migration draft no-apply

- migration_draft_created=true
- migration_draft_path=`docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`
- migration_draft_in_supabase_migrations=false
- migration_applied=false
- executable_for_apply=false
- requires_manual_review=true
- requires_explicit_authorization=true
- ready_for_apply=false
- next_write_allowed=false

Checklist aggiornata: completare Punto 32 review manuale no-apply prima di qualsiasi considerazione su apply staging.
