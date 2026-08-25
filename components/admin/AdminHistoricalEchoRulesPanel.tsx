import type { HistoricalEchoRule } from "@/lib/historicalEcho/historicalEchoTypes";

export function AdminHistoricalEchoRulesPanel({ rules }: { rules: readonly HistoricalEchoRule[] }) {
  return <div className="admin-section-grid">{rules.map((rule) => <article className="admin-section-card" key={rule.id}><div className="admin-card-head"><h2>{rule.name}</h2><span className="admin-status">soglia {rule.minimumReviewScore}</span></div><p>{rule.description}</p><p><strong>Trigger:</strong> {rule.triggerTypes.join(", ")}</p><p><strong>Destinazioni ammesse:</strong> {rule.allowedDestinations.join(", ")}</p><p className="notice">Review umana obbligatoria.</p></article>)}</div>;
}
