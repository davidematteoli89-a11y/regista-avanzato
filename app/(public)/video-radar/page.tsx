import { SubstackCTA } from "@/components/public/SubstackCTA";
import { VideoCopyrightNotice } from "@/components/public/VideoCopyrightNotice";
import { VideoRadarGrid } from "@/components/public/VideoRadarGrid";
import { VideoRadarPreviewBlock } from "@/components/public/VideoRadarPreviewBlock";
import { getCurrentUser } from "@/lib/auth/access";
import { getPublicVideoRadar } from "@/lib/videoRadar/getPublicVideoRadar";
import { getVideoAccessState } from "@/lib/videoRadar/videoAccessRules";
export default async function VideoRadarPage() { const user = await getCurrentUser(); const access = getVideoAccessState(user); const data = await getPublicVideoRadar(access); return <main className="stack"><header><span className="eyebrow">Video Radar</span><h1>Video, idee e storie da guardare</h1><p>Analisi, grafiche e script originali affiancati, quando disponibili, da link o embed ufficiali verificati.</p></header><VideoCopyrightNotice />{access.canViewFullRadar ? <><p className="notice">{data.message}</p><VideoRadarGrid items={data.items} /></> : <VideoRadarPreviewBlock items={data.items} />}<SubstackCTA label="Leggi su Substack" /></main>; }
