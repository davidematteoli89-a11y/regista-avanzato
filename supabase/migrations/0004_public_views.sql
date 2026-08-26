-- Regista Avanzato — migrazione 0004: view pubbliche con allowlist colonne.
-- Le view sono security-barrier e filtrano autonomamente righe/stato. Non
-- concedono accesso diretto alle tabelle base.

create or replace function public.can_read_published_content(
  row_visibility public.content_visibility,
  row_login_required boolean,
  row_published_at timestamptz
)
returns boolean
language sql
stable
set search_path = public, pg_temp
as $$
  select row_published_at is not null
    and row_published_at <= now()
    and (
      (
        row_visibility in ('public_free', 'public_preview')
        and row_login_required = false
      )
      or (
        auth.uid() is not null
        and row_visibility in ('public_free', 'public_preview', 'public_login_required')
      )
    );
$$;

revoke all on function public.can_read_published_content(
  public.content_visibility, boolean, timestamptz
) from public, anon, authenticated;
grant execute on function public.can_read_published_content(
  public.content_visibility, boolean, timestamptz
) to anon, authenticated;

create view public.public_competitions
with (security_barrier = true)
as
select
  id, internal_key, slug, name, country, continent, season,
  public_stats_enabled,
  login_required_for_full_stats, manual_highlights_enabled,
  video_radar_enabled, visibility, login_required,
  published_at, updated_at
from public.competitions
where status = 'published'
  and public.can_read_published_content(visibility, login_required, published_at);

create view public.public_teams
with (security_barrier = true)
as
select
  team.id, team.competition_id, team.slug, team.name, team.short_name,
  team.country, team.city, team.founded_year, team.stadium_name, team.logo_url,
  team.visibility, team.login_required, team.published_at, team.updated_at
from public.teams team
left join public.competitions competition on competition.id = team.competition_id
where team.status = 'published'
  and public.can_read_published_content(team.visibility, team.login_required, team.published_at)
  and (
    team.competition_id is null
    or (
      competition.status = 'published'
      and public.can_read_published_content(
        competition.visibility,
        competition.login_required,
        competition.published_at
      )
    )
  );

create view public.public_players
with (security_barrier = true)
as
select
  player.id,
  case
    when team.id is not null
      and team.status = 'published'
      and public.can_read_published_content(team.visibility, team.login_required, team.published_at)
      and (
        team.competition_id is null
        or (
          competition.status = 'published'
          and public.can_read_published_content(
            competition.visibility,
            competition.login_required,
            competition.published_at
          )
        )
      )
    then player.current_team_id
    else null
  end as current_team_id,
  player.slug, player.full_name, player.known_name, player.date_of_birth,
  player.nationality, player.position, player.preferred_foot,
  player.shirt_number, player.height_cm, player.photo_url,
  player.visibility, player.login_required, player.published_at, player.updated_at
from public.players player
left join public.teams team on team.id = player.current_team_id
left join public.competitions competition on competition.id = team.competition_id
where player.status = 'published'
  and public.can_read_published_content(player.visibility, player.login_required, player.published_at);

create view public.public_matches
with (security_barrier = true)
as
select
  match_row.id, match_row.competition_id, match_row.season, match_row.stage,
  match_row.round, match_row.matchday, match_row.kickoff_at, match_row.venue,
  match_row.timezone, match_row.home_team_id, match_row.away_team_id,
  match_row.home_score, match_row.away_score, match_row.status,
  match_row.visibility, match_row.login_required, match_row.published_at,
  match_row.updated_at
from public.matches match_row
join public.competitions competition on competition.id = match_row.competition_id
join public.teams home_team on home_team.id = match_row.home_team_id
join public.teams away_team on away_team.id = match_row.away_team_id
where public.can_read_published_content(
    match_row.visibility,
    match_row.login_required,
    match_row.published_at
  )
  and competition.status = 'published'
  and public.can_read_published_content(
    competition.visibility,
    competition.login_required,
    competition.published_at
  )
  and home_team.status = 'published'
  and public.can_read_published_content(
    home_team.visibility,
    home_team.login_required,
    home_team.published_at
  )
  and away_team.status = 'published'
  and public.can_read_published_content(
    away_team.visibility,
    away_team.login_required,
    away_team.published_at
  );

create view public.authenticated_match_events
with (security_barrier = true)
as
select
  event.id, event.match_id, event.team_id, event.player_id,
  event.assist_player_id, event.event_type, event.event_detail,
  event.period, event.minute, event.stoppage_minute, event.event_order,
  event.visibility, event.login_required, event.published_at, event.updated_at
from public.match_events event
join public.matches match_row on match_row.id = event.match_id
join public.competitions competition on competition.id = match_row.competition_id
where event.status = 'published'
  and auth.uid() is not null
  and competition.status = 'published'
  and public.can_read_published_content(
    competition.visibility,
    competition.login_required,
    competition.published_at
  )
  and public.can_read_published_content(
    event.visibility,
    event.login_required,
    event.published_at
  )
  and public.can_read_published_content(
    match_row.visibility,
    match_row.login_required,
    match_row.published_at
  );

create view public.public_standings
with (security_barrier = true)
as
select
  standing.id, standing.competition_id, standing.team_id, standing.season,
  standing.stage, standing.matchday, standing.rank, standing.played,
  standing.won, standing.drawn, standing.lost, standing.goals_for,
  standing.goals_against, standing.goal_difference, standing.points,
  standing.form, standing.qualification_note, standing.visibility,
  standing.login_required, standing.published_at, standing.updated_at
from public.standings standing
join public.competitions competition on competition.id = standing.competition_id
join public.teams team on team.id = standing.team_id
where standing.status = 'published'
  and public.can_read_published_content(
    standing.visibility,
    standing.login_required,
    standing.published_at
  )
  and competition.status = 'published'
  and public.can_read_published_content(
    competition.visibility,
    competition.login_required,
    competition.published_at
  )
  and team.status = 'published'
  and public.can_read_published_content(
    team.visibility,
    team.login_required,
    team.published_at
  );

-- Statistiche profonde: view disponibili solo ad authenticated e senza
-- source_provider_id o extra_stats non ancora classificati.
create view public.authenticated_team_match_stats
with (security_barrier = true)
as
select
  stats.id, stats.match_id, stats.team_id, stats.possession_pct, stats.shots,
  stats.shots_on_target, stats.corners, stats.fouls, stats.yellow_cards,
  stats.red_cards, stats.expected_goals, stats.updated_at
from public.team_match_stats stats
join public.matches match_row on match_row.id = stats.match_id
join public.competitions competition on competition.id = match_row.competition_id
where auth.uid() is not null
  and competition.status = 'published'
  and competition.public_stats_enabled = true
  and public.can_read_published_content(
    competition.visibility,
    competition.login_required,
    competition.published_at
  )
  and public.can_read_published_content(
    match_row.visibility,
    match_row.login_required,
    match_row.published_at
  );

create view public.authenticated_player_match_stats
with (security_barrier = true)
as
select
  stats.id, stats.match_id, stats.player_id, stats.team_id, stats.starter,
  stats.minutes_played, stats.goals, stats.assists, stats.shots,
  stats.shots_on_target, stats.passes_completed, stats.passes_attempted,
  stats.tackles, stats.interceptions, stats.saves, stats.rating,
  stats.updated_at
from public.player_match_stats stats
join public.matches match_row on match_row.id = stats.match_id
join public.competitions competition on competition.id = match_row.competition_id
where auth.uid() is not null
  and competition.status = 'published'
  and competition.public_stats_enabled = true
  and public.can_read_published_content(
    competition.visibility,
    competition.login_required,
    competition.published_at
  )
  and public.can_read_published_content(
    match_row.visibility,
    match_row.login_required,
    match_row.published_at
  );

create view public.authenticated_team_season_stats
with (security_barrier = true)
as
select
  stats.id, stats.competition_id, stats.team_id, stats.season,
  stats.matches_played, stats.wins, stats.draws, stats.losses,
  stats.goals_for, stats.goals_against, stats.clean_sheets,
  stats.expected_goals_for, stats.expected_goals_against, stats.updated_at
from public.team_season_stats stats
join public.competitions competition on competition.id = stats.competition_id
where auth.uid() is not null
  and competition.status = 'published'
  and competition.public_stats_enabled = true
  and public.can_read_published_content(
    competition.visibility,
    competition.login_required,
    competition.published_at
  );

create view public.authenticated_player_season_stats
with (security_barrier = true)
as
select
  stats.id, stats.competition_id, stats.player_id, stats.team_id, stats.season,
  stats.appearances, stats.starts, stats.minutes_played, stats.goals,
  stats.assists, stats.clean_sheets, stats.average_rating, stats.updated_at
from public.player_season_stats stats
join public.competitions competition on competition.id = stats.competition_id
where auth.uid() is not null
  and competition.status = 'published'
  and competition.public_stats_enabled = true
  and public.can_read_published_content(
    competition.visibility,
    competition.login_required,
    competition.published_at
  );

create view public.public_articles_published
with (security_barrier = true)
as
select
  id, slug, title, excerpt,
  case
    when auth.uid() is not null or visibility = 'public_free' then body
    else null
  end as body,
  hero_image_url, competition_id, match_id, player_id, team_id,
  visibility, login_required, published_at, updated_at
from public.public_articles
where status = 'published'
  and public.can_read_published_content(visibility, login_required, published_at);

create view public.public_news_published
with (security_barrier = true)
as
select
  id, slug, title, summary,
  case
    when auth.uid() is not null or visibility = 'public_free' then body
    else null
  end as body,
  source_name, source_url, source_published_at, category,
  competition_id, match_id, team_id, player_id,
  visibility, login_required, published_at, updated_at
from public.news_archive
where status = 'published'
  and public.can_read_published_content(visibility, login_required, published_at);

create view public.public_stories_published
with (security_barrier = true)
as
select
  id, slug, title, summary,
  case
    when auth.uid() is not null or visibility = 'public_free' then story_body
    else null
  end as story_body,
  story_type, historical_period, tags,
  visibility, login_required, published_at, updated_at
from public.story_library
where status = 'published'
  and public.can_read_published_content(visibility, login_required, published_at);

create view public.public_historical_echoes
with (security_barrier = true)
as
select
  id, slug, title, summary, echo_type,
  case
    when auth.uid() is not null or visibility = 'public_free' then explanation
    else null
  end as explanation,
  related_story_id, modern_match_id,
  case
    when auth.uid() is not null or visibility = 'public_free' then comparison_points
    else '[]'::jsonb
  end as comparison_points,
  case
    when auth.uid() is not null or visibility = 'public_free' then related_matches
    else '[]'::jsonb
  end as related_matches,
  case
    when auth.uid() is not null or visibility = 'public_free' then timeline
    else '[]'::jsonb
  end as timeline,
  visibility, login_required, published_at, updated_at
from public.historical_echoes
where status = 'published'
  and public.can_read_published_content(visibility, login_required, published_at);

create view public.public_highlight_links_approved
with (security_barrier = true)
as
select
  id, title,
  case when auth.uid() is not null then url else null end as url,
  platform, video_type, competition_id, match_id, published_at,
  is_official, visibility, login_required, updated_at
from public.highlight_links
where status = 'published'
  and highlight_status = 'published'
  and is_official = true
  and public.can_read_published_content(visibility, login_required, published_at);

create view public.public_video_radar_approved
with (security_barrier = true)
as
select
  id, title, slug, format_type, description,
  case when auth.uid() is not null then script else null end as script,
  case when auth.uid() is not null then visual_notes else null end as visual_notes,
  related_competition_id, related_match_id, related_player_id, related_team_id,
  case when auth.uid() is not null then official_links else '[]'::jsonb end as official_links,
  visibility, login_required, published_at, updated_at
from public.video_radar_items
where status = 'published'
  and public.can_read_published_content(visibility, login_required, published_at);

revoke all on public.public_competitions, public.public_teams,
  public.public_players, public.public_matches,
  public.public_standings,
  public.public_articles_published, public.public_news_published,
  public.public_stories_published, public.public_historical_echoes,
  public.public_highlight_links_approved, public.public_video_radar_approved
from public, anon, authenticated;

grant select on public.public_competitions, public.public_teams,
  public.public_players, public.public_matches,
  public.public_standings,
  public.public_articles_published, public.public_news_published,
  public.public_stories_published, public.public_historical_echoes,
  public.public_highlight_links_approved, public.public_video_radar_approved
to anon, authenticated;

revoke all on public.authenticated_match_events,
  public.authenticated_team_match_stats,
  public.authenticated_player_match_stats,
  public.authenticated_team_season_stats,
  public.authenticated_player_season_stats
from public, anon, authenticated;

grant select on public.authenticated_match_events,
  public.authenticated_team_match_stats,
  public.authenticated_player_match_stats,
  public.authenticated_team_season_stats,
  public.authenticated_player_season_stats
to authenticated;

comment on view public.public_highlight_links_approved is
  'Anon vede metadati preview; l URL ufficiale completo è restituito solo con auth.uid().' ;
comment on view public.public_video_radar_approved is
  'Script, note visuali e link ufficiali completi sono mascherati per anon.';
