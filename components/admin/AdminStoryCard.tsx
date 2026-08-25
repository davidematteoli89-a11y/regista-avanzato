import Link from "next/link";
import type { StoryItem } from "@/lib/storyLibrary/storyTypes";
import { AdminStoryMetadataBox } from "./AdminStoryMetadataBox";
export function AdminStoryCard({ story }: { story: StoryItem }) { return <article className="admin-story-card"><h2>{story.title}</h2><p>{story.summary}</p><AdminStoryMetadataBox story={story} /><Link href={`/admin/story-library/${story.id}`}>Apri dettaglio review</Link></article>; }
