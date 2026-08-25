import Link from "next/link";
import { AdminHistoricalEchoTable } from "@/components/admin/AdminHistoricalEchoTable";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminHistoricalEchoes } from "@/lib/historicalEcho/getAdminHistoricalEchoes";

export default async function AdminHistoricalEchoPage() {
  const echoes = await getAdminHistoricalEchoes();
  return <main className="admin-page"><header><h2>Historical Echo</h2><p>Collegamenti mock tra eventi moderni e Story Library, inclusi candidati e contenuti rifiutati.</p><nav className="section-nav"><Link href="/admin/historical-echo/candidates">Candidati del motore</Link><Link href="/admin/historical-echo/rules">Regole editoriali</Link></nav></header><AdminHistoricalEchoTable echoes={echoes} /><AdminWarningBox warning={{ id: "echo-review", level: "warning", title: "Review obbligatoria", message: "Score e confidence aiutano il triage: non autorizzano pubblicazione, articoli o script automatici." }} /></main>;
}
