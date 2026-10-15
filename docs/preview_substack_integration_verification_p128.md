# Preview Substack Integration Verification — P128

## Scope

P128 verifica l'integrazione Substack su Preview/locale. Non modifica codice UI, non esegue merge o deploy, non modifica Production, non scrive nel database, non attiva provider/import o Apify e non pubblica newsletter, articoli o contenuti social.

## Current baseline

- Production domain: `https://regista-avanzato-rouge.vercel.app`
- P127 commit: `32f9397d9a720f433d1483bc620085cdc5f3ac1c`
- Substack real URL: `https://registaavanzato.substack.com/`
- P127 integration status: navbar, footer, homepage and shared CTA integrated on `preview`
- `brand_refresh_production_closed=true`
- Preview deployment for the P127 commit: READY (`dpl_466BumAWu1FVGjqohcj2ohufBVvb`)
- Remote protected content verification: unavailable because no authorized Vercel session was available; no insecure workaround was attempted
- Verification source: local no-auth HTTP checks plus static responsive audit

## Substack URL verification

- Real URL: `https://registaavanzato.substack.com/`
- URL centralized in `lib/substack/publicSubstack.ts`
- Public references use the centralized URL
- External links use `target="_blank"` and `rel="noopener noreferrer"`
- `substack_url_consistent=true`
- `external_link_attrs_safe=true`
- `placeholder_substack_urls_found=false`

## Routes verified

| Route | Status | Substack link visible | Data visible | Issues |
|---|---:|---|---|---|
| `/` | 200 | yes | static public content | none |
| `/manifesto` | 200 | yes | public editorial content | none |
| `/rubriche` | 200 | yes | public editorial content | none |
| `/competitions` | 200 | yes | competition visible | none |
| `/competitions/manual-serie-a` | 200 | yes | competition, teams and standings visible | none |
| `/chi-siamo` | 200 | yes | static public content | none |
| `/account` | 200 | yes | public account page | none |
| `/metodo` | 200 | yes | static public content | none |

Every local route check also confirmed the brand and logo, the correct Substack URL, safe external-link attributes, no `private_admin` marker, no admin link, no debug/raw payload, no operational write buttons and no legacy green residue.

## CTA verification

- Navbar newsletter link: verified
- Footer Substack link: verified
- Homepage CTA: verified
- Shared `NewsletterCTA` and `SubstackCTA`: verified
- Copy is consistent with the approved editorial positioning
- No paid/premium promise was introduced
- No embed, API integration or automatic send/publish action exists
- Integration remains an external link only

## Responsive verification

| Breakpoint | Status | Issues |
|---|---|---|
| Mobile, 375px target | passed by static CSS and HTTP audit | none found |
| Tablet | passed by fluid/wrapping layout audit | none found |
| Desktop | passed by HTTP and layout-rule audit | none found |

Navigation wrapping, single-column responsive grids, fluid CTA blocks and readable footer rules were verified in code. Pixel-level browser automation was unavailable, so the responsive result is based on static CSS inspection plus the successful local HTTP path verification.

## Safety verification

- No `private_admin` data or marker exposed
- No admin/debug/raw content exposed
- No operational Run/Import/Execute/Sync/Save/Apply buttons
- No DB write
- No provider fetch or import
- Apify off
- No newsletter sent
- No social or Substack auto-publishing
- No Production change
- No merge and no deploy
- `point_70_db_write=false`
- `provider_fetch=false`
- `production_touched=false`
- `deploy_executed=false`
- `vercel_auth_changed=false`

## Verification commands

- `npm run dry-run:full-public-path-verification`: passed; HTTP 200 for home, competitions and detail, public counts `1/2/2`, bundle `ready`, responsive flags true
- `npm run dry-run:final-env-checklist`: passed; no-secret/no-deploy safety markers true
- `npm run audit:providers`: passed; zero external fetches and DB writes, real providers off
- `npm run dry-run:provider-writer-guards`: passed; `real_writes_enabled=false`, `write_attempt_blocked=true`
- `npm run lint`: passed
- `npm run typecheck`: passed
- `npm run build`: passed

## Decision

- `point_128_preview_substack_integration_verification_completed=true`
- `preview_substack_integration_verification_ready=true`
- `code_change=false`
- `substack_created=true`
- `substack_url_real=https://registaavanzato.substack.com/`
- `substack_url_verified=true`
- `substack_url_status=real_url_verified`
- `site_integration_done=true`
- `substack_link_visible_local=true`
- `substack_link_attrs_safe=true`
- `responsive_verified=true`
- `public_routes_verified=true`
- `public_data_visible=true`
- `preview_deployment_ready=true`
- `preview_remote_verification_result=blocked_by_missing_authorized_session`
- `production_touched=false`
- `no_merge=true`
- `no_deploy=true`
- `publication_ready=false`
- `newsletter_sent=false`
- `social_auto_published=false`
- `substack_auto_published=false`
- `brand_refresh_production_closed=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `p129_recommended=production_release_gate_for_substack_link`
