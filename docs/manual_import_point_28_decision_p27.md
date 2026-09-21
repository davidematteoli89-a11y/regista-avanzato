# Punto 27 — Decision gate for Punto 28

Stato: decisione documentale, no-write.

Punto 27 non crea migrazioni applicabili e non sblocca scritture. Prepara solo i requisiti per future view lookup read-only.

## Decisione corrente

```text
next_write_allowed=false
requires_new_read_only_view=true
migration_prepared=false
migration_applied=false
provider_activated=false
production_touched=false
```

## Opzioni Punto 28

### Opzione A — Migrazione non applicata

Preparare una migrazione versionata per:

- `manual_import_competitions_lookup`
- `manual_import_teams_lookup`
- `manual_import_standings_lookup`

La migrazione resterebbe non applicata finché non confermata.

### Opzione B — Verifica manuale SELECT

Eseguire nel SQL Editor staging solo query `SELECT` read-only per confermare nomi tabelle/colonne e possibili join.

### Opzione C — Restare in manual/mock mode

Non creare view e mantenere la fase bloccata fino a decisione successiva.

### Opzione D — Scrittura staging

Non autorizzata da Punto 27. Qualunque write richiede nuovo gate, backup, rollback, audit e conferma esplicita.

## Raccomandazione

Procedere con Opzione A o B. Non procedere con scritture.
