import type { StorySource } from "@/lib/storyLibrary/storyTypes";
export function StorySourceBadge({ source }: { source: StorySource }) { return <span className={`story-badge source-${source.reliability}`}>{source.type.replaceAll("_", " ")} · {source.reliability}</span>; }
