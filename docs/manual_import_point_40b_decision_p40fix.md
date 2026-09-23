# Punto 40-Fix — Decisione Punto 40-B

## Stato

- read_only_live_view_lookup_prepared: `true`
- manual_sql_execution_required: `true`
- query_file: `supabase/manual/manual_import_preview_lookup_p40fix.sql`
- query_read_only: `true`
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
- preview_mode: `read_only_lookup_pending`
- create_count: `0`
- update_count: `0`
- skip_count: `0`
- conflict_count: `0`
- unresolved_count: `5`
- next_write_allowed: `false`

## Decisioni

### A. Punto 40-B — manual import write plan no-apply

Non autorizzato ora. Può essere valutato solo dopo lookup manuale eseguito e `unresolved_count=0`.

### B. Lookup manuale non ancora eseguito

Stato corrente. Eseguire manualmente la query read-only in SQL Editor staging e fornire il risultato minimo.

### C. Punto 40-Fix-B

Se il lookup produce conflict/unresolved, correggere fixture/mapping senza DB write.

### D. Non attivare provider

Obbligatorio.

### E. Non attivare import reali

Obbligatorio.

### F. Non fare deploy Production

Obbligatorio.

## Decisione finale

Restare pending. Non proporre write plan finché `unresolved_count > 0`. `next_write_allowed=false`.
