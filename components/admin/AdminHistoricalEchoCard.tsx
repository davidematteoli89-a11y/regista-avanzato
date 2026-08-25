import Link from "next/link";
import type { HistoricalEcho } from "@/lib/historicalEcho/historicalEchoTypes";

export function AdminHistoricalEchoCard({ echo }: { echo: HistoricalEcho }) {
  return <article className="admin-section-card"><div className="admin-card-head"><h2>{echo.title}</h2><span className={`admin-status status-${echo.status}`}>{echo.status}</span></div><p>{echo.summary}</p><p><strong>{echo.score.total}/100</strong> · confidence {echo.score.confidence}</p><p className="muted">{echo.explanation}</p><Link href={`/admin/historical-echo/${echo.id}`}>Apri review</Link></article>;
}
