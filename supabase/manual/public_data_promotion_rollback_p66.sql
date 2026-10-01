-- POINT 66 ROLLBACK — STAGING ONLY
-- DO NOT RUN UNLESS EXPLICITLY AUTHORIZED AFTER A VERIFIED ERROR
-- Target rollback:
-- manual-serie-a
-- 1 competition / 2 teams / 2 standings
-- visibility public_free -> private_admin
-- DO NOT RUN ON PRODUCTION
-- DO NOT MODIFY PROVIDERS
-- DO NOT MODIFY SCHEMA
-- DO NOT USE db push/reset
-- DO NOT RUN PROVIDER IMPORTS
-- DO NOT RUN APIFY
-- DO NOT DEPLOY

begin;

do $$
declare
  v_competition_id uuid;
  v_competitions_public_count integer;
  v_teams_public_count integer;
  v_standings_public_count integer;
begin
  if current_database() ilike '%prod%' or current_database() ilike '%production%' then
    raise exception 'POINT_66_ROLLBACK_BLOCKED_PRODUCTION_DATABASE_NAME';
  end if;

  select id
  into v_competition_id
  from public.competitions
  where internal_key = 'manual-serie-a'
    and api_competition_id = 'manual-serie-a'
    and slug = 'manual-serie-a'
    and season = '2026'
    and visibility = 'public_free';

  if v_competition_id is null then
    raise exception 'POINT_66_ROLLBACK_BLOCKED_COMPETITION_NOT_PUBLIC_FREE';
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
      'POINT_66_ROLLBACK_BLOCKED_SCOPE_MISMATCH competitions_public=%, teams_public=%, standings_public=%',
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
updated_standings as (
  update public.standings standing
  set
    visibility = 'private_admin',
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
    and standing.visibility = 'public_free'
  returning standing.id
),
updated_teams as (
  update public.teams team
  set
    visibility = 'private_admin',
    updated_at = now()
  from candidate_competition candidate
  where team.competition_id = candidate.id
    and team.api_team_id in ('manual-team-1', 'manual-team-2')
    and team.visibility = 'public_free'
  returning team.id
),
updated_competition as (
  update public.competitions competition
  set
    visibility = 'private_admin',
    updated_at = now()
  from candidate_competition candidate
  where competition.id = candidate.id
    and competition.visibility = 'public_free'
  returning competition.id
)
select
  (select count(*) from updated_competition) as competitions_rolled_back,
  (select count(*) from updated_teams) as teams_rolled_back,
  (select count(*) from updated_standings) as standings_rolled_back;

commit;
