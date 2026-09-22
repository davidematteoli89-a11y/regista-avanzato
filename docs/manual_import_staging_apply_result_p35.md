# Punto 35 — Staging apply result

## Result

- applied: `false`
- command category used: `none`
- target staging confirmed: `true`
- production excluded: `true`
- migration file: `supabase/migrations/20260922120000_manual_import_read_only_views.sql`
- views expected: `3`
- errors/warnings: `apply_not_executed_due_to_db_push_reset_ban`
- rollback needed: `false`

## Notes

L’applicazione al database non è stata eseguita.

Motivo:

- le regole assolute del Punto 35 vietano `db push/reset`;
- non è stato letto `.env.local`;
- non sono state usate credenziali;
- non è stato usato `service_role`;
- non è stato eseguito nessun comando SQL remoto;
- non è disponibile in questa fase un canale di apply sicuro alternativo che non richieda credenziali o prompt ambigui.

## Stato sicurezza

- migration_applied: `false`
- db_write: `false`
- db_write_scope: `none`
- production_touched: `false`
- provider_import_still_off: `true`
- next_write_allowed: `false`

