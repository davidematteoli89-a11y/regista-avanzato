# Punto 30-D — Placeholder resolution from local files

| Placeholder | Resolved value | Status | Evidence | Notes |
|---|---|---|---|---|
| competitions table lookup | `public.competitions` | resolved_from_local_migration | `0001_base_schema.sql:90` | Local versioned schema only. |
| competitions internal id | `id` | resolved_from_local_migration | `0001_base_schema.sql:91` | UUID primary key. |
| competitions provider/external id | `api_competition_id`; optional provider config `external_competition_id` | resolved_from_local_migration | `0001_base_schema.sql:93,132-148` | Two local mapping surfaces exist. |
| competitions display fields | `name`, `slug`, `country`, `tracking_level`, `status`, `visibility` | resolved_from_local_migration | `0001_base_schema.sql:94-99,113-114` | `tracking_level` is category-like field. |
| competitions timestamps | `created_at`, `updated_at` | resolved_from_local_migration | `0001_base_schema.sql:120-121` | Trigger exists for updated_at. |
| competitions RLS/policy/views | RLS enabled; anon/auth published policies; public/admin views | resolved_from_local_view | `0001_base_schema.sql:1141-1155`; `0003:58-89,274-301`; `0004:36-47,395-409` | Direct table select is revoked; public view grants exist. |
| teams table lookup | `public.teams` | resolved_from_local_migration | `0001_base_schema.sql:155` | Local versioned schema only. |
| teams internal id | `id` | resolved_from_local_migration | `0001_base_schema.sql:156` | UUID primary key. |
| teams provider/external id | `api_team_id`; provider ref `source_provider_id` | resolved_from_local_migration | `0001_base_schema.sql:158-159` | Local provider mapping columns. |
| teams competition relation | `competition_id` references `public.competitions(id)` | resolved_from_local_migration | `0001_base_schema.sql:157` | FK/ref confirmed locally. |
| teams display/timestamps | `name`, `slug`, `country`, `created_at`, `updated_at` | resolved_from_local_migration | `0001_base_schema.sql:160-176` | `country` nullable. |
| teams RLS/policy/views | RLS enabled; anon/auth published policies; public/admin views | resolved_from_local_view | `0001_base_schema.sql:1141-1155`; `0003:58-89,274-301`; `0004:49-65,395-409` | Direct table select is revoked; public view grants exist. |
| standings table lookup | `public.standings` | resolved_from_local_migration | `0001_base_schema.sql:261` | Local versioned schema only. |
| standings FK/ref columns | `competition_id`, `team_id` | resolved_from_local_migration | `0001_base_schema.sql:263-264` | Both not null and cascade delete. |
| standings metric columns | `season`, `stage`, `matchday`, `rank`, `played`, `won`, `drawn`, `lost`, `goals_for`, `goals_against`, `goal_difference`, `points` | resolved_from_local_migration | `0001_base_schema.sql:266-277` | Local names use `won/drawn/lost`, not `wins/draws/losses`. |
| standings RLS/policy/views | RLS enabled; anon/auth published policies; public/admin views | resolved_from_local_view | `0001_base_schema.sql:1141-1155`; `0003:58-89,274-301`; `0004:173-190,395-409` | Direct table select is revoked; public view grants exist. |

## Counts

- placeholders_resolved_from_local_count=16
- placeholders_unresolved_count=0
- placeholders_unclear_count=0
- ready_for_migration_draft=true
- next_write_allowed=false

`ready_for_migration_draft=true` is limited to a future migration draft `.sql` that remains non-applied. It does not authorize DB write or apply.

## Punto 31 — Migration draft no-apply

- migration_draft_created=true
- migration_draft_path=`docs/migration_drafts/manual_import_read_only_views_p31.sql.draft`
- migration_draft_in_supabase_migrations=false
- migration_applied=false
- db_write=false
- ready_for_apply=false
- next_write_allowed=false

I placeholder risolti da file locali sono stati usati per creare una draft revisionabile, non applicata.
