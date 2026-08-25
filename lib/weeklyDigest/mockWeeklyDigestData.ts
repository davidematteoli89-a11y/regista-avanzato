import { runWeeklyDigest } from "./weeklyDigestEngine";
export const MOCK_WEEKLY_DIGEST_RUNS = [runWeeklyDigest({ digestId: "weekly-digest-2026-w35", weekStart: "2026-08-24", weekEnd: "2026-08-30", title: "Weekly Digest — settimana 35", mode: "mock" }), runWeeklyDigest({ digestId: "weekly-digest-2026-w34", weekStart: "2026-08-17", weekEnd: "2026-08-23", title: "Weekly Digest — archivio mock", mode: "mock", signalLimit: 12 })];
export const MOCK_WEEKLY_DIGESTS = MOCK_WEEKLY_DIGEST_RUNS.map((run) => run.digest);
