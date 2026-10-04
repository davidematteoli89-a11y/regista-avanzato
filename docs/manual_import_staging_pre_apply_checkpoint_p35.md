# Punto 35 — Pre-apply checkpoint

## Stato

- commit di partenza: `5c4b73d`
- branch: `preview`
- draft path: `docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`
- real migration path: `supabase/migrations/20260922120000_manual_import_read_only_views.sql`
- staging target confirmed: `true`
- production excluded: `true`
- provider/import off: `true`
- backup checklist reviewed: `true`
- rollback checklist reviewed: `true`
- post-apply verification plan reviewed: `true`
- explicit authorization received: `true`

## Backup/checkpoint

Non è stato eseguito export schema/backup automatico.

- backup_export_performed: `false`
- backup_export_skipped_reason: `nessun comando sicuro autorizzato senza credenziali e senza rischio di stampare dati sensibili`
- dump_committed: `false`
- sensitive_data_committed: `false`

## Apply status

- real migration created: `true`
- migration applied: `false`
- db write: `false`
- reason: `apply remoto bloccato dal divieto esplicito di db push/reset e assenza di canale alternativo sicuro`
- next_write_allowed: `false`

