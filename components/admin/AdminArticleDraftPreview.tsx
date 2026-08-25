import type { ArticleDraft } from "@/lib/articleGenerator/articleGeneratorTypes";
import { AdminArticleFormatBadge } from "./AdminArticleFormatBadge";

export function AdminArticleDraftPreview({ draft }: { draft: ArticleDraft }) {
  return <article className="admin-section-card article-draft-preview"><header><div className="stats-badge-row"><AdminArticleFormatBadge format={draft.format} /><span className="admin-status">{draft.status}</span><span className="admin-status">{draft.visibility}</span></div><h1>{draft.title}</h1><p>{draft.subtitle}</p></header>{draft.sections.filter((section) => section.kind !== "title" && section.kind !== "subtitle").map((section) => <section key={section.id}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className="muted">Confidenza: {section.factConfidence} · fonti: {section.sourceIds.length}</p></section>)}</article>;
}
