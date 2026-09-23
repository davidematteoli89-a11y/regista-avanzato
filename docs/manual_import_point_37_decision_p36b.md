# Punto 36-B — Decisione Punto 37

## Stato

- explicit authorization received: `true`
- apply channel: `manual_sql_editor`
- migration applied: `true`
- db write: `true`
- db write scope: `schema_read_only_views_only`
- views expected count: `3`
- views verified count: `0`
- post apply verification passed: `false`
- provider/import off: `true`
- Apify off: `true`
- Production touched: `false`
- next write allowed: `false`

## Decisioni

### A. Punto 37 — app/admin read-only integration verification

Non consigliato finché la verifica metadata/colonne delle view non è completata.

### B. Punto 37-Fix — verifica aggiuntiva read-only

Consigliato. Verificare in modo read-only che le 3 view esistano e abbiano colonne attese, senza dump dati completi.

### C. Non attivare provider

Obbligatorio.

### D. Non attivare import reali

Obbligatorio.

### E. Non fare deploy Production

Obbligatorio.

## Decisione

Consiglio Punto 37-Fix/read-only view verification. `next_write_allowed=false`.

