# Manual Import Point 120 Decision — From P119

P119 resolved the legacy marker false negative in `dry-run:full-public-path-verification` without public UI changes, deploy, merge, DB write, provider/import, Apify or Substack integration.

## Option A — P120 Production release gate for brand refresh

Objective:

- prepare a no-apply gate for bringing the P116/P117/P119 brand refresh toward Production.

Use this if:

- `dry-run:full-public-path-verification` passes;
- preview/local route checks remain clean;
- the user wants to plan a controlled release.

## Option B — P120 Brand refresh iteration

Objective:

- refine the public UI further if human visual review identifies remaining issues.

Use this if:

- spacing, typography, contrast, responsive behavior or visual hierarchy need more polish.

## Option C — P120 Substack creation with real URL

Objective:

- create or verify the real Substack publication URL manually.

Use this only when:

- a real Substack URL exists or the user explicitly proceeds with manual creation;
- no placeholder URL is invented.

## Option D — P120 Canva A01 revision/export

Objective:

- revise and export the A01 Manifesto carousel asset.

Use this if:

- asset pipeline takes priority over brand release planning.

## Recommended decision

Recommended:

- `p120_recommended=production_release_gate_for_brand_refresh`

Reason:

- public path dry-run now passes;
- route checks remain clean;
- no UI regressions were introduced by P119.

## Safety markers

- `merge_executed=false`
- `deploy_executed=false`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
