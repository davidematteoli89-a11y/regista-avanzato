import type { StoryCategory } from "@/lib/storyLibrary/storyTypes";
export function StoryCategoryBadge({ category }: { category: StoryCategory }) { return <span className="story-badge category">{category.replaceAll("_", " ")}</span>; }
