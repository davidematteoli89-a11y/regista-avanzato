# Punto 30-C — Manual schema values collection

## Scope

Documento no-write per preparare la raccolta manuale dei valori reali di schema Supabase necessari al futuro lookup read-only di import manuale.

Conferme di sicurezza:

- nessuna verifica DB automatica;
- nessun SQL da eseguire;
- nessuna scrittura DB;
- nessun `service_role`;
- nessuna migration creata o applicata;
- nessun provider/API/fetch;
- nessuna Production;
- `next_write_allowed=false`.

I valori reali non sono ancora stati forniti. Nessun placeholder viene segnato come risolto.

Stati ammessi per la raccolta:

- `uncollected`: valore non ancora raccolto;
- `unclear`: valore visto ma non interpretabile con certezza;
- `not_present`: valore confermato assente;
- `confirmed:<value>`: valore reale confermato dall'utente.

## Values to collect

### Competitions

| Required value | Current status | Collected value | Notes |
|---|---|---|---|
| real competitions table name | uncollected | uncollected | Non inventare il nome tabella. |
| internal competition id column | uncollected | uncollected | Serve per lookup stabile. |
| provider/external competition id column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| competition name column | uncollected | uncollected | Campo display. |
| competition slug column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| competition country column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| competition category/status column, if present | uncollected | uncollected | Specificare eventuali enum/status. |
| created_at column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| updated_at column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| relevant FK/relationships | uncollected | uncollected | Annotare relazioni viste da Dashboard. |
| existing public/admin views, if present | uncollected | uncollected | Annotare view già esistenti. |
| RLS enabled | uncollected | uncollected | Solo lettura visuale Dashboard. |
| SELECT policy for anon/authenticated/admin/editor | uncollected | uncollected | Non modificare policy. |

### Teams

| Required value | Current status | Collected value | Notes |
|---|---|---|---|
| real teams table name | uncollected | uncollected | Non inventare il nome tabella. |
| internal team id column | uncollected | uncollected | Serve per lookup stabile. |
| provider/external team id column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| team name column | uncollected | uncollected | Campo display. |
| team slug column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| team country column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| competition relation column, if present | uncollected | uncollected | Serve per collegare team e competizione. |
| created_at column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| updated_at column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| relevant FK/relationships | uncollected | uncollected | Annotare relazioni viste da Dashboard. |
| existing public/admin views, if present | uncollected | uncollected | Annotare view già esistenti. |
| RLS enabled | uncollected | uncollected | Solo lettura visuale Dashboard. |
| SELECT policy for anon/authenticated/admin/editor | uncollected | uncollected | Non modificare policy. |

### Standings

| Required value | Current status | Collected value | Notes |
|---|---|---|---|
| real standings table name | uncollected | uncollected | Non inventare il nome tabella. |
| internal standing id column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| competition id/ref column | uncollected | uncollected | FK/ref verso competizione. |
| team id/ref column | uncollected | uncollected | FK/ref verso team. |
| season column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| round column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| rank/position column | uncollected | uncollected | Campo posizione/rank. |
| played column | uncollected | uncollected | Partite giocate. |
| wins column | uncollected | uncollected | Vittorie. |
| draws column | uncollected | uncollected | Pareggi. |
| losses column | uncollected | uncollected | Sconfitte. |
| goals_for column | uncollected | uncollected | Gol fatti. |
| goals_against column | uncollected | uncollected | Gol subiti. |
| points column | uncollected | uncollected | Punti. |
| created_at column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| updated_at column, if present | uncollected | uncollected | Se assente, segnare `not_present`. |
| relevant FK/relationships | uncollected | uncollected | Annotare relazioni viste da Dashboard. |
| existing public/admin views, if present | uncollected | uncollected | Annotare view già esistenti. |
| RLS enabled | uncollected | uncollected | Solo lettura visuale Dashboard. |
| SELECT policy for anon/authenticated/admin/editor | uncollected | uncollected | Non modificare policy. |

## Current outcome

- manual_schema_values_collection_prepared=true
- real_schema_values_provided=false
- placeholders_resolved_count=0
- placeholders_uncollected_count=16
- ready_for_migration_draft=false
- next_write_allowed=false

