# Deploy Authorization Gate — P75

## Scope

- Authorization gate only.
- No deploy.
- No Production changes.
- No DB write.
- No rollback.
- No provider/import.
- No Apify.
- No Vercel config changes.
- No Vercel Authentication changes.
- No `.env.local` read/print.
- No token/cookie/header auth print.

## Gate inputs

| Source | Status | Notes |
|---|---|---|
| P73 deploy plan | Ready | Deploy plan no-apply created. |
| P74 env checklist | Ready | Final env checklist no-secret completed. |
| P71 public path verification | Ready | Local public path verified. |
| P66 rollback availability | Ready | Rollback file available, not executed. |
| Provider/import status | Off | Provider/import disabled, Apify off. |
| Preview status | Protected | Vercel Authentication remains enabled. |
| Production status | Untouched | No deploy and no Production change. |

## Required preconditions

| Requirement | Status | Blocks deploy? |
|---|---|---:|
| Explicit deploy authorization | Missing | Yes |
| Target branch/commit confirmed | Pending final phrase | Yes |
| Lint/typecheck/build passed | Must be rechecked at deploy time | Yes |
| Public path verified | Available from P71/P72 | Yes |
| Env categories verified no-secret | Completed in P74 | Yes |
| Provider/import off | Confirmed | Yes |
| Writer guards passed | Must be rechecked at deploy time | Yes |
| Rollback plan ready | Ready | Yes |
| Post-deploy verification ready | Ready | Yes |
| Production untouched until authorization | Confirmed | Yes |

## Still forbidden during future deploy

| Area | Forbidden action |
|---|---|
| Provider/import | Do not activate provider/import jobs. |
| Apify | Do not enable Apify/SofaScore. |
| TheStatsAPI/API-Football | Do not run provider API calls. |
| DB | Do not perform unauthorized DB writes. |
| Schema | Do not apply migrations or schema changes. |
| RLS/roles/users | Do not change policies, roles, or users. |
| App secrets | Do not use `service_role` lato app pubblico. |
| Logs/output | Do not print token/cookie/header auth. |
| Rollback data | Do not execute rollback automatically. |
| Vercel | Do not change Vercel Auth/config without separate authorization. |

## Authorization phrase

Required future phrase:

> Autorizzo il Punto 76: esegui il deploy controllato di Regista Avanzato secondo il piano approvato, dal branch preview e commit [COMMIT], senza attivare provider/import, senza Apify, senza DB write aggiuntive, senza modificare configurazioni Vercel e senza toccare dati fuori scope.

Generic phrases do not authorize deploy:

- `procedi`
- `vai`
- `ok`
- `continua`

P75 does not authorize deploy. The real deploy must wait for P76 with the full explicit phrase.

## Decision

- `point_75_deploy_authorization_gate_completed=true`
- `deploy_authorization_gate_completed=true`
- `deploy_authorized=false`
- `deploy_executed=false`
- `ready_for_controlled_deploy_authorization=true`
- `generic_proceed_authorizes_deploy=false`
- `authorization_phrase_created=true`
