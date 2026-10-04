# Manual Import Point 60 Decision — P59

## Options

### A. Punto 60 — Public data promotion dry-run/no-apply

Obiettivo:

- preparare dry-run tecnico della promotion candidate;
- calcolare scope esatto;
- creare piano SQL/manual instructions solo no-apply;
- non eseguire DB write.

### B. Punto 60 — Public homepage/navigation polish

Obiettivo:

- migliorare navigazione pubblica prima di mostrare dati reali;
- non cambiare dati;
- non promuovere visibility.

### C. Punto 60 — Repeat admin browser verification

Obiettivo:

- ripetere verifica admin reale se sessione disponibile;
- non modificare dati.

## Recommended decision

Decisione consigliata: **A. Punto 60 — Public data promotion dry-run/no-apply**.

Motivo:

- Punto 58 ha verificato che le route pubbliche sono sicure in empty/not_found.
- Punto 59 ha definito promotion order, rollback e post-verification.
- Il prossimo passaggio sicuro è calcolare lo scope esatto 1/2/2 senza scrivere dati.

## Guardrails

- `next_write_allowed=false`
- `public_data_promotion_executed=false`
- `visibility_changed=false`
- `point_59_db_write=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
