import Link from "next/link";
import { AdminNewsletterDraftTable } from "@/components/admin/AdminNewsletterDraftTable";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminNewsletterDrafts } from "@/lib/newsletterGenerator/getAdminNewsletterDrafts";

export default async function AdminNewsletterDraftsPage() { const drafts = await getAdminNewsletterDrafts(); return <main className="admin-page"><header><h2>Bozze Newsletter / Substack</h2><p>Bozze deterministiche mock, tutte private e soggette a review umana.</p><Link href="/admin/generated-content/newsletters/new">Nuova preview mock</Link></header><AdminNewsletterDraftTable drafts={drafts} /><AdminWarningBox warning={{ id: "newsletter-private", level: "critical", title: "Nessun invio o pubblicazione", message: "Il modulo non chiama Substack, non invia email e non espone queste bozze nelle route pubbliche." }} /></main>; }
