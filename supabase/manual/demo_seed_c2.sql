-- Regista Avanzato — FASE C.2
-- Seed demo pubblicato controllato per Supabase staging.
--
-- USO:
-- 1. Copiare nel Supabase SQL Editor la SEZIONE 1 per applicare il seed.
-- 2. Copiare la SEZIONE 2 per verificare le public views.
-- 3. Copiare la SEZIONE 3 solo se serve rollback.
--
-- NOTE DI SICUREZZA:
-- - Non attiva provider.
-- - Non attiva import_enabled.
-- - Non chiama provider esterni.
-- - Non usa Apify.
-- - Non crea utenti o ruoli.
-- - Non modifica schema o RLS.
-- - Pubblica solo `serie-a` per la stagione seedata `2026/27`.

-- ============================================================================
-- SEZIONE 1 — SEED DEMO CONTROLLATO
-- ============================================================================

begin;

-- Idempotenza senza dipendere da constraint/unique index dello staging:
-- elimina SOLO eventuali righe demo note, poi reinserisce il dataset pulito.
delete from public.standings standing
using public.competitions competition, public.teams team
where standing.competition_id = competition.id
  and standing.team_id = team.id
  and competition.internal_key = 'serie-a'
  and competition.season = '2026/27'
  and team.slug in ('aurora-fc-demo', 'borgo-united-demo', 'marina-1920-demo', 'appennino-calcio-demo');

delete from public.matches
where id in (
  'c2000000-0000-4000-8000-000000000101'::uuid,
  'c2000000-0000-4000-8000-000000000102'::uuid
);

delete from public.teams team
using public.competitions competition
where team.competition_id = competition.id
  and competition.internal_key = 'serie-a'
  and competition.season = '2026/27'
  and team.slug in ('aurora-fc-demo', 'borgo-united-demo', 'marina-1920-demo', 'appennino-calcio-demo');

update public.competitions
set
  name = 'Serie A Demo',
  status = 'published',
  visibility = 'public_free',
  login_required = false,
  published_at = timezone('utc', now()),
  coverage_notes = 'Demo staging C.2: dataset fittizio controllato per test public views. Nessun provider reale attivo.',
  updated_at = timezone('utc', now())
where internal_key = 'serie-a'
  and season = '2026/27';

with target_competition as (
  select id as competition_id
  from public.competitions
  where internal_key = 'serie-a'
    and season = '2026/27'
)
insert into public.teams (
  id, competition_id, slug, name, short_name, country, city,
  stadium_name, status, visibility, login_required, published_at,
  internal_notes
)
select
  demo_team.id,
  target_competition.competition_id,
  demo_team.slug,
  demo_team.name,
  demo_team.short_name,
  'Italy',
  demo_team.city,
  demo_team.stadium_name,
  'published'::public.content_status,
  'public_free'::public.content_visibility,
  false,
  timezone('utc', now()),
  'Demo staging C.2: squadra fittizia, nessun provider reale.'
from target_competition
cross join (
  values
    ('c2000000-0000-4000-8000-000000000001'::uuid, 'aurora-fc-demo', 'Aurora FC Demo', 'AUR', 'Città Demo Nord', 'Stadio Aurora Demo'),
    ('c2000000-0000-4000-8000-000000000002'::uuid, 'borgo-united-demo', 'Borgo United Demo', 'BOR', 'Borgo Demo', 'Arena Borgo Demo'),
    ('c2000000-0000-4000-8000-000000000003'::uuid, 'marina-1920-demo', 'Marina 1920 Demo', 'MAR', 'Marina Demo', 'Stadio del Porto Demo'),
    ('c2000000-0000-4000-8000-000000000004'::uuid, 'appennino-calcio-demo', 'Appennino Calcio Demo', 'APP', 'Appennino Demo', 'Campo Alto Demo')
) as demo_team(id, slug, name, short_name, city, stadium_name);

with target_competition as (
  select id as competition_id
  from public.competitions
  where internal_key = 'serie-a'
    and season = '2026/27'
),
demo_teams as (
  select slug, id
  from public.teams
  where competition_id = (select competition_id from target_competition)
    and slug in ('aurora-fc-demo', 'borgo-united-demo', 'marina-1920-demo', 'appennino-calcio-demo')
)
insert into public.matches (
  id, competition_id, season, stage, round, matchday, kickoff_at,
  venue, timezone, home_team_id, away_team_id, home_score, away_score,
  status, visibility, login_required, published_at, data_confidence,
  internal_notes
)
select
  demo_match.id,
  target_competition.competition_id,
  '2026/27',
  'regular',
  'Giornata Demo 1',
  1,
  demo_match.kickoff_at,
  demo_match.venue,
  'Europe/Rome',
  home_team.id,
  away_team.id,
  demo_match.home_score,
  demo_match.away_score,
  'finished'::public.match_status,
  'public_free'::public.content_visibility,
  false,
  timezone('utc', now()),
  'low'::public.data_confidence,
  'Demo staging C.2: partita fittizia, nessun provider reale.'
from target_competition
cross join (
  values
    (
      'c2000000-0000-4000-8000-000000000101'::uuid,
      'aurora-fc-demo',
      'borgo-united-demo',
      3,
      1,
      '2026-08-24 18:45:00+00'::timestamptz,
      'Stadio Aurora Demo'
    ),
    (
      'c2000000-0000-4000-8000-000000000102'::uuid,
      'marina-1920-demo',
      'appennino-calcio-demo',
      1,
      1,
      '2026-08-25 19:00:00+00'::timestamptz,
      'Stadio del Porto Demo'
    )
) as demo_match(id, home_slug, away_slug, home_score, away_score, kickoff_at, venue)
join demo_teams home_team on home_team.slug = demo_match.home_slug
join demo_teams away_team on away_team.slug = demo_match.away_slug;

with target_competition as (
  select id as competition_id
  from public.competitions
  where internal_key = 'serie-a'
    and season = '2026/27'
),
demo_teams as (
  select slug, id
  from public.teams
  where competition_id = (select competition_id from target_competition)
    and slug in ('aurora-fc-demo', 'borgo-united-demo', 'marina-1920-demo', 'appennino-calcio-demo')
)
insert into public.standings (
  competition_id, team_id, season, stage, matchday, rank, played,
  won, drawn, lost, goals_for, goals_against, goal_difference, points,
  form, status, visibility, login_required, published_at, internal_notes
)
select
  target_competition.competition_id,
  demo_teams.id,
  '2026/27',
  'regular',
  1,
  demo_standing.rank,
  1,
  demo_standing.won,
  demo_standing.drawn,
  demo_standing.lost,
  demo_standing.goals_for,
  demo_standing.goals_against,
  demo_standing.goal_difference,
  demo_standing.points,
  demo_standing.form,
  'published'::public.content_status,
  'public_free'::public.content_visibility,
  false,
  timezone('utc', now()),
  'Demo staging C.2: classifica fittizia, nessun provider reale.'
from target_competition
join (
  values
    ('aurora-fc-demo', 1, 1, 0, 0, 3, 1, 2, 3, 'V'),
    ('marina-1920-demo', 2, 0, 1, 0, 1, 1, 0, 1, 'P'),
    ('appennino-calcio-demo', 3, 0, 1, 0, 1, 1, 0, 1, 'P'),
    ('borgo-united-demo', 4, 0, 0, 1, 1, 3, -2, 0, 'S')
) as demo_standing(slug, rank, won, drawn, lost, goals_for, goals_against, goal_difference, points, form)
  on true
join demo_teams on demo_teams.slug = demo_standing.slug;

commit;

-- ============================================================================
-- SEZIONE 2 — VERIFICA PUBLIC VIEWS
-- ============================================================================

select 'public_competitions' as view_name, count(*)::int as rows from public.public_competitions
union all select 'public_teams', count(*)::int from public.public_teams
union all select 'public_matches', count(*)::int from public.public_matches
union all select 'public_standings', count(*)::int from public.public_standings;

select slug, internal_key, name, country, continent, season, visibility, login_required, published_at
from public.public_competitions
where slug = 'serie-a';

select slug, name, short_name, country, city, stadium_name, visibility, login_required, published_at
from public.public_teams
where slug in ('aurora-fc-demo', 'borgo-united-demo', 'marina-1920-demo', 'appennino-calcio-demo')
order by name;

select id, season, round, matchday, kickoff_at, venue, home_score, away_score, status, visibility, login_required, published_at
from public.public_matches
where id in (
  'c2000000-0000-4000-8000-000000000101'::uuid,
  'c2000000-0000-4000-8000-000000000102'::uuid
)
order by kickoff_at;

select rank, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, form, visibility, login_required, published_at
from public.public_standings
where season = '2026/27'
  and stage = 'regular'
  and matchday = 1
order by rank;

-- Deve restare 0.
select count(*)::int as enabled_import_configs
from public.provider_competition_config
where import_enabled = true;

-- ============================================================================
-- SEZIONE 3 — ROLLBACK PULITO
-- ============================================================================

begin;

delete from public.standings standing
using public.competitions competition, public.teams team
where standing.competition_id = competition.id
  and standing.team_id = team.id
  and competition.internal_key = 'serie-a'
  and competition.season = '2026/27'
  and team.slug in ('aurora-fc-demo', 'borgo-united-demo', 'marina-1920-demo', 'appennino-calcio-demo');

delete from public.matches
where id in (
  'c2000000-0000-4000-8000-000000000101'::uuid,
  'c2000000-0000-4000-8000-000000000102'::uuid
);

delete from public.teams team
using public.competitions competition
where team.competition_id = competition.id
  and competition.internal_key = 'serie-a'
  and competition.season = '2026/27'
  and team.slug in ('aurora-fc-demo', 'borgo-united-demo', 'marina-1920-demo', 'appennino-calcio-demo');

update public.competitions
set
  name = 'Serie A',
  status = 'draft',
  visibility = 'private_admin',
  login_required = true,
  published_at = null,
  coverage_notes = 'Seed staging da config/competitions.ts; verificare stagione e mapping esterni.',
  updated_at = timezone('utc', now())
where internal_key = 'serie-a'
  and season = '2026/27';

commit;

select 'public_competitions' as view_name, count(*)::int as rows from public.public_competitions
union all select 'public_teams', count(*)::int from public.public_teams
union all select 'public_matches', count(*)::int from public.public_matches
union all select 'public_standings', count(*)::int from public.public_standings;
