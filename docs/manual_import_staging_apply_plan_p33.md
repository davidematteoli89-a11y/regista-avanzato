# Punto 33 — Staging apply plan no-apply

## Scope

Questo documento è solo un piano documentale per una futura applicazione in staging delle view read-only di manual import.

Stato sicurezza:

- no apply;
- no `db push/reset`;
- no DB write;
- no `service_role`;
- no provider/API;
- no Apify;
- no Production;
- `next_write_allowed=false`.

Non autorizza la creazione di una migration reale, non autorizza SQL Editor, non autorizza Supabase CLI e non autorizza scritture staging.

## Migration candidate

Draft candidate:

- `docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`

View candidate:

- `manual_import_competitions_lookup`
- `manual_import_teams_lookup`
- `manual_import_standings_lookup`

Review status da Punto 32:

- `migration_draft_reviewed=true`
- `migration_draft_hardened=true`
- `blocking_issues_count=0`
- `needs_review_count=3`
- `ready_for_staging_apply_candidate=true`
- `ready_for_apply=false`
- `next_write_allowed=false`

`ready_for_staging_apply_candidate=true` significa solo che la draft può essere considerata per un futuro piano di apply staging. Non significa che sia pronta per l’esecuzione.

## Staging apply boundaries

Un futuro apply potrà essere valutato solo se:

- ambiente Supabase staging confermato;
- Production esclusa esplicitamente;
- backup checklist completata;
- rollback checklist completata;
- migration trasformata in file reale solo in step separato e autorizzato;
- migration revisionata ancora una volta prima dell’apply;
- autorizzazione esplicita utente ricevuta nello step di apply;
- provider/API/Apify ancora spenti;
- import reali ancora spenti;
- nessun dato applicativo scritto oltre alla creazione/aggiornamento delle view read-only;
- nessun `service_role` usato dall’app;
- nessun deploy Production collegato.

## Current decision

Punto 33 resta no-apply. La draft resta fuori da `supabase/migrations`; nessun file migration reale viene creato.

## Punto 34 follow-up

Punto 34 ha aggiunto il final pre-apply authorization gate:

- final pre-apply gate created: `true`;
- authorization language defined: `true`;
- no-apply safety lock created: `true`;
- explicit user authorization received: `false`;
- point 35 blocked without explicit authorization: `true`;
- ready for apply: `false`;
- `next_write_allowed=false`.

Il piano P33 resta documentale e non autorizza apply.
