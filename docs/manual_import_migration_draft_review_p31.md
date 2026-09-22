# Punto 31 — Manual import read-only view migration draft review

## Draft path

- `docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`

The draft is outside `supabase/migrations` and has not been applied.

## Views included

1. `public.manual_import_competitions_lookup`
2. `public.manual_import_teams_lookup`
3. `public.manual_import_standings_lookup`

## Sources used

- `supabase/migrations/0001_base_schema.sql`
- `supabase/migrations/0003_rls_policies.sql`
- `supabase/migrations/0004_public_views.sql`
- `docs/manual_import_local_schema_extraction_p30d.md`
- `docs/manual_import_placeholder_resolution_p30d.md`

## Included columns

### `manual_import_competitions_lookup`

- `id`
- `internal_key`
- `api_competition_id`
- `slug`
- `name`
- `country`
- `continent`
- `season`
- `tracking_level`
- `status`
- `visibility`
- `public_stats_enabled`
- `login_required_for_full_stats`
- `created_at`
- `updated_at`

### `manual_import_teams_lookup`

- `id`
- `competition_id`
- `source_provider_id`
- `api_team_id`
- `slug`
- `name`
- `short_name`
- `country`
- `city`
- `status`
- `visibility`
- `created_at`
- `updated_at`

### `manual_import_standings_lookup`

- `id`
- `competition_id`
- `team_id`
- `source_provider_id`
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
- `form`
- `qualification_note`
- `status`
- `visibility`
- `created_at`
- `updated_at`

## Excluded columns and reason

- `internal_notes`: excluded because not needed for lookup and could contain admin notes.
- `approved_by`, `reviewed_at`, `published_at`, `login_required`: excluded from draft lookup unless future review proves they are necessary.
- provider credentials/tokens: no such columns are included.
- raw payloads: no raw provider payload columns are included.
- `extra_stats` or large JSON payloads: not included.

## Risks

- Live staging schema may differ from local versioned migrations.
- Grants are intentionally not included and must be reviewed separately.
- If applied without filtering/grants review, lookup views could expose more fields than needed.
- `ready_for_migration_draft=true` does not mean ready for apply.

## Review points

- Confirm live staging schema matches local migrations.
- Confirm whether views should filter with `public.is_editor_or_admin()`.
- Confirm target audience: admin/editor only vs authenticated vs anon.
- Confirm grants separately.
- Confirm rollback plan before any apply.
- Confirm role tests before any write/import flow.

## Forbidden actions

- Do not apply the draft.
- Do not move it into `supabase/migrations`.
- Do not run `db push/reset`.
- Do not run SQL Editor with this content.
- Do not use `service_role`.
- Do not activate provider/import.
- Do not touch Production.

## Checklist

- [x] File is not in `supabase/migrations`.
- [x] Draft has not been applied.
- [x] Draft contains no insert/update/delete/upsert/truncate statements.
- [x] Draft contains no provider calls.
- [x] Draft contains no `service_role`.
- [x] Draft does not touch Production.
- [x] Draft requires manual review.
- [x] Draft requires explicit user authorization before any future apply.

## Current status

- migration_draft_created=true
- migration_draft_path=`docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`
- migration_draft_in_supabase_migrations=false
- migration_applied=false
- db_write=false
- service_role_used=false
- executable_for_apply=false
- requires_manual_review=true
- requires_explicit_authorization=true
- ready_for_apply=false
- next_write_allowed=false

## Punto 32 — Review no-apply completata

- migration_draft_reviewed=true
- draft_hardened=true
- blocking_issues_count=0
- needs_review_count=3
- ready_for_staging_apply_candidate=true
- ready_for_apply=false
- next_write_allowed=false

La draft P31 è stata hardenata rimuovendo colonne non essenziali. Resta fuori da `supabase/migrations` e non è applicata.
