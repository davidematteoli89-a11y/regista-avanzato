# Merge Deploy Brand Refresh Checklist — P121

- [x] explicit authorization received;
- [x] candidate commit verified;
- [x] current main verified;
- [x] post-candidate diff reviewed;
- [x] pre-merge checks passed;
- [x] preview merged to main;
- [x] main pushed;
- [x] Production deploy created or Production domain updated;
- [x] Production domain assigned to correct updated site state;
- [x] Production routes verified;
- [x] brand refresh visible in Production;
- [x] public data visible in Production;
- [x] no private/admin/debug/raw exposed;
- [x] no operational buttons;
- [x] no DB write;
- [x] no provider/import;
- [x] no Apify;
- [x] no Substack URL invented;
- [x] no Substack integration;
- [x] no social/Substack/newsletter publication;
- [x] no env/Vercel config changes;
- [x] no secrets printed;
- [x] docs updated;
- [x] preview synced after main.

## Notes

- Deployment metadata inspection from local CLI did not return a deployment id.
- Production domain route checks passed after the main push.
- Commit metadata verification is therefore recorded as `unknown_metadata_unavailable`, while route verification is `true`.
