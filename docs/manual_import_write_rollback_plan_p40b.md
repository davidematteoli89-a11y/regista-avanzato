# Punto 40-B — Manual import write rollback plan no-apply

## Scope

Piano rollback futuro solo documentale. Nessuna query `DELETE`, nessun SQL eseguibile e nessun rollback automatico sono autorizzati.

## Scenari

### Competition create fallisce

- Interrompere la futura procedura.
- Non creare teams o standings.
- Verificare read-only che non siano state create righe parziali.

### Team create fallisce

- Interrompere la futura procedura prima delle standings.
- Verificare read-only competition creata e team parziali.
- Preparare eventuale rollback manuale solo dopo autorizzazione esplicita.

### Standings create fallisce

- Interrompere la futura procedura.
- Verificare read-only competition/teams già create.
- Preparare eventuale fix o rollback manuale solo dopo autorizzazione esplicita.

### Competition creata ma teams non create

- Stato parziale da documentare.
- Nessun delete automatico.
- Rollback o completamento richiede nuova autorizzazione.

### Teams create ma standings non create

- Stato parziale da documentare.
- Nessun delete automatico.
- Rollback o completamento richiede nuova autorizzazione.

## Identificazione righe create

Le righe future dovrebbero essere identificabili tramite:

- `api_competition_id = manual-serie-a`;
- `internal_key = manual-serie-a`, se applicabile;
- `api_team_id in (manual-team-1, manual-team-2)`;
- relazione `competition_id` risolta dalla competition fixture;
- relazione `team_id` risolta dalle team fixture;
- eventuale batch/import run id se il futuro write plan lo prevede.

## Regole

- non generare `DELETE` SQL eseguibile;
- non autorizzare rollback automatico;
- non usare `service_role`;
- rollback solo in futuro con autorizzazione esplicita;
- next_write_allowed: `false`.
