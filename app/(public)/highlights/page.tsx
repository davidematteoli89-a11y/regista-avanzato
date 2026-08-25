import { HighlightLinkList } from "@/components/public/HighlightLinkList";
import { LoginRequiredBlock } from "@/components/public/LoginRequiredBlock";
import { VideoCopyrightNotice } from "@/components/public/VideoCopyrightNotice";
import { getCurrentUser } from "@/lib/auth/access";
import { getPublicHighlightLinks } from "@/lib/videoRadar/getPublicHighlightLinks";
import { getVideoAccessState, VIDEO_LOGIN_MESSAGE } from "@/lib/videoRadar/videoAccessRules";
export default async function HighlightsPage() { const user = await getCurrentUser(); const access = getVideoAccessState(user); const data = await getPublicHighlightLinks(access); return <main className="stack"><header><span className="eyebrow">Link highlights</span><h1>Highlights da fonti ufficiali</h1><p>Raccogliamo esclusivamente collegamenti approvati. Nessun video viene copiato o ospitato.</p></header><VideoCopyrightNotice /><p className="notice">{data.message}</p><HighlightLinkList links={data.items} />{data.preview && <LoginRequiredBlock message={VIDEO_LOGIN_MESSAGE} title="Sblocca i link highlights completi" />}</main>; }
