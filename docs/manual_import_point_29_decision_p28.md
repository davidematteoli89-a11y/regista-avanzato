# Punto 28 — Decision gate for Punto 29

Stato: no-apply, no-write.

Punto 28 prepara una migration proposal documentale per future view read-only. Non crea una migrazione applicabile automaticamente e non autorizza alcuna scrittura.

## Decisione corrente

```text
read_only_view_migration_proposal_prepared=true
proposal_path=docs/migration_proposals/manual_import_read_only_views_p28.sql.md
real_migration_file_created=false
migration_applied=false
db_write=false
provider_activated=false
next_write_allowed=false
```

## Punto 29 non autorizzato

Punto 29 o qualunque fase successiva non può procedere a write staging finché non vengono completati:

- review manuale della proposta;
- conferma read-only di tabelle/colonne reali;
- scelta esplicita se creare una vera migrazione sotto `supabase/migrations`;
- conferma esplicita che la vera migrazione resti non applicata;
- nuovo audit RLS/grants;
- nuova autorizzazione dell'utente.

## Opzioni successive sicure

1. Punto 29-A: review statica della proposta, senza DB.
2. Punto 29-B: query manuali `SELECT` in SQL Editor staging, senza write.
3. Punto 29-C: creare una vera migrazione versionata ma non applicata.

Nessuna di queste opzioni abilita import reali o provider.
