# Production Release Plan No-Apply — P79

## Scope

Punto 79 prepara il piano di rilascio Production dopo il freeze MVP Preview P78.

Questo punto è solo pianificazione:

- no merge;
- no deploy;
- no Production changes;
- no DB write;
- no rollback;
- no provider/import;
- no Apify;
- no Vercel config changes;
- no Vercel Authentication changes;
- no `.env.local` read/print;
- no token/cookie/header auth output.

## Preview status

| Item | Value |
|---|---|
| Branch | `preview` |
| Commit P78 | `927506b28805f6d1ea03d380dc6bcac0ad86c090` |
| Preview verified | `true` |
| Preview URL | `https://regista-avanzato-kw9gtwlc4-davide-matteoli.vercel.app` |
| `/` | verified in local/public path flow |
| `/competitions` | working on verified Preview |
| `/competitions/manual-serie-a` | working on verified Preview |
| Data visible | `true` |
| Provider/import | off |
| Apify | off |
| Additional DB write in P79 | `false` |
| Rollback executed | `false` |

## Production current status

| Item | Value |
|---|---|
| Production domain | `https://regista-avanzato-rouge.vercel.app` |
| Current Production branch | `main` |
| Current Production commit | `2152017...` |
| Current Production state | old/main |
| `/competitions` on current Production | not available on old app |
| `/competitions/manual-serie-a` on current Production | not available on old app |
| Production touched in P79 | `false` |

The 404 observed on the old Production/main domain is explained by environment state, not by the P78 Preview code.

## Recommended strategy

Recommended path:

1. P80 — Production authorization gate, no-apply.
2. Confirm exact target:
   - source branch: `preview`;
   - source commit: `927506b28805f6d1ea03d380dc6bcac0ad86c090`;
   - target branch: `main`;
   - Production domain: `regista-avanzato-rouge.vercel.app`.
3. Confirm rollback app plan before merge/deploy.
4. P81 — with explicit authorization only:
   - merge `preview` into `main`;
   - push `main`;
   - let Vercel Git deployment run or perform the authorized Production deploy workflow;
   - verify Production immediately.
5. Freeze MVP Production after successful verification.

## Alternatives

| Option | Pros | Cons | Recommended |
|---|---|---|---|
| A. Merge `preview` → `main` + deploy Production | Standard Git flow; aligns Production with main; easy audit trail. | Requires explicit merge/deploy authorization; may trigger automatic Production deploy after push. | Yes |
| B. Direct Production deploy from preview commit | Avoids merge first; can target the exact tested commit if Vercel allows it. | Less standard; may complicate branch history and Production branch policy. | Only with explicit authorization and Vercel confirmation |
| C. Stay in Preview | Safest; no Production risk. | MVP not public on Production; old Production remains live. | Safe fallback |

## Risks and mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| `main` is old | High | Use explicit merge plan and verify diff/commit before push. |
| Production domain points to `main` | High | Treat any `main` push as potentially Production-impacting. |
| Automatic deploy may start after merge | High | Only merge after P80 explicit authorization and preflight. |
| Wrong Vercel project/root | High | Confirm project/root/deployment metadata before P81. |
| Provider/import activation | High | Keep provider/import flags off and rerun provider audit/writer guards. |
| Apify accidentally enabled | High | Keep Apify off; rerun provider audit. |
| DB write outside scope | High | P81 must be no additional DB write unless separately authorized. |
| Rollback app not ready | Medium | Confirm rollback target/previous Production deployment before P81. |
| Public data is minimal/manual | Medium | Document MVP scope and verify only expected public fixture. |
| Production verification delayed | High | Run immediate post-deploy checks for `/`, `/competitions`, `/competitions/manual-serie-a`. |
| Vercel Auth/config changed accidentally | High | No Vercel config changes in P79/P80/P81 unless separately authorized. |

## Future authorization requirement

Required future phrase for P81:

> Autorizzo il Punto 81: esegui il merge controllato di preview su main e il deploy Production di Regista Avanzato dal commit 927506b28805f6d1ea03d380dc6bcac0ad86c090, senza attivare provider/import, senza Apify, senza DB write aggiuntive, senza modificare configurazioni Vercel e senza toccare dati fuori scope.

The following generic phrases do not authorize merge or deploy Production:

- `vai`
- `procedi`
- `ok`
- `continua`

## Decision

- `point_79_production_release_plan_completed=true`
- `production_release_plan_created=true`
- `merge_executed=false`
- `production_deploy_executed=false`
- `production_touched=false`
- `ready_for_production_authorization_gate=true`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `db_write_additional=false`
- `rollback_executed=false`

P79 stops before merge main, deploy Production, provider activation, import provider and Apify.
