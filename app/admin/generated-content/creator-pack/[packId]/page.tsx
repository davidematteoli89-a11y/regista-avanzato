import Link from "next/link";
import { AdminCreatorPackPreview } from "@/components/admin/AdminCreatorPackPreview";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminCreatorPackDetail } from "@/lib/videoScriptGenerator/getAdminCreatorPackDetail";
type Params = { packId: string };
export default async function AdminCreatorPackDetailPage({ params }: { params: Params | Promise<Params> }) { const { packId } = await Promise.resolve(params); const detail = await getAdminCreatorPackDetail(packId); if (!detail) return <main className="admin-page"><h2>Creator Pack non trovato</h2><Link href="/admin/generated-content/creator-pack">Torna ai pack</Link></main>; return <main className="admin-page"><header><h2>{detail.pack.title}</h2><Link href="/admin/generated-content/creator-pack">Torna ai pack</Link></header><AdminCreatorPackPreview pack={detail.pack} /><AdminWarningBox warning={{ id: "creator-pack-operations", level: "info", title: "Operazioni eseguite: zero", message: "Video, AI, download, upload, file, database e pubblicazioni restano disabilitati." }} /></main>; }
