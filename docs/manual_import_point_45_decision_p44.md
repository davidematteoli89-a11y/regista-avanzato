# Punto 44 — Decisione Punto 45

## Stato

Punto 44 ha creato il piano read-only per consumare dati manuali in admin/pubblico.

- point_44_manual_data_consumption_plan_created: `true`
- data_consumption_mode: `read_only_plan`
- available_competitions_count: `1`
- available_teams_count: `2`
- available_standings_count: `2`
- current_visibility: `private_admin`
- public_exposure_enabled: `false`
- point_44_db_write: `false`
- provider_fetch: `false`
- provider_import_enabled: `false`
- apify_enabled: `false`
- production_touched: `false`
- deploy_executed: `false`

## Decisione consigliata

### A. Punto 45 — implement admin read-only data surface for manual competitions

Consigliato.

Obiettivo:

- creare o collegare una superficie admin read-only;
- mostrare competition, teams e standings manuali;
- usare view read-only `manual_import_*_lookup`;
- nessuna scrittura DB;
- nessun provider/import;
- nessun deploy Production.

## Alternative

### B. Punto 45-Plan — ulteriore piano UI

Usare se route e layout admin non sono ancora chiari.

### C. Punto 45-Public — non consigliato ora

Non consigliato prima di admin perché i dati correnti sono `private_admin`.

## Regole

- admin prima del pubblico;
- no provider/import;
- no Production;
- no deploy;
- no DB write senza nuova autorizzazione esplicita.
