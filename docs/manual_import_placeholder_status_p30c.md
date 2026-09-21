# Punto 30-C — Manual import placeholder status

I valori reali di schema non sono ancora stati forniti. I placeholder non possono essere risolti senza nomi reali di tabelle, colonne, relazioni, RLS/policy e view presenti in Supabase staging.

| Placeholder | Required real value | Current status | Blocking reason | Can be resolved now |
|---|---|---|---|---|
| competitions table lookup | real competitions table name | uncollected | Valore reale non fornito | false |
| competitions internal id | internal competition id column | uncollected | Valore reale non fornito | false |
| competitions provider/external id | provider/external competition id column or `not_present` | uncollected | Valore reale non fornito | false |
| competitions display fields | name/slug/country/category/status columns | uncollected | Valori reali non forniti | false |
| competitions timestamps | created_at/updated_at columns or `not_present` | uncollected | Valori reali non forniti | false |
| competitions RLS/policy | RLS enabled + SELECT policy details | uncollected | Valori reali non forniti | false |
| teams table lookup | real teams table name | uncollected | Valore reale non fornito | false |
| teams internal id | internal team id column | uncollected | Valore reale non fornito | false |
| teams provider/external id | provider/external team id column or `not_present` | uncollected | Valore reale non fornito | false |
| teams competition relation | competition relation column/FK | uncollected | Valore reale non fornito | false |
| teams display/timestamps | name/slug/country/created_at/updated_at columns | uncollected | Valori reali non forniti | false |
| teams RLS/policy | RLS enabled + SELECT policy details | uncollected | Valori reali non forniti | false |
| standings table lookup | real standings table name | uncollected | Valore reale non fornito | false |
| standings FK/ref columns | competition id/ref + team id/ref columns | uncollected | Valori reali non forniti | false |
| standings metric columns | season/round/rank/played/wins/draws/losses/goals/points columns | uncollected | Valori reali non forniti | false |
| standings RLS/policy | RLS enabled + SELECT policy details | uncollected | Valori reali non forniti | false |

## Current outcome

- placeholders_resolved_count=0
- placeholders_uncollected_count=16
- ready_for_migration_draft=false
- next_write_allowed=false

