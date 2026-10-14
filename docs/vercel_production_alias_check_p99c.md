# Vercel Production Deployment/Alias Check — P99-C

## Scope

- Vercel dashboard/read-only check only;
- no deploy;
- no promote;
- no alias assignment;
- no config/env/root changes;
- no merge;
- no DB write;
- no provider/import;
- no Apify;
- no rollback.

## P99-B baseline

P99 pushed `main` to `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83`, but Production continued to serve HTTP 404 for the new editorial routes:

- `/manifesto`;
- `/rubriche`.

P99-B confirmed that local `main` contains and serves those routes, so the remaining question was Vercel deployment/alias state.

## Dashboard project identity

| Item | Value |
|---|---|
| Project name | `regista-avanzato` |
| Project ID | `prj_QjrP39psXIzOsVsJN7nP641e16OQ` |
| Team/account | `Davide Matteoli` / `team_3RlDDcq8ST33sDqjpb3lePms` |
| Framework | `nextjs` |
| Node version | `24.x` |
| Production domain checked | `regista-avanzato-rouge.vercel.app` |
| Git repository observed in deployment metadata | `davidematteoli89-a11y/regista-avanzato` |
| Production branch observed in deployment metadata | `main` |
| Root Directory | not visible from available read-only MCP output |
| Ignored Build Step | not visible from available read-only MCP output |
| Auto deploy/Git integration | `true` evidence: git deployment exists for `main` commit `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` |
| SSO protection | enabled for non-custom deployment URLs (`all_except_custom_domains`) |

## Current Production domain deployment

| Item | Value |
|---|---|
| Production domain | `regista-avanzato-rouge.vercel.app` |
| Alias deployment ID | `dpl_9wA5xFVNtrEHtXJWDEKVdi34fsP7` |
| Alias deployment URL | `regista-avanzato-lgf46xduc-davide-matteoli.vercel.app` |
| Commit SHA | `ab5067ca2f40c434d13ada87a71be0024069e8bd` |
| Commit message | `Release Regista Avanzato MVP to production` |
| Branch | `main` |
| Status | `READY` |
| Environment/target | `production` |
| Created time | `2026-10-06T09:46:20.872Z` |
| Ready time | `2026-10-06T09:47:16.371Z` |
| Assigned to Production domain | `true` |
| Domain alias includes `regista-avanzato-rouge.vercel.app` | `true` |

Aliases currently assigned to this deployment:

- `regista-avanzato-davide-matteoli.vercel.app`;
- `regista-avanzato-rouge.vercel.app`.

## Deployment for commit 8d20c0e

| Item | Value |
|---|---|
| Exists | `true` |
| Deployment ID | `dpl_C8icKQYUPNxvhELo9e9b2LkQ4Up4` |
| Deployment URL | `regista-avanzato-lhiluf8ee-davide-matteoli.vercel.app` |
| Commit SHA | `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` |
| Commit message | `Release editorial pages` |
| Branch | `main` |
| Status | `READY` |
| Environment/target | `null` |
| Created time | `2026-10-07T15:52:49.103Z` |
| Ready time | `2026-10-07T15:53:29.848Z` |
| Source | `git` |
| Assigned to `regista-avanzato-rouge.vercel.app` | `false` |
| Assigned aliases | `regista-avanzato-git-main-davide-matteoli.vercel.app` |

## Direct deployment route checks

The direct deployment URL for `8d20c0e` is protected by Vercel SSO, so public unauthenticated route checks return redirects to Vercel SSO rather than app content.

| Route | Result | Notes |
|---|---|---|
| `/` | HTTP 302 | Redirects to Vercel SSO; route content not directly observable without authorized session. |
| `/manifesto` | HTTP 302 | Redirects to Vercel SSO; route content not directly observable without authorized session. |
| `/rubriche` | HTTP 302 | Redirects to Vercel SSO; route content not directly observable without authorized session. |
| `/competitions` | HTTP 302 | Redirects to Vercel SSO; route content not directly observable without authorized session. |
| `/competitions/manual-serie-a` | HTTP 302 | Redirects to Vercel SSO; route content not directly observable without authorized session. |

Important: local `main` at the same commit already verified all five routes as HTTP 200, and the deployment for the commit is `READY`; the remaining blocker is alias/Production assignment, not local route existence.

## Diagnosis category

Category: `A. deployment_8d20c0e_exists_ready_and_routes_work_but_domain_not_assigned`

Evidence:

- deployment for `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` exists;
- deployment state is `READY`;
- deployment is from branch `main`;
- deployment is assigned only to `regista-avanzato-git-main-davide-matteoli.vercel.app`;
- Production domain `regista-avanzato-rouge.vercel.app` is still assigned to old deployment `dpl_9wA5xFVNtrEHtXJWDEKVdi34fsP7`;
- old Production deployment commit is `ab5067ca2f40c434d13ada87a71be0024069e8bd`.

Route content on the direct deployment could not be observed unauthenticated because SSO protection redirects deployment URLs, but local `main` verification and Vercel Ready status support the alias mismatch diagnosis.

## Recommended next gate

Recommended P99-D: Manual promote/assign Production domain gate.

P99-D should explicitly authorize one of the following no-surprise actions:

1. promote or assign the `8d20c0e` deployment to Production;
2. or assign `regista-avanzato-rouge.vercel.app` to deployment `dpl_C8icKQYUPNxvhELo9e9b2LkQ4Up4`;
3. then verify Production routes:
   - `/`;
   - `/manifesto`;
   - `/rubriche`;
   - `/competitions`;
   - `/competitions/manual-serie-a`.

No promote, deploy, alias assignment, config/env/root change, rollback or DB action is authorized by P99-C.

## Safety

- `no_deploy=true`
- `no_promote=true`
- `no_alias_assignment=true`
- `no_vercel_config_env_root_changes=true`
- `no_merge=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `rollback_executed=false`

## Decision

- `point_99c_vercel_production_alias_check_completed=true`
- `p99_still_incomplete=true`
- `production_editorial_pages_released=false`
- `diagnosis_category=A_deployment_8d20c0e_exists_ready_but_domain_not_assigned`
- `p99d_recommended=manual_promote_or_assign_domain_gate`
- `no_deploy=true`
- `no_promote=true`
- `no_alias_assignment=true`
- `no_merge=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `rollback_executed=false`
- `vercel_config_changed=false`
- `vercel_env_changed=false`
- `vercel_root_directory_changed=false`
