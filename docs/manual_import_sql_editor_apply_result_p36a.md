# Punto 36-A — SQL Editor apply result

## Result

- explicit_authorization_received: `true`
- apply_channel: `manual_sql_editor`
- staging_target_confirmed: `false`
- production_excluded: `true`
- migration_file: `supabase/migrations/20260922120000_manual_import_read_only_views.sql`
- migration_applied: `false`
- db_write: `false`
- db_write_scope: `none`
- db_push_reset: `false`
- service_role_used: `false`
- provider_import_enabled: `false`
- apify_enabled: `false`
- production_touched: `false`
- errors: `manual_sql_editor_not_executed_by_agent_dashboard_access_required`
- rollback_needed: `false`

## Notes

L’apply deve essere eseguito manualmente dall’utente nel Supabase SQL Editor del progetto staging `Regista Avanzato`, incollando solo il contenuto di:

- `supabase/migrations/20260922120000_manual_import_read_only_views.sql`

L’agente si è fermato prima dell’apply perché non può confermare in modo affidabile la dashboard aperta né eseguire SQL nella sessione utente.

Non sono stati eseguiti altri SQL, non sono stati usati `db push/reset`, non sono state lette chiavi e non sono stati modificati dati applicativi.

