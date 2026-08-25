import type { HistoricalEchoType } from "@/lib/historicalEcho/historicalEchoTypes";

export function HistoricalEchoBadge({ type }: { type: HistoricalEchoType }) {
  return <span className="echo-badge">{type.replaceAll("_", " ")}</span>;
}
