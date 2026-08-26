-- Regista Avanzato — migrazione 0005: quota mensile ricerca avanzata.
-- La funzione incrementa esclusivamente la ricerca advanced; le normali view
-- di statistiche, profili, match, highlight e Video Radar non la chiamano.

create or replace function public.increment_user_search_usage()
returns table (
  allowed boolean,
  used_count smallint,
  search_limit smallint,
  remaining smallint,
  period_start date,
  period_end date,
  incremented boolean,
  reason text
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  current_user_id uuid := auth.uid();
  current_period_start date := date_trunc('month', timezone('UTC', now()))::date;
  current_period_end date;
  current_count smallint;
begin
  if current_user_id is null then
    raise exception using
      errcode = '42501',
      message = 'Authentication required';
  end if;

  if not exists (
    select 1
    from public.users_profile profile
    where profile.id = current_user_id
      and profile.status = 'approved'
  ) then
    raise exception using
      errcode = '42501',
      message = 'Active profile required';
  end if;

  current_period_end := (current_period_start + interval '1 month - 1 day')::date;

  insert into public.user_search_usage (
    user_id,
    period_start,
    period_end,
    advanced_search_count,
    last_search_at
  )
  values (
    current_user_id,
    current_period_start,
    current_period_end,
    1,
    now()
  )
  on conflict on constraint user_search_usage_user_id_period_start_key do update
  set
    advanced_search_count = public.user_search_usage.advanced_search_count + 1,
    last_search_at = now()
  where public.user_search_usage.advanced_search_count < 3
  returning advanced_search_count into current_count;

  if found then
    return query select
      true,
      current_count,
      3::smallint,
      greatest(0, 3 - current_count)::smallint,
      current_period_start,
      current_period_end,
      true,
      'Ricerca avanzata autorizzata e quota aggiornata.'::text;
    return;
  end if;

  select usage.advanced_search_count
  into current_count
  from public.user_search_usage usage
  where usage.user_id = current_user_id
    and usage.period_start = current_period_start;

  return query select
    false,
    coalesce(current_count, 3::smallint),
    3::smallint,
    0::smallint,
    current_period_start,
    current_period_end,
    false,
    'Hai usato le 3 ricerche gratuite del mese.'::text;
end;
$$;

create or replace function public.get_user_search_usage_status()
returns table (
  allowed boolean,
  used_count smallint,
  search_limit smallint,
  remaining smallint,
  period_start date,
  period_end date,
  reason text
)
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
declare
  current_user_id uuid := auth.uid();
  current_period_start date := date_trunc('month', timezone('UTC', now()))::date;
  current_period_end date;
  current_count smallint;
begin
  if current_user_id is null then
    raise exception using
      errcode = '42501',
      message = 'Authentication required';
  end if;

  if not exists (
    select 1
    from public.users_profile profile
    where profile.id = current_user_id
      and profile.status = 'approved'
  ) then
    raise exception using
      errcode = '42501',
      message = 'Active profile required';
  end if;

  current_period_end := (current_period_start + interval '1 month - 1 day')::date;

  select usage.advanced_search_count
  into current_count
  from public.user_search_usage usage
  where usage.user_id = current_user_id
    and usage.period_start = current_period_start;

  current_count := coalesce(current_count, 0::smallint);

  return query select
    current_count < 3,
    current_count,
    3::smallint,
    greatest(0, 3 - current_count)::smallint,
    current_period_start,
    current_period_end,
    case
      when current_count < 3 then 'Quota ricerca avanzata disponibile.'
      else 'Hai usato le 3 ricerche gratuite del mese.'
    end::text;
end;
$$;

revoke all on function public.increment_user_search_usage() from public, anon, authenticated;
revoke all on function public.get_user_search_usage_status() from public, anon, authenticated;
grant execute on function public.increment_user_search_usage() to authenticated;
grant execute on function public.get_user_search_usage_status() to authenticated;

comment on function public.increment_user_search_usage() is
  'Incremento atomico della sola ricerca advanced. Limite hard 3 per utente e mese UTC.';
