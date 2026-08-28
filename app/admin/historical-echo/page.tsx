import Link from "next/link";
import { AdminEditorialContentTable } from "@/components/admin/AdminEditorialContentTable";
import { AdminHistoricalEchoTable } from "@/components/admin/AdminHistoricalEchoTable";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminHistoricalEchoes as getAdminSupabaseHistoricalEchoes } from "@/lib/admin/getAdminEditorialContent";
import { getAdminHistoricalEchoes } from "@/lib/historicalEcho/getAdminHistoricalEchoes";

export default async function AdminHistoricalEchoPage() {
  const [echoes, supabaseEchoes] = await Promise.all([getAdminHistoricalEchoes(), getAdminSupabaseHistoricalEchoes()]);
  return <main className="admin-page"><header><h2>Historical Echo</h2><p>Echo manuali da Supabase staging e collegamenti mock tra eventi moderni e Story Library.</p><nav className="section-nav"><Link href="/admin/historical-echo/candidates">Candidati del motore</Link><Link href="/admin/historical-echo/rules">Regole editoriali</Link></nav></header><AdminEditorialContentTable result={supabaseEchoes} /><section className="admin-section-card"><h2>Motore mock/dry-run</h2><p className="muted">Score e candidati restano strumenti interni: nessuna pubblicazione o generazione automatica.</p><AdminHistoricalEchoTable echoes={echoes} /></section><AdminWarningBox warning={{ id: "echo-review", level: "warning", title: "Review obbligatoria", message: "Score e confidence aiutano il triage: non autorizzano pubblicazione, articoli o script automatici." }} /></main>;
}
