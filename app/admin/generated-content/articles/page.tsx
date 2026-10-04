import Link from "next/link";
import { AdminArticleDraftTable } from "@/components/admin/AdminArticleDraftTable";
import { AdminEditorialContentTable } from "@/components/admin/AdminEditorialContentTable";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminEditorialArticles } from "@/lib/admin/getAdminEditorialContent";
import { getAdminArticleDrafts } from "@/lib/articleGenerator/getAdminArticleDrafts";

export default async function AdminArticleDraftsPage() { const [drafts, articles] = await Promise.all([getAdminArticleDrafts(), getAdminEditorialArticles()]); return <main className="admin-page"><header><h2>Bozze articolo</h2><p>Articoli manuali da Supabase staging più bozze generator mock private. Nessuna pubblicazione automatica.</p><Link href="/admin/generated-content/articles/new">Nuova preview mock</Link></header><AdminEditorialContentTable result={articles} /><section className="admin-section-card"><h2>Bozze generator mock</h2><p className="muted">Questa tabella resta dry-run: AI esterne, scrittura DB e pubblicazione sono disabilitate.</p><AdminArticleDraftTable drafts={drafts} /></section><AdminWarningBox warning={{ id: "draft-private", level: "critical", title: "Area privata", message: "Questi contenuti non sono articoli pubblici e non devono essere esposti dalle route magazine senza review e workflow dedicato." }} /></main>; }
