# Manual Import Point 65 Decision — P64

Punto 64 ha scelto UI/product polish senza promotion. Punto 65 resta una decisione separata.

## Option A — Browser verification after product polish

Obiettivo: verificare in browser no-auth che le pagine pubbliche restino empty/not_found e senza dati `private_admin`.

Verifiche:

- `/competitions` carica e resta empty.
- `/competitions/manual-serie-a` resta not_found/empty.
- Nessun dato manuale è visibile.
- Nessun link admin, debug payload o bottone operativo.

## Option B — Real public data promotion apply, staging only

Obiettivo: eseguire davvero la promotion solo con autorizzazione esplicita completa.

Richiede una nuova frase esplicita completa. Un generico “procedi” non autorizza scrittura, SQL o cambio visibility.

## Option C — Continue public homepage/navigation polish

Obiettivo: continuare prodotto/UI senza DB write e senza promotion.

## Recommended decision

Opzione A se si vuole chiudere la verifica dopo il polish UI.

Opzione B solo se arriva autorizzazione esplicita completa.

Opzione C se si vuole restare in no-write e continuare polish prodotto.

## P64 decision markers

- `point_64_public_ui_product_polish_completed=true`
- `public_ui_product_polish_mode=no_promotion`
- `promotion_executed=false`
- `real_sql_executed=false`
- `db_write=false`
- `visibility_changed=false`
