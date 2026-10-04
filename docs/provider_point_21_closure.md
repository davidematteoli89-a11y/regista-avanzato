# Punto 21 — Staging Manual Import Readiness closure

Stato: completato localmente.

## Sintesi

Punto 21 porta il piano manual import a readiness più vicina al DB, ma resta totalmente read-only.

## Aggiunto

- Schema target review locale.
- Batch plan simulato.
- Collision strategy create/update/skip.
- Rollback preview per batch.
- Script `npm run dry-run:manual-import-readiness`.
- Sezione admin read-only “Staging manual import readiness”.

## Decisione finale

Punto 21 completato.

Il progetto dispone di una readiness completa per un futuro import manuale in staging.

Il batch plan è simulato e non eseguibile.

Nessun SQL eseguibile è stato generato.

Nessuna scrittura DB è stata eseguita.

Il prossimo passo eventuale sarà Punto 22, solo con autorizzazione esplicita, per una prima write staging controllata oppure per un ulteriore schema confirmation dry-run.

## Conferme

- Nessun provider chiamato.
- Nessuna fetch provider.
- Nessuna scrittura DB.
- Nessun `service_role`.
- Nessun `db push/reset`.
- Nessuna migrazione modificata.
- Nessun deploy.
- Production non toccata.
