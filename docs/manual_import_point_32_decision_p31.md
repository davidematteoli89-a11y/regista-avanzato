# Punto 31 — Decisione Punto 32

## Stato

- migration_draft_created=true
- migration_draft_path=`docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`
- migration_draft_in_supabase_migrations=false
- migration_applied=false
- db_push_reset=false
- db_write=false
- service_role_used=false

## Punto 33 status

Punto 33 completato come piano no-apply per futura applicazione staging.

- backup checklist created: `true`;
- rollback checklist created: `true`;
- pre-apply checklist created: `true`;
- post-apply verification plan created: `true`;
- migration applied: `false`;
- ready for apply: `false`;
- `next_write_allowed=false`.
- ready_for_apply=false
- next_write_allowed=false

## Decisioni possibili

### A. Punto 32 — review manuale della migration draft no-apply

Consigliato.

Obiettivo: verificare staticamente la draft, grants mancanti, filtro ruoli, rollback e rischi, senza applicare nulla.

### B. Punto 32-B — ulteriore confronto con schema locale se emergono dubbi

Valido se durante review emergono dubbi su colonne o filtri.

### C. Punto 33 — applicazione staging

Non consigliato direttamente. Richiede prima review Punto 32, backup/rollback, test ruoli e autorizzazione esplicita.

### D. Restare in manual/mock mode

Sempre valido e sicuro.

## Decisione attuale

Consigliato: A, Punto 32 review manuale no-apply della migration draft.

`next_write_allowed=false`.

## Punto 32 eseguito

- migration_draft_reviewed=true
- draft_hardened=true
- blocking_issues_count=0
- needs_review_count=3
- ready_for_staging_apply_candidate=true
- ready_for_apply=false
- next_write_allowed=false

Prossimo step consigliato: Punto 33 staging apply plan no-apply, non apply diretto.
