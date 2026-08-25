import Link from "next/link";
import { AdminArticleDraftTable } from "@/components/admin/AdminArticleDraftTable";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminArticleDrafts } from "@/lib/articleGenerator/getAdminArticleDrafts";

export default async function AdminArticleDraftsPage() { const drafts = await getAdminArticleDrafts(); return <main className="admin-page"><header><h2>Bozze articolo</h2><p>Tutte le bozze mock restano `private_admin`, incluse quelle bloccate o ad alto rischio.</p><Link href="/admin/generated-content/articles/new">Nuova preview mock</Link></header><AdminArticleDraftTable drafts={drafts} /><AdminWarningBox warning={{ id: "draft-private", level: "critical", title: "Area privata", message: "Questi contenuti non sono articoli pubblici e non devono essere esposti dalle route magazine." }} /></main>; }
