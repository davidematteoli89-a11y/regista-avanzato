# Public Data Promotion No-Apply SQL Notes — P60

```text
NO_APPLY_SQL_NOTES_ONLY
DO NOT APPLY
DO NOT RUN
NOT REVIEWED FOR EXECUTION
NO DB WRITE AUTHORIZED
NO VISIBILITY CHANGE AUTHORIZED
```

Questo file non è una migration e non contiene SQL pronto da eseguire.

## Purpose

Documentare la forma futura delle istruzioni manuali per promuovere la fixture `manual-serie-a` da `private_admin` a `public`, senza autorizzare o eseguire la modifica.

## Future reviewed SQL shape

```text
-- PSEUDO SQL ONLY — DO NOT RUN
-- 1. Confirm exact scope on staging:
--    competition manual-serie-a = 1
--    linked teams = 2
--    linked standings = 2
--
-- 2. Only after explicit Punto 61 authorization:
--    update reviewed competition row to public
--    update reviewed linked team rows to public
--    update reviewed linked standing rows to public
--
-- 3. Verify affected rows match 1/2/2.
```

## Future rollback shape

```text
-- PSEUDO SQL ONLY — DO NOT RUN
-- Rollback reviewed rows from public to private_admin:
-- standings first, then teams, then competition.
-- Verify affected rows match 2/2/1.
```

## Current status

- `real_sql_executed=false`
- `db_write=false`
- `visibility_changed=false`
- `promotion_sql_no_apply_prepared=true`
- `rollback_sql_no_apply_prepared=true`
- `post_promotion_verification_no_apply_prepared=true`
