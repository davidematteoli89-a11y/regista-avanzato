import type { AuthUser } from "@/lib/auth/types";
import type { VideoAccessState } from "./videoRadarTypes";
export const VIDEO_LOGIN_MESSAGE = "Accedi gratis per vedere Video Radar completo e link highlights ufficiali.";
export function getVideoAccessState(user: AuthUser | null): VideoAccessState { const free = Boolean(user); return { tier: free ? "free" : "anonymous", canViewPreview: true, canViewFullRadar: free, canViewFullHighlightLinks: free, consumesSearchQuota: false, message: free ? "Video Radar e link approvati disponibili senza consumo della quota ricerca." : VIDEO_LOGIN_MESSAGE }; }
