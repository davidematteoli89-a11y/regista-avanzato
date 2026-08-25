import { AdminSectionCard } from "@/components/admin/AdminSectionCard";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import { getAdminApiUsage } from "@/lib/admin/getAdminApiUsage";
export default async function AdminApiUsagePage() { const usage = await getAdminApiUsage(); return <main className="admin-page"><header><h2>API Usage</h2><p>Budget provider stabile placeholder; nessun token esposto.</p></header><AdminSectionCard title={usage.provider} description={usage.note}><AdminStatusBadge status={usage.status} /><ul><li>Richieste reali: {usage.realRequests}</li><li>Log mock: {usage.mockLogEntries}</li><li>Budget giornaliero: non configurato</li><li>Budget mensile: non configurato</li></ul></AdminSectionCard></main>; }
