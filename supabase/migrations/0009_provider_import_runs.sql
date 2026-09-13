-- Regista Avanzato — migrazione 0009: provider import runs.
-- Preparata per staging, NON applicata automaticamente.
-- Obiettivo: introdurre una testata run/batch collegabile ai log provider/API/import.
-- Non attiva provider, non abilita import e non modifica dati calcistici.

create table if not exists public.provider_import_runs (
  id uuid primary key default gen_random_uuid(),
  batch_id text not null unique,
  provider_key text not null references public.data_providers(provider_key) on delete restrict,
  competition_id uuid references public.competitions(id) on delete set null,
  competition_slug text,
  mode text not null default 'dry_run'
    check (mode in ('dry_run', 'mock', 'real_disabled', 'staging_manual', 'real')),
  status public.import_run_status not null default 'pending',
  started_at timestamptz,
  finished_at timestamptz,
  external_fetch boolean not null default false,
  db_write boolean not null default false,
  estimated_cost_eur numeric(12, 4) check (estimated_cost_eur is null or estimated_cost_eur >= 0),
  actual_cost_eur numeric(12, 4) check (actual_cost_eur is null or actual_cost_eur >= 0),
  records_planned integer not null default 0 check (records_planned >= 0),
  records_inserted integer not null default 0 check (records_inserted >= 0),
  records_updated integer not null default 0 check (records_updated >= 0),
  records_skipped integer not null default 0 check (records_skipped >= 0),
  warnings_count integer not null default 0 check (warnings_count >= 0),
  error_message text,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references public.users_profile(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint provider_import_runs_time_order check (
    finished_at is null or started_at is null or finished_at >= started_at
  ),
  constraint provider_import_runs_cost_order check (
    actual_cost_eur is null or estimated_cost_eur is null or actual_cost_eur >= 0
  )
);

alter table public.provider_import_runs enable row level security;

drop trigger if exists provider_import_runs_set_updated_at on public.provider_import_runs;
create trigger provider_import_runs_set_updated_at
  before update on public.provider_import_runs
  for each row execute function public.set_updated_at();

create index if not exists provider_import_runs_provider_status_idx
  on public.provider_import_runs (provider_key, status, started_at desc);

create index if not exists provider_import_runs_competition_idx
  on public.provider_import_runs (competition_id, started_at desc);

create index if not exists provider_import_runs_batch_idx
  on public.provider_import_runs (batch_id);

create index if not exists provider_import_runs_created_by_idx
  on public.provider_import_runs (created_by, created_at desc)
  where created_by is not null;

alter table public.provider_import_logs
  add column if not exists import_run_id uuid references public.provider_import_runs(id) on delete set null,
  add column if not exists batch_id text;

alter table public.api_usage_logs
  add column if not exists import_run_id uuid references public.provider_import_runs(id) on delete set null,
  add column if not exists batch_id text;

alter table public.import_logs
  add column if not exists import_run_id uuid references public.provider_import_runs(id) on delete set null,
  add column if not exists batch_id text;

create index if not exists provider_import_logs_import_run_idx
  on public.provider_import_logs (import_run_id)
  where import_run_id is not null;

create index if not exists provider_import_logs_batch_idx
  on public.provider_import_logs (batch_id)
  where batch_id is not null;

create index if not exists api_usage_logs_import_run_idx
  on public.api_usage_logs (import_run_id)
  where import_run_id is not null;

create index if not exists api_usage_logs_batch_idx
  on public.api_usage_logs (batch_id)
  where batch_id is not null;

create index if not exists import_logs_import_run_idx
  on public.import_logs (import_run_id)
  where import_run_id is not null;

create index if not exists import_logs_batch_idx
  on public.import_logs (batch_id)
  where batch_id is not null;

revoke all on public.provider_import_runs from public, anon, authenticated;
grant select, insert, update on public.provider_import_runs to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'provider_import_runs'
      and policyname = 'provider_import_runs_editor_select'
  ) then
    create policy provider_import_runs_editor_select
      on public.provider_import_runs for select to authenticated
      using (public.is_editor_or_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'provider_import_runs'
      and policyname = 'provider_import_runs_admin_insert'
  ) then
    create policy provider_import_runs_admin_insert
      on public.provider_import_runs for insert to authenticated
      with check (public.is_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'provider_import_runs'
      and policyname = 'provider_import_runs_admin_update'
  ) then
    create policy provider_import_runs_admin_update
      on public.provider_import_runs for update to authenticated
      using (public.is_admin())
      with check (public.is_admin());
  end if;
end;
$$;

comment on table public.provider_import_runs is
  'Testata batch/import provider. Nessuna pagina pubblica deve scrivere o leggere questa tabella.';

comment on column public.provider_import_runs.batch_id is
  'Identificatore stabile della run usato per correlare provider_import_logs, api_usage_logs e import_logs.';

comment on column public.provider_import_runs.external_fetch is
  'Deve restare false per dry-run/mock. True solo in import server-side autorizzati.';

comment on column public.provider_import_runs.db_write is
  'Deve restare false finché il writer reale non è esplicitamente approvato.';
