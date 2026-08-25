import type { StoryItem } from "@/lib/storyLibrary/storyTypes";
import { StoryCategoryBadge } from "@/components/public/StoryCategoryBadge";
import { StoryStatusBadge } from "@/components/public/StoryStatusBadge";
export function AdminStoryMetadataBox({ story }: { story: StoryItem }) { return <section className="admin-section-card"><div className="stats-badge-row"><StoryCategoryBadge category={story.category} /><StoryStatusBadge status={story.status} /></div><h2>Metadati</h2><dl className="admin-metadata"><dt>Visibilità</dt><dd>{story.visibility}</dd><dt>Formato</dt><dd>{story.format}</dd><dt>Review</dt><dd>{story.reviewStatus}</dd><dt>Fonti</dt><dd>{story.sourceIds.length}</dd><dt>Pubblicazione automatica</dt><dd>vietata</dd></dl></section>; }
