import type { AuthUser } from "@/lib/auth/types";

export const PUBLIC_STATS_LOGIN_MESSAGE = "Accedi gratis per vedere statistiche complete, link highlights ufficiali e Video Radar.";
export type PublicStatsAccess = { tier: "anonymous" | "free"; canViewBaseStats: true; canViewFullStats: boolean; canViewFullHighlights: boolean; canViewFullVideoRadar: boolean; consumesSearchQuota: false; reason: string };

export function getPublicStatsAccess(user: AuthUser | null): PublicStatsAccess {
  const authenticated = Boolean(user);
  return { tier: authenticated ? "free" : "anonymous", canViewBaseStats: true, canViewFullStats: authenticated, canViewFullHighlights: authenticated, canViewFullVideoRadar: authenticated, consumesSearchQuota: false, reason: authenticated ? "Accesso free: contenuti completi disponibili dove coperti." : PUBLIC_STATS_LOGIN_MESSAGE };
}
