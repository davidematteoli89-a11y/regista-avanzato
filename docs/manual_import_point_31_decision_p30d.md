# Punto 30-D — Decisione Punto 31

## Stato locale

- local_schema_extraction_completed=true
- supabase_dashboard_used=false
- db_query_executed=false
- db_write=false
- service_role_used=false
- placeholders_resolved_from_local_count=16
- placeholders_unresolved_count=0
- placeholders_unclear_count=0
- ready_for_migration_draft=true
- next_write_allowed=false

## Decisioni

### A. Punto 31 — creare migration draft `.sql` non applicata, no-apply

Consentibile come prossimo step solo per preparare una migration draft non applicata e sottoposta a review separata.

Condizioni:

- file draft non applicato;
- nessun `db push/reset`;
- nessuna scrittura DB;
- nessuna Production;
- nessun provider/import;
- revisione manuale prima di qualunque applicazione.

### B. Restare in manual/mock mode

Sempre valido se si preferisce non preparare ancora una draft migration.

### C. Non applicare migration

Punto 31 non deve applicare nulla.

### D. Non fare DB write

Nessun insert/update/delete/upsert o RPC write.

### E. Non attivare import/provider

Provider reali, Apify e import restano spenti.

## Decisione attuale

Consigliato: Punto 31 come migration draft `.sql` non applicata/no-apply, se l'utente conferma. `next_write_allowed=false`.

## Punto 31 eseguito

- migration_draft_created=true
- migration_draft_path=`docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`
- migration_draft_in_supabase_migrations=false
- migration_applied=false
- ready_for_apply=false
- next_write_allowed=false

Prossimo step: Punto 32 review manuale no-apply della draft.
