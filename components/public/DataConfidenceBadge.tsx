import type { PublicDataMeta } from "@/lib/publicData/publicDataTypes";
export function DataConfidenceBadge({ meta }: { meta: PublicDataMeta }) { const label = meta.isMock ? "Dati dimostrativi" : meta.coverage === "partial" ? "Copertura parziale" : "Dati disponibili"; return <span className="stats-badge data-confidence">{label}</span>; }
