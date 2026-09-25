-- POINT_42_MANUAL_FIXTURE_WRITE
-- STAGING ONLY
-- DO NOT RUN IN PRODUCTION
-- AUTHORIZED BY USER FOR POINT 42 ONLY
-- NO PROVIDER
-- NO APIFY
-- NO DEPLOY
-- ONLY 5 FIXTURE CREATES
-- Tables: public.competitions, public.teams, public.standings
-- Fixtures:
-- - competition: manual-serie-a
-- - teams: manual-team-1, manual-team-2
-- - standings: 2 rows for manual-team-1/manual-team-2

begin;

do $$
begin
  if current_database() ilike '%prod%' or current_database() ilike '%production%' then
    raise exception 'POINT_42_BLOCKED_PRODUCTION_DATABASE_NAME';
  end if;

  if exists (
    select 1
    from public.competitions
    where internal_key = 'manual-serie-a'
       or api_competition_id = 'manual-serie-a'
       or (slug = 'manual-serie-a' and season = '2026')
  ) then
    raise exception 'POINT_42_BLOCKED_COMPETITION_ALREADY_EXISTS';
  end if;

  if exists (
    select 1
    from public.teams
    where api_team_id in ('manual-team-1', 'manual-team-2')
       or slug in ('manual-team-one', 'manual-team-two')
  ) then
    raise exception 'POINT_42_BLOCKED_TEAM_ALREADY_EXISTS';
  end if;
end
$$;

with inserted_competition as (
  insert into public.competitions (
    internal_key,
    api_competition_id,
    slug,
    name,
    country,
    continent,
    season,
    tracking_level,
    update_frequency,
    public_stats_enabled,
    login_required_for_full_stats,
    manual_highlights_enabled,
    video_radar_enabled,
    apify_enabled,
    data_confidence,
    coverage_notes,
    status,
    visibility,
    login_required,
    internal_notes
  )
  values (
    'manual-serie-a',
    'manual-serie-a',
    'manual-serie-a',
    'Serie A Manual Sample',
    'Italy',
    'Europe',
    '2026',
    'trigger'::public.tracking_level,
    'manual',
    false,
    true,
    true,
    false,
    false,
    'low'::public.data_confidence,
    'Point 42 manual staging fixture. Provider/import disabled.',
    'draft'::public.content_status,
    'private_admin'::public.content_visibility,
    true,
    'Created by Point 42 manual fixture write plan in staging only.'
  )
  returning id
),
inserted_teams as (
  insert into public.teams (
    competition_id,
    api_team_id,
    slug,
    name,
    short_name,
    country,
    status,
    visibility,
    login_required,
    internal_notes
  )
  select
    inserted_competition.id,
    team_fixture.api_team_id,
    team_fixture.slug,
    team_fixture.name,
    team_fixture.short_name,
    'Italy',
    'draft'::public.content_status,
    'private_admin'::public.content_visibility,
    true,
    'Created by Point 42 manual fixture write plan in staging only.'
  from inserted_competition
  cross join (
    values
      ('manual-team-1', 'manual-team-one', 'Manual Team One', 'Team One'),
      ('manual-team-2', 'manual-team-two', 'Manual Team Two', 'Team Two')
  ) as team_fixture(api_team_id, slug, name, short_name)
  returning id, api_team_id
)
insert into public.standings (
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
  visibility,
  login_required,
  internal_notes
)
select
  inserted_competition.id,
  inserted_teams.id,
  '2026',
  'regular',
  1,
  standing_fixture.rank,
  standing_fixture.played,
  standing_fixture.won,
  standing_fixture.drawn,
  standing_fixture.lost,
  standing_fixture.goals_for,
  standing_fixture.goals_against,
  standing_fixture.goals_for - standing_fixture.goals_against,
  standing_fixture.points,
  'draft'::public.content_status,
  'private_admin'::public.content_visibility,
  true,
  'Created by Point 42 manual fixture write plan in staging only.'
from inserted_competition
join inserted_teams
  on inserted_teams.api_team_id in ('manual-team-1', 'manual-team-2')
join (
  values
    ('manual-team-1', 1, 1, 1, 0, 0, 2, 0, 3::numeric),
    ('manual-team-2', 2, 1, 0, 0, 1, 0, 2, 0::numeric)
) as standing_fixture(api_team_id, rank, played, won, drawn, lost, goals_for, goals_against, points)
  on standing_fixture.api_team_id = inserted_teams.api_team_id;

commit;
