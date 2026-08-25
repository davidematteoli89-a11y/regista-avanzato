import Link from "next/link";
import type { StoryItem } from "@/lib/storyLibrary/storyTypes";
import { StoryStatusBadge } from "@/components/public/StoryStatusBadge";
export function AdminStoryTable({ stories }: { stories: readonly StoryItem[] }) { return <div className="table-scroll"><table className="stats-table admin-table"><thead><tr><th>Titolo</th><th>Categoria</th><th>Stato</th><th>Visibilità</th><th>Review</th></tr></thead><tbody>{stories.map((story) => <tr key={story.id}><td><Link href={`/admin/story-library/${story.id}`}>{story.title}</Link></td><td>{story.category}</td><td><StoryStatusBadge status={story.status} /></td><td>{story.visibility}</td><td>{story.reviewStatus}</td></tr>)}</tbody></table></div>; }
