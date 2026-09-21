# Punto 27 — Manual import read-only view requirements

Stato: proposta documentale, no-write.

Punto 27 nasce dal blocker di Punto 26: il client anon/pubblico non conferma in modo affidabile i lookup necessari per l'import manuale staging. La risoluzione proposta è preparare view dedicate, esplicite e read-only, senza applicarle ora.

## Regole di fase

- Nessuna migrazione preparata come SQL eseguibile.
- Nessuna migrazione applicata.
- Nessun `db push/reset`.
- Nessuna scrittura DB.
- Nessun provider o Apify attivato.
- Nessun service role.
- Nessun accesso Production.
- `next_write_allowed=false`.

## View 1 — manual import competitions lookup

Scopo: consentire a una futura fase manuale di risolvere una fixture competition verso la competizione staging esistente.

Campi minimi richiesti:

- `competition_id`
- `slug`
- `name`
- `country`
- `season`
- `tracking_level`
- eventuale identificativo provider/manuale confermato
- eventuale stato/visibilità sicuro

Requisiti:

- Solo colonne esplicite.
- Nessun payload esterno grezzo.
- Nessun token o metadata sensibile.
- Lettura solo a utenti admin/editor approvati, secondo helper RLS già disponibili.
- Nessuna policy di scrittura lato client pubblico.

## View 2 — manual import teams lookup

Scopo: risolvere le squadre fixture verso team staging e collegarle alla competizione corretta.

Campi minimi richiesti:

- `team_id`
- `competition_id`
- `competition_slug`
- `slug`
- `name`
- `country`
- eventuale identificativo provider/manuale confermato

Requisiti:

- La view deve rendere chiaro il legame team → competition.
- Deve evitare contenuti non necessari o payload provider.
- Deve restare read-only.
- Deve rispettare RLS e helper admin/editor approvati.

## View 3 — manual import standings lookup

Scopo: permettere la verifica read-only delle righe classifica esistenti o attese prima di qualunque write.

Campi minimi richiesti:

- `standing_id` se esiste
- `competition_id`
- `competition_slug`
- `team_id`
- `team_slug`
- `season`
- `stage`
- `matchday`
- `rank`
- `played`
- `won`
- `drawn`
- `lost`
- `goals_for`
- `goals_against`
- `goal_difference`
- `points`

Requisiti:

- Nessun dato grezzo provider.
- Nessuna colonna di audit interna non necessaria.
- Nessuna azione di scrittura.
- Compatibilità con la fixture manuale corrente.

## Cosa resta bloccato

- Import manuale reale.
- Writer staging.
- Inserimento/aggiornamento classifica.
- Attivazione provider.
- Qualunque import storico o live.

## Gate Punto 28

Punto 28 deve scegliere una sola strada:

1. preparare una migrazione non applicata per le view read-only;
2. eseguire solo controlli dashboard/SQL Editor con `SELECT` manuali;
3. restare in manual/mock mode.

Nessuna opzione abilita scritture senza nuova conferma esplicita.

## Punto 28 update

La proposta è stata trasformata in migration proposal documentale:

- `docs/migration_proposals/manual_import_read_only_views_p28.sql.md`

Il file resta fuori da `supabase/migrations`, è marcato `MIGRATION_PROPOSAL_ONLY / DO NOT APPLY / DO NOT RUN` e non autorizza scritture.
