import Link from "next/link";
import { StoryCategoryBadge } from "@/components/public/StoryCategoryBadge";
import { StoryCopyrightNotice } from "@/components/public/StoryCopyrightNotice";
import { StoryRelatedItems } from "@/components/public/StoryRelatedItems";
import { StoryTimeline } from "@/components/public/StoryTimeline";
import { SubstackCTA } from "@/components/public/SubstackCTA";
import { getPublicStoryDetail } from "@/lib/storyLibrary/getPublicStoryDetail";
export const dynamic = "force-dynamic";
type Params = { storyId: string };
export default async function StoryDetailPage({ params }: { params: Params | Promise<Params> }) { const { storyId } = await Promise.resolve(params); const detail = await getPublicStoryDetail(storyId); if (!detail) return <main><h1>Storia non disponibile</h1><p>Il contenuto non esiste oppure non è approvato per il pubblico.</p><Link href="/storie">Torna alle storie</Link></main>; const story = detail.story; return <main className="stack"><header><StoryCategoryBadge category={story.category} /><h1>{story.title}</h1><p>{story.summary}</p><Link href="/storie">Tutte le storie</Link></header><StoryCopyrightNotice />{story.originalBody ? <article className="story-body"><p>{story.originalBody}</p>{story.keyFacts.length > 0 && <><h2>Punti chiave</h2><ul>{story.keyFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul></>}</article> : <p className="notice">Questa storia è disponibile soltanto come anteprima pubblica.</p>}<section><h2>Timeline</h2><StoryTimeline events={story.timeline} /></section><StoryRelatedItems items={story.relatedEntities} /><SubstackCTA label="Leggi su Substack" /></main>; }
