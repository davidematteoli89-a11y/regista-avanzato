# Public Data Promotion Authorization Gate — P61

## Decision

Punto 61 prepara il pack manuale, ma non autorizza la promotion reale.

## Required future authorization

La promotion reale richiede esattamente una conferma esplicita separata:

```text
Autorizzo il Punto 62: esegui la promotion a public della fixture manual-serie-a in Supabase staging, includendo competition, teams e standings, senza Production, senza provider/import, senza deploy.
```

## Not sufficient

Le seguenti frasi non autorizzano scrittura DB:

- procedi
- vai
- continua
- ok
- fallo
- confermo

## Current P61 status

- `promotion_sql_pack_mode=no_apply`
- `public_data_promotion_executed=false`
- `real_sql_executed=false`
- `db_write=false`
- `visibility_changed=false`
- `production_touched=false`
- `deploy_executed=false`
