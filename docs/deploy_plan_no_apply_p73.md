# Deploy Plan No-Apply — P73

## P75 gate update

P75 ha preparato il deploy authorization gate.

- `deploy_authorization_gate_completed=true`
- `deploy_authorized=false`
- `deploy_executed=false`
- `ready_for_controlled_deploy_authorization=true`
- `generic_proceed_authorizes_deploy=false`
- `authorization_phrase_created=true`

Il deploy reale resta bloccato fino a P76 con frase esplicita completa.

## Scope

Punto 73 è solo un piano di deploy controllato.

- Nessun deploy.
- Nessun `vercel --prod`.
- Nessuna modifica Production.
- Nessuna modifica configurazione Vercel.
- Nessuna modifica Vercel Authentication.
- Nessuna DB write.
- Nessun rollback.
- Nessuna modifica visibility.
- Nessun provider/import.
- Nessun Apify.
- Nessun `service_role`.
- Nessun token/cookie/header auth stampato o committato.

## Candidate

| Item | Value |
|---|---|
| Project | Regista Avanzato |
| Branch | `preview` |
| Commit candidate | `3fbab781072f972ddab87a3f21eacb97738741c4` |
| deploy_authorized | `false` |
| ready_for_deploy | `false` |
| ready_for_deploy_plan | `true` |
| Production touched | `false` |
| manual deploy executed | `false` |
| Preview protection | Vercel Authentication remains enabled |

## Deploy content

| Area | Included | Notes |
|---|---:|---|
| Home | Yes | Public homepage/path polish from P70/P71. |
| Public navigation | Yes | Public-only navigation, no admin links. |
| Competitions list | Yes | `/competitions`, public reader backed. |
| Competition detail | Yes | `/competitions/manual-serie-a`, public reader backed. |
| Public readers | Yes | Read only `public_free` data. |
| `public_free` data | Yes | `manual-serie-a`, 1 competition / 2 teams / 2 standings already promoted in staging. |
| Rollback file | Yes | `supabase/manual/public_data_promotion_rollback_p66.sql`, not executed. |

## Explicitly excluded

| Area | Excluded | Notes |
|---|---:|---|
| Provider/import | Yes | No provider activation or import worker. |
| Apify | Yes | Apify remains off. |
| TheStatsAPI | Yes | No API calls, no fetch, no retry. |
| API-Football | Yes | Suspended/no retry. |
| Production DB writes | Yes | No Production write authorized. |
| Migrations | Yes | No migration apply or schema change. |
| RLS/roles/users | Yes | No auth/role/policy changes. |
| `service_role` app | Yes | Not used in app deploy plan. |
| Vercel config changes | Yes | No Vercel Authentication/config change. |

## Pre-deploy checklist

- [ ] Confirm branch is `preview`.
- [ ] Confirm candidate commit.
- [ ] Confirm working tree clean.
- [ ] Confirm lint passes.
- [ ] Confirm typecheck passes.
- [ ] Confirm build passes.
- [ ] Confirm full local public path verification passes.
- [ ] Confirm public readers return 1/2/2.
- [ ] Confirm public bundle status is `ready`.
- [ ] Confirm provider probes are gated/disabled.
- [ ] Confirm writer guards block real provider writes.
- [ ] Confirm env categories are present/correct without printing values.
- [ ] Confirm no secrets are committed.
- [ ] Confirm rollback file exists.
- [ ] Receive explicit deploy authorization phrase.

## Env verification checklist

Do not print values. Verify only presence/scope/category.

- [ ] Supabase URL for deploy environment is correct.
- [ ] Supabase anon/public key for deploy environment is correct.
- [ ] No `service_role` key is used by public/app runtime.
- [ ] Vercel project is the intended Regista Avanzato project.
- [ ] Branch target is correct.
- [ ] Provider/import feature flags are off.
- [ ] Writer flags are off.
- [ ] Provider tokens are absent or unused while providers are off.
- [ ] Vercel Authentication/Preview Protection decision is confirmed.

## Post-deploy verification checklist

After a future explicitly authorized deploy:

- [ ] Home returns HTTP 200.
- [ ] `/competitions` returns HTTP 200.
- [ ] `/competitions/manual-serie-a` returns HTTP 200.
- [ ] Public data is visible.
- [ ] Public reader counts are 1/2/2.
- [ ] Public bundle status is `ready`.
- [ ] No extra `private_admin` data is exposed.
- [ ] No admin links are visible publicly.
- [ ] No debug/raw payload is visible.
- [ ] No operational Run/Import/Execute/Sync/Save/Apply buttons are visible.
- [ ] Provider/import remains off.
- [ ] Production has no unauthorized DB write.
- [ ] Logs show no critical runtime errors.

## Rollback plan

### App rollback

- Revert or redeploy the previous known-good commit if a future deploy causes application issues.
- Do not perform rollback automatically; require explicit authorization.

### Data rollback

- Data rollback file is available: `supabase/manual/public_data_promotion_rollback_p66.sql`.
- It changes only the P66 promoted fixture from `public_free` back to `private_admin`.
- Do not execute data rollback unless explicitly authorized.

### Provider rollback

- No provider rollback is currently required because provider/import and Apify remain off.

## Blockers

| Blocker | Required action | Status |
|---|---|---|
| Explicit deploy authorization missing | Receive full explicit deploy phrase | Blocking |
| Env verification no-secret pending | Verify categories without printing values | Blocking |
| Target deploy decision pending | Confirm Preview/Production target and protection model | Blocking |
| Vercel Auth/Preview decision pending | Keep or change only with explicit future authorization | Blocking |

## Non-blockers

| Item | Reason not blocking MVP |
|---|---|
| Provider/import off | MVP uses manual public data. |
| Admin browser real verification pending | Public MVP path is independent. |
| Dataset manual/minimal | Expected MVP demo scope. |
| Preview no-auth blocked by Vercel Auth | Acceptable if future verification is authenticated or local. |

## Authorization requirement

Il deploy reale NON è autorizzato dal Punto 73.

Un futuro deploy richiede frase esplicita separata, per esempio:

> Autorizzo il Punto 75: esegui il deploy controllato di Regista Avanzato secondo il piano approvato, senza attivare provider/import e senza toccare dati fuori scope.

Frasi generiche come:

- `procedi`
- `vai`
- `continua`
- `ok`

NON autorizzano deploy.

## Decision

- `point_73_deploy_plan_no_apply_completed=true`
- `deploy_plan_created=true`
- `deploy_executed=false`
- `ready_for_deploy_authorization_gate=true`
- `ready_for_deploy=false`
- `deploy_authorized=false`
