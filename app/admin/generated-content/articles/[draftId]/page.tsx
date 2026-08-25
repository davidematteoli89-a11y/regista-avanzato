import Link from "next/link";
import { AdminArticleDraftPreview } from "@/components/admin/AdminArticleDraftPreview";
import { AdminArticleReviewChecklist } from "@/components/admin/AdminArticleReviewChecklist";
import { AdminArticleRiskBox } from "@/components/admin/AdminArticleRiskBox";
import { AdminArticleSourcePanel } from "@/components/admin/AdminArticleSourcePanel";
import { getAdminArticleDraftDetail } from "@/lib/articleGenerator/getAdminArticleDraftDetail";

type Params = { draftId: string };

export default async function AdminArticleDraftDetailPage({ params }: { params: Params | Promise<Params> }) { const { draftId } = await Promise.resolve(params); const detail = await getAdminArticleDraftDetail(draftId); if (!detail) return <main className="admin-page"><h2>Bozza non trovata</h2><Link href="/admin/generated-content/articles">Torna alle bozze</Link></main>; const draft = detail.draft; return <main className="admin-page"><header><h2>{draft.title}</h2><p>{draft.subtitle}</p><Link href="/admin/generated-content/articles">Torna alle bozze</Link></header><AdminArticleRiskBox riskLevel={draft.riskLevel} risks={draft.risks} /><div className="article-admin-detail"><AdminArticleDraftPreview draft={draft} /><AdminArticleSourcePanel sources={draft.sources} /></div><AdminArticleReviewChecklist items={draft.reviewChecklist} /><section className="admin-section-card"><h2>Markdown mock in memoria</h2><pre className="article-markdown-preview">{draft.markdownPreview}</pre><p className="muted">AI esterne: {detail.externalAiCalls} · scritture: 0 · auto-publish: {detail.canPublishAutomatically ? "sì" : "no"} · privato admin: {detail.privateAdminOnly ? "sì" : "no"}.</p></section></main>; }
