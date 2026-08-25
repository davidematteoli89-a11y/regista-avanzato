import { AdminNewsRulesPanel } from "@/components/admin/AdminNewsRulesPanel";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";

export default function AdminNewsRulesPage() { return <main className="admin-page"><header><h2>Regole News Radar</h2><p>Guard editoriali per fonti, rumor, titoli e destinazioni future.</p></header><AdminNewsRulesPanel /><AdminWarningBox warning={{ id: "no-publish", level: "critical", title: "Pubblicazione automatica vietata", message: "Nessuno score, segnale o suggerimento può creare o pubblicare una news senza decisione umana." }} /></main>; }
