# Public Path Navigation Polish — P70

## Scope

Punto 70 migliora il percorso pubblico locale:

```text
Home -> Competizioni -> Dettaglio competizione -> Competizioni
```

Questo punto mantiene la Preview protetta e non esegue deploy.

- Nessun deploy manuale.
- Nessuna Production.
- Nessuna modifica Vercel Authentication.
- Nessuna modifica configurazione Vercel.
- Nessuna DB write.
- Nessun rollback.
- Nessun cambio visibility.
- Nessun provider/import.
- Nessun Apify.
- Nessun service role.

## UI changes

| Area | Change | Safety |
|---|---|---|
| Homepage | CTA primaria verso `/competitions` | Link statico pubblico, nessun dato privato hardcoded |
| Public navigation | Link `Home` esplicito e `Competizioni` in evidenza nella sequenza | Nessun link admin |
| `/competitions` | Link di ritorno a Home sopra l’header | Nessuna query aggiuntiva |
| `/competitions/manual-serie-a` | Link di ritorno a `/competitions` | Nessuna query aggiuntiva |

## Local verification result

- `point_70_homepage_navigation_polish_completed=true`
- `public_path_verification_mode=local_no_auth_http`
- `home_links_competitions=true`
- `competitions_links_detail=true`
- `competition_detail_links_back=true`
- `competitions_page_state=data_visible`
- `competition_detail_state=data_visible`
- `public_competitions_count=1`
- `public_teams_count=2`
- `public_standings_count=2`
- `public_bundle_status=ready`

## Safety markers

- `private_admin_publicly_exposed=false`
- `public_routes_admin_links_visible=false`
- `public_routes_debug_payload_visible=false`
- `public_routes_operational_buttons=false`
- `visibility_changed=false`
- `point_70_db_write=false`
- `rollback_executed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `service_role_used=false`

## Recommended next step

Punto 71 consigliato: rifinire copy/SEO metadata delle route pubbliche oppure pianificare una verifica Preview autenticata, mantenendo Vercel Authentication attiva.
