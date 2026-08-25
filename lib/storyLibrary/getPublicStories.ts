import { MOCK_STORY_LIBRARY } from "./mockStoryLibrary";
import { isPublicStory, STORY_PUBLIC_ACCESS } from "./storyAccessRules";
import { filterStories, type StoryFilters } from "./storyFilters";
import { mapStoryForPublic } from "./storyMappers";
export async function getPublicStories(filters: StoryFilters = {}) { const items = filterStories(MOCK_STORY_LIBRARY.filter(isPublicStory), filters).map(mapStoryForPublic); return { items, access: STORY_PUBLIC_ACCESS, message: "Storie originali o rielaborate approvate; dataset mock." }; }
