# Punto 35 — Decisione Punto 36

## Stato Punto 35

- explicit authorization received: `true`
- staging target confirmed: `true`
- real migration created: `true`
- migration applied: `false`
- db write: `false`
- post-apply verification passed: `false`
- rollback needed: `false`
- provider/import off: `true`
- Production untouched: `true`
- next_write_allowed: `false`

## Decisioni possibili

### A. Punto 36 — read-only app verification/admin integration

Non consigliato ora perché l’apply non è stato eseguito.

### B. Punto 36-Fix — canale apply controllato

Consigliato. Definire un canale sicuro per applicare la migration in staging senza violare i divieti correnti, per esempio apply manuale da SQL Editor staging con contenuto revisionato e conferma separata.

### C. Punto 36-Rollback plan / fix plan

Non serve rollback distruttivo perché nessuna scrittura DB è stata eseguita.

### D. Non attivare provider/import

Obbligatorio.

### E. Non deployare Production

Obbligatorio.

## Decisione

Consiglio Punto 36-Fix/canale apply controllato. Non autorizzo provider/import, non autorizzo Production e mantengo `next_write_allowed=false`.

## Punto 36-A follow-up

Il canale scelto è `manual_sql_editor`; l’utente ha eseguito manualmente il Run nella dashboard Supabase staging.

Decisione aggiornata:

- apply manuale riuscito con `Success. No rows returned`;
- documentare verifica post-apply metadata/colonne;
- se comunica errore, aprire Punto 37-Blocked;
- provider/import/Production restano esclusi.
