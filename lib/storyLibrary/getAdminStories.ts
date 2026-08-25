import { MOCK_STORY_LIBRARY, MOCK_STORY_SOURCES } from "./mockStoryLibrary";
import { filterStories, type StoryFilters } from "./storyFilters";
import { validateStorySource } from "./storySourceRules";
export async function getAdminStories(filters: StoryFilters = {}) { return filterStories(MOCK_STORY_LIBRARY, filters).map((story) => ({ ...story, sources: MOCK_STORY_SOURCES.filter((source) => story.sourceIds.includes(source.id)).map((source) => ({ ...source, validationWarnings: validateStorySource(source).warnings })) })); }
