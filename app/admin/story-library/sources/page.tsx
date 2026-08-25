import { AdminStorySourcePanel } from "@/components/admin/AdminStorySourcePanel";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { MOCK_STORY_SOURCES } from "@/lib/storyLibrary/mockStoryLibrary";
export default function AdminStorySourcesPage() { return <main className="admin-page"><header><h2>Fonti Story Library</h2><p>Metadati mock, affidabilità e obblighi di review.</p></header><AdminStorySourcePanel sources={MOCK_STORY_SOURCES} /><AdminWarningBox warning={{ id: "sources", level: "warning", title: "Testi integrali assenti", message: "Nessun PDF, libro, articolo o video è stato acquisito o copiato." }} /></main>; }
