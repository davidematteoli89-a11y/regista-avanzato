import Link from "next/link";
import { AdminDailyRadarRulesPanel } from "@/components/admin/AdminDailyRadarRulesPanel";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
export default function AdminDailyRadarRulesPage() { return <main className="admin-page"><header><h2>Regole Daily Radar</h2><p>Confini tecnici, editoriali e copyright della modalità mock.</p><Link href="/admin/daily-radar">Torna al Daily Radar</Link></header><AdminDailyRadarRulesPanel /><AdminWarningBox warning={{ id: "apify-weekly-only", level: "critical", title: "Apify mai daily", message: "Il Daily Radar non può avviare run Apify. L’arricchimento dei campionati minori resta nel batch weekly separato." }} /></main>; }
