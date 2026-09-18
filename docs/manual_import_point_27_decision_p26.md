# Punto 26 — Decisione Punto 27

Data: 2026-09-18  
Stato: read-only access investigation completata.

## Stato finale

| Area | Stato | Motivo |
|---|---|---|
| competitions | blocked | Accesso anon/pubblico non conferma lookup import. |
| teams | blocked | Accesso anon/pubblico non conferma lookup team. |
| standings | blocked | Accesso anon/pubblico non conferma dedup/lookup standings. |

`next_write_allowed=false`.

## Opzioni Punto 27

### A. Ancora no-write: proposta migrazione read-only view, non applicata

Consigliata se si vuole rendere il lookup import verificabile senza service role.

La proposta dovrebbe:

- creare view esplicite;
- limitare colonne;
- grant SELECT controllati;
- non abilitare write;
- non attivare import/provider.

### B. Ancora no-write: usare solo schema locale e fixture

Possibile ma non risolve lookup live. Mantiene il progetto in manual/mock mode.

### C. Ancora no-write: conferma manuale da Supabase dashboard

Possibile alternativa: query manuali `SELECT` in SQL Editor staging, documentate, senza insert/update/delete.

### D. Prima write staging controllata

Non consigliata e non autorizzata.

Sarebbe considerabile solo con:

- schema target ready;
- read-only access confermato;
- backup/rollback/audit pronti;
- autorizzazione esplicita;
- nessuna Production;
- nessun provider reale.

## Decisione raccomandata

Poiché le aree restano `blocked`, il Punto 27 consigliato è:

```text
Punto 27-A — proposta no-write di view read-only dedicate, non applicata.
```

In alternativa, Punto 27-C con conferma manuale dashboard read-only.
