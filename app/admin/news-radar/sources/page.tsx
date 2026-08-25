import { AdminNewsSourcePanel } from "@/components/admin/AdminNewsSourcePanel";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { MOCK_NEWS_RADAR_SOURCES } from "@/lib/newsRadar/mockNewsRadarData";

export default function AdminNewsSourcesPage() { return <main className="admin-page"><header><h2>Fonti News Radar</h2><p>Classificazione mock e controlli offline: nessun URL viene verificato o chiamato.</p></header><AdminNewsSourcePanel sources={MOCK_NEWS_RADAR_SOURCES} /><AdminWarningBox warning={{ id: "source-offline", level: "warning", title: "Verifica online assente", message: "Affidabilità e classificazione sono fixture mock; fonti reali richiederanno workflow e fact-check." }} /></main>; }
