import { ArticleGrid } from "@/components/public/ArticleGrid";
import { CompetitionCard } from "@/components/public/CompetitionCard";
import { CrazyMatchGrid } from "@/components/public/CrazyMatchGrid";
import { HistoricalEchoGrid } from "@/components/public/HistoricalEchoGrid";
import { HomeHero } from "@/components/public/HomeHero";
import { HomeSection } from "@/components/public/HomeSection";
import { LoginFreeCTA } from "@/components/public/LoginFreeCTA";
import { NewsletterCTA } from "@/components/public/NewsletterCTA";
import { TalentGrid } from "@/components/public/TalentGrid";
import { VideoRadarGrid } from "@/components/public/VideoRadarGrid";
import { getHomepageData } from "@/lib/publicWebsite/getHomepageData";

export default async function Page() {
  const data = await getHomepageData();
  return <main className="magazine-home"><HomeHero article={data.hero} /><HomeSection title="In evidenza" description="Storie e profili approvati dalla redazione." href="/articoli"><ArticleGrid articles={data.featuredArticles} /></HomeSection><HomeSection title="Talenti da seguire" description="Osservazioni prudenti, mai scouting certificato." href="/talenti"><TalentGrid talents={data.talents} /></HomeSection><HomeSection title="Partite pazze" description="Trigger già revisionati e possibili collegamenti narrativi." href="/partite-pazze"><CrazyMatchGrid matches={data.crazyMatches} /></HomeSection><HomeSection title="Il calcio si ripete?" description="Historical Echo pubblici, senza score tecnici." href="/il-calcio-si-ripete"><HistoricalEchoGrid echoes={data.historicalEchoes} /></HomeSection><HomeSection title="Video Radar" description="Anteprime originali e link ufficiali: nessuna clip scaricata o ripubblicata." href="/video-radar"><VideoRadarGrid items={data.videoRadarPreview} preview /></HomeSection><HomeSection title="Classifiche e statistiche" description="Snapshot mock pubblico: i dati completi richiederanno il login gratuito." href="/competizioni"><div className="public-stats-grid">{data.competitionsPreview.map((competition) => <CompetitionCard key={competition.id} competition={competition} />)}</div></HomeSection><div className="home-cta-grid"><LoginFreeCTA /><NewsletterCTA /></div><p className="notice">Magazine mock: nessuna query live, pubblicazione automatica o quota ricerca consumata.</p></main>;
}
