# Manual Import Point 117 Decision — From P116

## P116 result

P116 ha aggiornato il sito pubblico con la nuova palette del logo e una direzione visuale Football Manager / dashboard calcistica premium.

## Current markers

- `point_116_site_brand_refresh_completed=true`
- `site_brand_refresh_ready=true`
- `code_change=true`
- `brand_palette_applied=true`
- `football_manager_style_applied=true`
- `homepage_refreshed=true`
- `manifesto_refreshed=true`
- `rubriche_refreshed=true`
- `competitions_refreshed=true`
- `navbar_footer_refreshed=true`
- `logo_asset_used=true`
- `logo_asset_pending=false`
- `public_routes_verified=true`
- `public_data_visible=true`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `site_integration_done=false`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`

## P117 options

### A. P117 — Preview brand verification

Obiettivo: verificare local/preview public routes, mobile, palette, dati visibili, nessuna regressione.

### B. P117 — Brand refresh iteration

Obiettivo: secondo pass di rifinitura UI dopo review visiva.

### C. P117 — Production release gate for brand refresh

Obiettivo: solo dopo verifica preview completa, preparare gate no-apply per merge/deploy.

### D. P117 — Substack creation with real URL

Obiettivo: creare Substack e fornire URL reale verificato.

## Recommended decision

Decisione consigliata:

`p117_recommended=preview_brand_verification_or_brand_refresh_iteration`

Serve una verifica Preview/locale visiva prima di qualsiasi release.

## Not authorized by P116

- merge su main;
- deploy;
- Production;
- DB write;
- provider/import;
- Apify;
- Substack integration;
- pubblicazione social/Substack/newsletter.
