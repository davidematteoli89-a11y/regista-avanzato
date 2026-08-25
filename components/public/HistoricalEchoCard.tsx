import Link from "next/link";
import type { PublicHistoricalEcho } from "@/lib/historicalEcho/historicalEchoTypes";
import { HistoricalEchoBadge } from "./HistoricalEchoBadge";
import { HistoricalEchoConfidenceBadge } from "./HistoricalEchoConfidenceBadge";

export function HistoricalEchoCard({ echo }: { echo: PublicHistoricalEcho }) {
  return <article className="historical-echo-card"><div className="stats-badge-row"><HistoricalEchoBadge type={echo.type} /><HistoricalEchoConfidenceBadge confidence={echo.confidence} label={echo.confidenceLabel} /></div><h2>{echo.title}</h2><p>{echo.summary}</p><p className="echo-reason">{echo.publicReason}</p><Link href={`/il-calcio-si-ripete/${echo.slug}`}>{echo.visibility === "public_preview" ? "Guarda l’anteprima" : "Confronta presente e passato"}</Link></article>;
}
