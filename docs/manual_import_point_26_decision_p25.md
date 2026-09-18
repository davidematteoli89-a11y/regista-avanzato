# Punto 25 — Decisione Punto 26

Data: 2026-09-18  
Stato: DB read-only check eseguito, nessuna write.

## Risultato Punto 25

| Area | Stato finale | Motivo |
|---|---|---|
| `competitions` | `blocked` | Tabella/colonne non confermate da client anon/pubblico. |
| `teams` | `blocked` | Tabella/colonne e lookup fixture non confermati. |
| `standings` | `blocked` | Tabella/view e riferimenti non confermati. |

Conteggi finali:

- final ready areas: `0`
- final needs review areas: `0`
- final blocked areas: `3`
- `write_preconditions_met=false`
- `next_write_allowed=false`

## Opzioni Punto 26

### A. Ancora no-write: approfondire schema/accesso read-only

Consigliata. Possibili sotto-step:

- verificare se il client anon punta allo staging corretto senza stampare URL/key;
- preparare query manuali solo `SELECT` da SQL Editor staging;
- verificare grants/RLS per public views;
- confermare se il blocco è accesso anon, schema cache, progetto errato o drift.

### B. Proposta migrazione futura, non applicata

Non consigliata ora, perché non è emersa una colonna mancante reale. Da considerare solo se un check manuale read-only conferma drift o schema assente.

### C. Prima write staging controllata

Non autorizzata.

Sarebbe considerabile solo se tutti questi punti fossero veri:

- tutte le aree `ready`;
- staging confermato;
- backup pronto;
- rollback pronto;
- audit pronto;
- RLS accettata;
- approvazione esplicita utente;
- nessuna Production;
- nessun provider reale;
- checklist P20–P25 passata.

## Decisione raccomandata

Poiché tutte le aree sono `blocked`, il Punto 26 consigliato è:

```text
Punto 26-A — investigazione read-only schema/accesso Supabase staging, ancora no-write.
```

`next_write_allowed=false` resta invariato.
