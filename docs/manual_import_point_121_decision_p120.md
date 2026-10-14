# Manual Import Point 121 Decision — From P120

P120 completed the no-apply Production release gate for the Regista Avanzato brand refresh.

## Option A — P121 Merge preview to main and deploy brand refresh

Objective:

- with separate explicit authorization, merge `preview` to `main`;
- push `main`;
- deploy or assign Production;
- verify Production after deploy.

Use this only if:

- the user explicitly authorizes P121;
- the authorization names the candidate commit:
  - `d9266d1b9ee9a62b3aa44e39445bdea94bf0ebbe`.

## Option B — P121 Brand refresh iteration

Objective:

- address any remaining visual or UX issue before Production.

Use this if:

- human review finds visual problems despite gate checks passing.

## Option C — P121 Substack creation with real URL

Objective:

- create or verify the real Substack URL.

Use this only when:

- the user wants to prioritize editorial launch infrastructure.

## Option D — P121 Canva A01 revision/export

Objective:

- revise/export the Manifesto carousel asset.

Use this if:

- asset readiness is more urgent than Production release.

## Recommended decision

- `p121_recommended=merge_preview_to_main_and_deploy_brand_refresh`

Reason:

- `release_candidate_ready=true`;
- `dry_run_full_public_path_passed=true`;
- public routes are verified;
- no safety blockers were identified.

## Authorization rule

P120 does not authorize P121.

P121 requires explicit separate authorization for:

- merge `preview` → `main`;
- push `main`;
- Production deploy or Production alias assignment;
- post-deploy verification.

Generic “procedi” style messages are not enough unless they explicitly reference P121 and the candidate commit.
