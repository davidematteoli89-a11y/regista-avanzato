import Link from "next/link";
import { AdminNewsletterDraftPreview } from "@/components/admin/AdminNewsletterDraftPreview";
import { AdminNewsletterReviewChecklist } from "@/components/admin/AdminNewsletterReviewChecklist";
import { AdminNewsletterRiskBox } from "@/components/admin/AdminNewsletterRiskBox";
import { AdminNewsletterSourcePanel } from "@/components/admin/AdminNewsletterSourcePanel";
import { getAdminNewsletterDraftDetail } from "@/lib/newsletterGenerator/getAdminNewsletterDraftDetail";

type Params = { draftId: string };

export default async function AdminNewsletterDraftDetailPage({ params }: { params: Params | Promise<Params> }) { const { draftId } = await Promise.resolve(params); const detail = await getAdminNewsletterDraftDetail(draftId); if (!detail) return <main className="admin-page"><h2>Bozza non trovata</h2><Link href="/admin/generated-content/newsletters">Torna alle bozze</Link></main>; const { draft } = detail; return <main className="admin-page"><header><h2>{draft.title}</h2><p>{draft.preheader}</p><Link href="/admin/generated-content/newsletters">Torna alle bozze</Link></header><AdminNewsletterRiskBox riskLevel={draft.riskLevel} risks={draft.risks} /><div className="article-admin-detail"><AdminNewsletterDraftPreview draft={draft} /><AdminNewsletterSourcePanel sources={draft.sources} /></div><AdminNewsletterReviewChecklist items={draft.reviewChecklist} /><section className="admin-section-card"><h2>Markdown mock in memoria</h2><pre className="article-markdown-preview">{draft.markdownPreview}</pre><p className="muted">AI esterne: {detail.externalAiCalls} · API Substack: {detail.substackApiCalls} · email: {detail.emailsSent} · database/file: 0 · auto-publish: no · auto-send: no.</p></section></main>; }
