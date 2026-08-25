import { LoginRequiredBlock } from "@/components/public/LoginRequiredBlock";
import { SubstackCTA } from "@/components/public/SubstackCTA";
import { VideoCopyrightNotice } from "@/components/public/VideoCopyrightNotice";
import { WatchlistGrid } from "@/components/public/WatchlistGrid";
import { getCurrentUser } from "@/lib/auth/access";
import { getPublicWatchlist } from "@/lib/videoRadar/getPublicWatchlist";
import { getVideoAccessState, VIDEO_LOGIN_MESSAGE } from "@/lib/videoRadar/videoAccessRules";
export default async function WatchlistPage() { const user = await getCurrentUser(); const access = getVideoAccessState(user); const data = await getPublicWatchlist(access); return <main className="stack"><header><span className="eyebrow">Weekend Watchlist</span><h1>Cosa osservare nel prossimo turno</h1><p>Partite, talenti e temi editoriali da seguire usando dati salvati e fonti approvate.</p></header><VideoCopyrightNotice /><WatchlistGrid items={data.items} preview={data.preview} />{data.preview && <LoginRequiredBlock message={VIDEO_LOGIN_MESSAGE} title="Sblocca la watchlist completa" />}<SubstackCTA label="Ricevi il report completo" /></main>; }
