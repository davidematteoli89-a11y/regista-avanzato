import type { EmbedAvailability } from "@/lib/videoRadar/videoRadarTypes";
const LABELS: Record<EmbedAvailability, string> = { allowed: "Embed consentito", external_link_only: "Solo link esterno", unknown: "Embed da verificare", not_allowed: "Embed non consentito" };
export function EmbedAvailabilityBadge({ availability }: { availability: EmbedAvailability }) { return <span className="stats-badge embed-badge">{LABELS[availability]}</span>; }
