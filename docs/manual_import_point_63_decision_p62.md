# Manual Import Point 63 Decision — P62

## Options

### A. Punto 63 — Real public data promotion apply, staging only, explicit authorization required

Obiettivo:

- eseguire davvero la promotion della fixture `manual-serie-a` in Supabase staging;
- solo se l’utente fornisce autorizzazione esplicita completa;
- nessuna Production;
- nessun provider/import;
- nessun deploy.

### B. Punto 63 — Final pre-apply no-write checklist

Obiettivo:

- un ultimo controllo no-write prima della DB write;
- rivedere ambiente, scope, rollback e post-verification.

### C. Punto 63 — Continue public UI/product polish without promotion

Obiettivo:

- rimandare la promotion;
- continuare il prodotto pubblico empty-state.

## Recommended decision

Decisione consigliata: **B. Punto 63 — Final pre-apply no-write checklist** se si vuole massima prudenza.

Opzione A solo se arriva autorizzazione esplicita completa.

## Current gate

- `explicit_authorization_required=true`
- `generic_proceed_authorizes_write=false`
- `promotion_executed=false`
- `db_write=false`
- `visibility_changed=false`
