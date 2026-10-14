# Brand Refresh Green Cleanup — P117

## Scope

- public UI color cleanup;
- remove green legacy leftovers;
- no deploy;
- no merge;
- no Production;
- no DB write;
- no provider/import;
- no Apify;
- no Substack integration.

## Current baseline

| Item | Value |
|---|---|
| P116 commit | `a872379910064aa7d6100aecca24ab7e0cb11471` |
| Production domain | `https://regista-avanzato-rouge.vercel.app/` |
| Substack status | `not_created_or_not_confirmed` |
| Canva asset status | `partial_manual` |
| Brand refresh status | `completed_on_preview` |

## Issue found

L’utente ha rilevato elementi verdi residui in “Chi siamo”, “Account” e “Metodo”.

## Search performed

Ricerca eseguita nello scope pubblico:

- `green`
- `emerald`
- `lime`
- `teal`
- hex verdi espliciti;
- classi Tailwind verdi;
- vecchi token cromatici green/teal presenti in `app/globals.css`.

## Files changed

- `app/globals.css`
- `docs/brand_refresh_green_cleanup_p117.md`
- `docs/brand_refresh_green_cleanup_checklist_p117.md`
- `docs/manual_import_point_118_decision_p117.md`
- `docs/provider_point_117_closure.md`
- `docs/production_readiness.md`
- `docs/c_phase_progress.md`
- `docs/supabase_staging_next_steps.md`

## Fix applied

### Chi siamo

Rimossi i vecchi verdi ereditati dalle classi globali usate da:

- `about-grid`;
- `public-cta`;
- link/CTA;
- testo muted/border/card.

Sostituiti con palette blu/indaco/viola:

- card navy/indigo;
- bordi `rgba(169,154,209,0.24)`;
- accent violet/blue;
- testo `#F4F4F5` / `#B8B8C7`.

### Account

Rimossi residui verdi globali da:

- `account-menu`;
- box account/access;
- form/input;
- link/CTA.

Sostituiti con:

- primary blue;
- accent violet;
- card background;
- border soft.

Logica auth invariata.

### Metodo

Rimossi residui verdi da:

- `method-steps`;
- notice;
- CTA login/free;
- card/step border.

Sostituiti con:

- step card indigo;
- border violet soft;
- accent violet/blue;
- micro-glow coerente col brand.

## Remaining green references

Nessuna occorrenza green/emerald/lime/teal o vecchi hex verdi nello scope pubblico ricercato:

- `app/(public)`
- `components/public`
- `app/globals.css`
- `public`

## Verification

- final-env: passed
- audit providers: passed
- writer guards: passed
- lint: passed
- typecheck: passed
- build: passed
- route checks locali: passed
- public data visible: true
- no private/admin/debug/raw: true
- legacy marker status: `partial_legacy_home_marker_unexpected`

## Decision

- `point_117_brand_refresh_green_cleanup_completed=true`
- `brand_green_cleanup_ready=true`
- `code_change=true`
- `green_leftovers_removed=true`
- `chi_siamo_green_fixed=true`
- `account_green_fixed=true`
- `metodo_green_fixed=true`
- `public_routes_verified=true`
- `public_data_visible=true`
- `legacy_marker_false_negative=true`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
- `site_integration_done=false`
- `publication_ready=false`
- `no_merge=true`
- `no_deploy=true`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `p118_recommended=preview_brand_verification_or_legacy_marker_update`
