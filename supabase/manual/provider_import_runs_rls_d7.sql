-- Regista Avanzato — D.7 provider_import_runs RLS/readiness checks.
-- Copiare nel Supabase SQL Editor SOLO del progetto staging "Regista Avanzato".
-- File read-only: contiene esclusivamente SELECT.
-- Non usare su Production. Non usare db push/reset.
-- Non attiva provider, Apify o import.

-- 1. Verifica tabella provider_import_runs.
select to_regclass('public.provider_import_runs') as provider_import_runs_table;

-- 2. Verifica RLS attiva.
select c.relname, c.relrowsecurity
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname = 'provider_import_runs';

-- 3. Verifica policy presenti.
select policyname, permissive, roles, cmd
from pg_policies
where schemaname = 'public'
  and tablename = 'provider_import_runs'
order by policyname;

-- 4. Verifica grants coerenti.
select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'provider_import_runs'
order by grantee, privilege_type;

-- 5. Verifica colonne provider_import_runs.
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name = 'provider_import_runs'
order by ordinal_position;

-- 6. Verifica colonne import_run_id / batch_id sui log collegati.
select table_name, column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name in ('provider_import_logs', 'api_usage_logs', 'import_logs')
  and column_name in ('import_run_id', 'batch_id')
order by table_name, column_name;

-- 7. Verifica indici principali.
select tablename, indexname
from pg_indexes
where schemaname = 'public'
  and tablename in ('provider_import_runs', 'provider_import_logs', 'api_usage_logs', 'import_logs')
  and (
    indexname like '%provider_import_runs%'
    or indexname like '%import_run%'
    or indexname like '%batch%'
  )
order by tablename, indexname;

-- 8. Verifica nessuna riga reale inserita.
select count(*) as provider_import_runs_count
from public.provider_import_runs;

-- 9. Verifica provider esterni ancora off.
select provider_key, is_active
from public.data_providers
where provider_key in ('stable_provider', 'the_stats_api', 'api_football', 'apify_sofascore')
order by provider_key;

-- 10. Verifica import ancora disabilitati.
select c.slug, pc.import_enabled
from public.competitions c
left join public.provider_competition_config pc on pc.competition_id = c.id
where pc.import_enabled = true
limit 20;

-- 11. Verifica assenza policy DELETE.
select policyname, cmd
from pg_policies
where schemaname = 'public'
  and tablename = 'provider_import_runs'
  and cmd = 'DELETE';

-- 12. Verifica helper RBAC nel contesto SQL Editor.
-- Nel SQL Editor auth.uid() di solito è null: is_admin/is_editor_or_admin dovrebbero risultare false.
select auth.uid() as current_auth_uid, public.is_admin() as is_admin, public.is_editor_or_admin() as is_editor_or_admin;
