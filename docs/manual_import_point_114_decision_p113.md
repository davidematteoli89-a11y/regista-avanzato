# Manual Import Point 114 Decision — From P113

## Decision status

P113 prepara l’esecuzione manuale degli asset, ma non genera asset reali perché non sono stati forniti link Canva/Figma o export.

## Markers

- `point_113_manual_asset_creation_execution_completed=true`
- `manual_asset_creation_execution_ready=true`
- `assets_generated=false`
- `asset_execution_status=prepared_no_assets`
- `canva_links_available=false`
- `exports_available=false`
- `priority_1_assets_ready=false`
- `publication_ready=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `substack_url_real=`
- `social_auto_published=false`
- `substack_auto_published=false`
- `p114_recommended=manual_asset_creation_with_links_or_substack_creation_with_real_url`
- `no_code_change=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`

## Recommended P114 options

### Option A — Manual asset creation with real links

Proceed when at least one of these is available:

- real Canva/Figma editable link;
- real exported PNG/JPG/MP4;
- manual review result;
- rights confirmation.

Expected status if partial:

- `assets_generated=partial_manual`
- `canva_links_available=true/partial`
- `exports_available=true/partial`
- `priority_1_assets_ready=false` unless all priority 1 assets are complete.

### Option B — Substack creation with real URL

Proceed when the user provides a real, verified Substack URL.

Expected status:

- `substack_created=true`
- `substack_url_status=verified`
- `substack_url_real=<verified_real_url>`

Do not integrate the URL into the site until a dedicated integration gate is explicitly authorized.

## Not authorized by P113

- automatic asset generation;
- Canva/Figma API creation;
- social publishing;
- Substack publishing;
- newsletter sending;
- site integration;
- code changes;
- merge;
- deploy;
- Production changes;
- DB writes;
- provider/import activation;
- Apify activation.
