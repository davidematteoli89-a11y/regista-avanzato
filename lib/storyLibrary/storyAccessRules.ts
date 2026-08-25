import type { StoryItem } from "./storyTypes";
export function isPublicStory(story: StoryItem): boolean { return (story.status === "approved" || story.status === "published") && (story.visibility === "public_preview" || story.visibility === "public_full"); }
export function canShowFullStory(story: StoryItem): boolean { return isPublicStory(story) && story.visibility === "public_full"; }
export const STORY_PUBLIC_ACCESS = { consumesSearchQuota: false as const, showsPrivateMetadata: false as const, autoPublishes: false as const };
