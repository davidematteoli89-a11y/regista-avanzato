import { AdminImportLogList } from "@/components/admin/AdminImportLogList";
import { getAdminImports } from "@/lib/admin/getAdminImports";
export default async function AdminImportsPage() { const logs = await getAdminImports(); return <main className="admin-page"><header><h2>Import</h2><p>Pipeline dry-run/mock. Nessuna fetch, run o scrittura.</p></header><AdminImportLogList logs={logs} /></main>; }
