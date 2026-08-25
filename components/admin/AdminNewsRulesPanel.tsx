import { NEWS_RADAR_EDITORIAL_RULES } from "@/lib/newsRadar/newsRadarRules";

export function AdminNewsRulesPanel() {
  return <div className="admin-section-grid">{NEWS_RADAR_EDITORIAL_RULES.map((rule) => <article className="admin-section-card" key={rule.id}><div className="admin-card-head"><h2>{rule.title}</h2><span className="admin-status">{rule.level}</span></div><p>{rule.description}</p></article>)}</div>;
}
