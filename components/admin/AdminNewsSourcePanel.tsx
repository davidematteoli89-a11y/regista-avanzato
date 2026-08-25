import type { NewsRadarSource } from "@/lib/newsRadar/newsRadarTypes";
import { checkNewsSource } from "@/lib/newsRadar/newsSourceRules";

export function AdminNewsSourcePanel({ sources }: { sources: readonly NewsRadarSource[] }) {
  return <div className="admin-section-grid">{sources.map((source) => { const check = checkNewsSource(source); return <article className="admin-section-card" key={source.id}><div className="admin-card-head"><h2>{source.name}</h2><span className={`admin-status source-${source.reliability}`}>{source.reliability}</span></div><dl className="admin-metadata"><dt>Tipo</dt><dd>{source.type}</dd><dt>Classificazione</dt><dd>{check.classification}</dd><dt>Pubblico</dt><dd>{check.allowedPublicly ? "Compatibile" : "Bloccato"}</dd><dt>Verifica</dt><dd>Solo regole offline</dd></dl><p>{source.referenceLabel}</p>{source.internalNote && <p className="notice">{source.internalNote}</p>}{check.warnings.length > 0 && <ul>{check.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul>}</article>; })}</div>;
}
