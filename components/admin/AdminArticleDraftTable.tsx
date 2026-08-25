import Link from "next/link";
import type { ArticleDraft } from "@/lib/articleGenerator/articleGeneratorTypes";
import { AdminArticleFormatBadge } from "./AdminArticleFormatBadge";

export function AdminArticleDraftTable({ drafts }: { drafts: readonly ArticleDraft[] }) {
  return <div className="table-scroll"><table className="stats-table admin-table"><thead><tr><th>Titolo</th><th>Formato</th><th>Stato</th><th>Rischio</th><th>Fonti</th><th>Visibilità</th></tr></thead><tbody>{drafts.map((draft) => <tr key={draft.id}><td><Link href={`/admin/generated-content/articles/${draft.id}`}>{draft.title}</Link></td><td><AdminArticleFormatBadge format={draft.format} /></td><td>{draft.status}</td><td>{draft.riskLevel}</td><td>{draft.sources.length}</td><td>{draft.visibility}</td></tr>)}</tbody></table></div>;
}
