# Punto 20 — Manual Import Staging Plan closure

Stato: completato localmente.

## Sintesi

Punto 20 prepara un piano tecnico per un futuro import manuale in staging, partendo dalle fixture/manual data validate nel Punto 19.

## Cosa è stato aggiunto

- Definizione di “manual import approvato”.
- Mapping teorico fixture → tabelle Supabase.
- Dry-run del piano import manuale.
- Piano audit/rollback.
- Checklist pre-import.
- Note admin/readiness aggiornate.

## Comando aggiunto

```bash
npm run dry-run:manual-import-plan
```

Il comando produce solo un piano testuale sanificato:

- nessuna fetch;
- nessuna lettura token;
- nessuna scrittura DB;
- nessun SQL eseguibile;
- nessun provider reale.

## Decisione finale

Punto 20 completato.

Il progetto dispone di un piano tecnico per un futuro import manuale in staging.

Nessun import reale è stato eseguito.

Nessuna scrittura DB è stata eseguita.

Il prossimo passo eventuale sarà autorizzare esplicitamente un manual import staging dry-run più vicino al DB, ma ancora prima di qualsiasi write reale.
