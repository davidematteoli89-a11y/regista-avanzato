import type { CreatorPack, VideoScriptDraft } from "./videoScriptTypes";
export function isPrivateAdminVideoScript(draft: VideoScriptDraft): boolean { return draft.visibility === "private_admin"; }
export function isPrivateAdminCreatorPack(pack: CreatorPack): boolean { return pack.visibility === "private_admin"; }
export function canAutomaticallyProduceVideo(_draft: VideoScriptDraft): false { return false; }
export function canAutomaticallyPublishVideo(_draft: VideoScriptDraft): false { return false; }
export const VIDEO_SCRIPT_ACCESS = { adminOnly: true as const, externalAiCalls: 0 as const, videoGenerations: 0 as const, downloads: 0 as const, uploads: 0 as const, networkCalls: 0 as const, filesWritten: 0 as const, databaseWrites: 0 as const, autoProduces: false as const, autoPublishes: false as const };
