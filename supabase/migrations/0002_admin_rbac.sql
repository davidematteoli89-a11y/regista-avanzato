-- Regista Avanzato — migrazione 0002: RBAC, bootstrap profilo e audit admin.
-- users_profile.role è la fonte autorevole. I metadata Auth client non
-- partecipano mai alle decisioni di autorizzazione.

create or replace function public.has_role(required_role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select auth.uid() is not null
    and exists (
      select 1
      from public.users_profile profile
      where profile.id = auth.uid()
        and profile.role = required_role
        and profile.status = 'approved'
    );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select public.has_role('admin') or public.has_role('super_admin');
$$;

create or replace function public.is_editor_or_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select public.has_role('editor') or public.is_admin();
$$;

revoke all on function public.has_role(public.app_role) from public, anon, authenticated;
revoke all on function public.is_admin() from public, anon, authenticated;
revoke all on function public.is_editor_or_admin() from public, anon, authenticated;
grant execute on function public.has_role(public.app_role) to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_editor_or_admin() to authenticated;

-- Crea sempre un profilo free dopo auth.users. Il ruolo non viene letto dai
-- metadata e una promozione va effettuata separatamente da un amministratore.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.users_profile (id, display_name, role)
  values (
    new.id,
    nullif(trim(coalesce(new.raw_user_meta_data ->> 'display_name', '')), ''),
    'free_user'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

revoke all on function public.handle_new_auth_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

create table public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null references public.users_profile(id) on delete restrict,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  request_id uuid,
  ip_address inet,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  constraint admin_audit_action_not_blank check (length(trim(action)) > 0),
  constraint admin_audit_entity_not_blank check (length(trim(entity_type)) > 0)
);

create index admin_audit_actor_created_idx
  on public.admin_audit_logs (admin_user_id, created_at desc);
create index admin_audit_entity_idx
  on public.admin_audit_logs (entity_type, entity_id, created_at desc);
create index admin_audit_request_idx
  on public.admin_audit_logs (request_id)
  where request_id is not null;

alter table public.admin_audit_logs enable row level security;

comment on table public.admin_audit_logs is
  'Log append-only delle azioni amministrative. Nessuna policy UPDATE o DELETE viene concessa.';
comment on column public.admin_audit_logs.ip_address is
  'Valorizzare soltanto da un confine server fidato; non accettare direttamente dal browser.';
