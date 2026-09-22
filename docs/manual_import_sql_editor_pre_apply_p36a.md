# Punto 36-A — SQL Editor pre-apply

## Stato

- explicit_authorization_received: `true`
- apply_channel: `Supabase SQL Editor manuale`
- migration_file: `supabase/migrations/20260922120000_manual_import_read_only_views.sql`
- staging_only: `true`
- production_excluded: `true`
- provider_import_off: `true`
- apify_off: `true`
- deploy: `false`
- db_push_reset: `false`
- service_role_used: `false`
- preflight_passed: `true`

## Preflight locale

La migration contiene solo:

- `CREATE OR REPLACE VIEW`;
- `SELECT` espliciti;
- le 3 view autorizzate:
  - `manual_import_competitions_lookup`;
  - `manual_import_teams_lookup`;
  - `manual_import_standings_lookup`.

Non contiene:

- `INSERT`, `UPDATE`, `DELETE`, `UPSERT`, `TRUNCATE`;
- `DROP TABLE`;
- `ALTER TABLE` distruttivi;
- trigger;
- funzioni write;
- provider/fetch;
- `service_role`;
- istruzioni Production operative.

## Blocco operativo

L’apply non è stato eseguito da agente perché richiede accesso manuale alla Supabase Dashboard/SQL Editor del progetto staging. L’agente non può confermare visivamente il progetto aperto né premere Run nella sessione utente.

