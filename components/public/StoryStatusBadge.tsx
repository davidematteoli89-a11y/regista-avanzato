import type { StoryStatus } from "@/lib/storyLibrary/storyTypes";
export function StoryStatusBadge({ status }: { status: StoryStatus }) { return <span className={`story-badge status-${status}`}>{status.replaceAll("_", " ")}</span>; }
