# Public Reader Hardening Tests — P54

## Scope

Punto 54 rafforza audit e test dei public reader no-route.

Non esegue:

- creazione route pubbliche;
- esposizione pubblica;
- cambio visibility;
- DB write;
- provider/import;
- Apify;
- deploy;
- Production.

## Hardened checks

| Check | Purpose | Expected |
|---|---|---|
| No admin reader import | Evitare fallback verso dati admin. | `admin_reader_imported=false` |
| No `service_role` | Evitare bypass RLS o accessi admin. | `service_role_used=false` |
| No write operations | Garantire reader solo SELECT. | `write_operation_detected=false` |
| No provider fetch | Evitare chiamate provider da public reader. | `provider_fetch_detected=false` |
| Visibility public only | Garantire filtro pubblico esplicito. | `unsafe_visibility_filter_detected=false` |
| No `private_admin` fallback | Impedire leak dei dati staging/admin. | `private_admin_publicly_exposed=false` |
| No route wiring | Reader non collegato a `app/`, `pages/`, `components/`. | `public_reader_route_wiring_detected=false` |
| Dry-run returns 0/0/0 | Dataset corrente `private_admin` non deve apparire. | `public_competitions_count=0`, `public_teams_count=0`, `public_standings_count=0` |
| Bundle not found/empty | Nessun bundle pubblico per `manual-serie-a`. | `public_bundle_status=not_found` o `empty` |

## Current dataset expectation

Il dataset reale staging contiene:

- competitions: `1`;
- teams: `2`;
- standings: `2`;
- visibility corrente: `private_admin`.

Il public reader deve quindi vedere:

- `public_competitions_count=0`;
- `public_teams_count=0`;
- `public_standings_count=0`;
- `public_bundle_status=not_found` oppure `empty`.

Se il dry-run vede `1/2/2`, è un leak o un filtro visibility errato.

## Failure policy

Il Punto 54 deve fallire se:

- audit trova route wiring;
- dry-run vede dati `private_admin`;
- visibility filter non è esplicito;
- appare `service_role`;
- appare fetch/provider client;
- appare una write operation;
- appare fallback verso `private_admin`.

## P54 result

- `audit_pass=true`
- `violations_count=0`
- `dry_run_assertions_pass=true`
- `public_competitions_count=0`
- `public_teams_count=0`
- `public_standings_count=0`
- `public_bundle_status=not_found`
- `public_reader_route_wiring_detected=false`
- `private_admin_publicly_exposed=false`
- `visibility_changed=false`
- `point_54_db_write=false`
