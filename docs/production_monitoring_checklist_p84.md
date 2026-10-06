# Production Monitoring Checklist — P84

## Scope

- monitoring checklist only;
- no code change;
- no deploy;
- no DB write;
- no provider/import;
- no Apify;
- no Vercel config/env/root directory changes.

## Production baseline

| Item | Value |
| --- | --- |
| Production URL | `https://regista-avanzato-rouge.vercel.app` |
| main commit | `690742762615b6cd5dcd434d1635968269a9dacd` |
| preview commit | `855cb4243b17b4c8befc7eaaebe0aff2418dfa2f` |
| release status | `production_release_verified=true` |
| MVP freeze status | `mvp_production_freeze=true` |
| public competitions | `1` |
| public teams | `2` |
| public standings | `2` |
| public bundle | `ready` |
| provider/import | `off` |
| Apify | `off` |
| rollback | `not executed` |

## Daily checks

| Check | Expected | Frequency | Notes |
| --- | --- | --- | --- |
| Home route | `https://regista-avanzato-rouge.vercel.app/` returns HTTP 200 | daily for 7 days | Confirm link to `/competitions` is visible. |
| Competitions route | `/competitions` returns HTTP 200 | daily for 7 days | Confirm public competition is visible. |
| Detail route | `/competitions/manual-serie-a` returns HTTP 200 | daily for 7 days | Confirm teams and standings are visible. |
| Public data counts | `1/2/2`, bundle `ready` | daily for 7 days | Public readers should continue exposing only promoted public data. |
| Exposure safety | no `private_admin`, no admin links, no debug/raw payload | daily for 7 days | Stop and investigate if any internal marker appears. |
| Operational buttons | no Run/Import/Execute/Sync/Save/Apply buttons | daily for 7 days | Public UI must stay read-only. |
| Provider/import | provider/import remain off | daily for 7 days | No TheStatsAPI, API-Football, Apify or SofaScore activity. |
| Vercel logs | no recurring critical errors | daily for 7 days | Dashboard read-only check. Do not change config/env/root directory. |
| Supabase sanity | public data readable, no unexpected writes | daily for 7 days | Read-only checks only. No service role. |

## Alert conditions

| Alert | Severity | Immediate action |
| --- | --- | --- |
| `/` returns 404/5xx | high | Do not deploy blindly. Capture status/time, check Vercel deployment/logs read-only, request explicit recovery authorization. |
| `/competitions` returns 404/5xx | high | Verify current Production deployment, routes and logs. Do not change Vercel settings. |
| `/competitions/manual-serie-a` returns 404/5xx | high | Verify detail route and public reader status. Do not execute rollback without authorization. |
| `private_admin` visible publicly | critical | Freeze changes, capture evidence without secrets, prepare incident/rollback plan, request explicit authorization. |
| admin link visible publicly | high | Treat as exposure regression; do not deploy fixes without a new plan/authorization. |
| debug/raw payload visible | high | Capture page/path, prepare hotfix plan, keep provider/import off. |
| operational buttons visible | high | Verify no write action is callable; prepare UI hotfix plan. |
| provider fetch detected | critical | Stop provider path, confirm flags, do not continue imports. |
| unexpected DB write | critical | Stop changes, preserve logs, no data rollback unless explicitly authorized. |
| Vercel deploy failed | medium/high | Read logs only, identify commit/deployment, request explicit next action. |
| Supabase read error | medium/high | Read-only diagnosis only; do not change RLS, roles or policies without authorization. |

## Rollback readiness

- rollback app only with explicit authorization;
- no data rollback unless explicitly authorized;
- identify the last known good Production commit before any rollback;
- preserve provider/import off during any rollback flow;
- keep Apify off;
- do not modify Vercel env/config/root directory as part of monitoring;
- document every incident with timestamp, route, status and observed symptoms.

## Decision

- `point_84_production_monitoring_checklist_completed=true`
- `production_monitoring_ready=true`
- `production_release_stable_baseline=true`
- `no_code_change=true`
- `no_deploy=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `rollback_executed=false`
