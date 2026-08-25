import Link from "next/link";
import type { StoryItem } from "@/lib/storyLibrary/storyTypes";
import { StoryCategoryBadge } from "./StoryCategoryBadge";
import { StoryStatusBadge } from "./StoryStatusBadge";
export function StoryCard({ story }: { story: StoryItem }) { return <article className="story-card"><div className="stats-badge-row"><StoryCategoryBadge category={story.category} /><StoryStatusBadge status={story.status} /></div><h2>{story.title}</h2><p>{story.summary}</p><div className="search-result-meta">{story.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><Link href={`/storie/${story.slug}`}>{story.visibility === "public_preview" ? "Leggi l’anteprima" : "Leggi la storia"}</Link></article>; }
