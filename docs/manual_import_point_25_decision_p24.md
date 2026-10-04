# Punto 24 — Decisione Punto 25

Data: 2026-09-17  
Stato: no-write, schema deep review locale completata.

## Risultato Punto 24

| Area | Stato dopo review locale | Motivo |
|---|---|---|
| `competitions` | `needs_review` | Dedup key e default editoriale ancora da confermare. |
| `teams` | `needs_review` | Lookup FK competizione e policy slug ancora da confermare. |
| `standings` | `needs_review` | Lookup FK, stagione/stage/matchday e goal difference ancora da confermare. |

Conteggi:

- ready areas: `0`
- needs review areas: `3`
- blocked areas: `0`
- ready fields: `12`
- needs review fields: `6`
- blocked fields: `0`

## Opzioni Punto 25

### A. Ancora no-write: DB read-only schema check

Consigliata. Verifica solo con query `SELECT` su staging:

- presenza righe provider manual/mock;
- competizione Serie A/manual fixture già presente o no;
- lookup sicuro per `provider_competition_id`;
- lookup sicuro team entro competizione;
- assenza drift schema staging rispetto ai file locali.

### B. Ancora no-write: creare migrazione proposta, ma non applicarla

Non consigliata ora, perché localmente non è emersa una colonna mancante. Da usare solo se il Punto 25-A mostra drift o assenza schema reale.

### C. Ancora no-write: restare su manual/mock mode

Accettabile se si vuole posticipare ogni contatto DB live. Mantiene il progetto sicuro ma non risolve i lookup.

### D. Prima write staging controllata

Non consigliata e non autorizzata. Prima servono aree `ready`, query read-only, backup/rollback, audit e autorizzazione esplicita.

## Decisione raccomandata

Poiché almeno una area resta `needs_review` — in realtà tutte e tre — il Punto 25 consigliato è:

```text
Punto 25-A — DB read-only schema/data lookup check, ancora no-write.
```

`next_write_allowed=false` resta invariato.
