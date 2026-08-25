import type { HistoricalEchoCandidate } from "@/lib/historicalEcho/historicalEchoTypes";

export function AdminHistoricalEchoCandidateBox({ candidate }: { candidate: HistoricalEchoCandidate }) {
  return <article className="admin-section-card"><div className="admin-card-head"><h2>{candidate.editorialSuggestion.headline}</h2><span className="admin-status status-dry_run">{candidate.score.total}/100</span></div><p>{candidate.explanation}</p><dl className="admin-metadata"><dt>Trigger</dt><dd>{candidate.trigger.type}</dd><dt>Storia</dt><dd>{candidate.relatedStory.title}</dd><dt>Confidence</dt><dd>{candidate.score.confidence}</dd><dt>Output</dt><dd>Solo idea editoriale</dd></dl><ul>{candidate.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul></article>;
}
