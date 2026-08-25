import type { ArticleDraftReviewItem } from "@/lib/articleGenerator/articleGeneratorTypes";

export function AdminArticleReviewChecklist({ items }: { items: readonly ArticleDraftReviewItem[] }) {
  return <section className="admin-section-card"><h2>Checklist review umana</h2><ol className="article-review-list">{items.map((item) => <li key={item.id} className={`review-${item.status}`}><div><strong>{item.label}</strong><p>{item.description}</p></div><span className="admin-status">{item.status}</span></li>)}</ol><p className="notice">Tutti i controlli sono obbligatori prima di scegliere una destinazione editoriale.</p></section>;
}
