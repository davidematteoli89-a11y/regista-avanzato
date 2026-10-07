# Editorial Pages Implementation — P96

## Scope

- static editorial public pages;
- no merge main;
- no deploy;
- no DB write;
- no provider/import;
- no Apify;
- no automatic Substack publishing;
- no Vercel/env/root changes.

## Pages created

| Page | Route | Purpose |
|---|---|---|
| Manifesto | `/manifesto` | Pubblicare il manifesto editoriale “Perché nasce Regista Avanzato” e chiarire identità, confini e metodo del progetto. |
| Rubriche | `/rubriche` | Presentare le rubriche editoriali iniziali e le voci operative collegate. |

## Content source

I contenuti derivano dai documenti editoriali già approvati:

- P92 — editorial content plan + voices architecture;
- P93 — first editorial content pack;
- P94 — editorial publication plan;
- P95 — Substack launch pack.

## Navigation changes

Sono stati aggiunti link pubblici coerenti a:

- navigazione principale: Manifesto e Rubriche;
- homepage hero: Manifesto e Rubriche;
- sezione homepage “Cosa trovi”: link a Manifesto e Rubriche;
- footer pubblico: Manifesto e Rubriche.

Non sono stati aggiunti link Substack inventati.

## Local verification

| Route | Expected | Result |
|---|---|---|
| `/` | HTTP 200, home pubblica raggiungibile, link a Manifesto/Rubriche/Competizioni | `passed` |
| `/manifesto` | HTTP 200, pagina editoriale statica, CTA a `/competitions` e `/rubriche` | `passed` |
| `/rubriche` | HTTP 200, pagina editoriale statica, CTA a `/manifesto` e `/competitions` | `passed` |
| `/competitions` | HTTP 200, dati pubblici ancora visibili | `passed` |
| `/competitions/manual-serie-a` | HTTP 200, dettaglio pubblico ancora visibile | `passed` |

## Safety

- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `private_admin_publicly_exposed=false`
- `admin_links_visible=false`
- `debug_raw_payload_visible=false`
- `operational_buttons_visible=false`
- `substack_auto_publishing=false`
- `vercel_config_changed=false`
- `vercel_env_changed=false`
- `vercel_root_directory_changed=false`

## Decision

- `point_96_editorial_pages_implemented=true`
- `editorial_pages_created=true`
- `manifesto_page_created=true`
- `rubriche_page_created=true`
- `p97_recommended=preview_verification_editorial_pages`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
