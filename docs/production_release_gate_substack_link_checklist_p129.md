# Production Release Gate for Substack Link Checklist — P129

## Repository and diff

- [x] Branch is `preview`.
- [x] P128 HEAD matches `origin/preview`.
- [x] Main baseline recorded.
- [x] Candidate code commit is an ancestor of Preview HEAD.
- [x] Only P128 documentation follows the candidate commit.
- [x] Full `origin/main..origin/preview` diff classified.
- [x] No env or Vercel configuration change.
- [x] No Supabase migration, RLS or auth change.
- [x] No admin, provider, API, import or writer change.
- [x] Pre-existing `Logo/` excluded.

## Substack integration

- [x] Real URL is centralized.
- [x] Navbar uses centralized URL.
- [x] Footer uses centralized URL.
- [x] Homepage CTA uses centralized URL.
- [x] Shared CTA uses centralized URL.
- [x] `target="_blank"` verified.
- [x] `rel="noopener noreferrer"` verified.
- [x] No divergent or placeholder URL in the active public integration.
- [x] No Substack API or automatic publication.
- [x] No unconfirmed internal paid promise introduced.

## Functional and safety checks

- [x] Eight requested local routes returned HTTP 200.
- [x] Logo asset returned HTTP 200 as PNG.
- [x] Public competition data visible where expected.
- [x] No `private_admin` marker.
- [x] No admin link.
- [x] No debug/raw payload.
- [x] No operational write button.
- [x] Full public path dry-run passed.
- [x] Final env checklist passed.
- [x] Provider audit passed.
- [x] Provider writer guards passed.
- [x] Lint passed.
- [x] Typecheck passed.
- [x] Build passed.

## Preview and Vercel limits

- [x] Preview P128 deployment READY and SHA confirmed read-only.
- [x] Candidate P127 deployment READY and SHA confirmed read-only.
- [x] Production project/domain/main deployment inspected read-only.
- [x] Historical alias risk included in P130 plan.
- [x] No Deployment Protection bypass attempted.
- [x] `preview_remote_content_verified=false` recorded.
- [x] `responsive_static_verified=true` recorded.
- [x] `responsive_browser_verified=unknown` recorded.

## No-apply safety

- [x] No merge.
- [x] No push to main.
- [x] No deploy.
- [x] No alias assignment.
- [x] Production untouched.
- [x] No database write.
- [x] Provider/import off.
- [x] Apify off.
- [x] No newsletter or content publication.

## Decision

- `point_129_production_release_gate_substack_link_completed=true`
- `gate_ready=true`
- `release_candidate_ready=true`
- `checks_passed=true`
- `p130_requires_explicit_authorization=true`
