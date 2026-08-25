import type { WeeklyDigest, WeeklyDigestCandidate } from "./weeklyDigestTypes";
export function isPrivateAdminWeeklyDigest(digest: WeeklyDigest): boolean { return digest.visibility === "private_admin"; }
export function canAutomaticallyPublishWeeklyDigest(_digest: WeeklyDigest): false { return false; }
export function canAutomaticallySendWeeklyDigest(_digest: WeeklyDigest): false { return false; }
export function canAutomaticallyProduceWeeklyCandidate(_candidate: WeeklyDigestCandidate): false { return false; }
export const WEEKLY_DIGEST_ACCESS = { adminOnly: true as const, callsProviders: false as const, callsApify: false as const, callsSubstackApi: false as const, sendsEmail: false as const, producesVideo: false as const, callsExternalAi: false as const, consumesSearchQuota: false as const, createsScheduler: false as const, writesFiles: false as const, writesDatabase: false as const };
