import { MOCK_STORY_LIBRARY } from "./mockStoryLibrary";
import { isPublicStory, STORY_PUBLIC_ACCESS } from "./storyAccessRules";
import { mapStoryForPublic } from "./storyMappers";
export async function getPublicStoryDetail(storyId: string) { const story = MOCK_STORY_LIBRARY.find((item) => (item.id === storyId || item.slug === storyId) && isPublicStory(item)); return story ? { story: mapStoryForPublic(story), access: STORY_PUBLIC_ACCESS } : null; }
