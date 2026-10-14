# Site Substack URL Integration — P127

## Scope

- integrate the verified real Substack URL on `preview`;
- no merge;
- no deploy;
- no Production changes;
- no DB write;
- no provider/import;
- no Apify;
- no newsletter, social or Substack publication.

## Current baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app` |
| P126 preview commit | `0f45a73f7bc963ab1ad715d4384fafd13192edf3` |
| Verified Substack URL | `https://registaavanzato.substack.com/` |
| Brand refresh Production closure | `true` |
| Publication ready | `false` |

## Substack URL

`https://registaavanzato.substack.com/`

The URL is a public, verified destination. The integration adds ordinary external links only: no API, embed, tracking, token or account connection.

## Integration points

- navbar: external `Newsletter` link added without replacing Home, Manifesto, Rubriche or Competitions;
- footer: external `Newsletter · Leggi Regista Avanzato su Substack` link added;
- homepage: dedicated newsletter CTA with the verified destination;
- existing site-wide Substack CTAs: activated through the same non-secret public constant;
- newsletter copy: updated to reference the official Substack channel rather than an unconfigured placeholder.

Every external link uses `target="_blank"` and `rel="noopener noreferrer"`.

## Files changed

- `lib/substack/publicSubstack.ts`
- `components/public/PublicNavigation.tsx`
- `components/public/PublicFooter.tsx`
- `components/public/SubstackCTA.tsx`
- `components/public/NewsletterCTA.tsx`
- `app/(public)/page.tsx`
- P127 documentation and state documents.

## Verification

Local no-auth checks passed for:

- `/`;
- `/manifesto`;
- `/rubriche`;
- `/competitions`;
- `/competitions/manual-serie-a`;
- `/chi-siamo`;
- `/account`;
- `/metodo`.

All eight routes returned HTTP 200. The verified Substack URL, secure external-link attributes, brand and logo were detected on every route through the shared navigation/footer. The homepage also contains the dedicated newsletter CTA.

Public competition data remained visible on `/competitions`; `Manual Team One` and `Manual Team Two` remained visible on `/competitions/manual-serie-a`.

Checks confirmed:

- no placeholder or alternative Substack URL;
- no API or embed integration;
- no `private_admin` marker;
- no admin link;
- no debug/raw payload;
- no operational write button;
- no known legacy green hex marker;
- no provider/import or publication activity.

## Decision

- `point_127_site_substack_url_integration_completed=true`
- `site_substack_url_integration_ready=true`
- `code_change=true`
- `substack_created=true`
- `substack_url_real=https://registaavanzato.substack.com/`
- `substack_url_verified=true`
- `substack_url_status=real_url_verified`
- `site_integration_done=true`
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
- `p128_recommended=preview_substack_integration_verification`
