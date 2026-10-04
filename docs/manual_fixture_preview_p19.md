# Punto 19 — Manual fixture preview

Stato: preview admin read-only preparata.

## Scopo

Punto 19 rende visibile in admin la modalità manual/mock preparata nel Punto 18.

La preview mostra fixture locali/manuali e validazione teorica, senza import reale e senza scritture DB.

## Definizioni

- Preview: lettura fixture locali versionate e visualizzazione read-only in admin.
- Dry-run: validazione mapping teorico tramite `npm run dry-run:manual-fixtures`.
- Import: non disponibile in Punto 19.
- DB write: non autorizzata in Punto 19.

## Cosa mostra `/admin/imports`

La pagina admin mostra:

- stato provider:
  - TheStatsAPI / Stats API: suspended;
  - API-Football: suspended/no retry;
  - Apify: off;
  - Manual data: active/safe;
  - Mock data: active/safe;
  - Real imports: disabled;
  - DB writes: disabled;
- summary fixture:
  - `competitions_count`;
  - `teams_count`;
  - `standings_rows_count`;
  - `references_valid`;
  - `mapping_theoretical_possible`;
  - `external_fetch=false`;
  - `db_write=false`;
- tabelle read-only per competitions, teams e standings;
- validazione:
  - `missing_required_fields`;
  - `reference_errors`;
  - `warnings`;
  - `errors`.

## Cosa non fa

- Non chiama provider reali.
- Non chiama TheStatsAPI / Stats API v1.
- Non chiama API-Football.
- Non chiama Apify/SofaScore.
- Non fa fetch provider.
- Non legge `.env.local`.
- Non legge/stampa token.
- Non usa Supabase admin client.
- Non usa `service_role`.
- Non scrive nel database.
- Non abilita import.
- Non aggiunge bottoni run/import/sync/save/delete.

## Criteri futuri per valutare un import manuale

Un import manuale staging potrà essere valutato solo in uno step separato e solo se:

- fixture valida;
- riferimenti validi;
- mapping teorico possibile;
- campi obbligatori presenti;
- ambiente staging confermato;
- backup/rollback documentato;
- scrittura DB esplicitamente autorizzata;
- RLS/audit verificati;
- nessun provider reale coinvolto.

## Decisione Punto 19

La preview è utile per controllare forma e coerenza dei dati manual/mock, ma non autorizza import o scritture.
