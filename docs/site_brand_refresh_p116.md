# Site Brand Refresh With Logo Palette — P116

## Scope

- public site brand refresh only;
- code changes allowed only for visual/UI refresh;
- no deploy;
- no merge;
- no Production;
- no DB write;
- no provider/import;
- no Apify;
- no Substack integration.

P116 aggiorna il sito pubblico di Regista Avanzato su branch `preview` con la nuova identità visiva blu/indaco/viola del logo e una direzione Football Manager / dashboard calcistica premium.

## Current baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| P115 commit | `b5ef0f2cc624b7a13d6e91b263dbfa898e31b844` |
| Substack status | `not_created_or_not_confirmed` |
| Canva asset status | `partial_manual` |
| A01 Manifesto carousel | `needs_revision` |
| Production touched | `false` |

## Brand palette

- background deep: `#090823`
- background soft: `#12113A`
- card: `#18175D`
- card secondary: `#232181`
- primary blue: `#28269B`
- primary hover: `#302FC4`
- accent violet: `#6A5ACD`
- soft border: `#A99AD1`
- text white: `#F4F4F5`
- text muted: `#B8B8C7`
- muted gray: `#9B9BAC`

## Visual direction

- Football Manager inspiration;
- dashboard calcistica premium;
- rivista sportiva moderna;
- dati + racconto + campo + radar;
- no betting;
- no neon eccessivo;
- no meme page;
- no look corporate generico.

## Files changed

- `app/globals.css`
- `app/(public)/page.tsx`
- `app/(public)/manifesto/page.tsx`
- `app/(public)/rubriche/page.tsx`
- `app/(public)/competitions/page.tsx`
- `app/(public)/competitions/[slug]/page.tsx`
- `components/public/HomeHero.tsx`
- `components/public/PublicNavigation.tsx`
- `components/public/PublicFooter.tsx`
- `components/public/PublicCompetitionCard.tsx`
- `components/public/PublicStandingsTable.tsx`
- `public/regista-avanzato-logo.png`

## Homepage refresh

- Hero aggiornato con headline “Il calcio raccontato meglio.”
- CTA principali verso Manifesto e Rubriche.
- CTA secondaria verso Competitions.
- Badge editoriali: No betting, No hype facile, Dati/storie/contesto.
- Pannello dashboard con aree editoriali.
- Rimossa CTA newsletter/Substack dalla homepage principale.

## Navbar/footer refresh

- Navbar aggiornata con logo reale e sfondo navy semitrasparente.
- Link pubblici ridotti a Home, Manifesto, Rubriche, Competitions.
- Footer aggiornato con logo, descrizione editoriale e nota “No betting. No hype facile.”
- Nessun link Substack placeholder aggiunto.

## Manifesto refresh

- Hero visuale con palette brand.
- Card introduttive per sezioni chiave: Perché nasce, Cosa guardiamo, Cosa non siamo, Metodo, Regola editoriale.
- Corpo manifesto in pannello leggibile.

## Rubriche refresh

- Griglia premium per le sei rubriche.
- Badge categoria/voce.
- Micro-elemento visuale radar/campo.
- Hover e card coerenti con stile dashboard.

## Competitions refresh

- `/competitions` allineata al nuovo sistema visivo.
- `/competitions/manual-serie-a` allineata al nuovo sistema visivo.
- Card campionati più dashboard.
- Tabelle classifica con header scuro, righe alternate e overflow responsive.
- Nessuna modifica alla logica dati/public reader.

## Logo handling

Logo disponibile in `Logo/unnamed.png`.

Usato nel sito:

- `public/regista-avanzato-logo.png`

Solo il file logo necessario al sito è stato copiato in `public/`. La cartella sorgente `Logo/` resta fuori commit.

- `logo_asset_used=true`
- `logo_asset_pending=false`

## Verification

Da P116:

- lint: passed
- typecheck: passed
- build: passed
- full public path dry-run: `partial_legacy_home_marker_unexpected`
- supplemental local HTTP route check: passed
- public data visible: true
- no private/admin/debug/raw exposed by public path dry-run

Route HTTP locali verificate:

- `/` → 200
- `/manifesto` → 200
- `/rubriche` → 200
- `/competitions` → 200, data visible
- `/competitions/manual-serie-a` → 200, data visible

Nota: `npm run dry-run:full-public-path-verification` ha raggiunto `/`, `/competitions` e `/competitions/manual-serie-a`; le route dati risultano `data_visible`, ma lo script legacy segnala `dry_run_pass=false` perché la home aggiornata non contiene più i marker attesi dal dry-run P71.

## Safety

- `deploy_executed=false`
- `merge_executed=false`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `site_integration_done=false`
- `substack_url_invented=false`
- `secrets_printed=false`

## Decision

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
- `substack_url_real=`
- `site_integration_done=false`
- `publication_ready=false`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `p117_recommended=preview_brand_verification_or_brand_refresh_iteration`
