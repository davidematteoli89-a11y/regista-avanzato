import Link from "next/link";
import type { HistoricalEcho } from "@/lib/historicalEcho/historicalEchoTypes";

export function AdminHistoricalEchoTable({ echoes }: { echoes: readonly HistoricalEcho[] }) {
  return <div className="table-scroll"><table className="stats-table admin-table"><thead><tr><th>Titolo</th><th>Tipo</th><th>Stato</th><th>Score</th><th>Confidence</th><th>Review</th></tr></thead><tbody>{echoes.map((echo) => <tr key={echo.id}><td><Link href={`/admin/historical-echo/${echo.id}`}>{echo.title}</Link></td><td>{echo.type}</td><td>{echo.status}</td><td>{echo.score.total}/100</td><td>{echo.score.confidence}</td><td>{echo.reviewedByHuman ? "umana" : "necessaria"}</td></tr>)}</tbody></table></div>;
}
