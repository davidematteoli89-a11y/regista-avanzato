import type { HistoricalEchoComparisonPoint, HistoricalEchoRelatedMatch } from "@/lib/historicalEcho/historicalEchoTypes";

export function HistoricalEchoComparison({ points, matches }: { points: readonly HistoricalEchoComparisonPoint[]; matches: readonly HistoricalEchoRelatedMatch[] }) {
  if (!points.length) return <p className="notice">Il confronto completo richiede approvazione editoriale.</p>;
  return <section className="echo-comparison"><h2>Il confronto</h2>{matches.length > 0 && <div className="echo-match-head">{matches.map((match) => <article key={match.id}><span>{match.isModern ? "Presente" : "Passato"}</span><strong>{match.label}</strong><p>{match.scoreline ?? "Risultato da verificare"} · {match.dateLabel}</p></article>)}</div>}<div className="table-scroll"><table className="stats-table"><thead><tr><th>Punto</th><th>Evento moderno</th><th>Precedente narrativo</th><th>Affinità</th></tr></thead><tbody>{points.map((point) => <tr key={point.id}><td>{point.label}</td><td>{point.modernValue}</td><td>{point.historicalValue}</td><td>{point.similarity}</td></tr>)}</tbody></table></div></section>;
}
