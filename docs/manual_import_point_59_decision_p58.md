# Manual Import Point 59 Decision — P58

## Context

Il Punto 58 ha verificato via browser no-auth che le route pubbliche post-polish restano sicure:

- `/competitions` resta in empty state.
- `/competitions/manual-serie-a` resta in not_found/empty state.
- Nessun dato `private_admin` è visibile.
- Nessun link admin pubblico è visibile.
- Nessun debug/raw payload è visibile.
- Nessun bottone operativo è visibile.

## Recommended Punto 59

Decisione consigliata: **Punto 59 — Public data promotion plan only**.

Motivo:

- Il pubblico è ora verificato come sicuro.
- I dati manuali restano `private_admin`.
- Prima di qualsiasi esposizione reale serve un piano no-write per la promotion controllata da `private_admin` a `public`.

## Safe alternatives

- **Public homepage/navigation polish**: possibile se si vuole migliorare navigazione prima di pubblicare dati.
- **Repeat admin browser verification**: utile solo quando sarà disponibile una sessione admin verificabile.

## Guardrails

- `next_write_allowed=false`
- `visibility_changed=false`
- `db_write=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
