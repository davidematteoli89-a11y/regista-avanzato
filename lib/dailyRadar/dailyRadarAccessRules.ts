import type { DailyRadarCandidate, DailyRadarItem } from "./dailyRadarTypes";
export function isPrivateAdminDailyRadar(item: DailyRadarItem): boolean { return item.visibility === "private_admin"; }
export function canAutomaticallyPublishDailyRadarItem(_item: DailyRadarItem): false { return false; }
export function canAutomaticallySendDailyRadarItem(_item: DailyRadarItem): false { return false; }
export function canAutomaticallyProduceDailyRadarCandidate(_candidate: DailyRadarCandidate): false { return false; }
export const DAILY_RADAR_ACCESS = { adminOnly: true as const, exposesTechnicalScoresPublicly: false as const, consumesUserSearchQuota: false as const, callsProviders: false as const, callsApify: false as const, callsExternalAi: false as const, sendsEmail: false as const, writesFiles: false as const, writesDatabase: false as const, createsScheduler: false as const };
