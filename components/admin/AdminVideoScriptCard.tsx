import Link from "next/link";
import type { VideoScriptDraft } from "@/lib/videoScriptGenerator/videoScriptTypes";
import { AdminVideoFormatBadge } from "./AdminVideoFormatBadge";
export function AdminVideoScriptCard({ script }: { script: VideoScriptDraft }) { return <article className="admin-section-card"><div className="admin-card-head"><AdminVideoFormatBadge format={script.format} /><span className={`admin-status risk-${script.riskLevel}`}>{script.riskLevel}</span></div><h2>{script.title}</h2><p>{script.hook.text}</p><p>{script.durationSeconds}s · {script.sources.length} fonti · {script.status}</p><Link href={`/admin/generated-content/video-scripts/${script.id}`}>Apri script privato</Link></article>; }
