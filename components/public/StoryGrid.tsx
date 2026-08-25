import type { StoryItem } from "@/lib/storyLibrary/storyTypes";
import { StoryCard } from "./StoryCard";
export function StoryGrid({ stories }: { stories: readonly StoryItem[] }) { return stories.length ? <div className="story-grid">{stories.map((story) => <StoryCard key={story.id} story={story} />)}</div> : <p className="notice">Nessuna storia pubblica approvata disponibile.</p>; }
