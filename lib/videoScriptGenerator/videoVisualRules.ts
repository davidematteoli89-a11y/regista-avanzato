import type { ForbiddenVideoOperation, SafeVisualKind, VideoScriptVisualCue } from "./videoScriptTypes";

export const SAFE_VISUAL_KINDS: readonly SafeVisualKind[] = ["original_graphic", "tactical_board", "future_site_screenshot", "data_visualization", "drawn_map_or_lineup", "future_authorized_photo", "official_external_link", "original_voiceover"];
export const FORBIDDEN_VIDEO_OPERATIONS: readonly ForbiddenVideoOperation[] = ["download_video", "reupload_clip", "local_video_file", "unauthorized_compilation", "unofficial_stream", "pirated_source", "raw_match_clip_storage"];

export function createSafeVisualCue(input: Omit<VideoScriptVisualCue, "forbiddenOperations">): VideoScriptVisualCue { return { ...input, forbiddenOperations: [] }; }
export function isSafeVisualCue(cue: VideoScriptVisualCue): boolean { return SAFE_VISUAL_KINDS.includes(cue.kind) && cue.forbiddenOperations.length === 0; }
