# Manual Import Point 68 Decision — P67

Punto 67 ha verificato le route pubbliche dopo la promotion P66.

## Current public state

- `/competitions`: data visible.
- `/competitions/manual-serie-a`: data visible.
- `public_competitions_count=1`
- `public_teams_count=2`
- `public_standings_count=2`
- `public_bundle_status=ready`
- `private_admin_publicly_exposed=false`

## Recommended Point 68

Opzione consigliata: Preview verification no-auth dopo push/deployment automatico del branch `preview`, senza deploy manuale.

Verificare:

- route Preview pubbliche;
- dati visibili no-auth;
- nessun admin link;
- nessun debug payload;
- nessun bottone operativo;
- Production non toccata.

## Do not do automatically

- Non fare deploy manuale.
- Non eseguire rollback se tutto passa.
- Non attivare provider/import.
- Non toccare Production.
