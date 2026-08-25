import { AdminContentQueue } from "@/components/admin/AdminContentQueue";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminVideoRadar } from "@/lib/admin/getAdminVideoRadar";
export default async function AdminVideoRadarPage() { const items = await getAdminVideoRadar(); return <main className="admin-page"><header><h2>Video Radar</h2><p>Script, grafiche e contenuti originali mock.</p></header><AdminContentQueue items={items} /><AdminWarningBox warning={{ id: "copyright", level: "warning", title: "Copyright", message: "Nessun download, reupload o storage di clip partita." }} /></main>; }
