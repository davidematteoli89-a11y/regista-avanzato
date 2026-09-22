-- POINT_35_STAGING_ONLY
-- Applies only to Supabase staging after explicit user authorization.
-- Do not apply to Production.
-- Provider/import remain disabled.
-- Creates read-only manual import lookup views only.

-- ---------------------------------------------------------------------------
-- View: public.manual_import_competitions_lookup
-- ---------------------------------------------------------------------------
create or replace view public.manual_import_competitions_lookup
with (security_barrier = true)
as
select
  competition.id,
  competition.internal_key,
  competition.api_competition_id,
  competition.slug,
  competition.name,
  competition.country,
  competition.continent,
  competition.season,
  competition.tracking_level,
  competition.status,
  competition.visibility,
  competition.created_at,
  competition.updated_at
from public.competitions competition;

comment on view public.manual_import_competitions_lookup is
  'POINT_35_STAGING_ONLY: read-only lookup view for manual import competitions.';

-- ---------------------------------------------------------------------------
-- View: public.manual_import_teams_lookup
-- ---------------------------------------------------------------------------
create or replace view public.manual_import_teams_lookup
with (security_barrier = true)
as
select
  team.id,
  team.competition_id,
  team.api_team_id,
  team.slug,
  team.name,
  team.short_name,
  team.country,
  team.status,
  team.visibility,
  team.created_at,
  team.updated_at
from public.teams team;

comment on view public.manual_import_teams_lookup is
  'POINT_35_STAGING_ONLY: read-only lookup view for manual import teams.';

-- ---------------------------------------------------------------------------
-- View: public.manual_import_standings_lookup
-- ---------------------------------------------------------------------------
create or replace view public.manual_import_standings_lookup
with (security_barrier = true)
as
select
  standing.id,
  standing.competition_id,
  standing.team_id,
  standing.season,
  standing.stage,
  standing.matchday,
  standing.rank,
  standing.played,
  standing.won,
  standing.drawn,
  standing.lost,
  standing.goals_for,
  standing.goals_against,
  standing.goal_difference,
  standing.points,
  standing.status,
  standing.visibility,
  standing.created_at,
  standing.updated_at
from public.standings standing;

comment on view public.manual_import_standings_lookup is
  'POINT_35_STAGING_ONLY: read-only lookup view for manual import standings.';
