# Punto 39 — Manual import preview rules

## Scope

Regole teoriche per preview manual fixture contro le view read-only verificate.

Queste regole:

- sono solo preview;
- non autorizzano insert/update/delete/upsert;
- non autorizzano import reali;
- non attivano provider;
- non devono essere applicate automaticamente;
- mantengono `next_write_allowed=false`.

## Competitions

Dedup key candidata:

1. `api_competition_id`, se presente;
2. fallback: `internal_key`;
3. fallback ulteriore: `slug + season/country`, meno sicuro e da usare solo se documentato.

Preview result:

- `create`: nessun match nelle view;
- `update`: match presente ma campi diversi;
- `skip`: match presente e campi equivalenti;
- `conflict`: più match, chiave mancante o campi identificativi ambigui;
- `unresolved`: lookup non eseguito o relazione non verificabile in modalità safe.

## Teams

Dedup key candidata:

1. `api_team_id`, se presente;
2. fallback: `competition_id + slug/name`;
3. la relation competition deve essere valida.

Preview result:

- `create`: nessun match nelle view;
- `update`: match presente ma campi diversi;
- `skip`: match presente e campi equivalenti;
- `conflict`: più match, chiave mancante o competition ambigua;
- `unresolved`: lookup non eseguito o relation competition non risolta.

## Standings

Dedup key candidata:

1. `competition_id + team_id + season + stage/matchday`, se presenti;
2. fallback vietato se team/competition non sono risolti.

Preview result:

- `create`: nessun match nelle view;
- `update`: match presente ma campi classifica diversi;
- `skip`: match presente e campi equivalenti;
- `conflict`: più match o chiave logica ambigua;
- `unresolved`: team/competition non risolti o lookup non eseguito.

## Punto 39 mode

Per Punto 39 è stata scelta modalità `local_only_unresolved` perché non è stato usato un canale DB read-only aggiuntivo e non è stata letta `.env.local`.

Di conseguenza:

- `view_lookup_executed=false`;
- `create_count=0`;
- `update_count=0`;
- `skip_count=0`;
- `conflict_count=0`;
- le fixture vengono classificate come `unresolved` finché non sarà autorizzato un lookup read-only applicativo/view-safe.
