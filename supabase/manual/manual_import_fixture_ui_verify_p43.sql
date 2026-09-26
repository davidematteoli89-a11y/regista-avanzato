-- POINT_43_READ_ONLY_UI_ADMIN_VERIFICATION
-- STAGING ONLY
-- READ ONLY
-- NO DB WRITE
-- NO PROVIDER
-- NO IMPORT
-- NO APIFY
-- NO DEPLOY
-- NO PRODUCTION
--
-- Use only in Supabase SQL Editor for the staging project "Regista Avanzato".
-- Do not run in Production, OS-Business, Fantacalcio, Quiz Live, or any other project.
-- This file contains SELECT-only metadata/data checks for the manual fixture written in Point 42.

select
  'competition_manual_serie_a' as check_name,
  count(*) as actual_count,
  1 as expected_count,
  bool_and(status = 'draft') as status_is_draft,
  bool_and(visibility = 'private_admin') as visibility_is_private_admin
from public.manual_import_competitions_lookup
where api_competition_id = 'manual-serie-a'
  and internal_key = 'manual-serie-a'
  and slug = 'manual-serie-a';

select
  'teams_for_manual_serie_a' as check_name,
  count(*) as actual_count,
  2 as expected_count,
  bool_and(team.status = 'draft') as status_is_draft,
  bool_and(team.visibility = 'private_admin') as visibility_is_private_admin
from public.manual_import_teams_lookup team
join public.manual_import_competitions_lookup competition
  on competition.id = team.competition_id
where competition.api_competition_id = 'manual-serie-a'
  and team.api_team_id in ('manual-team-1', 'manual-team-2');

select
  'standings_for_manual_serie_a' as check_name,
  count(*) as actual_count,
  2 as expected_count,
  bool_and(standing.status = 'draft') as status_is_draft,
  bool_and(standing.visibility = 'private_admin') as visibility_is_private_admin
from public.manual_import_standings_lookup standing
join public.manual_import_competitions_lookup competition
  on competition.id = standing.competition_id
join public.manual_import_teams_lookup team
  on team.id = standing.team_id
where competition.api_competition_id = 'manual-serie-a'
  and team.api_team_id in ('manual-team-1', 'manual-team-2');

select
  'manual_fixture_total_rows' as check_name,
  (
    select count(*)
    from public.manual_import_competitions_lookup
    where api_competition_id = 'manual-serie-a'
      and internal_key = 'manual-serie-a'
      and slug = 'manual-serie-a'
  ) as competitions_count,
  (
    select count(*)
    from public.manual_import_teams_lookup team
    join public.manual_import_competitions_lookup competition
      on competition.id = team.competition_id
    where competition.api_competition_id = 'manual-serie-a'
      and team.api_team_id in ('manual-team-1', 'manual-team-2')
  ) as teams_count,
  (
    select count(*)
    from public.manual_import_standings_lookup standing
    join public.manual_import_competitions_lookup competition
      on competition.id = standing.competition_id
    join public.manual_import_teams_lookup team
      on team.id = standing.team_id
    where competition.api_competition_id = 'manual-serie-a'
      and team.api_team_id in ('manual-team-1', 'manual-team-2')
  ) as standings_count,
  5 as expected_total_rows;
