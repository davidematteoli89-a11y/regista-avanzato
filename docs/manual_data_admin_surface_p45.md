# Punto 45 — Admin read-only surface for manual data

## Scope

Punto 45 implementa una superficie admin read-only per consumare dati manuali staging.

Regole confermate:

- dati manuali staging;
- nessuna nuova scrittura DB;
- nessun provider/import;
- nessun Apify;
- nessun deploy;
- nessuna Production;
- nessun `service_role`;
- nessuna Server Action write;
- nessun bottone Run/Import/Execute/Sync/Save to DB;
- dati `private_admin` non pubblici.

## Implemented routes

| Route | Purpose | Read-only | Public exposure | Notes |
| --- | --- | --- | --- | --- |
| `/admin/data` | hub admin manual data | yes | none | link alla lista manual competitions |
| `/admin/data/competitions` | lista manual competitions | yes | none | legge via reader read-only |
| `/admin/data/competitions/[slug]` | dettaglio competition, teams, standings | yes | none | usa slug/internal_key/api_competition_id |
| `/admin/imports` | link verso manual competitions | yes | none | nessun bottone operativo |

## Implemented readers

| Reader | Source | Writes? | Provider? | Notes |
| --- | --- | --- | --- | --- |
| `getManualCompetitionsReadOnly` | `manual_import_competitions_lookup` | no | no | lista competitions |
| `getManualCompetitionBySlugReadOnly` | `manual_import_competitions_lookup` | no | no | dettaglio by slug/internal_key/api_competition_id |
| `getManualTeamsByCompetitionReadOnly` | `manual_import_teams_lookup` | no | no | teams per competition |
| `getManualStandingsByCompetitionReadOnly` | `manual_import_standings_lookup` + teams lookup | no | no | standings con nome team |

## Displayed data

| Entity | Expected count | Display surface | Status |
| --- | ---: | --- | --- |
| competitions | 1 | `/admin/data/competitions` | implemented |
| teams | 2 | `/admin/data/competitions/[slug]` | implemented |
| standings | 2 | `/admin/data/competitions/[slug]` | implemented |

## Safety

- no service_role;
- no Supabase admin client;
- no Server Action write;
- no write buttons;
- no provider fetch;
- no public exposure;
- no deploy;
- Production untouched.

## Notes

The reader uses the existing server Supabase client tied to the user session and RLS. If Supabase is not configured or RLS blocks access, the UI shows a safe read-only warning/empty state without exposing secrets.

## Follow-up Punto 46-B

La verifica browser/admin real session è stata tentata ma resta pending:

- browser_automation_available: `false`;
- admin_session_available: `false`;
- browser_admin_verification_result: `pending_no_admin_session`;
- controllo HTTP locale: route admin redirectano a login per utente non autenticato;
- nessuna nuova scrittura DB;
- nessun provider/import;
- nessuna esposizione pubblica.
## Stato verifica browser/admin reale

Punto 46-C ha ritentato la verifica browser/admin real session della superficie creata nel Punto 45.

Risultato:

- point_46c_real_admin_session_verification_completed: `false`;
- browser_admin_verification_result: `pending_no_admin_session`;
- verification_channel: `unavailable`;
- admin_session_available: `false`;
- route browser verified: `false`.

La superficie resta compilata e read-only, ma non è ancora stata verificata con sessione admin reale. Nessuna nuova scrittura DB, nessun provider/import, nessun deploy e nessuna Production nel Punto 46-C.
