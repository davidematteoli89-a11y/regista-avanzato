# Punto 36-A — SQL Editor apply result

## Result

- explicit_authorization_received: `true`
- apply_channel: `manual_sql_editor`
- staging_target_confirmed: `true`
- production_excluded: `true`
- migration_file: `supabase/migrations/20260922120000_manual_import_read_only_views.sql`
- migration_applied: `true`
- db_write: `true`
- db_write_scope: `schema_read_only_views_only`
- db_push_reset: `false`
- service_role_used: `false`
- provider_import_enabled: `false`
- apify_enabled: `false`
- production_touched: `false`
- errors: `none`
- apply_result_message: `Success. No rows returned`
- rollback_needed: `false`

## Notes

L’apply è stato eseguito manualmente dall’utente nel Supabase SQL Editor del progetto staging `Regista Avanzato`, incollando solo il contenuto di:

- `supabase/migrations/20260922120000_manual_import_read_only_views.sql`

Non sono stati eseguiti altri SQL dall’agente, non sono stati usati `db push/reset`, non sono state lette chiavi e non sono stati modificati dati applicativi oltre alla creazione/aggiornamento delle view read-only.
