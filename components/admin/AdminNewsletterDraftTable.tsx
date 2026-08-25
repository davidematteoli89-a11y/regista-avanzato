import Link from "next/link";
import type { NewsletterDraft } from "@/lib/newsletterGenerator/newsletterGeneratorTypes";
import { AdminNewsletterFormatBadge } from "./AdminNewsletterFormatBadge";
import { AdminSubstackPlanBadge } from "./AdminSubstackPlanBadge";

export function AdminNewsletterDraftTable({ drafts, basePath = "/admin/generated-content/newsletters" }: { drafts: readonly NewsletterDraft[]; basePath?: string }) { return <div className="table-scroll"><table className="stats-table admin-table"><thead><tr><th>Titolo</th><th>Formato</th><th>Piano</th><th>Stato</th><th>Rischio</th><th>Fonti</th><th>Visibilità</th></tr></thead><tbody>{drafts.map((draft) => <tr key={draft.id}><td><Link href={`${basePath}/${draft.id}`}>{draft.title}</Link></td><td><AdminNewsletterFormatBadge format={draft.format} /></td><td><AdminSubstackPlanBadge plan={draft.plan} /></td><td>{draft.status}</td><td>{draft.riskLevel}</td><td>{draft.sources.length}</td><td>{draft.visibility}</td></tr>)}</tbody></table></div>; }
