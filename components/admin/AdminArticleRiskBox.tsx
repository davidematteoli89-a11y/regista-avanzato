import type { ArticleDraftRisk, ArticleDraftRiskLevel } from "@/lib/articleGenerator/articleGeneratorTypes";

export function AdminArticleRiskBox({ riskLevel, risks }: { riskLevel: ArticleDraftRiskLevel; risks: readonly ArticleDraftRisk[] }) {
  return <section className={`admin-warning article-risk risk-${riskLevel}`}><strong>Rischio complessivo: {riskLevel}</strong>{risks.length ? <ul>{risks.map((risk) => <li key={risk.id}><strong>{risk.code}</strong>: {risk.message}</li>)}</ul> : <p>Nessun rischio specifico rilevato dal mock. Review umana comunque obbligatoria.</p>}<p>Pubblicazione automatica: vietata.</p></section>;
}
