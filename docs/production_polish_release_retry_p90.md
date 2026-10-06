# Production Polish Release Retry — P90

## Scope

- merge preview to main;
- Production deploy of public product polish;
- stabilized full public path dry-run;
- no provider/import;
- no Apify;
- no DB write;
- no Vercel config/env/root directory changes.

## Authorization

Autorizzazione esplicita ricevuta:

```text
Autorizzo il Punto 90-Retry: esegui il merge controllato di preview su main e il deploy Production del public product polish di Regista Avanzato dal commit preview 659c2c88fe62f9f5a8a83414cc8fb6daf9b1d70c, usando il dry-run stabilizzato con server locale attivo prima del merge, senza attivare provider/import, senza Apify, senza DB write aggiuntive, senza modificare configurazioni Vercel, senza modificare env, senza modificare Root Directory e senza toccare dati fuori scope.
```

## Context

- P90 originale è stato fermato prima del merge perché `full-public-path-verification` non distingueva correttamente server locale non disponibile e dati pubblici vuoti.
- P90-A ha diagnosticato il problema come disponibilità runtime/local data, non regressione reale.
- P90-B ha stabilizzato il dry-run con stati diagnostici espliciti.
- P90-Retry è stato autorizzato per merge controllato `preview` → `main` e rilascio Production del public product polish.

## Commits

| Item | Commit |
| --- | --- |
| Candidate preview commit | `659c2c88fe62f9f5a8a83414cc8fb6daf9b1d70c` |
| Main before merge | `690742762615b6cd5dcd434d1635968269a9dacd` |
| Main after merge | `d890f6e8f68f6d76ef12d659930855971c72d627` |
| Pushed main commit | `d890f6e8f68f6d76ef12d659930855971c72d627` |
| Docs commit | pending at document creation time |

## Merge result

- `merge_executed=true`
- `conflicts=false`
- `main_pushed=true`
- `main_after_merge=d890f6e8f68f6d76ef12d659930855971c72d627`

Files involved summary:

- public UI/copy files;
- public components;
- stabilized dry-run script;
- documentation.

No provider/import, schema/RLS, env, Vercel config, Root Directory or DB write path was changed.

## Checks

| Check | Result |
| --- | --- |
| `dry-run:final-env-checklist` on preview | passed |
| `audit:providers` on preview | passed |
| `dry-run:provider-writer-guards` on preview | passed |
| `lint` on preview | passed |
| `typecheck` on preview | passed |
| `build` on preview | passed |
| `dry-run:full-public-path-verification` with server on preview | passed |
| `dry-run:final-env-checklist` on main | passed |
| `audit:providers` on main | passed |
| `dry-run:provider-writer-guards` on main | passed |
| `lint` on main | passed |
| `typecheck` on main | passed |
| `build` on main | passed |
| `dry-run:full-public-path-verification` with server on main | passed |

## Production verification

Production URL:

- `https://regista-avanzato-rouge.vercel.app`

| Route | Expected | Result | Notes |
| --- | --- | --- | --- |
| `/` | HTTP 200 | HTTP 200 | Home reached, public polish visible. |
| `/competitions` | HTTP 200, data visible | HTTP 200, data visible | Public competitions visible, including `Serie A Manual Sample`. |
| `/competitions/manual-serie-a` | HTTP 200, data visible | HTTP 200, data visible | Detail visible with teams and standings. |

Production safety checks:

- `private_admin_publicly_exposed=false`
- `admin_links_visible=false`
- `debug_payload_visible=false`
- `operational_buttons_visible=false`
- `polish_visible=true`
- `public_data_visible=true`

## Safety

- `provider_import_enabled=false`
- `apify_enabled=false`
- `db_write_additional=false`
- `rollback_executed=false`
- `vercel_config_changed=false`
- `vercel_env_changed=false`
- `vercel_root_directory_changed=false`
- `service_role_used=false`
- `token_printed=false`
- `cookies_printed=false`
- `headers_printed=false`

## Decision

- `point_90_retry_production_polish_release_completed=true`
- `production_polish_released=true`
- `merge_executed=true`
- `main_pushed=true`
- `production_deploy_verified=true`
- `stabilized_dry_run_used=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `vercel_config_changed=false`
- `vercel_env_changed=false`
- `vercel_root_directory_changed=false`
- `rollback_executed=false`
