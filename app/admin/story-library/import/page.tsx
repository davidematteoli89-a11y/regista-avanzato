import { AdminStoryImportPreview } from "@/components/admin/AdminStoryImportPreview";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { MOCK_MARKDOWN_STORY } from "@/lib/storyLibrary/mockStoryLibrary";
import { parseMarkdownStory } from "@/lib/storyLibrary/markdownStoryParser";
export default function AdminStoryImportPage() { const preview = parseMarkdownStory(MOCK_MARKDOWN_STORY); return <main className="admin-page"><header><h2>Import Markdown — preview</h2><p>Il parser riceve una stringa mock: file letti 0, PDF importati 0.</p></header><AdminStoryImportPreview preview={preview} /><AdminWarningBox warning={{ id: "import", level: "critical", title: "Import reale disabilitato", message: "Nessun filesystem, database o pubblicazione è collegato." }} /></main>; }
