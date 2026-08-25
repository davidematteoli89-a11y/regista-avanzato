import Link from "next/link";
import { AdminVideoScriptGeneratorPanel } from "@/components/admin/AdminVideoScriptGeneratorPanel";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
export default function AdminNewVideoScriptPage() { return <main className="admin-page"><header><h2>Nuovo script video</h2><p>Pannello mock senza submit, AI, video, rete o persistenza.</p><Link href="/admin/generated-content/video-scripts">Torna agli script</Link></header><AdminVideoScriptGeneratorPanel /><AdminWarningBox warning={{ id: "video-generator-disabled", level: "info", title: "Placeholder sicuro", message: "Le fixture sono generate dal codice. Il pannello non esegue operazioni e non accede a media locali." }} /></main>; }
