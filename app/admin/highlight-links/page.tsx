import { AdminContentQueue } from "@/components/admin/AdminContentQueue";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminHighlightLinks } from "@/lib/admin/getAdminHighlightLinks";
export default async function AdminHighlightLinksPage() { const items = await getAdminHighlightLinks(); return <main className="admin-page"><header><h2>Highlight Links</h2><p>Solo metadati e fonti ufficiali soggette a review.</p></header><AdminContentQueue items={items} /><AdminWarningBox warning={{ id: "links", level: "warning", title: "URL reali assenti", message: "Non sono presenti link cliccabili, embed o file video." }} /></main>; }
