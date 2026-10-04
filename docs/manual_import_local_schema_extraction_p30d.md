# Punto 30-D — Local migration schema extraction

## Scope

Estrazione schema da file locali versionati.

Conferme:

- Supabase Dashboard usato: `false`
- DB query eseguita: `false`
- DB write: `false`
- service_role usato: `false`
- migration creata/applicata: `false`
- provider/fetch/real-call: `false`
- Production toccata: `false`
- next_write_allowed: `false`

Questa estrazione conferma lo schema versionato nel repository. Non conferma lo stato live del database staging.

## Sources inspected

| Source file | Used | Relevant evidence | Notes |
|---|---:|---|---|
| `supabase/migrations/0001_base_schema.sql` | yes | `competitions`, `teams`, `standings`, FK, timestamp, RLS enable loop | Fonte primaria locale per tabelle/colonne. |
| `supabase/migrations/0003_rls_policies.sql` | yes | select policy anon/authenticated; admin `admin_*` view loop | Fonte primaria locale per policy e admin view generate. |
| `supabase/migrations/0004_public_views.sql` | yes | `public_competitions`, `public_teams`, `public_standings`; grants select | Fonte primaria locale per view pubbliche read-only. |
| `docs/migration_proposals/manual_import_read_only_views_p28.sql.md` | yes | proposal read-only, non applicabile | Usata solo come contesto, non come fonte schema live. |
| `docs/manual_import_*` | yes | placeholder e decision gate P20-P30 | Usati solo come contesto documentale. |
| `app/admin/imports/page.tsx` | yes | UI read-only/admin status | Non fonte schema DB. |
| `scripts/provider/manual*` | yes | dry-run no-write | Non fonte schema DB. |

## Extracted schema candidates

| Area | Required value | Extracted value | Evidence file | Evidence line/section | Confidence |
|---|---|---|---|---|---|
| Competitions | real table name | `public.competitions` | `supabase/migrations/0001_base_schema.sql` | lines 90-130 | confirmed_from_migration |
| Competitions | internal competition id column | `id` | `0001_base_schema.sql` | line 91 | confirmed_from_migration |
| Competitions | provider/external competition id column | `api_competition_id`; config mapping also has `provider_competition_config.external_competition_id` | `0001_base_schema.sql` | lines 93, 132-148 | confirmed_from_migration |
| Competitions | name column | `name` | `0001_base_schema.sql` | line 95 | confirmed_from_migration |
| Competitions | slug column | `slug` | `0001_base_schema.sql` | line 94 | confirmed_from_migration |
| Competitions | country column | `country` | `0001_base_schema.sql` | line 96 | confirmed_from_migration |
| Competitions | category/status column | `tracking_level`, `status`, `visibility` | `0001_base_schema.sql` | lines 99, 113-114 | confirmed_from_migration |
| Competitions | created_at/updated_at | `created_at`, `updated_at` | `0001_base_schema.sql` | lines 120-121 | confirmed_from_migration |
| Competitions | FK/relationships | provider refs; config FK via `provider_competition_config.competition_id` | `0001_base_schema.sql` | lines 100-102, 132-148 | confirmed_from_migration |
| Competitions | existing public/admin views | `public_competitions`; generated `admin_competitions` | `0004_public_views.sql`, `0003_rls_policies.sql` | lines 36-47; 274-301 | confirmed_from_view |
| Competitions | RLS enabled | included in RLS enable loop | `0001_base_schema.sql` | lines 1141-1155 | confirmed_from_migration |
| Competitions | SELECT policy | anon/authenticated published policies; direct select revoked; public view grants | `0003_rls_policies.sql`, `0004_public_views.sql` | lines 58-89, 198-204; 395-409 | confirmed_from_migration |
| Teams | real table name | `public.teams` | `0001_base_schema.sql` | lines 155-178 | confirmed_from_migration |
| Teams | internal team id column | `id` | `0001_base_schema.sql` | line 156 | confirmed_from_migration |
| Teams | provider/external team id column | `api_team_id`; provider ref `source_provider_id` | `0001_base_schema.sql` | lines 158-159 | confirmed_from_migration |
| Teams | name column | `name` | `0001_base_schema.sql` | line 161 | confirmed_from_migration |
| Teams | slug column | `slug` | `0001_base_schema.sql` | line 160 | confirmed_from_migration |
| Teams | country column | `country` | `0001_base_schema.sql` | line 163 | confirmed_from_migration |
| Teams | competition relation column | `competition_id` references `public.competitions(id)` | `0001_base_schema.sql` | line 157 | confirmed_from_migration |
| Teams | created_at/updated_at | `created_at`, `updated_at` | `0001_base_schema.sql` | lines 175-176 | confirmed_from_migration |
| Teams | FK/relationships | `competition_id`, `source_provider_id` | `0001_base_schema.sql` | lines 157-159 | confirmed_from_migration |
| Teams | existing public/admin views | `public_teams`; generated `admin_teams` | `0004_public_views.sql`, `0003_rls_policies.sql` | lines 49-65; 274-301 | confirmed_from_view |
| Teams | RLS enabled | included in RLS enable loop | `0001_base_schema.sql` | lines 1141-1155 | confirmed_from_migration |
| Teams | SELECT policy | anon/authenticated published policies; direct select revoked; public view grants | `0003_rls_policies.sql`, `0004_public_views.sql` | lines 58-89, 198-204; 395-409 | confirmed_from_migration |
| Standings | real table name | `public.standings` | `0001_base_schema.sql` | lines 261-290 | confirmed_from_migration |
| Standings | internal standing id column | `id` | `0001_base_schema.sql` | line 262 | confirmed_from_migration |
| Standings | competition id/ref column | `competition_id` references `public.competitions(id)` | `0001_base_schema.sql` | line 263 | confirmed_from_migration |
| Standings | team id/ref column | `team_id` references `public.teams(id)` | `0001_base_schema.sql` | line 264 | confirmed_from_migration |
| Standings | season/round | `season`, `stage`, `matchday` | `0001_base_schema.sql` | lines 266-268 | confirmed_from_migration |
| Standings | rank/position | `rank` | `0001_base_schema.sql` | line 269 | confirmed_from_migration |
| Standings | played | `played` | `0001_base_schema.sql` | line 270 | confirmed_from_migration |
| Standings | wins/draws/losses | `won`, `drawn`, `lost` | `0001_base_schema.sql` | lines 271-273 | confirmed_from_migration |
| Standings | goals_for/goals_against | `goals_for`, `goals_against` | `0001_base_schema.sql` | lines 274-275 | confirmed_from_migration |
| Standings | points | `points` | `0001_base_schema.sql` | line 277 | confirmed_from_migration |
| Standings | created_at/updated_at | `created_at`, `updated_at` | `0001_base_schema.sql` | lines 287-288 | confirmed_from_migration |
| Standings | FK/relationships | `competition_id`, `team_id`, `source_provider_id` | `0001_base_schema.sql` | lines 263-265 | confirmed_from_migration |
| Standings | existing public/admin views | `public_standings`; generated `admin_standings` | `0004_public_views.sql`, `0003_rls_policies.sql` | lines 173-190; 274-301 | confirmed_from_view |
| Standings | RLS enabled | included in RLS enable loop | `0001_base_schema.sql` | lines 1141-1155 | confirmed_from_migration |
| Standings | SELECT policy | anon/authenticated published policies; direct select revoked; public view grants | `0003_rls_policies.sql`, `0004_public_views.sql` | lines 58-89, 198-204; 395-409 | confirmed_from_migration |

## Counts

- local_schema_extraction_completed=true
- placeholders_resolved_from_local_count=16
- placeholders_unresolved_count=0
- placeholders_unclear_count=0
- ready_for_migration_draft=true
- next_write_allowed=false

`ready_for_migration_draft=true` means only that a future no-apply migration draft can be prepared from local versioned schema. It does not authorize DB write, migration apply, provider activation, import activation or Production.

## Punto 31 — Migration draft no-apply

- migration_draft_created=true
- migration_draft_path=`docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`
- migration_draft_in_supabase_migrations=false
- migration_applied=false
- db_push_reset=false
- db_write=false
- service_role_used=false
- executable_for_apply=false
- requires_manual_review=true
- requires_explicit_authorization=true
- ready_for_apply=false
- next_write_allowed=false

La draft usa l'estrazione locale P30-D ma non è stata applicata e non autorizza write staging.

## Punto 32 — Review no-apply

- migration_draft_reviewed=true
- draft_hardened=true
- blocking_issues_count=0
- needs_review_count=3
- ready_for_staging_apply_candidate=true
- ready_for_apply=false
- next_write_allowed=false

La review resta statica: nessuna Dashboard, nessuna query DB, nessuna applicazione.
