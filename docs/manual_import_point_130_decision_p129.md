# P130 Decision after Production Substack Release Gate

## Recommended option

P130 — Merge and deploy Substack link only if explicitly authorized.

The candidate is technically ready, but P129 does not authorize any release action. P130 requires a separate explicit authorization covering:

- merge of `preview` into `main`;
- push to `main`;
- Production deployment or promotion;
- assignment of `regista-avanzato-rouge.vercel.app` if the alias does not follow the correct READY deployment;
- post-deploy verification of SHA, homepage, logo, Substack link and safety markers.

Generic messages such as “procedi”, “vai” or “continua” do not authorize P130.

## Required P130 controls

1. Confirm candidate code commit `32f9397d9a720f433d1483bc620085cdc5f3ac1c` remains in the authorized Preview head.
2. Confirm current `main` and the complete merge delta.
3. Re-run the safety/build suite on the exact release state.
4. Stop on conflicts or unexpected changes.
5. Verify the READY deployment's Git SHA.
6. Verify the Production domain resolves to that deployment; do not assume automatic alias movement.
7. Assign/promote the alias only within explicit authorization.
8. Verify Production routes, logo and Substack link after release.
9. Keep provider/import and Apify off and perform no DB write.

## Current decision

- `release_candidate_ready=true`
- `p130_recommended=merge_deploy_substack_link_only_if_authorized`
- `p130_requires_explicit_authorization=true`
- `merge_authorized=false`
- `main_push_authorized=false`
- `production_deploy_authorized=false`
- `production_alias_assignment_authorized=false`
