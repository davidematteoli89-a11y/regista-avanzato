-- Regista Avanzato — migrazione 0003: policy RLS deny-by-default.
-- Le view pubbliche della migrazione successiva sono l'interfaccia consigliata;
-- le policy sulle tabelle sono difesa aggiuntiva e non sostituiscono la
-- selezione esplicita delle colonne.

-- ---------------------------------------------------------------------------
-- Dati dell'utente
-- ---------------------------------------------------------------------------

-- Supabase può configurare default privileges per anon/authenticated. Si parte
-- da zero e si concedono sotto soltanto i privilegi necessari. In particolare
-- TRUNCATE non è governato da RLS e non deve mai restare disponibile al client.
revoke all on all tables in schema public from anon, authenticated;

create policy users_profile_select_own
  on public.users_profile for select to authenticated
  using (id = auth.uid());

create policy users_profile_insert_own_free
  on public.users_profile for insert to authenticated
  with check (id = auth.uid() and role = 'free_user');

create policy users_profile_update_own
  on public.users_profile for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

grant select (id, display_name, avatar_url, role, status, created_at, updated_at)
  on public.users_profile to authenticated;
grant insert (id, display_name, avatar_url, role)
  on public.users_profile to authenticated;
grant update (display_name, avatar_url)
  on public.users_profile to authenticated;

create policy user_preferences_own
  on public.user_preferences for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
grant select, insert, update, delete on public.user_preferences to authenticated;

create policy user_saved_items_own
  on public.user_saved_items for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
grant select, insert, update, delete on public.user_saved_items to authenticated;

create policy user_search_usage_select_own
  on public.user_search_usage for select to authenticated
  using (user_id = auth.uid());
grant select on public.user_search_usage to authenticated;
revoke insert, update, delete on public.user_search_usage from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Lettura di righe pubblicate. Nessun grant diretto viene dato ad anon:
-- l'accesso pubblico passa dalle view con allowlist di colonne.
-- ---------------------------------------------------------------------------

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'competitions', 'teams', 'players', 'standings', 'news_archive',
    'story_library', 'historical_echoes', 'public_articles'
  ]
  loop
    execute format(
      'create policy %I on public.%I for select to anon using (
        status = ''published''
        and visibility in (''public_free'', ''public_preview'')
        and login_required = false
        and published_at is not null
        and published_at <= now()
      )',
      table_name || '_anon_published',
      table_name
    );

    execute format(
      'create policy %I on public.%I for select to authenticated using (
        status = ''published''
        and visibility in (''public_free'', ''public_preview'', ''public_login_required'')
        and published_at is not null
        and published_at <= now()
      )',
      table_name || '_authenticated_published',
      table_name
    );
  end loop;
end;
$$;

create policy matches_anon_published
  on public.matches for select to anon
  using (
    visibility in ('public_free', 'public_preview')
    and login_required = false
    and published_at is not null
    and published_at <= now()
  );

create policy matches_authenticated_published
  on public.matches for select to authenticated
  using (
    visibility in ('public_free', 'public_preview', 'public_login_required')
    and published_at is not null
    and published_at <= now()
  );

create policy match_events_anon_published
  on public.match_events for select to anon
  using (
    status = 'published'
    and visibility in ('public_free', 'public_preview')
    and login_required = false
    and published_at is not null
    and published_at <= now()
    and exists (
      select 1 from public.matches parent
      where parent.id = match_events.match_id
        and parent.visibility in ('public_free', 'public_preview')
        and parent.login_required = false
        and parent.published_at is not null
        and parent.published_at <= now()
    )
  );

create policy match_events_authenticated_published
  on public.match_events for select to authenticated
  using (
    status = 'published'
    and visibility in ('public_free', 'public_preview', 'public_login_required')
    and published_at is not null
    and published_at <= now()
  );

create policy highlight_links_anon_published
  on public.highlight_links for select to anon
  using (
    status = 'published'
    and highlight_status = 'published'
    and is_official = true
    and visibility in ('public_free', 'public_preview')
    and login_required = false
    and published_at is not null
    and published_at <= now()
  );

create policy highlight_links_authenticated_published
  on public.highlight_links for select to authenticated
  using (
    status = 'published'
    and highlight_status = 'published'
    and is_official = true
    and visibility in ('public_free', 'public_preview', 'public_login_required')
    and published_at is not null
    and published_at <= now()
  );

create policy video_radar_anon_published
  on public.video_radar_items for select to anon
  using (
    status = 'published'
    and visibility in ('public_free', 'public_preview')
    and login_required = false
    and published_at is not null
    and published_at <= now()
  );

create policy video_radar_authenticated_published
  on public.video_radar_items for select to authenticated
  using (
    status = 'published'
    and visibility in ('public_free', 'public_preview', 'public_login_required')
    and published_at is not null
    and published_at <= now()
  );

create policy newsletter_issues_anon_published
  on public.newsletter_issues for select to anon
  using (
    status = 'published'
    and visibility in ('public_free', 'public_preview', 'substack_free')
    and login_required = false
    and published_at is not null
    and published_at <= now()
  );

create policy newsletter_issues_authenticated_published
  on public.newsletter_issues for select to authenticated
  using (
    status = 'published'
    and visibility in ('public_free', 'public_preview', 'public_login_required', 'substack_free')
    and published_at is not null
    and published_at <= now()
  );

-- Impedisce che i grant predefiniti del progetto Supabase rendano interrogabili
-- direttamente colonne come internal_notes, raw_data, score e warning.
revoke select on public.competitions, public.teams, public.players,
  public.matches, public.match_events, public.standings,
  public.team_match_stats, public.team_season_stats,
  public.player_match_stats, public.player_season_stats,
  public.news_archive, public.story_library, public.story_matches,
  public.historical_echoes, public.highlight_links,
  public.video_radar_items, public.public_articles,
  public.newsletter_issues
from anon, authenticated;

-- Le statistiche profonde non sono leggibili da anon. L'utente free può
-- leggerle soltanto quando la competizione parent è pubblicata e abilitata.
create policy team_match_stats_authenticated_full
  on public.team_match_stats for select to authenticated
  using (
    exists (
      select 1
      from public.matches match_row
      join public.competitions competition on competition.id = match_row.competition_id
      where match_row.id = team_match_stats.match_id
        and match_row.published_at is not null
        and match_row.published_at <= now()
        and competition.public_stats_enabled = true
        and competition.status = 'published'
    )
  );

create policy player_match_stats_authenticated_full
  on public.player_match_stats for select to authenticated
  using (
    exists (
      select 1
      from public.matches match_row
      join public.competitions competition on competition.id = match_row.competition_id
      where match_row.id = player_match_stats.match_id
        and match_row.published_at is not null
        and match_row.published_at <= now()
        and competition.public_stats_enabled = true
        and competition.status = 'published'
    )
  );

create policy team_season_stats_authenticated_full
  on public.team_season_stats for select to authenticated
  using (
    exists (
      select 1 from public.competitions competition
      where competition.id = team_season_stats.competition_id
        and competition.public_stats_enabled = true
        and competition.status = 'published'
    )
  );

create policy player_season_stats_authenticated_full
  on public.player_season_stats for select to authenticated
  using (
    exists (
      select 1 from public.competitions competition
      where competition.id = player_season_stats.competition_id
        and competition.public_stats_enabled = true
        and competition.status = 'published'
    )
  );

-- ---------------------------------------------------------------------------
-- Staff editoriale. I grant sono necessari, ma le policy negano ogni riga a
-- un authenticated privo di ruolo staff.
-- ---------------------------------------------------------------------------

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'competitions', 'teams', 'players', 'matches', 'match_events', 'standings',
    'team_match_stats', 'team_season_stats', 'player_match_stats', 'player_season_stats',
    'trend_signals', 'content_candidates', 'news_archive', 'story_library',
    'story_matches', 'historical_echoes', 'daily_radar_runs', 'weekly_digests',
    'competition_highlight_sources', 'highlight_links', 'video_radar_items',
    'generated_content', 'public_articles', 'newsletter_issues',
    'substack_content_queue', 'admin_notes'
  ]
  loop
    execute format(
      'create policy %I on public.%I for all to authenticated
       using (public.is_editor_or_admin())
       with check (public.is_editor_or_admin())',
      table_name || '_staff_manage',
      table_name
    );
    -- Nessun SELECT completo sulla tabella base: una policy pubblica combinata
    -- con quel grant esporrebbe colonne interne. La lettura staff passa dalla
    -- view admin_* filtrata per ruolo; le scritture restano protette da RLS.
    execute format('grant insert, update, delete on public.%I to authenticated', table_name);
    execute format(
      'create view public.%I with (security_barrier = true) as
       select * from public.%I where public.is_editor_or_admin()',
      'admin_' || table_name,
      table_name
    );
    execute format('revoke all on public.%I from public, anon, authenticated', 'admin_' || table_name);
    execute format('grant select on public.%I to authenticated', 'admin_' || table_name);
  end loop;
end;
$$;

-- Infrastruttura, costi e dati personali newsletter: solo admin/super_admin.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'data_providers', 'provider_competition_config', 'provider_import_logs',
    'apify_usage_logs', 'apify_budget_status', 'api_usage_logs', 'import_logs',
    'newsletter_subscribers'
  ]
  loop
    execute format(
      'create policy %I on public.%I for all to authenticated
       using (public.is_admin())
       with check (public.is_admin())',
      table_name || '_admin_manage',
      table_name
    );
    execute format('grant select, insert, update, delete on public.%I to authenticated', table_name);
  end loop;
end;
$$;

-- Audit append-only: nessun grant e nessuna policy UPDATE/DELETE.
create policy admin_audit_logs_admin_select
  on public.admin_audit_logs for select to authenticated
  using (public.is_admin());

create policy admin_audit_logs_admin_insert
  on public.admin_audit_logs for insert to authenticated
  with check (public.is_admin() and admin_user_id = auth.uid());

grant select, insert on public.admin_audit_logs to authenticated;
revoke update, delete on public.admin_audit_logs from anon, authenticated;

-- Il ruolo service_role bypassa RLS in Supabase ed è riservato a job server.
-- Non viene concessa alcuna policy client dedicata.
