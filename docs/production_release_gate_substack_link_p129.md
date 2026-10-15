# Production Release Gate for Substack Link — P129

## Scope

P129 is a no-apply Production release gate for the verified Substack link. It performs repository, functional, safety and Vercel read-only checks only.

P129 does not merge `preview` into `main`, push `main`, deploy, assign aliases, change Vercel configuration, write to the database, activate providers/import or Apify, or publish content.

## Baseline and candidate

| Item | Verified value |
| --- | --- |
| Candidate code commit | `32f9397d9a720f433d1483bc620085cdc5f3ac1c` |
| Preview HEAD at gate | `4e79aa8b2e260de28016e70ffe708fb5f64868ca` |
| Current main commit | `1f4942f834da54bf336145e3d9cd07e44effae66` |
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| Substack URL | `https://registaavanzato.substack.com/` |
| Candidate ancestry | candidate is an ancestor of `origin/preview` |
| Commits after candidate | P128 documentation only |
| Working-tree exception | pre-existing untracked `Logo/`, excluded from P129 |

## Diff review

`origin/main..origin/preview` contains 33 files, 1,817 insertions and 8 deletions.

Classification:

- 6 public integration code files: homepage, newsletter CTA, public footer, public navigation, shared Substack CTA and centralized Substack URL constants;
- 27 documentation/state files covering brand refresh verification, Substack registration, integration and P128 verification;
- no environment files;
- no Vercel configuration;
- no Supabase migrations, RLS or auth changes;
- no admin route changes;
- no provider/API/import writer changes;
- no database write implementation.

The candidate commit itself contains the public link integration plus its documentation. The only commit after it is P128, whose delta is seven documentation files and no code.

## Substack integration verification

- Real URL centralized in `lib/substack/publicSubstack.ts`.
- Navbar, footer, homepage and shared CTA import the centralized constant.
- External links use `target="_blank"` and `rel="noopener noreferrer"`.
- No divergent or invented Substack URL was found.
- No active placeholder URL is used by the public integration. The older safe `getSubstackConfig` fallback is not imported by the integrated public path.
- No newsletter send, Substack API or automatic publishing integration was introduced.
- The integration copy states that payment/premium is not active internally and does not promise an unconfirmed internal paid service.

## Local route verification

| Route or asset | Result | Substack link | Public data | Safety |
| --- | --- | --- | --- | --- |
| `/` | HTTP 200 | visible, correct, safe attrs | public page content | passed |
| `/manifesto` | HTTP 200 | visible, correct, safe attrs | public page content | passed |
| `/rubriche` | HTTP 200 | visible, correct, safe attrs | public page content | passed |
| `/competitions` | HTTP 200 | visible, correct, safe attrs | competition visible | passed |
| `/competitions/manual-serie-a` | HTTP 200 | visible, correct, safe attrs | competition, teams and standings visible | passed |
| `/chi-siamo` | HTTP 200 | visible, correct, safe attrs | public page content | passed |
| `/account` | HTTP 200 | visible, correct, safe attrs | public account page | passed |
| `/metodo` | HTTP 200 | visible, correct, safe attrs | public page content | passed |
| `/regista-avanzato-logo.png` | HTTP 200, `image/png` | not applicable | asset loaded | passed |

Every page check confirmed no `private_admin` marker, admin link, debug/raw payload or operational Run/Import/Execute/Sync/Save/Apply button.

## Verification results

- `npm run dry-run:full-public-path-verification`: passed; HTTP 200 public path, counts `1/2/2`, bundle `ready`, safety markers clean.
- `npm run dry-run:final-env-checklist`: passed; `dry_run_pass=true`, no-secret/no-deploy state confirmed.
- `npm run audit:providers`: passed; zero external fetches and database writes; real providers off.
- `npm run dry-run:provider-writer-guards`: passed; real writes disabled and write attempt blocked.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed; all required public routes present in the Next.js route output.

## Preview verification limits

Vercel read-only inspection confirmed:

- P128 Preview deployment `dpl_3ReBTd4xsvF32LP5bXy2HTx6SYxc` is READY on commit `4e79aa8b2e260de28016e70ffe708fb5f64868ca`;
- candidate P127 deployment `dpl_466BumAWu1FVGjqohcj2ohufBVvb` is READY on commit `32f9397d9a720f433d1483bc620085cdc5f3ac1c`;
- Preview deployment protection remains enabled.

The protected remote content could not be fetched because the available Vercel connector session was not authorized for the deployment. No bypass or protection change was attempted.

- `preview_remote_content_verified=false`
- `responsive_static_verified=true`
- `responsive_browser_verified=unknown`

A READY deployment is not treated as proof of a visual/browser pass.

## Vercel release plan for P130

Read-only inspection confirmed project `regista-avanzato`, Production domain ownership and the current Production domain resolving to READY deployment `dpl_4kQYEV8dX8StepSoNb9a1TEqsBXh` on main commit `1f4942f834da54bf336145e3d9cd07e44effae66`.

Because this project previously required manual alias correction, P130 must explicitly:

1. require a separate authorization naming the candidate and Production scope;
2. re-check clean `preview` and `main`, remote heads and exact candidate ancestry;
3. merge/push `main` only if authorized and all checks still pass;
4. identify the new READY Production deployment and confirm its actual Git SHA;
5. verify which deployment the Production domain resolves to;
6. assign or promote the Production domain only if separately authorized and necessary;
7. verify homepage, logo, Substack link and external-link attributes on Production;
8. verify public data and absence of private/admin/debug/write surfaces;
9. keep provider/import and Apify off and perform no database writes;
10. stop on build, deployment, SHA or alias mismatch.

No P130 action is authorized by P129.

## Gate decision

- `point_129_production_release_gate_substack_link_completed=true`
- `gate_ready=true`
- `release_candidate_ready=true`
- `release_candidate_reason=expected_public_substack_integration_and_documentation_only_all_checks_passed`
- `candidate_code_commit=32f9397d9a720f433d1483bc620085cdc5f3ac1c`
- `preview_head_at_gate=4e79aa8b2e260de28016e70ffe708fb5f64868ca`
- `current_main_commit=1f4942f834da54bf336145e3d9cd07e44effae66`
- `checks_passed=true`
- `preview_remote_content_verified=false`
- `responsive_static_verified=true`
- `responsive_browser_verified=unknown`
- `substack_created=true`
- `substack_url_verified=true`
- `site_integration_preview_done=true`
- `site_integration_production_done=false`
- `publication_ready=false`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `p130_recommended=merge_deploy_substack_link_only_if_authorized`
