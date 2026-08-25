import type { HistoricalEcho } from "@/lib/historicalEcho/historicalEchoTypes";

export function AdminHistoricalEchoReviewPanel({ echo }: { echo: HistoricalEcho }) {
  return <section className="admin-section-card"><h2>Review editoriale</h2><dl className="admin-metadata"><dt>Score</dt><dd>{echo.score.total}/100</dd><dt>Confidence</dt><dd>{echo.score.confidence}</dd><dt>Trigger</dt><dd>{echo.trigger.type} · {echo.trigger.strength}</dd><dt>Review umana</dt><dd>{echo.reviewedByHuman ? "Eseguita" : "Obbligatoria"}</dd><dt>Auto-publish</dt><dd>Vietato</dd></dl><h3>Motivazione score</h3><ul>{echo.score.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul><h3>Warning</h3>{echo.internalWarnings.length ? <ul>{echo.internalWarnings.map((warning) => <li key={warning}>{warning}</li>)}</ul> : <p>Nessun warning mock.</p>}<p className="notice">Lo score ordina i candidati: non autorizza mai la pubblicazione.</p></section>;
}
