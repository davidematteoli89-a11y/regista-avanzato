# Manual Import Point 67 Decision — P66

Punto 66 ha promosso con successo `manual-serie-a` a `public_free` in Supabase staging.

## Current state

- `public_competitions_count=1`
- `public_teams_count=2`
- `public_standings_count=2`
- `public_bundle_status=ready`
- `public_routes_current_state=data_visible`
- `rollback_executed=false`

## Recommended Point 67

Punto 67 consigliato: browser verification no-auth post-promotion.

Verificare su locale/Preview, senza login:

- `/competitions` mostra `Serie A Manual Sample`;
- `/competitions/manual-serie-a` mostra dettaglio, teams e standings;
- nessun dato fuori scope;
- nessun admin link;
- nessun debug/raw payload;
- nessun bottone operativo;
- nessuna DB write ulteriore;
- nessun provider/import;
- nessun Apify;
- nessuna Production.

## Do not do automatically

- Non eseguire rollback se tutto passa.
- Non fare deploy.
- Non attivare provider/import.
- Non toccare Production.
