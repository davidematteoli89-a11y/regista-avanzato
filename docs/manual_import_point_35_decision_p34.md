# Punto 34 — Decisione Punto 35

## Opzioni

### A. Restare in no-apply mode

Default consigliato. Valido finché manca autorizzazione esplicita.

### B. Preparare Punto 35 solo dopo autorizzazione esplicita

Possibile solo se l’utente usa la frase di autorizzazione definita in `docs/manual_import_apply_authorization_language_p34.md`.

### C. Ulteriore review/hardening

Consigliato se emergono dubbi su schema, view, grants, RLS, backup, rollback o visibilità admin.

### D. Vietato applicare automaticamente

Mai applicare sulla base di “procedi”, “continua”, “ok”, “vai”, “applica” o formule simili.

## Decisione attuale

Consigliato: A, restare in no-apply mode.

Non autorizzo apply, non consiglio DB write e mantengo `next_write_allowed=false`.

## Punto 35 follow-up

Punto 35 avviato con autorizzazione esplicita.

Esito:

- real migration created: `true`;
- migration applied: `false`;
- db write: `false`;
- post-apply verification passed: `false`.

Nuova decisione consigliata: Punto 36-Fix/canale apply controllato, senza provider/import e senza Production.
