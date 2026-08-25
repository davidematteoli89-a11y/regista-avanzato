import Link from "next/link";
import { AdminWeeklyDigestRulesPanel } from "@/components/admin/AdminWeeklyDigestRulesPanel";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
export default function AdminWeeklyDigestRulesPage() { return <main className="admin-page"><header><h2>Regole Weekly Digest</h2><p>Confini editoriali, tecnici, commerciali e copyright.</p><Link href="/admin/weekly-digest">Torna ai digest</Link></header><AdminWeeklyDigestRulesPanel /><AdminWarningBox warning={{ id: "weekly-apify", level: "critical", title: "Apify snapshot only", message: "Il digest può leggere soltanto output weekly mock/salvati. Non può chiamare Apify direttamente o avviare run daily." }} /></main>; }
