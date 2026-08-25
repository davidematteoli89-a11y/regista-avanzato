import { AdminNewsletterDraftTable } from "@/components/admin/AdminNewsletterDraftTable";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminNewsletterDrafts } from "@/lib/newsletterGenerator/getAdminNewsletterDrafts";

export default async function AdminSubstackPage() { const drafts = (await getAdminNewsletterDrafts()).filter((draft) => draft.plan !== "internal_only"); return <main className="admin-page"><header><h2>Queue Substack mock</h2><p>Candidati free, paid e mixed; restano bozze private admin.</p></header><AdminNewsletterDraftTable drafts={drafts} basePath="/admin/substack-content" /><AdminWarningBox warning={{ id: "substack", level: "critical", title: "Pubblicazione esterna manuale", message: "Nessuna API Substack, email, webhook o automazione è collegata. La queue non implica approvazione." }} /></main>; }
