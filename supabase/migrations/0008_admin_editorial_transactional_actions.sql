-- C.5.2 — Admin editorial transactional actions.
--
-- Purpose:
-- - prepare safe RPCs for future admin Server Actions;
-- - guarantee that editorial updates and admin audit logs happen in the same
--   database transaction;
-- - keep actions single-record, whitelist-based and non-destructive.
--
-- Apply manually to staging only after review.
-- Do not run with `supabase db push` until migration tracking is aligned.
--
-- First version role choice:
-- - admin/super_admin only via public.is_admin();
-- - editor is intentionally excluded until a dedicated audit-log policy test.

begin;

create or replace function public.update_editorial_internal_notes(
  p_content_type text,
  p_content_id uuid,
  p_internal_notes text
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  actor_id uuid := auth.uid();
  normalized_type text := lower(trim(coalesce(p_content_type, '')));
  normalized_notes text := nullif(trim(coalesce(p_internal_notes, '')), '');
  before_data jsonb;
  after_data jsonb;
  action_time timestamptz := timezone('utc', now());
begin
  if actor_id is null or not public.is_admin() then
    raise exception using
      errcode = '42501',
      message = 'admin_editorial_action_forbidden';
  end if;

  if normalized_type not in ('article', 'news', 'story', 'historical_echo') then
    raise exception using
      errcode = '22023',
      message = 'admin_editorial_invalid_content_type';
  end if;

  if p_content_id is null then
    raise exception using
      errcode = '22023',
      message = 'admin_editorial_missing_content_id';
  end if;

  if length(coalesce(p_internal_notes, '')) > 4000 then
    raise exception using
      errcode = '22023',
      message = 'admin_editorial_notes_too_long';
  end if;

  if normalized_type = 'article' then
    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'internal_notes_present', internal_notes is not null,
      'internal_notes_length', length(coalesce(internal_notes, '')),
      'updated_at', updated_at
    )
    into before_data
    from public.public_articles
    where id = p_content_id;

    if before_data is null then
      raise exception using errcode = 'P0002', message = 'admin_editorial_record_not_found';
    end if;

    update public.public_articles
    set internal_notes = normalized_notes,
        reviewed_at = action_time,
        approved_by = actor_id,
        updated_at = action_time
    where id = p_content_id;

    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'internal_notes_present', internal_notes is not null,
      'internal_notes_length', length(coalesce(internal_notes, '')),
      'updated_at', updated_at
    )
    into after_data
    from public.public_articles
    where id = p_content_id;
  elsif normalized_type = 'news' then
    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'review_status', review_status,
      'internal_warnings_count', cardinality(internal_warnings),
      'internal_notes_present', internal_notes is not null,
      'internal_notes_length', length(coalesce(internal_notes, '')),
      'updated_at', updated_at
    )
    into before_data
    from public.news_archive
    where id = p_content_id;

    if before_data is null then
      raise exception using errcode = 'P0002', message = 'admin_editorial_record_not_found';
    end if;

    update public.news_archive
    set internal_notes = normalized_notes,
        reviewed_at = action_time,
        approved_by = actor_id,
        updated_at = action_time
    where id = p_content_id;

    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'review_status', review_status,
      'internal_warnings_count', cardinality(internal_warnings),
      'internal_notes_present', internal_notes is not null,
      'internal_notes_length', length(coalesce(internal_notes, '')),
      'updated_at', updated_at
    )
    into after_data
    from public.news_archive
    where id = p_content_id;
  elsif normalized_type = 'story' then
    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'story_type', story_type,
      'internal_notes_present', internal_notes is not null,
      'internal_notes_length', length(coalesce(internal_notes, '')),
      'updated_at', updated_at
    )
    into before_data
    from public.story_library
    where id = p_content_id;

    if before_data is null then
      raise exception using errcode = 'P0002', message = 'admin_editorial_record_not_found';
    end if;

    update public.story_library
    set internal_notes = normalized_notes,
        reviewed_at = action_time,
        approved_by = actor_id,
        updated_at = action_time
    where id = p_content_id;

    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'story_type', story_type,
      'internal_notes_present', internal_notes is not null,
      'internal_notes_length', length(coalesce(internal_notes, '')),
      'updated_at', updated_at
    )
    into after_data
    from public.story_library
    where id = p_content_id;
  else
    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'echo_type', echo_type,
      'reviewed_by_human', reviewed_by_human,
      'internal_warnings_count', cardinality(internal_warnings),
      'internal_notes_present', internal_notes is not null,
      'internal_notes_length', length(coalesce(internal_notes, '')),
      'updated_at', updated_at
    )
    into before_data
    from public.historical_echoes
    where id = p_content_id;

    if before_data is null then
      raise exception using errcode = 'P0002', message = 'admin_editorial_record_not_found';
    end if;

    update public.historical_echoes
    set internal_notes = normalized_notes,
        reviewed_at = action_time,
        approved_by = actor_id,
        updated_at = action_time
    where id = p_content_id;

    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'echo_type', echo_type,
      'reviewed_by_human', reviewed_by_human,
      'internal_warnings_count', cardinality(internal_warnings),
      'internal_notes_present', internal_notes is not null,
      'internal_notes_length', length(coalesce(internal_notes, '')),
      'updated_at', updated_at
    )
    into after_data
    from public.historical_echoes
    where id = p_content_id;
  end if;

  insert into public.admin_audit_logs (
    admin_user_id,
    action,
    entity_type,
    entity_id,
    before_data,
    after_data,
    metadata
  )
  values (
    actor_id,
    'update_editorial_internal_notes',
    normalized_type,
    p_content_id,
    before_data,
    after_data,
    jsonb_build_object(
      'source', 'rpc',
      'migration', '0008_admin_editorial_transactional_actions',
      'notes_length', length(coalesce(normalized_notes, '')),
      'notes_present', normalized_notes is not null
    )
  );

  return jsonb_build_object(
    'ok', true,
    'action', 'update_editorial_internal_notes',
    'content_type', normalized_type,
    'content_id', p_content_id,
    'audit_logged', true,
    'after', after_data
  );
end;
$$;

create or replace function public.unpublish_editorial_content(
  p_content_type text,
  p_content_id uuid,
  p_target_status text,
  p_reason text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  actor_id uuid := auth.uid();
  normalized_type text := lower(trim(coalesce(p_content_type, '')));
  normalized_status text := lower(trim(coalesce(p_target_status, '')));
  normalized_reason text := nullif(trim(coalesce(p_reason, '')), '');
  before_data jsonb;
  after_data jsonb;
  action_time timestamptz := timezone('utc', now());
begin
  if actor_id is null or not public.is_admin() then
    raise exception using
      errcode = '42501',
      message = 'admin_editorial_action_forbidden';
  end if;

  if normalized_type not in ('article', 'news', 'story', 'historical_echo') then
    raise exception using
      errcode = '22023',
      message = 'admin_editorial_invalid_content_type';
  end if;

  if normalized_status not in ('draft', 'archived') then
    raise exception using
      errcode = '22023',
      message = 'admin_editorial_invalid_target_status';
  end if;

  if p_content_id is null then
    raise exception using
      errcode = '22023',
      message = 'admin_editorial_missing_content_id';
  end if;

  if length(coalesce(p_reason, '')) > 1000 then
    raise exception using
      errcode = '22023',
      message = 'admin_editorial_reason_too_long';
  end if;

  if normalized_type = 'article' then
    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'updated_at', updated_at
    )
    into before_data
    from public.public_articles
    where id = p_content_id;

    if before_data is null then
      raise exception using errcode = 'P0002', message = 'admin_editorial_record_not_found';
    end if;

    if before_data ->> 'status' <> 'published' then
      raise exception using errcode = '22023', message = 'admin_editorial_record_not_published';
    end if;

    update public.public_articles
    set status = normalized_status::public.content_status,
        visibility = 'private_admin',
        published_at = null,
        reviewed_at = action_time,
        approved_by = actor_id,
        updated_at = action_time
    where id = p_content_id;

    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'updated_at', updated_at
    )
    into after_data
    from public.public_articles
    where id = p_content_id;
  elsif normalized_type = 'news' then
    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'review_status', review_status,
      'updated_at', updated_at
    )
    into before_data
    from public.news_archive
    where id = p_content_id;

    if before_data is null then
      raise exception using errcode = 'P0002', message = 'admin_editorial_record_not_found';
    end if;

    if before_data ->> 'status' <> 'published' then
      raise exception using errcode = '22023', message = 'admin_editorial_record_not_published';
    end if;

    update public.news_archive
    set status = normalized_status::public.content_status,
        visibility = 'private_admin',
        published_at = null,
        reviewed_at = action_time,
        approved_by = actor_id,
        updated_at = action_time
    where id = p_content_id;

    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'review_status', review_status,
      'updated_at', updated_at
    )
    into after_data
    from public.news_archive
    where id = p_content_id;
  elsif normalized_type = 'story' then
    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'story_type', story_type,
      'updated_at', updated_at
    )
    into before_data
    from public.story_library
    where id = p_content_id;

    if before_data is null then
      raise exception using errcode = 'P0002', message = 'admin_editorial_record_not_found';
    end if;

    if before_data ->> 'status' <> 'published' then
      raise exception using errcode = '22023', message = 'admin_editorial_record_not_published';
    end if;

    update public.story_library
    set status = normalized_status::public.content_status,
        visibility = 'private_admin',
        published_at = null,
        reviewed_at = action_time,
        approved_by = actor_id,
        updated_at = action_time
    where id = p_content_id;

    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'story_type', story_type,
      'updated_at', updated_at
    )
    into after_data
    from public.story_library
    where id = p_content_id;
  else
    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'echo_type', echo_type,
      'reviewed_by_human', reviewed_by_human,
      'updated_at', updated_at
    )
    into before_data
    from public.historical_echoes
    where id = p_content_id;

    if before_data is null then
      raise exception using errcode = 'P0002', message = 'admin_editorial_record_not_found';
    end if;

    if before_data ->> 'status' <> 'published' then
      raise exception using errcode = '22023', message = 'admin_editorial_record_not_published';
    end if;

    update public.historical_echoes
    set status = normalized_status::public.content_status,
        visibility = 'private_admin',
        published_at = null,
        reviewed_at = action_time,
        approved_by = actor_id,
        updated_at = action_time
    where id = p_content_id;

    select jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', title,
      'status', status,
      'visibility', visibility,
      'published_at', published_at,
      'reviewed_at', reviewed_at,
      'approved_by', approved_by,
      'echo_type', echo_type,
      'reviewed_by_human', reviewed_by_human,
      'updated_at', updated_at
    )
    into after_data
    from public.historical_echoes
    where id = p_content_id;
  end if;

  insert into public.admin_audit_logs (
    admin_user_id,
    action,
    entity_type,
    entity_id,
    before_data,
    after_data,
    metadata
  )
  values (
    actor_id,
    'unpublish_editorial_content',
    normalized_type,
    p_content_id,
    before_data,
    after_data,
    jsonb_build_object(
      'source', 'rpc',
      'migration', '0008_admin_editorial_transactional_actions',
      'target_status', normalized_status,
      'reason_present', normalized_reason is not null,
      'reason_preview', left(coalesce(normalized_reason, ''), 160)
    )
  );

  return jsonb_build_object(
    'ok', true,
    'action', 'unpublish_editorial_content',
    'content_type', normalized_type,
    'content_id', p_content_id,
    'target_status', normalized_status,
    'audit_logged', true,
    'after', after_data
  );
end;
$$;

revoke all on function public.update_editorial_internal_notes(text, uuid, text) from public, anon, authenticated;
grant execute on function public.update_editorial_internal_notes(text, uuid, text) to authenticated;

revoke all on function public.unpublish_editorial_content(text, uuid, text, text) from public, anon, authenticated;
grant execute on function public.unpublish_editorial_content(text, uuid, text, text) to authenticated;

comment on function public.update_editorial_internal_notes(text, uuid, text) is
  'Admin-only transactional RPC: updates internal_notes on one editorial record and writes admin_audit_logs in the same transaction.';

comment on function public.unpublish_editorial_content(text, uuid, text, text) is
  'Admin-only transactional RPC: rolls back one published editorial record to draft/archived and writes admin_audit_logs in the same transaction.';

commit;

-- ---------------------------------------------------------------------------
-- Post-application verification queries for Supabase SQL Editor.
-- Do not execute before manually applying the migration on staging.
-- ---------------------------------------------------------------------------
--
-- 1) Functions exist
-- select proname, prosecdef
-- from pg_proc
-- join pg_namespace on pg_namespace.oid = pg_proc.pronamespace
-- where nspname = 'public'
--   and proname in ('update_editorial_internal_notes', 'unpublish_editorial_content');
--
-- 2) Execute grants
-- select routine_name, grantee, privilege_type
-- from information_schema.routine_privileges
-- where routine_schema = 'public'
--   and routine_name in ('update_editorial_internal_notes', 'unpublish_editorial_content')
-- order by routine_name, grantee;
--
-- 3) Pick one staging demo row as admin
-- select id, slug, status, visibility, internal_notes
-- from public.admin_public_articles
-- order by updated_at desc
-- limit 1;
--
-- 4) As authenticated admin only: update notes
-- select public.update_editorial_internal_notes(
--   'article',
--   '<demo-article-id>'::uuid,
--   'C.5.2 staging test note'
-- );
--
-- 5) As authenticated admin only: verify audit
-- select action, entity_type, entity_id, before_data, after_data, metadata, created_at
-- from public.admin_audit_logs
-- where action in ('update_editorial_internal_notes', 'unpublish_editorial_content')
-- order by created_at desc
-- limit 5;
--
-- 6) As anon/free_user: both RPC calls must fail with
--    admin_editorial_action_forbidden.
--
-- 7) Provider/import/Apify remain off
-- select count(*) as active_providers from public.data_providers where active = true;
-- select count(*) as enabled_imports from public.provider_competition_config where import_enabled = true;
