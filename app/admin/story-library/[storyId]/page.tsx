import Link from "next/link";
import { AdminStoryMetadataBox } from "@/components/admin/AdminStoryMetadataBox";
import { AdminStoryReviewPanel } from "@/components/admin/AdminStoryReviewPanel";
import { AdminStorySourcePanel } from "@/components/admin/AdminStorySourcePanel";
import { getAdminStoryDetail } from "@/lib/storyLibrary/getAdminStoryDetail";
type Params = { storyId: string };
export default async function AdminStoryDetailPage({ params }: { params: Params | Promise<Params> }) { const { storyId } = await Promise.resolve(params); const detail = await getAdminStoryDetail(storyId); if (!detail) return <main className="admin-page"><h2>Storia non trovata</h2><Link href="/admin/story-library">Torna alla libreria</Link></main>; return <main className="admin-page"><header><h2>{detail.story.title}</h2><p>{detail.story.summary}</p><Link href="/admin/story-library">Torna alla libreria</Link></header><div className="admin-section-grid"><AdminStoryMetadataBox story={detail.story} /><AdminStoryReviewPanel story={detail.story} copyright={detail.copyright} /></div><AdminStorySourcePanel sources={detail.sources} /><section className="admin-section-card"><h2>Nota originale/rielaborata</h2><p>{detail.story.originalBody}</p></section></main>; }
