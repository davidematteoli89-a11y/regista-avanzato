import Link from "next/link";
import { AdminNewsletterDraftPreview } from "@/components/admin/AdminNewsletterDraftPreview";
import { AdminNewsletterReviewChecklist } from "@/components/admin/AdminNewsletterReviewChecklist";
import { AdminNewsletterRiskBox } from "@/components/admin/AdminNewsletterRiskBox";
import { AdminNewsletterSourcePanel } from "@/components/admin/AdminNewsletterSourcePanel";
import { getAdminNewsletterDraftDetail } from "@/lib/newsletterGenerator/getAdminNewsletterDraftDetail";

type Params = { draftId: string };

export default async function AdminSubstackDraftDetailPage({ params }: { params: Params | Promise<Params> }) { const { draftId } = await Promise.resolve(params); const detail = await getAdminNewsletterDraftDetail(draftId); if (!detail || detail.draft.plan === "internal_only") return <main className="admin-page"><h2>Contenuto Substack non trovato</h2><Link href="/admin/substack-content">Torna alla queue</Link></main>; const { draft } = detail; return <main className="admin-page"><header><h2>{draft.title}</h2><p>Candidato {draft.plan}, ancora privato e non inviato.</p><Link href="/admin/substack-content">Torna alla queue</Link></header><AdminNewsletterRiskBox riskLevel={draft.riskLevel} risks={draft.risks} /><div className="article-admin-detail"><AdminNewsletterDraftPreview draft={draft} /><AdminNewsletterSourcePanel sources={draft.sources} /></div><AdminNewsletterReviewChecklist items={draft.reviewChecklist} /><section className="admin-section-card"><h2>Stato integrazioni</h2><dl className="admin-metadata"><dt>API Substack</dt><dd>Non collegata · 0 chiamate</dd><dt>Email</dt><dd>0 inviate</dd><dt>Pubblicazione</dt><dd>Disabilitata</dd><dt>Review umana</dt><dd>Obbligatoria</dd></dl></section></main>; }
