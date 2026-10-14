# Substack URL Registration and Verification — P126

## Scope

- register the real Substack URL supplied by the user;
- verify the public URL;
- no site integration;
- no deploy;
- no merge;
- no Production changes;
- no newsletter, article or social publication.

## Current baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app` |
| P125 preview commit | `f7e62423980d528cbf1af16fe3355f5d40434233` |
| Brand refresh Production closure | `true` |
| Previous Substack status | `not_created_or_not_confirmed` |
| Canva A01 status | `partial_manual` |

## Real Substack URL

Substack URL:

`https://registaavanzato.substack.com/`

## Verification

The URL was checked as a public, unauthenticated endpoint without cookies, credentials or account access.

| Check | Result |
|---|---|
| HTTP status | 200 |
| Final URL | `https://registaavanzato.substack.com/` |
| Redirect count | 0 |
| Content type | `text/html; charset=utf-8` |
| Page title | `Regista Avanzato \| Substack` |
| Brand name coherent | true |
| Title indicates 404/not found | false |
| Title indicates placeholder/coming soon | false |

Result: the real Substack publication exists, is reachable and is coherent with the Regista Avanzato identity.

## Decision

- `point_126_substack_url_registration_verification_completed=true`
- `substack_url_registration_verification_ready=true`
- `substack_created=true`
- `substack_url_real=https://registaavanzato.substack.com/`
- `substack_url_verified=true`
- `substack_url_status=real_url_verified`
- `site_integration_done=false`
- `publication_ready=false`
- `newsletter_sent=false`
- `social_auto_published=false`
- `substack_auto_published=false`
- `brand_refresh_production_closed=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `p127_recommended=site_substack_url_integration_gate`
