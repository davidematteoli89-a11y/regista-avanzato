# Punto 39 — Decisione Punto 40

## Stato

- manual_import_preview_completed: `true`
- preview_mode: `local_only_unresolved`
- provider_fetch: `false`
- external_fetch: `false`
- db_write: `false`
- service_role_used: `false`
- import_real_execution: `false`
- provider_import_enabled: `false`
- apify_enabled: `false`
- production_touched: `false`
- fixtures_loaded: `true`
- views_verified_count: `3`
- view_lookup_executed: `false`
- create_count: `0`
- update_count: `0`
- skip_count: `0`
- conflict_count: `0`
- unresolved_count: `5`
- next_write_allowed: `false`

## Decisioni

### A. Punto 40 — manual import write plan no-apply

Non consigliato ora, perché `unresolved_count=5`.

### B. Punto 40-Fix — sistemare fixture/mapping preview

Consigliato. Prima di qualunque write plan no-apply serve risolvere il mapping preview contro le view verificate, ancora senza DB write.

### C. Non attivare provider

Obbligatorio.

### D. Non attivare import reali

Obbligatorio.

### E. Non fare deploy Production

Obbligatorio.

### F. Non scrivere dati applicativi

Obbligatorio senza nuova autorizzazione esplicita.

## Follow-up Punto 40-Fix

È stata preparata la query read-only live lookup:

- `supabase/manual/manual_import_preview_lookup_p40fix.sql`

Stato:

- manual_sql_execution_required: `true`;
- query_executed: `pending`;
- preview_mode: `read_only_lookup_pending`;
- view_lookup_executed: `false`;
- unresolved_count: `5`;
- next_write_allowed: `false`.

## Decisione finale

Restare in Punto 40-Fix pending: eseguire manualmente la query read-only e fornire il risultato minimo prima di qualsiasi manual import write plan no-apply. `next_write_allowed=false`.
