import type { VideoRadarItem } from "@/lib/videoRadar/videoRadarTypes";
import { VideoRadarCard } from "./VideoRadarCard";
export function VideoRadarGrid({ items, preview = false }: { items: readonly VideoRadarItem[]; preview?: boolean }) { return items.length ? <div className="video-radar-grid">{items.map((item) => <VideoRadarCard key={item.id} item={item} preview={preview} />)}</div> : <p className="notice">Nessun contenuto Video Radar approvato disponibile.</p>; }
