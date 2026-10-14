# Manual Import Point 118 Decision — From P117

## P117 result

P117 ha rimosso i residui verdi della vecchia identità visiva nello scope pubblico e ha riallineato il sito alla palette logo blu/indaco/viola.

## Current markers

- `point_117_brand_refresh_green_cleanup_completed=true`
- `brand_green_cleanup_ready=true`
- `code_change=true`
- `green_leftovers_removed=true`
- `chi_siamo_green_fixed=true`
- `account_green_fixed=true`
- `metodo_green_fixed=true`
- `public_routes_verified=true`
- `public_data_visible=true`
- `legacy_marker_false_negative=true`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `site_integration_done=false`
- `publication_ready=false`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`

## P118 options

### A. P118 — Preview brand verification

Obiettivo: verificare visivamente tutto il sito dopo cleanup, mobile/tablet/desktop, prima di release.

### B. P118 — Legacy marker update

Obiettivo: aggiornare il dry-run full-public-path-verification per riconoscere il nuovo markup P116/P117.

### C. P118 — Production release gate for brand refresh

Obiettivo: solo dopo verifica preview completa.

### D. P118 — Brand refresh iteration

Obiettivo: ulteriori rifiniture UI se dalla review emergono altri problemi.

## Recommended decision

Decisione consigliata:

`p118_recommended=preview_brand_verification_or_legacy_marker_update`

A se il cleanup è visivamente corretto. B se il blocco principale resta solo il marker legacy del test.

## Not authorized by P117

- merge;
- deploy;
- Production;
- DB write;
- provider/import;
- Apify;
- Substack integration;
- pubblicazione social/Substack/newsletter.
