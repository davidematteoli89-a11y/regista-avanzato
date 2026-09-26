# Punto 44 — Manual data readers plan

## Scope

Piano tecnico per futuri reader read-only dei dati manuali in staging.

Regole:

- read-only;
- usare view `manual_import_*_lookup`;
- no `service_role`;
- no Supabase admin client;
- no write;
- no provider;
- no Server Action write;
- dati admin only inizialmente perché `visibility=private_admin`.

## Reader candidati

| Reader | Source | Output | Auth/visibility | Status |
| --- | --- | --- | --- | --- |
| `getManualCompetitionsReadOnly` | `manual_import_competitions_lookup` | competitions list | admin only initially | planned |
| `getManualCompetitionDetailReadOnly` | `manual_import_competitions_lookup` | single competition by slug/internal_key | admin only initially | planned |
| `getManualTeamsByCompetitionReadOnly` | `manual_import_teams_lookup` | teams list | admin only initially | planned |
| `getManualStandingsByCompetitionReadOnly` | `manual_import_standings_lookup` + teams lookup | standings table | admin only initially | planned |

## Client strategy

Opzione preferita:

- usare un client server-side safe con sessione reale e RLS;
- nessun `service_role`;
- nessun insert/update/delete/upsert;
- query solo `select`;
- errori sanificati;
- nessun output di URL/key/env.

## Reader output minimo

Competition:

- id;
- internal_key;
- api_competition_id;
- slug;
- name;
- country;
- season;
- status;
- visibility.

Team:

- id;
- competition_id;
- api_team_id;
- slug;
- name;
- short_name;
- country;
- status;
- visibility.

Standing:

- competition_id;
- team_id;
- team display name;
- rank;
- played;
- won;
- drawn;
- lost;
- goals_for;
- goals_against;
- goal_difference;
- points;
- status;
- visibility.

## Readiness gate

Prima di implementare i reader:

- confermare route admin target;
- confermare `requireAdmin` o equivalente;
- confermare nessuna esposizione pubblica per `private_admin`;
- confermare che le view staging esistano;
- confermare che il fallback UI sia empty/error safe;
- rieseguire lint/typecheck/build.
