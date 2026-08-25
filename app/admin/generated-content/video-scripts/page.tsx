import Link from "next/link";
import { AdminVideoScriptTable } from "@/components/admin/AdminVideoScriptTable";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminVideoScripts } from "@/lib/videoScriptGenerator/getAdminVideoScripts";
export default async function AdminVideoScriptsPage() { const scripts = await getAdminVideoScripts(); return <main className="admin-page"><header><h2>Reel / Video Script</h2><p>Bozze testuali deterministiche, tutte private e prive di media.</p><Link href="/admin/generated-content/video-scripts/new">Nuova preview mock</Link></header><AdminVideoScriptTable scripts={scripts} /><AdminWarningBox warning={{ id: "video-script-private", level: "critical", title: "Nessun video o pubblicazione", message: "Gli script non scaricano clip, non generano media e non avviano produzione o pubblicazione." }} /></main>; }
