import Link from "next/link";
import { AdminStoryTable } from "@/components/admin/AdminStoryTable";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminStories } from "@/lib/storyLibrary/getAdminStories";
export default async function AdminStoryLibraryPage() { const stories = await getAdminStories(); return <main className="admin-page"><header><h2>Story Library</h2><p>Tutte le storie mock, incluse bozze, review e rifiuti.</p><nav className="section-nav"><Link href="/admin/story-library/import">Preview import</Link><Link href="/admin/story-library/sources">Fonti</Link></nav></header><AdminStoryTable stories={stories} /><AdminWarningBox warning={{ id: "publish", level: "warning", title: "Auto-publish vietato", message: "Ogni storia richiede review umana, fact-check e controllo copyright." }} /></main>; }
