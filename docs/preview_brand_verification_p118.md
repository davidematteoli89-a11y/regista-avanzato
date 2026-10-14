# Preview Brand Verification — P118

## Scope

- preview/local verification only;
- no code UI changes;
- no deploy;
- no merge;
- no Production;
- no DB write;
- no provider/import;
- no Apify;
- no Substack integration.

P118 verifica lo stato del brand refresh pubblico dopo P116 e P117. La verifica è documentale e locale: non modifica UI, dati, configurazioni Vercel o ambienti di produzione.

## Current baseline

| Item | Value |
|---|---|
| P117 commit | `1d716df5dfe3a30906b0c61d5fece41d1741e94b` |
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| Substack status | `not_created_or_not_confirmed` |
| Canva asset status | `partial_manual` |
| Legacy marker status | `legacy_marker_false_negative=true` |
| Branch verified | `preview` |

## Routes verified

Local no-auth HTTP checks were executed against `localhost`.

| Route | Status | Content visible | Public data visible | Issues |
|---|---:|---|---|---|
| `/` | 200 | yes | not applicable | none found |
| `/manifesto` | 200 | yes | not applicable | none found |
| `/rubriche` | 200 | yes | not applicable | none found |
| `/competitions` | 200 | yes | yes | none found |
| `/competitions/manual-serie-a` | 200 | yes | yes | none found |
| `/chi-siamo` | 200 | yes | not applicable | none found |
| `/account` | 200 | yes | not applicable | none found |
| `/metodo` | 200 | yes | not applicable | none found |

Checks applied to the route responses:

- expected route content present;
- public competition data visible on `/competitions`;
- public detail data visible on `/competitions/manual-serie-a`;
- no `private_admin` text visible;
- no admin/debug/raw payload visible;
- no operational buttons visible;
- no Substack placeholder URL visible;
- no visible green/emerald/lime/teal leftovers detected.

## Responsive verification

| Breakpoint | Status | Issues |
|---|---|---|
| Mobile 375px | verified by static responsive rules and local route checks | none found |
| Tablet | verified by static responsive rules and local route checks | none found |
| Desktop | verified by static responsive rules and local route checks | none found |

Responsive evidence:

- public navigation uses wrapping/flexible layout;
- public footer collapses via media query;
- hero typography uses `clamp`;
- public grids use `minmax(0, 1fr)` and mobile single-column fallbacks;
- standings table is wrapped in horizontal overflow container;
- competition cards and public stat grids use responsive grid rules.

## Brand verification

- palette: aligned to blue/indigo/violet logo palette;
- logo: visible through public navigation/footer asset;
- no green leftovers: no visible green/emerald/lime/teal leftovers found in route checks and public CSS scan;
- dashboard/FM style: confirmed by card, dashboard, badge and standings presentation;
- navbar/footer: coherent with brand palette and logo;
- cards/buttons/badges: coherent with official palette;
- headings: readable on deep navy background;
- secondary text: readable using muted gray/violet tones.

Official palette retained:

- background deep: `#090823`;
- background soft: `#12113A`;
- card: `#18175D`;
- card secondary: `#232181`;
- primary blue: `#28269B`;
- primary hover: `#302FC4`;
- accent violet: `#6A5ACD`;
- soft border: `#A99AD1`;
- text white: `#F4F4F5`;
- text muted: `#B8B8C7`;
- muted gray: `#9B9BAC`.

## Data and safety verification

- public data visible: true;
- `/competitions` shows public competition data;
- `/competitions/manual-serie-a` shows public competition detail, teams and standings;
- no private/admin/debug/raw payload visible;
- no provider calls executed;
- no DB write executed;
- no Apify activity;
- no Substack placeholder URL invented or integrated;
- no operational Run/Import/Execute/Sync/Save/Apply buttons visible.

## Legacy marker status

`npm run dry-run:full-public-path-verification` still reports:

- `dry_run_pass=false`;
- `home_state=markup_unexpected`;
- `legacy_marker_false_negative=true`.

Reason:

- the legacy dry-run still expects old homepage markers from the pre-P116/P117 markup;
- the actual route checks confirm `/`, `/competitions` and `/competitions/manual-serie-a` are reachable and working;
- the data routes are verified as `data_visible`.

Recommendation:

- P119 — Legacy marker update, if the only remaining issue is the outdated home marker;
- alternatively P119 — Brand refresh iteration, if a human visual review finds further refinements.

## Verification commands

Results:

- `npm run dry-run:final-env-checklist`: passed;
- `npm run audit:providers`: passed;
- `npm run dry-run:provider-writer-guards`: passed;
- `npm run lint`: passed;
- `npm run typecheck`: passed;
- `npm run build`: passed;
- `npm run dry-run:full-public-path-verification`: partial / legacy marker false negative;
- local route checks: passed.

## Safety

- `no_deploy=true`;
- `no_merge=true`;
- `production_touched=false`;
- `db_write_additional=false`;
- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `substack_created=false`;
- `substack_url_status=not_created_or_not_confirmed`;
- `site_integration_done=false`;
- `publication_ready=false`;
- `secrets_printed=false`;
- `.env.local_read=false`.

## Decision

- `point_118_preview_brand_verification_completed=true`
- `preview_brand_verification_ready=true`
- `code_change=false`
- `public_routes_verified=true`
- `public_data_visible=true`
- `responsive_verified=true`
- `brand_visual_verified=true`
- `green_leftovers_removed=true`
- `legacy_marker_false_negative=true`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `site_integration_done=false`
- `publication_ready=false`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `p119_recommended=legacy_marker_update_or_brand_refresh_iteration`
