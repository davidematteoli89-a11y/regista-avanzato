-- POINT_42_MANUAL_FIXTURE_POST_VERIFY
-- STAGING ONLY
-- DO NOT RUN IN PRODUCTION
-- READ ONLY
-- SELECT ONLY
-- NO PROVIDER
-- NO APIFY
-- NO DEPLOY

select
  count(*) as competitions_count
from public.competitions
where internal_key = 'manual-serie-a'
  and api_competition_id = 'manual-serie-a'
  and slug = 'manual-serie-a'
  and season = '2026';

select
  count(*) as teams_count
from public.teams team
join public.competitions competition
  on competition.id = team.competition_id
where competition.internal_key = 'manual-serie-a'
  and competition.season = '2026'
  and team.api_team_id in ('manual-team-1', 'manual-team-2');

select
  count(*) as standings_count
from public.standings standing
join public.competitions competition
  on competition.id = standing.competition_id
join public.teams team
  on team.id = standing.team_id
where competition.internal_key = 'manual-serie-a'
  and competition.season = '2026'
  and standing.season = '2026'
  and standing.stage = 'regular'
  and standing.matchday = 1
  and team.api_team_id in ('manual-team-1', 'manual-team-2');

select
  competition.internal_key,
  competition.api_competition_id,
  competition.slug,
  competition.name,
  competition.country,
  competition.continent,
  competition.season,
  competition.tracking_level,
  competition.status,
  competition.visibility
from public.manual_import_competitions_lookup competition
where competition.internal_key = 'manual-serie-a'
   or competition.api_competition_id = 'manual-serie-a'
order by competition.slug;

select
  team.api_team_id,
  team.slug,
  team.name,
  team.short_name,
  team.country,
  team.status,
  team.visibility
from public.manual_import_teams_lookup team
where team.api_team_id in ('manual-team-1', 'manual-team-2')
order by team.api_team_id;

select
  team.api_team_id,
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
  standing.visibility
from public.manual_import_standings_lookup standing
join public.manual_import_teams_lookup team
  on team.id = standing.team_id
join public.manual_import_competitions_lookup competition
  on competition.id = standing.competition_id
where competition.internal_key = 'manual-serie-a'
  and standing.season = '2026'
  and standing.stage = 'regular'
  and standing.matchday = 1
order by standing.rank;
