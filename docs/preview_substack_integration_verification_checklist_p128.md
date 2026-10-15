# Preview Substack Integration Verification Checklist — P128

- [x] Substack URL verified in public code
- [x] URL centralized in `lib/substack/publicSubstack.ts`
- [x] No placeholder or divergent Substack URL found
- [x] External-link attributes are safe
- [x] Navbar verified
- [x] Footer verified
- [x] Homepage CTA verified
- [x] Shared CTA components verified
- [x] Local route checks passed for all requested routes
- [x] Responsive behavior verified by static CSS plus HTTP audit
- [x] Public competition data visible where expected
- [x] No `private_admin` marker or out-of-scope private data visible
- [x] No admin/debug/raw content visible
- [x] No operational write buttons visible
- [x] No newsletter sent
- [x] No social content published
- [x] No Substack content auto-published
- [x] No DB write
- [x] No provider fetch/import
- [x] Apify off
- [x] No merge
- [x] No deploy
- [x] Production untouched
- [x] Lint passed
- [x] Typecheck passed
- [x] Build passed

The matching Preview deployment is READY on the P127 commit. Remote protected content could not be inspected without an authorized Vercel session; no protection bypass or unsafe workaround was attempted. Local no-auth HTTP verification and static responsive inspection provide the P128 functional evidence.
