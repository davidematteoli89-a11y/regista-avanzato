import Link from "next/link";
import { AdminEditorialContentTable } from "@/components/admin/AdminEditorialContentTable";
import { AdminStoryTable } from "@/components/admin/AdminStoryTable";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminStories as getAdminSupabaseStories } from "@/lib/admin/getAdminEditorialContent";
import { getAdminStories } from "@/lib/storyLibrary/getAdminStories";
export default async function AdminStoryLibraryPage() { const [stories, supabaseStories] = await Promise.all([getAdminStories(), getAdminSupabaseStories()]); return <main className="admin-page"><header><h2>Story Library</h2><p>Storie manuali da Supabase staging e dataset mock con bozze, review e rifiuti.</p><nav className="section-nav"><Link href="/admin/story-library/import">Preview import</Link><Link href="/admin/story-library/sources">Fonti</Link></nav></header><AdminEditorialContentTable result={supabaseStories} /><section className="admin-section-card"><h2>Dataset mock/dry-run</h2><p className="muted">Import Markdown/PDF, upload e pubblicazioni restano disabilitati.</p><AdminStoryTable stories={stories} /></section><AdminWarningBox warning={{ id: "publish", level: "warning", title: "Auto-publish vietato", message: "Ogni storia richiede review umana, fact-check e controllo copyright." }} /></main>; }
