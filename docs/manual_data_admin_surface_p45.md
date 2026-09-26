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
