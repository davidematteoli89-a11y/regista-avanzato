import { AdminContentQueue } from "@/components/admin/AdminContentQueue";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminContentQueue } from "@/lib/admin/getAdminContentQueue";
export default async function AdminContentRadarPage() { const items = await getAdminContentQueue("content_radar"); return <main className="admin-page"><header><h2>Content Radar</h2><p>Candidati editoriali derivati da trigger mock.</p></header><AdminContentQueue items={items} /><AdminWarningBox warning={{ id: "publish", level: "warning", title: "Review obbligatoria", message: "Nessun candidato viene pubblicato automaticamente." }} /></main>; }
