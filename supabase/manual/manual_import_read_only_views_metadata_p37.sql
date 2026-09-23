-- Punto 37 — Manual import read-only views metadata verification
-- READ ONLY / SELECT ONLY
-- Use manually only in Supabase SQL Editor for STAGING "Regista Avanzato".
-- Do not run in Production, OS-Business, Fantacalcio, or Quiz Live.
-- No provider/import activation. No data writes.

select
  table_schema,
  table_name,
  table_type
from information_schema.views
where table_schema = 'public'
  and table_name in (
    'manual_import_competitions_lookup',
    'manual_import_teams_lookup',
    'manual_import_standings_lookup'
  )
order by table_name;

select
  table_schema,
  table_name,
  column_name,
  ordinal_position,
  data_type,
  is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name in (
    'manual_import_competitions_lookup',
    'manual_import_teams_lookup',
    'manual_import_standings_lookup'
  )
order by table_name, ordinal_position;
