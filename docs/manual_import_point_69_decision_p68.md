# Manual Import Point 69 Decision — P68

Punto 68 chiude il polish UI pubblico dopo promotion senza ulteriori scritture.

## Current public state

- `/competitions`: data visible.
- `/competitions/manual-serie-a`: data visible.
- `public_competitions_count=1`
- `public_teams_count=2`
- `public_standings_count=2`
- `public_bundle_status=ready`
- `private_admin_publicly_exposed=false`

## Recommended Point 69

Opzione consigliata: verifica Preview no-auth dello stato UI polished, usando solo branch `preview`, senza deploy manuale e senza Production.

Verificare:

- `/competitions` visibile no-auth;
- `/competitions/manual-serie-a` visibile no-auth;
- card competizione leggibile;
- teams e standings leggibili;
- nessun admin link;
- nessun debug/raw payload;
- nessun bottone operativo;
- Production non toccata.

## Do not do automatically

- Non fare deploy manuale.
- Non eseguire rollback.
- Non fare nuove DB write.
- Non attivare provider/import.
- Non toccare Production.
