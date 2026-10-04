-- POINT_42_MANUAL_FIXTURE_ROLLBACK
-- STAGING ONLY
-- DO NOT RUN IN PRODUCTION
-- USE ONLY IF POINT 42 WRITE NEEDS MANUAL ROLLBACK
-- NO PROVIDER
-- NO APIFY
-- NO DEPLOY
-- LIMITED TO THE 5 POINT 42 FIXTURE ROWS

begin;

do $$
begin
  if current_database() ilike '%prod%' or current_database() ilike '%production%' then
    raise exception 'POINT_42_ROLLBACK_BLOCKED_PRODUCTION_DATABASE_NAME';
  end if;
end
$$;

delete from public.standings
where competition_id in (
  select id
  from public.competitions
  where internal_key = 'manual-serie-a'
    and api_competition_id = 'manual-serie-a'
    and slug = 'manual-serie-a'
    and season = '2026'
)
and team_id in (
  select id
  from public.teams
  where api_team_id in ('manual-team-1', 'manual-team-2')
)
and season = '2026'
and stage = 'regular'
and matchday = 1
and internal_notes = 'Created by Point 42 manual fixture write plan in staging only.';

delete from public.teams
where api_team_id in ('manual-team-1', 'manual-team-2')
  and slug in ('manual-team-one', 'manual-team-two')
  and internal_notes = 'Created by Point 42 manual fixture write plan in staging only.';

delete from public.competitions
where internal_key = 'manual-serie-a'
  and api_competition_id = 'manual-serie-a'
  and slug = 'manual-serie-a'
  and season = '2026'
  and internal_notes = 'Created by Point 42 manual fixture write plan in staging only.';

commit;
