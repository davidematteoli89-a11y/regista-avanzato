# Punto 32 — Manual review no-apply della migration draft

## Scope

Review manuale/statica della migration draft P31:

- no apply;
- no DB write;
- no `service_role`;
- no `db push/reset`;
- no provider/fetch;
- no Production;
- `next_write_allowed=false`.

## Draft reviewed

- Path: `docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`
- Commit di partenza: `b23e937`
- Draft fuori da `supabase/migrations`: `true`
- View incluse:
  - `manual_import_competitions_lookup`
  - `manual_import_teams_lookup`
  - `manual_import_standings_lookup`

## Safety review

| Check | Status | Notes |
|---|---|---|
| header safety present | pass | Header include `MIGRATION_DRAFT_ONLY`, `DO NOT APPLY`, `DO NOT RUN`, `NEXT_WRITE_ALLOWED=false`. |
| draft outside supabase/migrations | pass | File in `docs/migration_drafts/`. |
| no insert/update/delete/upsert | pass | Nessuna write statement. |
| no destructive alter/drop table | pass | Nessun `ALTER TABLE`, `DROP TABLE`, `TRUNCATE`. |
| no trigger/function write | pass | Nessun trigger/funzione. |
| no grants operative | pass | Grants solo come `REVIEW_REQUIRED`, non operativi. |
| no policies operative | pass | Nessuna policy operativa. |
| no provider/fetch | pass | Nessuna API/fetch/provider. |
| no service_role | pass | Solo divieto/commento `No service_role`. |
| no production | pass | Solo divieto/commento `No Production`. |
| no db push/psql command | pass | Nessun comando operativo. |
| next_write_allowed=false | pass | Presente in header e docs. |

## View review

| View | Status | Columns reviewed | Risks | Notes |
|---|---|---|---|---|
| `manual_import_competitions_lookup` | pass | `id`, `internal_key`, `api_competition_id`, `slug`, `name`, `country`, `continent`, `season`, `tracking_level`, `status`, `visibility`, `created_at`, `updated_at` | grants/filter still require review | Hardened by excluding public/login flags not required for lookup. |
| `manual_import_teams_lookup` | pass | `id`, `competition_id`, `api_team_id`, `slug`, `name`, `short_name`, `country`, `status`, `visibility`, `created_at`, `updated_at` | grants/filter still require review | Hardened by excluding `source_provider_id` and `city`. |
| `manual_import_standings_lookup` | pass | `id`, `competition_id`, `team_id`, `season`, `stage`, `matchday`, `rank`, `played`, `won`, `drawn`, `lost`, `goals_for`, `goals_against`, `goal_difference`, `points`, `status`, `visibility`, `created_at`, `updated_at` | grants/filter still require review | Hardened by excluding `source_provider_id`, `form`, `qualification_note`. |

## Hardening applied

- Added stronger note that SQL DDL is review-only and must remain outside `supabase/migrations`.
- Removed non-essential columns from the draft:
  - `competitions.public_stats_enabled`;
  - `competitions.login_required_for_full_stats`;
  - `teams.source_provider_id`;
  - `teams.city`;
  - `standings.source_provider_id`;
  - `standings.form`;
  - `standings.qualification_note`.

## Review outcome

- migration_draft_reviewed=true
- draft_hardened=true
- blocking_issues_count=0
- needs_review_count=3
- ready_for_staging_apply_candidate=true
- ready_for_apply=false
- next_write_allowed=false

`ready_for_staging_apply_candidate=true` significa solo che non sono emersi blocker statici nella draft dopo hardening. Non autorizza apply, DB write o Production.

## Punto 33 follow-up

Punto 33 ha creato un piano documentale no-apply per una futura applicazione staging:

- staging apply plan created: `true`;
- backup checklist created: `true`;
- rollback checklist created: `true`;
- pre-apply checklist created: `true`;
- post-apply verification plan created: `true`;
- migration applied: `false`;
- ready for apply: `false`;
- `next_write_allowed=false`.

La draft resta fuori da `supabase/migrations`; nessuna scrittura DB è autorizzata.
