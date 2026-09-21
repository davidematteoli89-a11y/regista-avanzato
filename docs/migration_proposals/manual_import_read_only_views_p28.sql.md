# Punto 28 — Manual import read-only views migration proposal

```text
MIGRATION_PROPOSAL_ONLY
DO NOT APPLY
DO NOT RUN
NOT REVIEWED FOR EXECUTION
NO DB WRITE AUTHORIZED
```

Questo documento è una proposta tecnica per revisione futura. Non è una migrazione Supabase applicabile automaticamente, non si trova in `supabase/migrations` e non deve essere copiato nel SQL Editor senza un nuovo gate esplicito.

## Review status P29

```text
MIGRATION_PROPOSAL_ONLY
DO NOT APPLY
DO NOT RUN
NOT REVIEWED FOR EXECUTION
NO DB WRITE AUTHORIZED

proposal_reviewed=true
proposal_hardened=true
executable_migration=false
migration_file_created=false
migration_applied=false
db_write_authorized=false
service_role_required=false
placeholders_remaining=9
dashboard_confirmation_required=true
future_migration_draft_allowed=false
next_write_allowed=false
recommended_next_step=point_30_option_a_dashboard_confirmation_no_write
```

P29 ha revisionato la proposal in modo conservativo:

- le tabelle e molte colonne candidate sono supportate da migrazioni/documenti locali;
- la conferma live di tabelle, colonne, grants/RLS e helper in contesto view resta necessaria;
- nessun blocco sotto è da considerare SQL pronto da eseguire;
- non esiste autorizzazione a creare una migration `.sql` reale;
- Punto 30/write staging non è autorizzato.

## Safety status

```text
MIGRATION_PROPOSAL_ONLY
DO NOT APPLY
DO NOT RUN
NOT REVIEWED FOR EXECUTION
NO DB WRITE AUTHORIZED

db_push=false
db_reset=false
migration_applied=false
service_role_required=false
provider_activated=false
import_enabled=false
next_write_allowed=false
```

## Proposed objects

- `manual_import_competitions_lookup`
- `manual_import_teams_lookup`
- `manual_import_standings_lookup`

## Draft block 1 — competitions lookup

```text
/*
MIGRATION_PROPOSAL_ONLY
DO NOT APPLY
DO NOT RUN
NOT REVIEWED FOR EXECUTION
NO DB WRITE AUTHORIZED

Intent:
- expose only explicit safe competition lookup columns;
- support manual fixture comparison;
- avoid raw provider payloads and secrets;
- keep write operations impossible from this view.
*/

-- PROPOSAL ONLY: exact table/column names must still be confirmed from staging dashboard/read-only checks.
-- REVIEW P29: public.competitions and listed columns are locally documented, but not live-confirmed.
-- PROPOSED VIEW NAME: public.manual_import_competitions_lookup
-- SELECT
--   c.id AS competition_id,
--   c.slug AS competition_slug,
--   c.name AS competition_name,
--   c.country,
--   c.season,
--   c.tracking_level,
--   c.update_frequency,
--   c.created_at,
--   c.updated_at
-- FROM public.competitions c
-- WHERE public.is_editor_or_admin();
```

## Draft block 2 — teams lookup

```text
/*
MIGRATION_PROPOSAL_ONLY
DO NOT APPLY
DO NOT RUN
NOT REVIEWED FOR EXECUTION
NO DB WRITE AUTHORIZED

Intent:
- expose explicit safe team lookup columns;
- include competition reference for FK resolution;
- avoid write actions and raw provider data.
*/

-- PROPOSAL ONLY: exact table/column names must still be confirmed from staging dashboard/read-only checks.
-- REVIEW P29: public.teams, public.competitions and listed columns are locally documented, but not live-confirmed.
-- PROPOSED VIEW NAME: public.manual_import_teams_lookup
-- SELECT
--   t.id AS team_id,
--   t.slug AS team_slug,
--   t.name AS team_name,
--   t.country,
--   c.id AS competition_id,
--   c.slug AS competition_slug,
--   c.name AS competition_name,
--   t.created_at,
--   t.updated_at
-- FROM public.teams t
-- JOIN public.competitions c ON c.id = t.competition_id
-- WHERE public.is_editor_or_admin();
```

## Draft block 3 — standings lookup

```text
/*
MIGRATION_PROPOSAL_ONLY
DO NOT APPLY
DO NOT RUN
NOT REVIEWED FOR EXECUTION
NO DB WRITE AUTHORIZED

Intent:
- expose explicit safe standings lookup columns;
- allow manual comparison against local fixture standings;
- keep import/write logic outside the view.
*/

-- PROPOSAL ONLY: exact table/column names must still be confirmed from staging dashboard/read-only checks.
-- REVIEW P29: public.standings, public.competitions, public.teams and listed columns are locally documented, but not live-confirmed.
-- PROPOSED VIEW NAME: public.manual_import_standings_lookup
-- SELECT
--   s.id AS standing_id,
--   c.id AS competition_id,
--   c.slug AS competition_slug,
--   t.id AS team_id,
--   t.slug AS team_slug,
--   s.season,
--   s.stage,
--   s.matchday,
--   s.rank,
--   s.played,
--   s.won,
--   s.drawn,
--   s.lost,
--   s.goals_for,
--   s.goals_against,
--   s.goal_difference,
--   s.points,
--   s.created_at,
--   s.updated_at
-- FROM public.standings s
-- JOIN public.competitions c ON c.id = s.competition_id
-- JOIN public.teams t ON t.id = s.team_id
-- WHERE public.is_editor_or_admin();
```

## Draft grants/policies note

```text
MIGRATION_PROPOSAL_ONLY
DO NOT APPLY
DO NOT RUN
NOT REVIEWED FOR EXECUTION
NO DB WRITE AUTHORIZED
```

Future executable SQL, if ever authorized, must be reviewed separately for:

- exact table and column names;
- whether helper `public.is_editor_or_admin()` is valid in view context;
- whether `SECURITY INVOKER` / `SECURITY DEFINER` is appropriate for the project's Postgres version and policy model;
- explicit `GRANT SELECT` scope;
- no anon access unless intentionally approved;
- no insert/update/delete/upsert grants;
- no provider/import activation.

## Punto 29 gate

Punto 28 does not authorize Punto 29 writes. Before anything executable:

1. review this proposal manually;
2. confirm table/column names in staging with read-only checks;
3. decide whether to create a real migration file under `supabase/migrations`;
4. keep the real migration non-applied until explicit approval;
5. keep `next_write_allowed=false`.

## Dashboard confirmation P30-A

```text
MIGRATION_PROPOSAL_ONLY
DO NOT APPLY
DO NOT RUN
NOT REVIEWED FOR EXECUTION
NO DB WRITE AUTHORIZED

dashboard_confirmation_completed=false
dashboard_sql_executed=false
dashboard_db_write=false
dashboard_service_role_used=false
migration_created=false
migration_applied=false
placeholders_resolved_count=0
placeholders_unresolved_count=0
placeholders_unclear_count=16
new_read_only_view_still_required=true
ready_for_migration_draft=false
next_write_allowed=false
```

Codex non ha eseguito la verifica visuale nella Supabase Dashboard. La conferma manuale resta pendente e deve essere completata in un punto successivo no-write.
