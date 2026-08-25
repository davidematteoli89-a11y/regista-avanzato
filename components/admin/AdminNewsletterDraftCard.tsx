import Link from "next/link";
import type { NewsletterDraft } from "@/lib/newsletterGenerator/newsletterGeneratorTypes";
import { AdminNewsletterFormatBadge } from "./AdminNewsletterFormatBadge";
import { AdminSubstackPlanBadge } from "./AdminSubstackPlanBadge";

export function AdminNewsletterDraftCard({ draft, basePath = "/admin/generated-content/newsletters" }: { draft: NewsletterDraft; basePath?: string }) { return <article className="admin-section-card"><div className="admin-card-head"><AdminNewsletterFormatBadge format={draft.format} /><span className={`admin-status risk-${draft.riskLevel}`}>{draft.riskLevel}</span></div><h2>{draft.title}</h2><p>{draft.preheader}</p><div className="stats-badge-row"><AdminSubstackPlanBadge plan={draft.plan} /><span className="admin-status">{draft.status}</span><span className="admin-status">{draft.visibility}</span></div><p>{draft.sources.length} fonti · {draft.sections.length} sezioni · invio automatico: no</p><Link href={`${basePath}/${draft.id}`}>Apri bozza privata</Link></article>; }
