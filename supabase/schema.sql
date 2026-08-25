-- Regista Avanzato — schema PostgreSQL/Supabase iniziale
-- Solo definizione: non contiene seed, credenziali, import o policy pubbliche.

create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- Tipi condivisi
-- -----------------------------------------------------------------------------

create type public.content_status as enum (
  'draft', 'review_needed', 'approved', 'published', 'archived', 'rejected'
);

create type public.content_visibility as enum (
  'private_admin', 'public_free', 'public_login_required', 'public_preview',
  'substack_free', 'substack_paid'
);

create type public.tracking_level as enum (
  'full_official', 'apify_light_plus_p1', 'apify_light_plus_p2', 'trigger'
);

create type public.provider_type as enum (
  'official_api', 'apify_actor', 'mock', 'manual'
);

create type public.data_confidence as enum ('high', 'medium', 'medium_low', 'low');

create type public.import_run_status as enum (
  'pending', 'running', 'succeeded', 'partial', 'failed', 'cancelled', 'skipped_budget'
);

create type public.budget_status as enum ('ok', 'warning', 'hard_stop');

create type public.match_status as enum (
  'scheduled', 'live', 'finished', 'postponed', 'cancelled', 'abandoned'
);

create type public.highlight_status as enum (
  'detected', 'review_needed', 'approved', 'published', 'unavailable', 'rejected'
);

create type public.newsletter_subscription_status as enum (
  'pending', 'subscribed', 'unsubscribed', 'bounced'
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- Provider e configurazione competizioni
-- -----------------------------------------------------------------------------

create table public.data_providers (
  id uuid primary key default gen_random_uuid(),
  provider_key text not null unique,
  name text not null,
  provider_type public.provider_type not null,
  base_url text,
  is_active boolean not null default false,
  priority integer not null default 100 check (priority >= 0),
  monthly_budget_eur numeric(12, 4) check (monthly_budget_eur is null or monthly_budget_eur >= 0),
  warning_budget_eur numeric(12, 4) check (warning_budget_eur is null or warning_budget_eur >= 0),
  hard_stop_budget_eur numeric(12, 4) check (hard_stop_budget_eur is null or hard_stop_budget_eur >= 0),
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint data_providers_budget_order check (
    warning_budget_eur is null or hard_stop_budget_eur is null or warning_budget_eur <= hard_stop_budget_eur
  )
);

create table public.competitions (
  id uuid primary key default gen_random_uuid(),
  internal_key text not null,
  api_competition_id text,
  slug text not null,
  name text not null,
  country text not null,
  continent text not null,
  season text not null,
  tracking_level public.tracking_level not null,
  primary_provider uuid references public.data_providers(id) on delete set null,
  secondary_provider uuid references public.data_providers(id) on delete set null,
  enrichment_provider uuid references public.data_providers(id) on delete set null,
  update_frequency text not null,
  weekly_import_day smallint check (weekly_import_day between 1 and 7),
  public_stats_enabled boolean not null default false,
  login_required_for_full_stats boolean not null default true,
  manual_highlights_enabled boolean not null default true,
  video_radar_enabled boolean not null default true,
  apify_enabled boolean not null default false,
  apify_priority smallint check (apify_priority in (1, 2)),
  data_confidence public.data_confidence not null default 'low',
  coverage_notes text,
  status public.content_status not null default 'draft',
  visibility public.content_visibility not null default 'private_admin',
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (internal_key, season),
  unique (slug, season),
  constraint competitions_apify_consistency check (
    (apify_enabled and apify_priority in (1, 2)) or (not apify_enabled and apify_priority is null)
  ),
  constraint competitions_distinct_providers check (
    secondary_provider is null or secondary_provider is distinct from primary_provider
  )
);

create table public.provider_competition_config (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.data_providers(id) on delete cascade,
  competition_id uuid not null references public.competitions(id) on delete cascade,
  external_competition_id text,
  is_primary boolean not null default false,
  is_secondary boolean not null default false,
  is_enrichment boolean not null default false,
  import_enabled boolean not null default false,
  import_frequency text,
  priority integer not null default 100 check (priority >= 0),
  data_confidence public.data_confidence not null default 'low',
  configuration jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (provider_id, competition_id),
  constraint provider_competition_role check (is_primary or is_secondary or is_enrichment)
);

-- -----------------------------------------------------------------------------
-- Core Stats
-- -----------------------------------------------------------------------------

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid references public.competitions(id) on delete set null,
  source_provider_id uuid references public.data_providers(id) on delete set null,
  api_team_id text,
  slug text not null,
  name text not null,
  short_name text,
  country text,
  city text,
  founded_year integer check (founded_year is null or founded_year between 1800 and 2200),
  stadium_name text,
  logo_url text,
  status public.content_status not null default 'approved',
  visibility public.content_visibility not null default 'public_free',
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (competition_id, slug)
);

create table public.players (
  id uuid primary key default gen_random_uuid(),
  current_team_id uuid references public.teams(id) on delete set null,
  source_provider_id uuid references public.data_providers(id) on delete set null,
  api_player_id text,
  slug text not null,
  full_name text not null,
  known_name text,
  date_of_birth date,
  nationality text,
  position text,
  preferred_foot text check (preferred_foot is null or preferred_foot in ('left', 'right', 'both', 'unknown')),
  shirt_number integer check (shirt_number is null or shirt_number between 0 and 99),
  height_cm numeric(5, 2) check (height_cm is null or height_cm > 0),
  photo_url text,
  status public.content_status not null default 'approved',
  visibility public.content_visibility not null default 'public_free',
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.matches (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete restrict,
  source_provider_id uuid references public.data_providers(id) on delete set null,
  api_match_id text,
  season text not null,
  stage text,
  round text,
  matchday integer check (matchday is null or matchday >= 0),
  kickoff_at timestamptz,
  venue text,
  timezone text,
  home_team_id uuid not null references public.teams(id) on delete restrict,
  away_team_id uuid not null references public.teams(id) on delete restrict,
  home_score integer check (home_score is null or home_score >= 0),
  away_score integer check (away_score is null or away_score >= 0),
  status public.match_status not null default 'scheduled',
  visibility public.content_visibility not null default 'public_free',
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid,
  internal_notes text,
  data_confidence public.data_confidence not null default 'low',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint matches_different_teams check (home_team_id <> away_team_id),
  unique (source_provider_id, api_match_id)
);

create table public.match_events (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  team_id uuid references public.teams(id) on delete set null,
  player_id uuid references public.players(id) on delete set null,
  assist_player_id uuid references public.players(id) on delete set null,
  source_provider_id uuid references public.data_providers(id) on delete set null,
  api_event_id text,
  event_type text not null,
  event_detail text,
  period text,
  minute integer check (minute is null or minute >= 0),
  stoppage_minute integer check (stoppage_minute is null or stoppage_minute >= 0),
  event_order integer,
  raw_data jsonb not null default '{}'::jsonb,
  status public.content_status not null default 'approved',
  visibility public.content_visibility not null default 'public_free',
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (source_provider_id, api_event_id)
);

create table public.standings (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete cascade,
  team_id uuid not null references public.teams(id) on delete cascade,
  source_provider_id uuid references public.data_providers(id) on delete set null,
  season text not null,
  stage text not null default 'regular',
  matchday integer not null default 0 check (matchday >= 0),
  rank integer not null check (rank > 0),
  played integer not null default 0 check (played >= 0),
  won integer not null default 0 check (won >= 0),
  drawn integer not null default 0 check (drawn >= 0),
  lost integer not null default 0 check (lost >= 0),
  goals_for integer not null default 0,
  goals_against integer not null default 0,
  goal_difference integer not null default 0,
  points numeric(8, 2) not null default 0,
  form text,
  qualification_note text,
  status public.content_status not null default 'approved',
  visibility public.content_visibility not null default 'public_free',
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (competition_id, season, stage, matchday, team_id)
);

create table public.team_match_stats (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  team_id uuid not null references public.teams(id) on delete cascade,
  source_provider_id uuid references public.data_providers(id) on delete set null,
  possession_pct numeric(5, 2) check (possession_pct is null or possession_pct between 0 and 100),
  shots integer check (shots is null or shots >= 0),
  shots_on_target integer check (shots_on_target is null or shots_on_target >= 0),
  corners integer check (corners is null or corners >= 0),
  fouls integer check (fouls is null or fouls >= 0),
  yellow_cards integer check (yellow_cards is null or yellow_cards >= 0),
  red_cards integer check (red_cards is null or red_cards >= 0),
  expected_goals numeric(8, 3) check (expected_goals is null or expected_goals >= 0),
  extra_stats jsonb not null default '{}'::jsonb,
  data_confidence public.data_confidence not null default 'low',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (match_id, team_id, source_provider_id)
);

create table public.team_season_stats (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete cascade,
  team_id uuid not null references public.teams(id) on delete cascade,
  source_provider_id uuid references public.data_providers(id) on delete set null,
  season text not null,
  matches_played integer not null default 0 check (matches_played >= 0),
  wins integer not null default 0 check (wins >= 0),
  draws integer not null default 0 check (draws >= 0),
  losses integer not null default 0 check (losses >= 0),
  goals_for integer not null default 0,
  goals_against integer not null default 0,
  clean_sheets integer not null default 0 check (clean_sheets >= 0),
  expected_goals_for numeric(10, 3),
  expected_goals_against numeric(10, 3),
  extra_stats jsonb not null default '{}'::jsonb,
  data_confidence public.data_confidence not null default 'low',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (competition_id, season, team_id, source_provider_id)
);

create table public.player_match_stats (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  team_id uuid references public.teams(id) on delete set null,
  source_provider_id uuid references public.data_providers(id) on delete set null,
  starter boolean,
  minutes_played integer check (minutes_played is null or minutes_played between 0 and 180),
  goals integer not null default 0 check (goals >= 0),
  assists integer not null default 0 check (assists >= 0),
  shots integer check (shots is null or shots >= 0),
  shots_on_target integer check (shots_on_target is null or shots_on_target >= 0),
  passes_completed integer check (passes_completed is null or passes_completed >= 0),
  passes_attempted integer check (passes_attempted is null or passes_attempted >= 0),
  tackles integer check (tackles is null or tackles >= 0),
  interceptions integer check (interceptions is null or interceptions >= 0),
  saves integer check (saves is null or saves >= 0),
  rating numeric(5, 2),
  extra_stats jsonb not null default '{}'::jsonb,
  data_confidence public.data_confidence not null default 'low',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (match_id, player_id, source_provider_id)
);

create table public.player_season_stats (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  team_id uuid references public.teams(id) on delete set null,
  source_provider_id uuid references public.data_providers(id) on delete set null,
  season text not null,
  appearances integer not null default 0 check (appearances >= 0),
  starts integer not null default 0 check (starts >= 0),
  minutes_played integer not null default 0 check (minutes_played >= 0),
  goals integer not null default 0 check (goals >= 0),
  assists integer not null default 0 check (assists >= 0),
  clean_sheets integer check (clean_sheets is null or clean_sheets >= 0),
  average_rating numeric(5, 2),
  extra_stats jsonb not null default '{}'::jsonb,
  data_confidence public.data_confidence not null default 'low',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (competition_id, season, player_id, team_id, source_provider_id)
);

-- -----------------------------------------------------------------------------
-- Log provider e budget Apify
-- -----------------------------------------------------------------------------

create table public.provider_import_logs (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.data_providers(id) on delete restrict,
  competition_id uuid references public.competitions(id) on delete set null,
  script_name text not null,
  status public.import_run_status not null default 'pending',
  started_at timestamptz,
  finished_at timestamptz,
  items_imported integer not null default 0 check (items_imported >= 0),
  errors jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint provider_import_time_order check (finished_at is null or started_at is null or finished_at >= started_at)
);

create table public.apify_usage_logs (
  id uuid primary key default gen_random_uuid(),
  provider uuid not null references public.data_providers(id) on delete restrict,
  actor_id text not null,
  run_id text not null unique,
  competition_id uuid references public.competitions(id) on delete set null,
  estimated_cost_eur numeric(12, 4) not null default 0 check (estimated_cost_eur >= 0),
  compute_units numeric(16, 6) check (compute_units is null or compute_units >= 0),
  status public.import_run_status not null default 'pending',
  started_at timestamptz,
  finished_at timestamptz,
  items_imported integer not null default 0 check (items_imported >= 0),
  errors jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint apify_usage_time_order check (finished_at is null or started_at is null or finished_at >= started_at)
);

create table public.apify_budget_status (
  id uuid primary key default gen_random_uuid(),
  month date not null unique,
  budget_limit_eur numeric(12, 4) not null default 30 check (budget_limit_eur >= 0),
  warning_budget_eur numeric(12, 4) not null default 24 check (warning_budget_eur >= 0),
  hard_stop_eur numeric(12, 4) not null default 30 check (hard_stop_eur >= 0),
  estimated_spend_eur numeric(12, 4) not null default 0 check (estimated_spend_eur >= 0),
  remaining_budget_eur numeric(12, 4) not null default 30,
  status public.budget_status not null default 'ok',
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint apify_budget_month_start check (month = date_trunc('month', month)::date),
  constraint apify_budget_threshold_order check (warning_budget_eur <= hard_stop_eur and hard_stop_eur <= budget_limit_eur),
  constraint apify_budget_remaining_consistency check (remaining_budget_eur = budget_limit_eur - estimated_spend_eur)
);

-- -----------------------------------------------------------------------------
-- Auth e utenti. auth.users è fornita da Supabase Auth.
-- -----------------------------------------------------------------------------

create table public.users_profile (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  role text not null default 'free_user' check (role in ('free_user', 'editor', 'admin', 'super_admin')),
  status public.content_status not null default 'approved',
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.competitions add constraint competitions_approved_by_fkey foreign key (approved_by) references public.users_profile(id) on delete set null;
alter table public.teams add constraint teams_approved_by_fkey foreign key (approved_by) references public.users_profile(id) on delete set null;
alter table public.players add constraint players_approved_by_fkey foreign key (approved_by) references public.users_profile(id) on delete set null;
alter table public.matches add constraint matches_approved_by_fkey foreign key (approved_by) references public.users_profile(id) on delete set null;
alter table public.match_events add constraint match_events_approved_by_fkey foreign key (approved_by) references public.users_profile(id) on delete set null;
alter table public.standings add constraint standings_approved_by_fkey foreign key (approved_by) references public.users_profile(id) on delete set null;

create table public.user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users_profile(id) on delete cascade,
  favorite_competition_ids uuid[] not null default '{}'::uuid[],
  favorite_team_ids uuid[] not null default '{}'::uuid[],
  locale text not null default 'it',
  timezone text not null default 'Europe/Rome',
  newsletter_opt_in boolean not null default false,
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.user_search_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users_profile(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  advanced_search_count smallint not null default 0 check (advanced_search_count between 0 and 3),
  last_search_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, period_start),
  constraint user_search_period check (
    period_start = date_trunc('month', period_start)::date
    and period_end = (period_start + interval '1 month - 1 day')::date
  )
);

create table public.user_saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users_profile(id) on delete cascade,
  item_type text not null check (item_type in ('competition', 'team', 'player', 'match', 'article', 'video_radar')),
  competition_id uuid references public.competitions(id) on delete cascade,
  team_id uuid references public.teams(id) on delete cascade,
  player_id uuid references public.players(id) on delete cascade,
  match_id uuid references public.matches(id) on delete cascade,
  article_id uuid,
  video_radar_item_id uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint user_saved_items_one_target check (
    num_nonnulls(competition_id, team_id, player_id, match_id, article_id, video_radar_item_id) = 1
  )
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id) on delete set null,
  email text not null,
  subscription_status public.newsletter_subscription_status not null default 'pending',
  source text,
  consent_at timestamptz,
  unsubscribed_at timestamptz,
  external_subscriber_id text,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- -----------------------------------------------------------------------------
-- Contenuti editoriali
-- -----------------------------------------------------------------------------

create table public.trend_signals (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid references public.competitions(id) on delete set null,
  match_id uuid references public.matches(id) on delete set null,
  team_id uuid references public.teams(id) on delete set null,
  player_id uuid references public.players(id) on delete set null,
  signal_type text not null,
  title text not null,
  description text,
  strength numeric(6, 3) check (strength is null or strength between 0 and 100),
  detected_at timestamptz not null default timezone('utc', now()),
  source_data jsonb not null default '{}'::jsonb,
  status public.content_status not null default 'review_needed',
  visibility public.content_visibility not null default 'private_admin',
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid references public.users_profile(id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.content_candidates (
  id uuid primary key default gen_random_uuid(),
  trend_signal_id uuid references public.trend_signals(id) on delete set null,
  competition_id uuid references public.competitions(id) on delete set null,
  match_id uuid references public.matches(id) on delete set null,
  team_id uuid references public.teams(id) on delete set null,
  player_id uuid references public.players(id) on delete set null,
  candidate_type text not null,
  title text not null,
  angle text,
  rationale text,
  priority integer not null default 100 check (priority >= 0),
  source_payload jsonb not null default '{}'::jsonb,
  status public.content_status not null default 'review_needed',
  visibility public.content_visibility not null default 'private_admin',
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid references public.users_profile(id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.news_archive (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  body text,
  source_name text,
  source_url text,
  source_published_at timestamptz,
  competition_id uuid references public.competitions(id) on delete set null,
  match_id uuid references public.matches(id) on delete set null,
  team_id uuid references public.teams(id) on delete set null,
  player_id uuid references public.players(id) on delete set null,
  status public.content_status not null default 'draft',
  visibility public.content_visibility not null default 'private_admin',
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid references public.users_profile(id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.story_library (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  story_body text,
  story_type text,
  historical_period text,
  source_references jsonb not null default '[]'::jsonb,
  tags text[] not null default '{}'::text[],
  status public.content_status not null default 'draft',
  visibility public.content_visibility not null default 'private_admin',
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid references public.users_profile(id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.story_matches (
  id uuid primary key default gen_random_uuid(),
  story_id uuid not null references public.story_library(id) on delete cascade,
  match_id uuid not null references public.matches(id) on delete cascade,
  relation_type text not null default 'historical_echo',
  relevance_score numeric(6, 3) check (relevance_score is null or relevance_score between 0 and 100),
  explanation text,
  status public.content_status not null default 'review_needed',
  visibility public.content_visibility not null default 'private_admin',
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid references public.users_profile(id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (story_id, match_id, relation_type)
);

create table public.competition_highlight_sources (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete cascade,
  name text not null,
  platform text not null,
  source_url text not null,
  channel_id text,
  is_official boolean not null default false,
  is_active boolean not null default true,
  terms_reviewed_at timestamptz,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (competition_id, source_url)
);

create table public.highlight_links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null unique,
  platform text not null,
  video_type text,
  competition_id uuid references public.competitions(id) on delete set null,
  match_id uuid references public.matches(id) on delete set null,
  source_id uuid references public.competition_highlight_sources(id) on delete set null,
  published_at timestamptz,
  detected_home_team text,
  detected_away_team text,
  confidence_score numeric(6, 3) check (confidence_score is null or confidence_score between 0 and 100),
  is_official boolean not null default false,
  highlight_status public.highlight_status not null default 'detected',
  status public.content_status not null default 'review_needed',
  visibility public.content_visibility not null default 'private_admin',
  login_required boolean not null default true,
  reviewed_at timestamptz,
  approved_by uuid references public.users_profile(id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint highlight_official_publish check (highlight_status <> 'published' or is_official)
);

create table public.video_radar_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  format_type text not null,
  description text,
  script text,
  visual_notes text,
  related_competition_id uuid references public.competitions(id) on delete set null,
  related_match_id uuid references public.matches(id) on delete set null,
  related_player_id uuid references public.players(id) on delete set null,
  related_team_id uuid references public.teams(id) on delete set null,
  related_highlight_links uuid[] not null default '{}'::uuid[],
  official_links jsonb not null default '[]'::jsonb,
  status public.content_status not null default 'draft',
  visibility public.content_visibility not null default 'private_admin',
  login_required boolean not null default true,
  publish_target text[] not null default '{}'::text[],
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid references public.users_profile(id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.generated_content (
  id uuid primary key default gen_random_uuid(),
  content_candidate_id uuid references public.content_candidates(id) on delete set null,
  title text not null,
  content_type text not null,
  prompt_version text,
  model_name text,
  input_references jsonb not null default '[]'::jsonb,
  generated_body text,
  status public.content_status not null default 'draft',
  visibility public.content_visibility not null default 'private_admin',
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid references public.users_profile(id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.public_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text,
  hero_image_url text,
  author_id uuid references public.users_profile(id) on delete set null,
  competition_id uuid references public.competitions(id) on delete set null,
  match_id uuid references public.matches(id) on delete set null,
  player_id uuid references public.players(id) on delete set null,
  team_id uuid references public.teams(id) on delete set null,
  status public.content_status not null default 'draft',
  visibility public.content_visibility not null default 'public_preview',
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid references public.users_profile(id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.user_saved_items add constraint user_saved_items_article_fkey foreign key (article_id) references public.public_articles(id) on delete cascade;
alter table public.user_saved_items add constraint user_saved_items_video_fkey foreign key (video_radar_item_id) references public.video_radar_items(id) on delete cascade;

create table public.newsletter_issues (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subject text,
  preview_text text,
  body text,
  issue_number integer check (issue_number is null or issue_number > 0),
  external_url text,
  status public.content_status not null default 'draft',
  visibility public.content_visibility not null default 'substack_free',
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid references public.users_profile(id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.substack_content_queue (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content_type text not null,
  summary text,
  full_draft text,
  visibility public.content_visibility not null default 'substack_free',
  status public.content_status not null default 'draft',
  related_articles uuid[] not null default '{}'::uuid[],
  related_players uuid[] not null default '{}'::uuid[],
  related_matches uuid[] not null default '{}'::uuid[],
  related_highlight_links uuid[] not null default '{}'::uuid[],
  external_url text,
  login_required boolean not null default false,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid references public.users_profile(id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- -----------------------------------------------------------------------------
-- Admin, utilizzo API e log generici
-- -----------------------------------------------------------------------------

create table public.api_usage_logs (
  id uuid primary key default gen_random_uuid(),
  provider uuid not null references public.data_providers(id) on delete restrict,
  endpoint text not null,
  request_count integer not null default 0 check (request_count >= 0),
  date date not null,
  competition_id uuid references public.competitions(id) on delete set null,
  script_name text,
  response_status integer,
  estimated_cost_eur numeric(12, 4) check (estimated_cost_eur is null or estimated_cost_eur >= 0),
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.import_logs (
  id uuid primary key default gen_random_uuid(),
  import_type text not null,
  provider_id uuid references public.data_providers(id) on delete set null,
  competition_id uuid references public.competitions(id) on delete set null,
  provider_import_log_id uuid references public.provider_import_logs(id) on delete set null,
  status public.import_run_status not null default 'pending',
  started_at timestamptz,
  finished_at timestamptz,
  records_processed integer not null default 0 check (records_processed >= 0),
  records_created integer not null default 0 check (records_created >= 0),
  records_updated integer not null default 0 check (records_updated >= 0),
  errors jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.users_profile(id) on delete set null,
  entity_type text,
  entity_id uuid,
  title text not null,
  body text not null,
  status public.content_status not null default 'draft',
  visibility public.content_visibility not null default 'private_admin',
  login_required boolean not null default true,
  published_at timestamptz,
  reviewed_at timestamptz,
  approved_by uuid references public.users_profile(id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- -----------------------------------------------------------------------------
-- Indici. PostgreSQL non crea automaticamente indici sulle foreign key.
-- -----------------------------------------------------------------------------

create index competitions_tracking_idx on public.competitions (tracking_level, status);
create index competitions_providers_idx on public.competitions (primary_provider, secondary_provider, enrichment_provider);
create index competitions_secondary_provider_idx on public.competitions (secondary_provider);
create index competitions_enrichment_provider_idx on public.competitions (enrichment_provider);
create index competitions_approved_by_idx on public.competitions (approved_by);
create index competitions_visibility_published_idx on public.competitions (visibility, published_at desc);
create index provider_competition_provider_idx on public.provider_competition_config (provider_id, import_enabled, priority);
create index provider_competition_competition_idx on public.provider_competition_config (competition_id);

create index teams_competition_idx on public.teams (competition_id);
create index teams_provider_idx on public.teams (source_provider_id, api_team_id);
create index teams_approved_by_idx on public.teams (approved_by);
create index teams_slug_idx on public.teams (slug);
create index players_team_idx on public.players (current_team_id);
create index players_provider_idx on public.players (source_provider_id, api_player_id);
create index players_approved_by_idx on public.players (approved_by);
create unique index players_slug_unique_idx on public.players (slug);
create index matches_competition_kickoff_idx on public.matches (competition_id, kickoff_at desc);
create index matches_provider_idx on public.matches (source_provider_id);
create index matches_home_team_idx on public.matches (home_team_id, kickoff_at desc);
create index matches_away_team_idx on public.matches (away_team_id, kickoff_at desc);
create index matches_approved_by_idx on public.matches (approved_by);
create index matches_status_idx on public.matches (status, kickoff_at);
create index match_events_match_idx on public.match_events (match_id, minute, event_order);
create index match_events_team_idx on public.match_events (team_id);
create index match_events_player_idx on public.match_events (player_id);
create index match_events_assist_player_idx on public.match_events (assist_player_id);
create index match_events_provider_idx on public.match_events (source_provider_id);
create index match_events_approved_by_idx on public.match_events (approved_by);
create index standings_competition_idx on public.standings (competition_id, season, stage, matchday, rank);
create index standings_team_idx on public.standings (team_id);
create index standings_provider_idx on public.standings (source_provider_id);
create index standings_approved_by_idx on public.standings (approved_by);
create index team_match_stats_match_idx on public.team_match_stats (match_id);
create index team_match_stats_team_idx on public.team_match_stats (team_id);
create index team_match_stats_provider_idx on public.team_match_stats (source_provider_id);
create index team_season_stats_competition_idx on public.team_season_stats (competition_id, season);
create index team_season_stats_team_idx on public.team_season_stats (team_id);
create index team_season_stats_provider_idx on public.team_season_stats (source_provider_id);
create index player_match_stats_match_idx on public.player_match_stats (match_id);
create index player_match_stats_player_idx on public.player_match_stats (player_id);
create index player_match_stats_team_idx on public.player_match_stats (team_id);
create index player_match_stats_provider_idx on public.player_match_stats (source_provider_id);
create index player_season_stats_competition_idx on public.player_season_stats (competition_id, season);
create index player_season_stats_player_idx on public.player_season_stats (player_id);
create index player_season_stats_team_idx on public.player_season_stats (team_id);
create index player_season_stats_provider_idx on public.player_season_stats (source_provider_id);

create index provider_import_logs_provider_idx on public.provider_import_logs (provider_id, created_at desc);
create index provider_import_logs_competition_idx on public.provider_import_logs (competition_id, created_at desc);
create index provider_import_logs_status_idx on public.provider_import_logs (status, started_at desc);
create index apify_usage_provider_idx on public.apify_usage_logs (provider, started_at desc);
create index apify_usage_competition_idx on public.apify_usage_logs (competition_id, started_at desc);
create index apify_usage_status_idx on public.apify_usage_logs (status, started_at desc);

create index user_search_usage_user_idx on public.user_search_usage (user_id, period_start desc);
create index user_preferences_competitions_gin_idx on public.user_preferences using gin (favorite_competition_ids);
create index user_preferences_teams_gin_idx on public.user_preferences using gin (favorite_team_ids);
create index user_saved_items_user_idx on public.user_saved_items (user_id, item_type, created_at desc);
create index user_saved_items_competition_idx on public.user_saved_items (competition_id) where competition_id is not null;
create index user_saved_items_team_idx on public.user_saved_items (team_id) where team_id is not null;
create index user_saved_items_player_idx on public.user_saved_items (player_id) where player_id is not null;
create index user_saved_items_match_idx on public.user_saved_items (match_id) where match_id is not null;
create index user_saved_items_article_idx on public.user_saved_items (article_id) where article_id is not null;
create index user_saved_items_video_idx on public.user_saved_items (video_radar_item_id) where video_radar_item_id is not null;
create unique index newsletter_subscribers_email_unique_idx on public.newsletter_subscribers (lower(email));
create index newsletter_subscribers_user_idx on public.newsletter_subscribers (user_id);

create index trend_signals_status_idx on public.trend_signals (status, detected_at desc);
create index trend_signals_competition_idx on public.trend_signals (competition_id);
create index trend_signals_match_idx on public.trend_signals (match_id);
create index trend_signals_team_idx on public.trend_signals (team_id);
create index trend_signals_player_idx on public.trend_signals (player_id);
create index trend_signals_approved_by_idx on public.trend_signals (approved_by);
create index content_candidates_status_idx on public.content_candidates (status, priority, created_at desc);
create index content_candidates_signal_idx on public.content_candidates (trend_signal_id);
create index content_candidates_competition_idx on public.content_candidates (competition_id);
create index content_candidates_match_idx on public.content_candidates (match_id);
create index content_candidates_team_idx on public.content_candidates (team_id);
create index content_candidates_player_idx on public.content_candidates (player_id);
create index content_candidates_approved_by_idx on public.content_candidates (approved_by);
create index news_archive_status_visibility_idx on public.news_archive (status, visibility, published_at desc);
create index news_archive_competition_idx on public.news_archive (competition_id);
create index news_archive_match_idx on public.news_archive (match_id);
create index news_archive_team_idx on public.news_archive (team_id);
create index news_archive_player_idx on public.news_archive (player_id);
create index news_archive_approved_by_idx on public.news_archive (approved_by);
create index story_library_status_visibility_idx on public.story_library (status, visibility, published_at desc);
create index story_library_approved_by_idx on public.story_library (approved_by);
create index story_matches_story_idx on public.story_matches (story_id);
create index story_matches_match_idx on public.story_matches (match_id);
create index story_matches_approved_by_idx on public.story_matches (approved_by);
create index highlight_sources_competition_idx on public.competition_highlight_sources (competition_id, is_active);
create index highlight_links_competition_idx on public.highlight_links (competition_id, published_at desc);
create index highlight_links_match_idx on public.highlight_links (match_id);
create index highlight_links_source_idx on public.highlight_links (source_id);
create index highlight_links_approved_by_idx on public.highlight_links (approved_by);
create index highlight_links_status_visibility_idx on public.highlight_links (highlight_status, visibility, published_at desc);
create index video_radar_status_visibility_idx on public.video_radar_items (status, visibility, published_at desc);
create index video_radar_competition_idx on public.video_radar_items (related_competition_id);
create index video_radar_match_idx on public.video_radar_items (related_match_id);
create index video_radar_player_idx on public.video_radar_items (related_player_id);
create index video_radar_team_idx on public.video_radar_items (related_team_id);
create index video_radar_approved_by_idx on public.video_radar_items (approved_by);
create index video_radar_highlights_gin_idx on public.video_radar_items using gin (related_highlight_links);
create index generated_content_status_idx on public.generated_content (status, created_at desc);
create index generated_content_candidate_idx on public.generated_content (content_candidate_id);
create index generated_content_approved_by_idx on public.generated_content (approved_by);
create index public_articles_status_visibility_idx on public.public_articles (status, visibility, published_at desc);
create index public_articles_author_idx on public.public_articles (author_id);
create index public_articles_competition_idx on public.public_articles (competition_id);
create index public_articles_match_idx on public.public_articles (match_id);
create index public_articles_player_idx on public.public_articles (player_id);
create index public_articles_team_idx on public.public_articles (team_id);
create index public_articles_approved_by_idx on public.public_articles (approved_by);
create index newsletter_issues_status_visibility_idx on public.newsletter_issues (status, visibility, published_at desc);
create index newsletter_issues_approved_by_idx on public.newsletter_issues (approved_by);
create index substack_queue_status_visibility_idx on public.substack_content_queue (status, visibility, created_at desc);
create index substack_queue_approved_by_idx on public.substack_content_queue (approved_by);
create index substack_queue_articles_gin_idx on public.substack_content_queue using gin (related_articles);
create index substack_queue_players_gin_idx on public.substack_content_queue using gin (related_players);
create index substack_queue_matches_gin_idx on public.substack_content_queue using gin (related_matches);
create index substack_queue_highlights_gin_idx on public.substack_content_queue using gin (related_highlight_links);

create index api_usage_provider_date_idx on public.api_usage_logs (provider, date desc);
create index api_usage_competition_idx on public.api_usage_logs (competition_id, date desc);
create index import_logs_status_idx on public.import_logs (status, started_at desc);
create index import_logs_provider_idx on public.import_logs (provider_id, started_at desc);
create index import_logs_competition_idx on public.import_logs (competition_id, started_at desc);
create index import_logs_provider_import_idx on public.import_logs (provider_import_log_id);
create index admin_notes_author_idx on public.admin_notes (author_id, created_at desc);
create index admin_notes_approved_by_idx on public.admin_notes (approved_by);
create index admin_notes_entity_idx on public.admin_notes (entity_type, entity_id);
create index admin_notes_status_idx on public.admin_notes (status, visibility, created_at desc);

-- -----------------------------------------------------------------------------
-- Trigger updated_at per tutte le tabelle applicative
-- -----------------------------------------------------------------------------

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'data_providers', 'competitions', 'provider_competition_config',
    'teams', 'players', 'matches', 'match_events', 'standings',
    'team_match_stats', 'team_season_stats', 'player_match_stats', 'player_season_stats',
    'provider_import_logs', 'apify_usage_logs', 'apify_budget_status',
    'users_profile', 'user_preferences', 'user_search_usage', 'user_saved_items',
    'newsletter_subscribers', 'trend_signals', 'content_candidates', 'news_archive',
    'story_library', 'story_matches', 'competition_highlight_sources', 'highlight_links',
    'video_radar_items', 'generated_content', 'public_articles', 'newsletter_issues',
    'substack_content_queue', 'api_usage_logs', 'import_logs', 'admin_notes'
  ]
  loop
    execute format(
      'create trigger %I before update on public.%I for each row execute function public.set_updated_at()',
      'set_' || table_name || '_updated_at',
      table_name
    );
  end loop;
end;
$$;

-- -----------------------------------------------------------------------------
-- Sicurezza iniziale: RLS attiva, nessuna policy permissiva in questo step.
-- Le future API server-side useranno policy esplicite e service role protetta.
-- -----------------------------------------------------------------------------

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'data_providers', 'competitions', 'provider_competition_config',
    'teams', 'players', 'matches', 'match_events', 'standings',
    'team_match_stats', 'team_season_stats', 'player_match_stats', 'player_season_stats',
    'provider_import_logs', 'apify_usage_logs', 'apify_budget_status',
    'users_profile', 'user_preferences', 'user_search_usage', 'user_saved_items',
    'newsletter_subscribers', 'trend_signals', 'content_candidates', 'news_archive',
    'story_library', 'story_matches', 'competition_highlight_sources', 'highlight_links',
    'video_radar_items', 'generated_content', 'public_articles', 'newsletter_issues',
    'substack_content_queue', 'api_usage_logs', 'import_logs', 'admin_notes'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end;
$$;

comment on table public.highlight_links is 'Contiene solo URL ufficiali o manualmente verificati; non memorizza file video.';
comment on column public.video_radar_items.related_highlight_links is 'Array provvisorio: non offre foreign key elemento-per-elemento; valutare tabella ponte.';
comment on table public.apify_usage_logs is 'Log batch server-side. Non deve essere scritto da richieste pagina utente.';
comment on table public.user_search_usage is 'Contatore mensile free; aggiornamento atomico/RPC da implementare in uno step successivo.';
