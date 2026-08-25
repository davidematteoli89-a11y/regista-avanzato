import Link from "next/link";
import type { ArticleDraft } from "@/lib/articleGenerator/articleGeneratorTypes";
import { AdminArticleFormatBadge } from "./AdminArticleFormatBadge";

export function AdminArticleDraftCard({ draft }: { draft: ArticleDraft }) {
  return <article className="admin-section-card"><div className="admin-card-head"><AdminArticleFormatBadge format={draft.format} /><span className={`admin-status risk-${draft.riskLevel}`}>{draft.riskLevel}</span></div><h2>{draft.title}</h2><p>{draft.subtitle}</p><p>{draft.sources.length} fonti · {draft.sections.length} sezioni · {draft.status}</p><Link href={`/admin/generated-content/articles/${draft.id}`}>Apri bozza</Link></article>;
}
