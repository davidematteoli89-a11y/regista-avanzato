-- POINT 66 REAL APPLY — STAGING ONLY
-- AUTHORIZED BY USER FOR:
-- manual-serie-a
-- 1 competition / 2 teams / 2 standings
-- visibility private_admin -> public_free
-- DO NOT RUN ON PRODUCTION
-- DO NOT MODIFY PROVIDERS
-- DO NOT MODIFY SCHEMA
-- DO NOT USE db push/reset
-- DO NOT RUN PROVIDER IMPORTS
-- DO NOT RUN APIFY
-- DO NOT DEPLOY
--
-- Scope:
-- - public.competitions: exactly 1 row, internal_key/api_competition_id/slug = manual-serie-a
-- - public.teams: exactly 2 rows linked to the competition, api_team_id in manual-team-1/manual-team-2
-- - public.standings: exactly 2 rows linked to the competition/teams, season 2026, regular, matchday 1
--
-- This file is intended for manual execution in Supabase SQL Editor ONLY on the
-- Regista Avanzato STAGING project after visually confirming the project.

begin;

do $$
declare
  v_competition_id uuid;
  v_competitions_private_count integer;
  v_competitions_public_count integer;
  v_teams_private_count integer;
  v_teams_public_count integer;
  v_standings_private_count integer;
  v_standings_public_count integer;
begin
  if current_database() ilike '%prod%' or current_database() ilike '%production%' then
    raise exception 'POINT_66_BLOCKED_PRODUCTION_DATABASE_NAME';
  end if;

  select id
  into v_competition_id
  from public.competitions
  where internal_key = 'manual-serie-a'
    and api_competition_id = 'manual-serie-a'
    and slug = 'manual-serie-a'
    and season = '2026';

  if v_competition_id is null then
    raise exception 'POINT_66_BLOCKED_COMPETITION_NOT_FOUND';
  end if;

  select count(*)
  into v_competitions_private_count
  from public.competitions
  where id = v_competition_id
    and visibility = 'private_admin';

  select count(*)
  into v_competitions_public_count
  from public.competitions
  where id = v_competition_id
    and visibility = 'public_free';

  select count(*)
  into v_teams_private_count
  from public.teams
  where competition_id = v_competition_id
    and api_team_id in ('manual-team-1', 'manual-team-2')
    and visibility = 'private_admin';

  select count(*)
  into v_teams_public_count
  from public.teams
  where competition_id = v_competition_id
    and api_team_id in ('manual-team-1', 'manual-team-2')
    and visibility = 'public_free';

  select count(*)
  into v_standings_private_count
  from public.standings standing
  join public.teams team
    on team.id = standing.team_id
  where standing.competition_id = v_competition_id
    and standing.season = '2026'
    and standing.stage = 'regular'
    and standing.matchday = 1
    and team.api_team_id in ('manual-team-1', 'manual-team-2')
    and standing.visibility = 'private_admin';

  select count(*)
  into v_standings_public_count
  from public.standings standing
  join public.teams team
    on team.id = standing.team_id
  where standing.competition_id = v_competition_id
    and standing.season = '2026'
    and standing.stage = 'regular'
    and standing.matchday = 1
    and team.api_team_id in ('manual-team-1', 'manual-team-2')
    and standing.visibility = 'public_free';

  if v_competitions_private_count <> 1
     or v_teams_private_count <> 2
     or v_standings_private_count <> 2 then
    raise exception
      'POINT_66_BLOCKED_PRIVATE_SCOPE_MISMATCH competitions_private=%, teams_private=%, standings_private=%',
      v_competitions_private_count,
      v_teams_private_count,
      v_standings_private_count;
  end if;

  if v_competitions_public_count <> 0
     or v_teams_public_count <> 0
     or v_standings_public_count <> 0 then
    raise exception
      'POINT_66_BLOCKED_ALREADY_PUBLIC_SCOPE_MISMATCH competitions_public=%, teams_public=%, standings_public=%',
      v_competitions_public_count,
      v_teams_public_count,
      v_standings_public_count;
  end if;
end
$$;

with candidate_competition as (
  select id
  from public.competitions
  where internal_key = 'manual-serie-a'
    and api_competition_id = 'manual-serie-a'
    and slug = 'manual-serie-a'
    and season = '2026'
),
updated_competition as (
  update public.competitions competition
  set
    visibility = 'public_free',
    updated_at = now()
  from candidate_competition candidate
  where competition.id = candidate.id
    and competition.visibility = 'private_admin'
  returning competition.id
),
updated_teams as (
  update public.teams team
  set
    visibility = 'public_free',
    updated_at = now()
  from candidate_competition candidate
  where team.competition_id = candidate.id
    and team.api_team_id in ('manual-team-1', 'manual-team-2')
    and team.visibility = 'private_admin'
  returning team.id
),
updated_standings as (
  update public.standings standing
  set
    visibility = 'public_free',
    updated_at = now()
  from candidate_competition candidate
  join public.teams team
    on team.competition_id = candidate.id
  where standing.competition_id = candidate.id
    and standing.team_id = team.id
    and team.api_team_id in ('manual-team-1', 'manual-team-2')
    and standing.season = '2026'
    and standing.stage = 'regular'
    and standing.matchday = 1
    and standing.visibility = 'private_admin'
  returning standing.id
)
select
  (select count(*) from updated_competition) as competitions_updated,
  (select count(*) from updated_teams) as teams_updated,
  (select count(*) from updated_standings) as standings_updated;

do $$
declare
  v_competition_id uuid;
  v_competitions_public_count integer;
  v_teams_public_count integer;
  v_standings_public_count integer;
begin
  select id
  into v_competition_id
  from public.competitions
  where internal_key = 'manual-serie-a'
    and api_competition_id = 'manual-serie-a'
    and slug = 'manual-serie-a'
    and season = '2026'
    and visibility = 'public_free';

  if v_competition_id is null then
    raise exception 'POINT_66_POSTCHECK_COMPETITION_NOT_PUBLIC';
  end if;

  select count(*)
  into v_competitions_public_count
  from public.competitions
  where id = v_competition_id
    and visibility = 'public_free';

  select count(*)
  into v_teams_public_count
  from public.teams
  where competition_id = v_competition_id
    and api_team_id in ('manual-team-1', 'manual-team-2')
    and visibility = 'public_free';

  select count(*)
  into v_standings_public_count
  from public.standings standing
  join public.teams team
    on team.id = standing.team_id
  where standing.competition_id = v_competition_id
    and standing.season = '2026'
    and standing.stage = 'regular'
    and standing.matchday = 1
    and team.api_team_id in ('manual-team-1', 'manual-team-2')
    and standing.visibility = 'public_free';

  if v_competitions_public_count <> 1
     or v_teams_public_count <> 2
     or v_standings_public_count <> 2 then
    raise exception
      'POINT_66_POSTCHECK_SCOPE_MISMATCH competitions_public=%, teams_public=%, standings_public=%',
      v_competitions_public_count,
      v_teams_public_count,
      v_standings_public_count;
  end if;
end
$$;

commit;

-- Post-apply read-only verification query, expected after successful commit:
select
  'competition' as entity,
  count(*) as public_count
from public.competitions
where internal_key = 'manual-serie-a'
  and api_competition_id = 'manual-serie-a'
  and slug = 'manual-serie-a'
  and season = '2026'
  and visibility = 'public_free'
union all
select
  'teams' as entity,
  count(*) as public_count
from public.teams team
join public.competitions competition
  on competition.id = team.competition_id
where competition.internal_key = 'manual-serie-a'
  and competition.api_competition_id = 'manual-serie-a'
  and competition.slug = 'manual-serie-a'
  and competition.season = '2026'
  and team.api_team_id in ('manual-team-1', 'manual-team-2')
  and team.visibility = 'public_free'
union all
select
  'standings' as entity,
  count(*) as public_count
from public.standings standing
join public.competitions competition
  on competition.id = standing.competition_id
join public.teams team
  on team.id = standing.team_id
where competition.internal_key = 'manual-serie-a'
  and competition.api_competition_id = 'manual-serie-a'
  and competition.slug = 'manual-serie-a'
  and competition.season = '2026'
  and team.api_team_id in ('manual-team-1', 'manual-team-2')
  and standing.season = '2026'
  and standing.stage = 'regular'
  and standing.matchday = 1
  and standing.visibility = 'public_free'
order by entity;
