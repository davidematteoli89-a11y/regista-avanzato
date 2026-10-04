# Public Data Promotion SQL Manual Pack — P61

## Scope

Punto 61 prepara un SQL/manual pack **no-apply**.

- Nessuna promotion eseguita.
- Nessun SQL eseguito.
- Nessun cambio `visibility`.
- Nessuna DB write.
- Nessun provider/import.
- Nessun deploy.
- Nessuna Production.
- I dati `private_admin` restano non pubblici.

## Candidate

| Entity | Identifier | Expected count | Current visibility | Target visibility |
|---|---|---:|---|---|
| competition | `manual-serie-a` | 1 | `private_admin` | `public` |
| teams linked | `manual-serie-a` | 2 | `private_admin` | `public` |
| standings linked | `manual-serie-a` | 2 | `private_admin` | `public` |

## Authorization gate

La promotion reale **NON** è autorizzata dal Punto 61.

La promotion reale richiede questa frase esplicita separata:

```text
Autorizzo il Punto 62: esegui la promotion a public della fixture manual-serie-a in Supabase staging, includendo competition, teams e standings, senza Production, senza provider/import, senza deploy.
```

Qualsiasi frase generica come:

- procedi
- vai
- continua
- ok
- fallo

non autorizza la DB write.

## Manual execution conditions

Prima di eseguire in futuro:

- confermare ambiente Supabase staging;
- confermare Production non selezionata;
- confermare scope 1/2/2;
- confermare rollback pronto;
- confermare post-verification pronta;
- confermare no provider/import;
- confermare no deploy;
- confermare autorizzazione esplicita completa.

## Promotion SQL — NO APPLY

```sql
-- NO-APPLY PACK ONLY — DO NOT RUN IN P61
-- Future explicit authorization required.
-- Target: Supabase staging only.
-- Production: forbidden.
-- Scope: manual-serie-a, expected 1 competition / 2 teams / 2 standings.

-- 1) Resolve candidate competition
-- SELECT id, slug, internal_key, api_competition_id, name, visibility
-- FROM competitions
-- WHERE slug = 'manual-serie-a'
--    OR internal_key = 'manual-serie-a'
--    OR api_competition_id = 'manual-serie-a';

-- 2) Promote competition
-- UPDATE competitions
-- SET visibility = 'public_free', updated_at = NOW()
-- WHERE (slug = 'manual-serie-a'
--    OR internal_key = 'manual-serie-a'
--    OR api_competition_id = 'manual-serie-a')
--   AND visibility = 'private_admin';

-- 3) Promote linked teams
-- UPDATE teams
-- SET visibility = 'public_free', updated_at = NOW()
-- WHERE competition_id = (
--   SELECT id
--   FROM competitions
--   WHERE slug = 'manual-serie-a'
--      OR internal_key = 'manual-serie-a'
--      OR api_competition_id = 'manual-serie-a'
--   LIMIT 1
-- )
-- AND visibility = 'private_admin';

-- 4) Promote linked standings
-- UPDATE standings
-- SET visibility = 'public_free', updated_at = NOW()
-- WHERE competition_id = (
--   SELECT id
--   FROM competitions
--   WHERE slug = 'manual-serie-a'
--      OR internal_key = 'manual-serie-a'
--      OR api_competition_id = 'manual-serie-a'
--   LIMIT 1
-- )
-- AND visibility = 'private_admin';
```

## Rollback SQL — NO APPLY

```sql
-- NO-APPLY ROLLBACK PACK ONLY — DO NOT RUN IN P61
-- Future explicit rollback authorization required.
-- Target: Supabase staging only.
-- Production: forbidden.
-- Rollback order: standings → teams → competition.

-- 1) Rollback linked standings
-- UPDATE standings
-- SET visibility = 'private_admin', updated_at = NOW()
-- WHERE competition_id = (
--   SELECT id
--   FROM competitions
--   WHERE slug = 'manual-serie-a'
--      OR internal_key = 'manual-serie-a'
--      OR api_competition_id = 'manual-serie-a'
--   LIMIT 1
-- )
-- AND visibility = 'public_free';

-- 2) Rollback linked teams
-- UPDATE teams
-- SET visibility = 'private_admin', updated_at = NOW()
-- WHERE competition_id = (
--   SELECT id
--   FROM competitions
--   WHERE slug = 'manual-serie-a'
--      OR internal_key = 'manual-serie-a'
--      OR api_competition_id = 'manual-serie-a'
--   LIMIT 1
-- )
-- AND visibility = 'public_free';

-- 3) Rollback competition
-- UPDATE competitions
-- SET visibility = 'private_admin', updated_at = NOW()
-- WHERE (slug = 'manual-serie-a'
--    OR internal_key = 'manual-serie-a'
--    OR api_competition_id = 'manual-serie-a')
--   AND visibility = 'public_free';
```

## Post-verification SQL — NO APPLY

```sql
-- NO-APPLY VERIFICATION PACK ONLY — READ-ONLY WHEN AUTHORIZED IN FUTURE
-- Intended for post-promotion verification only.
-- Do not run as part of P61.

-- Expected after future promotion:
-- competition public count = 1
-- linked teams public count = 2
-- linked standings public count = 2

-- SELECT count(*) AS public_competitions_count
-- FROM competitions
-- WHERE (slug = 'manual-serie-a'
--    OR internal_key = 'manual-serie-a'
--    OR api_competition_id = 'manual-serie-a')
--   AND visibility = 'public_free';

-- SELECT count(*) AS public_teams_count
-- FROM teams
-- WHERE competition_id = (
--   SELECT id
--   FROM competitions
--   WHERE slug = 'manual-serie-a'
--      OR internal_key = 'manual-serie-a'
--      OR api_competition_id = 'manual-serie-a'
--   LIMIT 1
-- )
-- AND visibility = 'public_free';

-- SELECT count(*) AS public_standings_count
-- FROM standings
-- WHERE competition_id = (
--   SELECT id
--   FROM competitions
--   WHERE slug = 'manual-serie-a'
--      OR internal_key = 'manual-serie-a'
--      OR api_competition_id = 'manual-serie-a'
--   LIMIT 1
-- )
-- AND visibility = 'public_free';
```

## Manual browser verification after future promotion

After future explicitly authorized promotion:

- `/competitions` should show the public competition.
- `/competitions/manual-serie-a` should show teams and standings.
- No extra `private_admin` data should appear.
- No admin links should appear.
- No debug/raw payload should appear.
- No operational buttons should appear.

## P61 result markers

- `point_61_public_data_promotion_sql_manual_pack_created=true`
- `promotion_sql_pack_mode=no_apply`
- `promotion_sql_outline_prepared=true`
- `rollback_sql_outline_prepared=true`
- `post_verification_sql_outline_prepared=true`
- `public_data_promotion_executed=false`
- `real_sql_executed=false`
- `db_write=false`
- `visibility_changed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `requires_explicit_p62_authorization=true`
- `generic_proceed_authorizes_write=false`

## P62 authorization review result

Punto 62 ha rivisto il pack P61 senza applicarlo.

- `point_62_public_data_promotion_authorization_review_completed=true`
- `public_data_promotion_mode=authorization_review_no_write`
- `promotion_candidate=manual-serie-a`
- `expected_promotion_competitions_count=1`
- `expected_promotion_teams_count=2`
- `expected_promotion_standings_count=2`
- `explicit_authorization_required=true`
- `generic_proceed_authorizes_write=false`
- `promotion_executed=false`
- `real_sql_executed=false`
- `db_write=false`
- `visibility_changed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `service_role_used=false`

La prossima scrittura reale su staging richiede una nuova autorizzazione esplicita e completa per Punto 63. Un generico “procedi” non autorizza promotion, SQL reale, DB write o cambio visibility.

## P63 final pre-apply checklist

Punto 63 ha confermato il pack come pronto per una futura apply, ma ancora senza applicazione.

- `point_63_public_data_promotion_final_pre_apply_checklist_completed=true`
- `public_data_promotion_mode=final_pre_apply_no_write`
- `promotion_candidate=manual-serie-a`
- `expected_promotion_competitions_count=1`
- `expected_promotion_teams_count=2`
- `expected_promotion_standings_count=2`
- `current_public_competitions_count=0`
- `current_public_teams_count=0`
- `current_public_standings_count=0`
- `current_public_bundle_status=not_found`
- `public_routes_current_state=empty_not_found`
- `explicit_authorization_required=true`
- `generic_proceed_authorizes_write=false`
- `promotion_executed=false`
- `real_sql_executed=false`
- `db_write=false`
- `visibility_changed=false`

La prossima scrittura reale richiede autorizzazione esplicita completa per Punto 64.
