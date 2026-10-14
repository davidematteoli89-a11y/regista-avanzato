# Production Release Gate Brand Refresh — P120

## Scope

- release gate only;
- no merge;
- no deploy;
- no Production changes;
- no DB write;
- no provider/import;
- no Apify;
- no Substack integration.

P120 prepares the Production release gate for the brand refresh completed on `preview`, but does not authorize or execute P121.

## Current baseline

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| Current `origin/main` commit | `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` |
| Candidate `origin/preview` commit | `d9266d1b9ee9a62b3aa44e39445bdea94bf0ebbe` |
| P116 status | site brand refresh completed |
| P117 status | legacy green cleanup completed |
| P118 status | preview/local brand verification completed |
| P119 status | legacy marker update completed |
| Substack status | `not_created_or_not_confirmed` |
| Canva asset status | `partial_manual` |
| Production touched in P120 | `false` |

## Candidate commit

- `candidate_preview_commit=d9266d1b9ee9a62b3aa44e39445bdea94bf0ebbe`

## Diff summary

Command:

```text
git diff --stat origin/main..origin/preview
git diff --name-only origin/main..origin/preview
```

Summary:

- `103 files changed`
- `12140 insertions(+)`
- `159 deletions(-)`
- `public/regista-avanzato-logo.png` added

File groups changed:

- public UI files:
  - `app/(public)/page.tsx`
  - `app/(public)/manifesto/page.tsx`
  - `app/(public)/rubriche/page.tsx`
  - `app/(public)/competitions/page.tsx`
  - `app/(public)/competitions/[slug]/page.tsx`
  - `app/globals.css`
- public components:
  - `components/public/HomeHero.tsx`
  - `components/public/PublicNavigation.tsx`
  - `components/public/PublicFooter.tsx`
  - `components/public/PublicCompetitionCard.tsx`
  - `components/public/PublicStandingsTable.tsx`
- public logo asset:
  - `public/regista-avanzato-logo.png`
- dry-run script:
  - `scripts/provider/fullPublicPathVerificationDryRun.ts`
- docs:
  - P100-P119 docs and status documents.

Safety diff review:

- no `.env.local` changes;
- no `.vercel` changes;
- no `vercel.json` changes;
- no package lock changes;
- no Supabase migrations;
- no DB schema/RLS/auth changes;
- no provider activation files identified;
- no dangerous service role files identified;
- no Production config file changes identified.

## Verification results

| Check | Result | Notes |
|---|---|---|
| `dry-run:full-public-path-verification` | passed | `dry_run_pass=true` |
| `dry-run:final-env-checklist` | passed | `dry_run_pass=true`, secrets hygiene passed |
| `audit:providers` | passed | real providers off, no external fetch, no DB write |
| `dry-run:provider-writer-guards` | passed | writes blocked, `real_writes_enabled=false` |
| `lint` | passed | no lint errors |
| `typecheck` | passed | `tsc --noEmit` passed |
| `build` | passed | Next build passed |
| route checks | passed | eight public/local routes returned 200 |

## Public route verification

| Route | Status | Data visible | Issues |
|---|---:|---|---|
| `/` | 200 | not applicable | none found |
| `/manifesto` | 200 | not applicable | none found |
| `/rubriche` | 200 | not applicable | none found |
| `/competitions` | 200 | yes | none found |
| `/competitions/manual-serie-a` | 200 | yes | none found |
| `/chi-siamo` | 200 | not applicable | none found |
| `/account` | 200 | not applicable | none found |
| `/metodo` | 200 | not applicable | none found |

Route safety checks:

- `private_admin_visible=false`;
- admin/debug/raw visible: false;
- operational buttons visible: false;
- Substack placeholder URL visible: false.

## Safety review

- no private_admin exposed;
- no admin/debug/raw;
- no operational buttons;
- no DB write;
- no provider/import;
- no Apify;
- no Substack integration;
- no invented Substack URL;
- no secrets printed;
- no Production touched;
- no merge executed;
- no deploy executed.

## Gate decision

- `point_120_production_release_gate_brand_refresh_completed=true`
- `production_release_gate_brand_refresh_ready=true`
- `release_candidate_ready=true`
- `candidate_preview_commit=d9266d1b9ee9a62b3aa44e39445bdea94bf0ebbe`
- `current_main_commit=8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83`
- `dry_run_full_public_path_passed=true`
- `public_routes_verified=true`
- `public_data_visible=true`
- `brand_visual_verified=true`
- `responsive_verified=true`
- `private_admin_publicly_exposed=false`
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
- `p121_recommended=merge_preview_to_main_and_deploy_brand_refresh`

## Required authorization for P121

P121 will require separate explicit authorization for:

- merge `preview` → `main`;
- push `main`;
- deploy/assign Production;
- post-deploy verification.

Generic phrases such as “procedi”, “vai”, “ok” or “continua” do not automatically authorize DB write, provider activation, Production merge or Production deploy unless explicitly associated with P121 and candidate commit `d9266d1b9ee9a62b3aa44e39445bdea94bf0ebbe`.
