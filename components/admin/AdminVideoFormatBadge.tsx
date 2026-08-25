import type { VideoScriptFormat } from "@/lib/videoScriptGenerator/videoScriptTypes";
export function AdminVideoFormatBadge({ format }: { format: VideoScriptFormat }) { return <span className="admin-status video-format-badge">{format.replace(/_/g, " ")}</span>; }
