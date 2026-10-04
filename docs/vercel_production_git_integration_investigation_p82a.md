# Vercel Production Git Integration Investigation — P82-A

## Scope

P82-A è una diagnosi read-only sul perché il push di `main` non ha aggiornato la Production URL.

Non sono stati eseguiti:

- deploy manuali;
- `vercel --prod`;
- modifiche a configurazioni Vercel;
- modifiche a Vercel Authentication;
- merge aggiuntivi;
- push aggiuntivi su `main`;
- DB write;
- rollback;
- provider/import;
- Apify;
- lettura o stampa di `.env.local`;
- stampa di token, cookie o header auth.

## Context

P81-B ha eseguito merge controllato `preview` → `main` e push su `origin/main`.

Stato noto:

- `p81b_merge_executed=true`
- `p81b_main_pushed=true`
- `main_head_after_merge=ab5067ca2f40c434d13ada87a71be0024069e8bd`
- `origin/main=ab5067ca2f40c434d13ada87a71be0024069e8bd`
- `origin/preview=ccaf417357ee6159a6fe96504893d12f4b65cd3a`
- `p81b_production_deploy_executed=false`
- Production URL osservata: `https://regista-avanzato-rouge.vercel.app`

Dopo il push di `main`, la Production URL ha continuato a servire la versione vecchia:

- `/`: HTTP 200 ma contenuto vecchio;
- `/competitions`: HTTP 404;
- `/competitions/manual-serie-a`: HTTP 404;
- `/competizioni/serie-a`: HTTP 200.

## Local Git state

| Check | Result |
| --- | --- |
| branch iniziale | `preview` |
| working tree iniziale | clean |
| `origin/main` | `ab5067ca2f40c434d13ada87a71be0024069e8bd` |
| `origin/preview` | `ccaf417357ee6159a6fe96504893d12f4b65cd3a` |
| branch finale previsto | `preview` |

## Local `main` verification

Il branch `main` locale è stato verificato senza deploy.

| Check | Result |
| --- | --- |
| branch verificato | `main` |
| `app/(public)/competitions/page.tsx` | exists |
| `app/(public)/competitions/[slug]/page.tsx` | exists |
| route legacy `/competizioni` | exists |
| `npm run build` su `main` | pass |
| Next build route `/competitions` | present |
| Next build route `/competitions/[slug]` | present |
| localhost `/` | HTTP 200 |
| localhost `/competitions` | HTTP 200 |
| localhost `/competitions/manual-serie-a` | HTTP 200 |
| localhost `/competizioni/serie-a` | HTTP 200 |
| `dry-run:full-public-path-verification` su server locale | pass |

Conclusione locale: il commit merge su `main` contiene le route nuove e le serve correttamente in build locale.

## Routing and project structure

| Check | Result |
| --- | --- |
| `next.config.ts` | empty config object |
| `vercel.json` | not present |
| rewrite/redirect applicativi evidenti | not found |
| middleware sorgente | not found |
| project `package.json` sorgente | single project-level `package.json` |
| app directory sorgente | single project-level `app/` |
| root directory multipla probabile dal repo locale | false |

Nota: sono presenti anche `node_modules/` e `.next/`, ma non rappresentano root sorgenti alternative.

## Production URL read-only observation

Controllo HTTP read-only su `https://regista-avanzato-rouge.vercel.app`:

| Route | Status | Observation |
| --- | ---: | --- |
| `/` | 200 | contenuto vecchio; non contiene riferimenti al percorso `/competitions` |
| `/competitions` | 404 | route nuova non servita |
| `/competitions/manual-serie-a` | 404 | route nuova non servita |
| `/competizioni/serie-a` | 200 | route legacy italiana ancora servita |

## Vercel read-only findings

Il connettore Vercel read-only disponibile per il team `davide-matteoli` ha restituito:

| Check | Result |
| --- | --- |
| team accessibile | `davide-matteoli` |
| Git-linked projects visibili | solo `aidady-business-os` |
| `regista-avanzato` fra i Git-linked projects visibili | false |
| deployments filtrati per app `regista-avanzato` | 0 |
| deployment per commit `ab5067ca2f40c434d13ada87a71be0024069e8bd` | unknown/not visible |
| Vercel project corretto | unknown/not visible |
| repository collegato corretto | unknown/not visible |
| Production Branch | unknown/not visible |
| Root Directory | unknown/not visible |
| auto deploy / ignored build step | unknown/not visible |
| Vercel config changed | false |

Questo non prova da solo che il progetto non esista su Vercel, ma indica che l'account/team accessibile al connettore non espone `regista-avanzato` come progetto Git-linked o come deployment recente.

## Diagnosis

Diagnosi più probabile:

```text
likely_cause=G_OR_A
```

Interpretazione:

- G — la Production domain `regista-avanzato-rouge.vercel.app` potrebbe puntare a un altro progetto Vercel rispetto al repo pushato;
- A — la Git integration del progetto Production potrebbe essere assente, scollegata o collegata a repository/account diverso;
- D — localmente `main` è corretto, ma la Production sta servendo una app/deployment vecchia.

Confidence: alta sul fatto che il problema non sia il codice del commit `ab5067c`; media sulla causa Vercel precisa, perché le impostazioni del progetto `regista-avanzato` non sono visibili dal connettore disponibile.

## Recommended next step

Prima di qualsiasi deploy manuale o modifica:

1. Aprire la Dashboard Vercel manualmente.
2. Verificare quale progetto possiede `regista-avanzato-rouge.vercel.app`.
3. Verificare Git repository collegato, Production Branch, Root Directory, Ignored Build Step e stato Auto Deploy.
4. Cercare una deployment associata al commit `ab5067ca2f40c434d13ada87a71be0024069e8bd`.
5. Solo dopo conferma esplicita separata scegliere tra:
   - correggere la Git integration;
   - autorizzare deploy/promote controllato;
   - riallineare dominio/progetto.

## Safety markers

- `point_82a_vercel_git_integration_investigation_completed=true`
- `p81b_merge_executed=true`
- `p81b_main_pushed=true`
- `p81b_production_deploy_executed=false`
- `p81b_failure_reason=production_not_updated_after_main_push`
- `production_url_still_old=true`
- `production_competitions_404=true`
- `main_contains_competitions_locally=true`
- `main_local_build_passed=true`
- `deployment_for_ab5067_visible=false`
- `deployment_for_ab5067_exists=unknown`
- `vercel_project_correct=unknown`
- `repository_linked_correct=unknown`
- `production_branch=unknown`
- `root_directory=unknown`
- `auto_deploy_status=unknown`
- `ignored_build_step_status=unknown`
- `likely_cause=G_OR_A`
- `recommended_next_step=manual_vercel_dashboard_git_integration_check`
- `deploy_executed=false`
- `vercel_config_changed=false`
- `production_touched=false`
- `production_code_not_updated=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `rollback_executed=false`
- `secrets_printed=false`
