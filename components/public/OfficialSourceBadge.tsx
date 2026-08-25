import type { OfficialVideoSource } from "@/lib/videoRadar/videoRadarTypes";
export function OfficialSourceBadge({ source }: { source: OfficialVideoSource }) { return <span className={`stats-badge ${source.verified ? "source-verified" : "source-review"}`}>{source.verified ? "Fonte ufficiale verificata" : "Fonte da verificare"} · {source.name}</span>; }
