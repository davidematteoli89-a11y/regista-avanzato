import Link from "next/link";
import { HighlightLinkList } from "@/components/public/HighlightLinkList";
import { LoginRequiredBlock } from "@/components/public/LoginRequiredBlock";
import { SubstackCTA } from "@/components/public/SubstackCTA";
import { VideoCopyrightNotice } from "@/components/public/VideoCopyrightNotice";
import { getCurrentUser } from "@/lib/auth/access";
import { getPublicHighlightLinks } from "@/lib/videoRadar/getPublicHighlightLinks";
import { getVideoAccessState, VIDEO_LOGIN_MESSAGE } from "@/lib/videoRadar/videoAccessRules";
type Params = { matchId: string };
export default async function MatchHighlightsPage({ params }: { params: Params | Promise<Params> }) { const { matchId } = await Promise.resolve(params); const user = await getCurrentUser(); const access = getVideoAccessState(user); const data = await getPublicHighlightLinks(access, matchId); return <main className="stack"><header><span className="eyebrow">Highlights partita</span><h1>Link ufficiali</h1><p>{data.message}</p><Link href={`/partite/${matchId}`}>Torna alla partita</Link></header><VideoCopyrightNotice /><HighlightLinkList links={data.items} />{data.preview && <LoginRequiredBlock message={VIDEO_LOGIN_MESSAGE} title="Accedi per i link completi" />}{data.items.length === 0 && <SubstackCTA label="Leggi su Substack" />}</main>; }
