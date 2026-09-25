# Punto 40-B — Manual import write SQL plan no-apply

DOCUMENTATION_ONLY  
DO NOT RUN  
NO DB WRITE AUTHORIZED  
NO PRODUCTION  
NO PROVIDER  
NO IMPORT EXECUTION  
NEXT_WRITE_ALLOWED=false

## Scope

Questo documento descrive pseudo-step futuri. Non contiene SQL eseguibile e non deve essere copiato in SQL Editor.

## Pseudo-step futuri

1. Validare che il target sia staging “Regista Avanzato”.
2. Confermare che Production sia esclusa.
3. Confermare che provider/import/Apify siano spenti.
4. Inserire la competition fixture come create singola.
5. Recuperare o risolvere `competition_id` generato/definito.
6. Inserire le 2 teams collegate alla competition.
7. Recuperare o risolvere i 2 `team_id`.
8. Inserire le 2 standings collegate a competition/team.
9. Eseguire solo verifiche post-write read-only.
10. Documentare esito, eventuali righe create e rollback availability.

## Cosa non è incluso

- nessun `INSERT`;
- nessun `UPDATE`;
- nessun `DELETE`;
- nessun `UPSERT`;
- nessun SQL pronto da lanciare;
- nessun file `.sql`;
- nessuna Server Action write;
- nessun provider/import.

## Gate

Qualunque trasformazione di questo piano in SQL eseguibile richiede una nuova autorizzazione esplicita.
