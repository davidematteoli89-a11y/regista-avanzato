import { NewsletterCTA } from "@/components/public/NewsletterCTA";
import { TalentGrid } from "@/components/public/TalentGrid";
import { getPublicTalents } from "@/lib/publicWebsite/getPublicTalents";

export default async function Page() { const data = await getPublicTalents(); return <main className="stack"><header><span className="eyebrow">Talent Radar</span><h1>Talenti da seguire</h1><p>Profili editoriali prudenti, costruiti per osservare segnali nel tempo senza promettere scouting certificato.</p></header><TalentGrid talents={data.items} /><p className="notice">{data.disclaimer}</p><NewsletterCTA /></main>; }
