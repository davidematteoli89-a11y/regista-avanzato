# Manual Import Point 119 Decision — From P118

P118 completed the preview/local brand verification after P116/P117 without code changes, deploy, merge, DB write, provider/import, Apify or Substack integration.

## Option A — P119 Legacy marker update

Objective:

- update `dry-run:full-public-path-verification` to recognize the new P116/P117/P118 homepage markup;
- keep route/data verification unchanged;
- avoid deploy, Production and DB write unless separately authorized.

Use this if:

- the only remaining issue is `home_state=markup_unexpected`;
- human visual review accepts the P116/P117 brand state.

## Option B — P119 Brand refresh iteration

Objective:

- refine visual UI if human review identifies remaining issues;
- keep no deploy/no Production/no DB write unless separately authorized.

Use this if:

- typography, spacing, contrast, responsive behavior or visual hierarchy need further polish.

## Option C — P119 Production release gate for brand refresh

Objective:

- prepare a no-apply gate for releasing the brand refresh to Production.

Use this only if:

- preview verification is accepted;
- the legacy marker is resolved or formally bypassed;
- an explicit Production authorization gate is requested.

## Option D — P119 Substack creation with real URL

Objective:

- create or verify a real Substack publication URL manually;
- do not invent or integrate a URL before it is real and verified.

Use this if:

- editorial launch work takes priority over marker update or brand iteration.

## Recommended decision

Recommended:

- `p119_recommended=legacy_marker_update_or_brand_refresh_iteration`

Specifically:

- choose Option A if the only residual issue is the legacy marker;
- choose Option B if visual review finds additional brand polish items.

## Safety markers

- `merge_executed=false`
- `deploy_executed=false`
- `production_touched=false`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `substack_created=false`
- `substack_url_status=not_created_or_not_confirmed`
