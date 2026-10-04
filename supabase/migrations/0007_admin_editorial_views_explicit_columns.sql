-- C.4.4 — Admin editorial views with explicit columns.
--
-- Purpose:
-- - reduce leakage risk from the original generic admin_* views created with
--   `select *`;
-- - keep the same view names consumed by the admin editorial readers;
-- - avoid touching base tables, data, RLS policies, providers, imports or Apify.
--
-- Apply manually to staging only after review.
-- Do not run with `supabase db push` until migration tracking is aligned.

begin;

-- CREATE OR REPLACE VIEW cannot safely remove columns from an existing
-- `select *` view, so we drop and recreate only the four editorial admin views
-- currently consumed by the C.4 admin pages.

drop view if exists public.admin_public_articles;

create view public.admin_public_articles
with (security_barrier = true) as
select
  id,
  slug,
  title,
  status,
  visibility,
  published_at,
  created_at,
  updated_at,
  reviewed_at,
  internal_notes
from public.public_articles
where public.is_editor_or_admin();

revoke all on public.admin_public_articles from public, anon, authenticated;
grant select on public.admin_public_articles to authenticated;

drop view if exists public.admin_news_archive;

create view public.admin_news_archive
with (security_barrier = true) as
select
  id,
  slug,
  title,
  status,
  visibility,
  published_at,
  created_at,
  updated_at,
  reviewed_at,
  internal_notes,
  review_status,
  internal_warnings,
  internal_score
from public.news_archive
where public.is_editor_or_admin();

revoke all on public.admin_news_archive from public, anon, authenticated;
grant select on public.admin_news_archive to authenticated;

drop view if exists public.admin_story_library;

create view public.admin_story_library
with (security_barrier = true) as
select
  id,
  slug,
  title,
  status,
  visibility,
  published_at,
  created_at,
  updated_at,
  reviewed_at,
  internal_notes,
  story_type
from public.story_library
where public.is_editor_or_admin();

revoke all on public.admin_story_library from public, anon, authenticated;
grant select on public.admin_story_library to authenticated;

drop view if exists public.admin_historical_echoes;

create view public.admin_historical_echoes
with (security_barrier = true) as
select
  id,
  slug,
  title,
  status,
  visibility,
  published_at,
  created_at,
  updated_at,
  reviewed_at,
  internal_notes,
  echo_type,
  reviewed_by_human,
  internal_score,
  internal_warnings
from public.historical_echoes
where public.is_editor_or_admin();

revoke all on public.admin_historical_echoes from public, anon, authenticated;
grant select on public.admin_historical_echoes to authenticated;

commit;
