# Provider Punto 27 closure

Stato: completato in modalità no-write.

Punto 27 chiude il blocco operativo “Read-Only View Proposal” preparando la proposta di view lookup necessarie per un futuro import manuale staging.

## Risultato

- View proposte:
  - `manual_import_competitions_lookup`
  - `manual_import_teams_lookup`
  - `manual_import_standings_lookup`
- Requisiti documentati.
- Field mapping documentato.
- Pseudo-SQL marcato come non eseguibile.
- `/admin/imports` aggiornato con stato “read-only view needed”.
- `next_write_allowed=false`.

## Sicurezza

- Nessuna migrazione preparata come SQL eseguibile.
- Nessuna migrazione applicata.
- Nessun `db push/reset`.
- Nessuna scrittura DB.
- Nessun service role.
- Nessun provider chiamato.
- Apify spento.
- Production non toccata.

## Prossimo step

Punto 28: scegliere tra migrazione non applicata per view read-only oppure verifiche manuali `SELECT` da SQL Editor staging.

## Punto 28 update

Punto 28 ha prodotto solo una migration proposal documentale:

- `docs/migration_proposals/manual_import_read_only_views_p28.sql.md`

Non è stata creata o applicata una migrazione reale.
