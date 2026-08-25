import type { VideoRadarItem } from "@/lib/videoRadar/videoRadarTypes";
import { VIDEO_LOGIN_MESSAGE } from "@/lib/videoRadar/videoAccessRules";
import { LoginRequiredBlock } from "./LoginRequiredBlock";
import { VideoRadarGrid } from "./VideoRadarGrid";
export function VideoRadarPreviewBlock({ items }: { items: readonly VideoRadarItem[] }) { return <section className="stack"><div><span className="eyebrow">Anteprima Video Radar</span><h2>Analisi originali e fonti ufficiali</h2></div><VideoRadarGrid items={items} preview /><LoginRequiredBlock message={VIDEO_LOGIN_MESSAGE} title="Sblocca il Video Radar completo" /></section>; }
