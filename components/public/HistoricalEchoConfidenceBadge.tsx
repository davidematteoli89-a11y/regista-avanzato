import type { HistoricalEchoConfidence } from "@/lib/historicalEcho/historicalEchoTypes";

export function HistoricalEchoConfidenceBadge({ confidence, label }: { confidence: HistoricalEchoConfidence; label: string }) {
  return <span className={`echo-confidence confidence-${confidence}`}>{label}</span>;
}
