import type { NewsRadarItem, NewsRadarRuleCheck } from "@/lib/newsRadar/newsRadarTypes";
import { AdminNewsPriorityBadge } from "./AdminNewsPriorityBadge";

export function AdminNewsReviewPanel({ item, ruleCheck }: { item: NewsRadarItem; ruleCheck: NewsRadarRuleCheck }) {
  const warnings = [...item.internalWarnings, ...ruleCheck.warnings];
  return <section className="admin-section-card"><div className="admin-card-head"><h2>Review editoriale</h2><AdminNewsPriorityBadge priority={item.priority} /></div><dl className="admin-metadata"><dt>Score</dt><dd>{item.score.total}/100</dd><dt>Stato</dt><dd>{item.reviewStatus}</dd><dt>Review umana</dt><dd>{item.reviewedByHuman ? "Eseguita" : "Obbligatoria"}</dd><dt>Pubblico eleggibile</dt><dd>{ruleCheck.publicEligible ? "Sì, dopo decisione" : "No"}</dd><dt>Auto-publish</dt><dd>Vietato</dd></dl><h3>Motivazione score</h3><ul>{item.score.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul><h3>Warning</h3>{warnings.length ? <ul>{[...new Set(warnings)].map((warning) => <li key={warning}>{warning}</li>)}</ul> : <p>Nessun warning mock.</p>}<h3>Destinazioni suggerite</h3><p>{ruleCheck.suggestedDestinations.join(", ") || "Nessuna"}</p><p className="notice">Priorità e score ordinano la queue, non autorizzano la pubblicazione.</p></section>;
}
