-- POINT_40_FIX_READ_ONLY_LOOKUP
-- DO NOT RUN OUTSIDE SUPABASE STAGING
-- READ ONLY
-- NO DB WRITE
-- NO PROVIDER
-- NO IMPORT
-- NO PRODUCTION

select
  id,
  internal_key,
  api_competition_id,
  slug,
  name,
  country,
  season,
  status,
  visibility
from public.manual_import_competitions_lookup
where api_competition_id in ('manual-serie-a')
   or internal_key in ('manual-serie-a')
   or slug in ('manual-serie-a', 'serie-a-manual-sample')
order by api_competition_id, slug, season
limit 20;

select
  id,
  competition_id,
  api_team_id,
  slug,
  name,
  short_name,
  country,
  status,
  visibility
from public.manual_import_teams_lookup
where api_team_id in ('manual-team-1', 'manual-team-2')
   or slug in ('manual-team-1', 'manual-team-2')
order by api_team_id, slug
limit 20;

with fixture_competitions as (
  select id
  from public.manual_import_competitions_lookup
  where api_competition_id in ('manual-serie-a')
     or internal_key in ('manual-serie-a')
     or slug in ('manual-serie-a', 'serie-a-manual-sample')
),
fixture_teams as (
  select id
  from public.manual_import_teams_lookup
  where api_team_id in ('manual-team-1', 'manual-team-2')
     or slug in ('manual-team-1', 'manual-team-2')
)
select
  id,
  competition_id,
  team_id,
  season,
  stage,
  matchday,
  rank,
  played,
  won,
  drawn,
  lost,
  goals_for,
  goals_against,
  goal_difference,
  points,
  status,
  visibility
from public.manual_import_standings_lookup
where competition_id in (select id from fixture_competitions)
   or team_id in (select id from fixture_teams)
order by competition_id, team_id, season, stage, matchday
limit 50;
