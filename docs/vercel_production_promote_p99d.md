# Vercel Production Promote — P99-D

## Scope

- manual promote/assign existing READY deployment;
- Production domain assignment;
- post-promote verification;
- no config/env/root changes;
- no DB write;
- no provider/import;
- no Apify;
- no Substack auto-publishing;
- no rollback automatico.

## Authorization

Autorizzazione esplicita ricevuta:

```text
Autorizzo il Punto 99-D: assegna/promuovi manualmente il deployment Vercel READY dpl_C8icKQYUPNxvhELo9e9b2LkQ4Up4 del commit main 8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83 al dominio Production regista-avanzato-rouge.vercel.app, senza modificare configurazioni Vercel, senza modificare env, senza modificare Root Directory, senza DB write, senza attivare provider/import, senza Apify, senza pubblicare automaticamente su Substack e senza rollback automatico.
```

## Target

| Item | Value |
|---|---|
| Project | `regista-avanzato` |
| Project ID | `prj_QjrP39psXIzOsVsJN7nP641e16OQ` |
| Repo | `davidematteoli89-a11y/regista-avanzato` |
| Production domain | `regista-avanzato-rouge.vercel.app` |
| Target deployment ID | `dpl_C8icKQYUPNxvhELo9e9b2LkQ4Up4` |
| Target deployment URL | `regista-avanzato-lhiluf8ee-davide-matteoli.vercel.app` |
| Target commit | `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` |
| Target branch | `main` |
| Target status before action | `READY` |
| Previous Production deployment ID | `dpl_9wA5xFVNtrEHtXJWDEKVdi34fsP7` |
| Previous Production commit | `ab5067ca2f40c434d13ada87a71be0024069e8bd` |
| Final assigned deployment | `dpl_C8icKQYUPNxvhELo9e9b2LkQ4Up4` |
| Final assigned commit | `8d20c0e6d6088d9a1a525fd3b8f11de3dcf0ce83` |

## Action executed

| Item | Value |
|---|---|
| Promote/assign executed | `true` |
| Action type | `assign_alias_to_ready_deployment` |
| Authorized domain assigned | `regista-avanzato-rouge.vercel.app` |
| Timestamp indicativo | `2026-10-08 15:56:32 CEST` |
| New deployment id generated | `false` |
| Old deployment id detached from alias | `dpl_9wA5xFVNtrEHtXJWDEKVdi34fsP7` |
| Domain assigned to target | `true` |

No Vercel config, env, Root Directory, Git integration, build command, install command, ignored build step, provider/import, DB data, schema/RLS or Substack publishing was modified.

## Production verification

| Route | Expected | Result | Notes |
|---|---|---|---|
| `/` | HTTP 200 | HTTP 200 | Home reachable. |
| `/manifesto` | HTTP 200 | HTTP 200 | Editorial manifesto visible. |
| `/rubriche` | HTTP 200 | HTTP 200 | Editorial rubriche visible. |
| `/competitions` | HTTP 200, data visible | HTTP 200, data visible | Public data still visible. |
| `/competitions/manual-serie-a` | HTTP 200, data visible | HTTP 200, data visible | Public detail still visible. |

Forbidden markers checked:

- `private_admin_publicly_exposed=false`
- `admin_links_visible=false`
- `debug_raw_payload_visible=false`
- `operational_buttons_visible=false`
- `invented_substack_url=false`
- `substack_auto_published=false`

## Safety

- `vercel_config_changed=false`
- `vercel_env_changed=false`
- `vercel_root_directory_changed=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `private_admin_publicly_exposed=false`
- `admin_links_visible=false`
- `debug_raw_payload_visible=false`
- `operational_buttons_visible=false`
- `invented_substack_url=false`
- `substack_auto_published=false`
- `rollback_executed=false`

## Decision

- `point_99d_vercel_production_promote_completed=true`
- `production_editorial_pages_released=true`
- `p99_recovered_after_alias_promote=true`
- `production_deploy_verified=true`
- `target_deployment_assigned_to_domain=true`
- `editorial_pages_visible=true`
- `public_data_visible=true`
- `no_deploy_config_change=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `vercel_config_changed=false`
- `vercel_env_changed=false`
- `vercel_root_directory_changed=false`
- `substack_auto_published=false`
- `rollback_executed=false`
- `p100_recommended=post_production_editorial_pages_verification`
