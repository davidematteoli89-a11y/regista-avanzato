import type { HistoricalEchoRelatedMatch } from "@/lib/historicalEcho/historicalEchoTypes";

export function AdminHistoricalEchoMatchPreview({ matches }: { matches: readonly HistoricalEchoRelatedMatch[] }) {
  return <section className="admin-section-card"><h2>Partite collegate</h2>{matches.length ? <div className="admin-log-list">{matches.map((match) => <article key={match.id}><strong>{match.label}</strong><p>{match.scoreline ?? "Scoreline non disponibile"} · {match.dateLabel} · {match.isModern ? "moderna" : "storica"}</p></article>)}</div> : <p className="admin-empty-inline">Nessuna partita collegata.</p>}</section>;
}
