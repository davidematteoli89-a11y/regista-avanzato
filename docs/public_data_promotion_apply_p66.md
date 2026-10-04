# Public Data Promotion Apply — P66

## Scope

Punto 66 completa la promotion manuale della fixture `manual-serie-a` in Supabase staging.

Autorizzazione esplicita ricevuta:

```text
Autorizzo il Punto 66: esegui la promotion a public della fixture manual-serie-a in Supabase staging, includendo competition, teams e standings, senza Production, senza provider/import, senza deploy.
```

## Environment

- Ambiente: Supabase staging “Regista Avanzato”.
- Production: non toccata.
- Deploy: non eseguito.
- Provider/import: non attivati.
- Apify: off.
- Service role lato app: non usato.

## Visibility correction

Il primo tentativo con `visibility='public'` è fallito perché l'enum reale `content_visibility` non contiene `public`.

Target corretto:

```text
public_free
```

## Apply result

Applicazione manuale eseguita dall'utente in Supabase SQL Editor staging con:

- `supabase/manual/public_data_promotion_apply_p66.sql`

Output read-only post-apply:

| Entity | Visibility | Count |
|---|---|---:|
| competitions | `public_free` | 1 |
| teams | `public_free` | 2 |
| standings | `public_free` | 2 |

Scope autorizzato rispettato:

- 1 competition;
- 2 teams;
- 2 standings;
- `manual-serie-a`;
- `private_admin -> public_free`.

## Result markers

- `point_66_public_data_promotion_apply_completed=true`
- `public_data_promotion_mode=real_apply_staging_only`
- `corrected_visibility=public_free`
- `old_invalid_visibility=public`
- `enum_verified=true`
- `authorization_phrase_received=true`
- `promotion_candidate=manual-serie-a`
- `promotion_executed=true`
- `real_sql_executed=true`
- `visibility_changed=true`
- `db_write=true`
- `db_write_scope=manual-serie-a_competition_teams_standings`
- `updated_competitions_count=1`
- `updated_teams_count=2`
- `updated_standings_count=2`
- `public_competitions_count=1`
- `public_teams_count=2`
- `public_standings_count=2`
- `public_bundle_status=ready`
- `public_routes_current_state=data_visible`
- `private_admin_publicly_exposed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `service_role_used=false`
- `rollback_file_created=true`
- `rollback_executed=false`

## Verification note

La verifica live Supabase è stata eseguita manualmente dall'utente via SQL Editor staging. Gli script locali riportano i marker post-apply e non eseguono ulteriori DB write.
