# Production Editorial Pages Deploy Diagnosis — P99-B

## Scope

- diagnosis only;
- no merge;
- no deploy;
- no Production changes;
- no DB write;
- no provider/import;
- no Apify;
- no Vercel config/env/root directory changes;
- no rollback.

## P99 stop condition

P99 completed the controlled merge and pushed `main`, but Production did not serve the editorial pages after the push.

Summary:

- `merge_executed=true`
- `main_pushed=true`
- `pushed_main_commit=8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83`
- `production_deploy_verified=false`
- `/manifesto` returned HTTP 404 on Production
- `/rubriche` returned HTTP 404 on Production
- P99 success docs were not created
- no rollback was executed

## Git state

| Item | Value |
|---|---|
| Branch at P99-B start | `main` |
| Local HEAD on main | `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` |
| `origin/main` | `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` |
| `origin/preview` before diagnosis docs | `088ff41e41b9afe2dc9e7bf6e34de07fa0b48eea` |
| Working tree before diagnosis docs | clean |
| Candidate preview commit | `750ab823056c4e63b258a7014637899e8578fcc0` |
| Preview gate commit | `088ff41e41b9afe2dc9e7bf6e34de07fa0b48eea` |

## Main local verification

| Check | Result | Notes |
|---|---|---|
| `app/(public)/manifesto/page.tsx` exists | `true` | Route file present on `main`. |
| `app/(public)/rubriche/page.tsx` exists | `true` | Route file present on `main`. |
| `npm run dry-run:final-env-checklist` | `passed` | No-secret dry-run. |
| `npm run audit:providers` | `passed` | Provider/import remained off. |
| `npm run dry-run:provider-writer-guards` | `passed` | Writes blocked. |
| `npm run lint` | `passed` | Local check. |
| `npm run typecheck` | `passed` | Local check. |
| `npm run build` | `passed` | Build includes `/manifesto` and `/rubriche`. |
| `npm run dry-run:full-public-path-verification` with server | `passed` | Local public path is valid. |

Local route verification on `main`:

| Route | Result | Notes |
|---|---|---|
| `/` | HTTP 200 | Visible locally. |
| `/manifesto` | HTTP 200 | Manifesto content visible locally. |
| `/rubriche` | HTTP 200 | Rubriche content visible locally. |
| `/competitions` | HTTP 200 | Public data visible locally. |
| `/competitions/manual-serie-a` | HTTP 200 | Public detail data visible locally. |

Conclusion: `main` contains the new routes and builds locally. The observed issue is not a local code/build regression.

## Production verification

Production URL checked: `https://regista-avanzato-rouge.vercel.app`

| Route | Expected | Result | Notes |
|---|---|---|---|
| `/` | HTTP 200 | HTTP 200 | Existing homepage remains reachable. |
| `/manifesto` | HTTP 200 | HTTP 404 | `x-vercel-cache=HIT`, old cached 404 observed. |
| `/rubriche` | HTTP 200 | HTTP 404 | `x-vercel-cache=HIT`, old cached 404 observed. |
| `/competitions` | HTTP 200, data visible | HTTP 200 | Existing public data still visible. |
| `/competitions/manual-serie-a` | HTTP 200, data visible | HTTP 200 | Existing detail route still visible. |
| `/manifesto?diagnostic=p99b` | HTTP 200 | HTTP 404 | Cache-busting query still returned cached 404. |
| `/rubriche?diagnostic=p99b` | HTTP 200 | HTTP 404 | Cache-busting query still returned cached 404. |

Observed headers, sanitized:

- `/manifesto`: `x-vercel-cache=HIT`, `age≈169661`, HTTP 404.
- `/rubriche`: `x-vercel-cache=HIT`, `age≈169661`, HTTP 404.
- `/competitions`: `x-vercel-cache=MISS`, HTTP 200.
- `/competitions/manual-serie-a`: `x-vercel-cache=MISS`, HTTP 200.

## Vercel/Git integration diagnosis

Read-only Vercel CLI inspection was attempted, but the local `vercel` CLI is not available:

- `vercel_cli_available=false`
- `vercel_read_only_deployment_list_available=false`

Therefore P99-B could not confirm from CLI whether Vercel created a Production deployment for commit `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83`, whether that deployment is Ready, or whether the Production alias points to it.

Available evidence:

- GitHub `origin/main` points to `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83`.
- Local `main` at the same commit contains and serves `/manifesto` and `/rubriche`.
- Production continues returning cached 404 for both editorial routes.
- No local evidence of code/build failure.

## Diagnosis category

Category: `8. Causa non determinata`

Narrowed root cause: Production is not serving the pushed `main` build that contains `/manifesto` and `/rubriche`. The remaining likely causes are:

1. Vercel did not create a Production deployment for the new `main` commit;
2. Vercel created a deployment but it is not assigned to Production;
3. the `regista-avanzato-rouge.vercel.app` domain/alias still points to an older deployment;
4. the cached 404 is being served from an older deployment/edge state.

The problem is not currently supported by local code/build evidence.

## Recommended next step

Prepare P99-C as a read-only Vercel Dashboard / deployment-state check first:

1. check whether commit `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` has a Vercel Production deployment;
2. check whether the deployment is Ready, Failed, Skipped, or Preview-only;
3. check whether `regista-avanzato-rouge.vercel.app` points to that deployment;
4. if deployment exists but is not assigned: prepare a manual promote/assign gate;
5. if deployment does not exist: prepare a dashboard redeploy gate;
6. if Git integration points to a different branch/project: prepare a Vercel Git integration alignment gate;
7. if only cache is implicated: prepare a wait/recheck gate.

No promote, redeploy, rollback, config/env/root changes should be performed without explicit separate authorization.

## Safety

- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `rollback_executed=false`
- `vercel_config_changed=false`
- `vercel_env_changed=false`
- `vercel_root_directory_changed=false`
- `substack_auto_published=false`

## Decision

- `point_99b_production_deploy_diagnosis_completed=true`
- `p99_still_incomplete=true`
- `production_editorial_pages_released=false`
- `diagnosis_category=8_cause_not_determined_deployment_or_alias_not_serving_main_commit`
- `p99c_recommended=true`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `rollback_executed=false`
- `vercel_config_changed=false`
- `vercel_env_changed=false`
- `vercel_root_directory_changed=false`
