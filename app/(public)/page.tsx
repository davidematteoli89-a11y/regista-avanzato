import Link from "next/link";
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
import type { PublicHomepageData } from "@/lib/publicWebsite/publicWebsiteTypes";

async function getSafeHomepageData(): Promise<PublicHomepageData | null> {
  try {
    return await getHomepageData();
  } catch {
    return null;
  }
}

function SafeHomepageFallback() {
  return (
    <main className="magazine-home">
      <section className="home-hero">
        <div>
          <span className="eyebrow">Magazine calcistico</span>
          <h1>Dove i numeri incontrano le storie</h1>
          <p>
            Regista Avanzato raccoglie dati pubblici, storie e segnali editoriali
            in percorsi leggibili e controllati.
          </p>
          <div className="actions">
            <Link className="button-link" href="/competitions">
              Esplora le competizioni
            </Link>
            <Link href="/radar">Apri il Radar</Link>
          </div>
        </div>
        <article className="hero-feature">
          <span className="stats-badge">Public data only</span>
          <p className="muted">Percorso pubblico sicuro</p>
          <h2>Competizioni, squadre e classifiche approvate</h2>
          <p>
            La sezione Competizioni mostra solo dati resi pubblici dopo review e
            filtrati dai public reader.
          </p>
        </article>
      </section>
      <section className="preview-block" aria-labelledby="homepage-public-path-title">
        <span className="stats-badge">Sola lettura</span>
        <h2 id="homepage-public-path-title">Percorso pubblico verificabile</h2>
        <p>
          Dalla homepage puoi aprire le competizioni pubbliche e consultare il
          dettaglio senza login e senza azioni operative.
        </p>
        <Link href="/competitions">Vai alle competizioni</Link>
      </section>
    </main>
  );
}

export default async function Page() {
  const data = await getSafeHomepageData();

  if (!data) {
    return <SafeHomepageFallback />;
  }

  return (
    <main className="magazine-home">
      <HomeHero article={data.hero} />
      <HomeSection
        description="Il percorso dati approvato: competizioni, squadre e classifiche filtrate per la consultazione esterna."
        href="/competitions"
        title="Competizioni pubbliche"
      >
        <section className="preview-block" aria-labelledby="home-competitions-title">
          <span className="stats-badge">Public data only</span>
          <h2 id="home-competitions-title">Dati visibili dopo review</h2>
          <p>
            La sezione Competizioni è il punto di ingresso per leggere i dati
            pubblici promossi a `public_free`, senza usare fallback admin.
          </p>
          <Link href="/competitions">Apri le competizioni pubbliche</Link>
        </section>
      </HomeSection>
      <HomeSection description="Storie e profili approvati dalla redazione." href="/articoli" title="In evidenza">
        <ArticleGrid articles={data.featuredArticles} />
      </HomeSection>
      <HomeSection description="Osservazioni prudenti, mai scouting certificato." href="/talenti" title="Talenti da seguire">
        <TalentGrid talents={data.talents} />
      </HomeSection>
      <HomeSection description="Trigger già revisionati e possibili collegamenti narrativi." href="/partite-pazze" title="Partite pazze">
        <CrazyMatchGrid matches={data.crazyMatches} />
      </HomeSection>
      <HomeSection description="Historical Echo pubblici, senza score tecnici." href="/il-calcio-si-ripete" title="Il calcio si ripete?">
        <HistoricalEchoGrid echoes={data.historicalEchoes} />
      </HomeSection>
      <HomeSection description="Anteprime originali e link ufficiali: nessuna clip scaricata o ripubblicata." href="/video-radar" title="Video Radar">
        <VideoRadarGrid items={data.videoRadarPreview} preview />
      </HomeSection>
      <HomeSection description="Snapshot mock pubblico: i dati completi richiederanno il login gratuito." href="/competizioni" title="Classifiche e statistiche">
        <div className="public-stats-grid">
          {data.competitionsPreview.map((competition) => (
            <CompetitionCard competition={competition} key={competition.id} />
          ))}
        </div>
      </HomeSection>
      <div className="home-cta-grid">
        <LoginFreeCTA />
        <NewsletterCTA />
      </div>
      <p className="notice">
        Magazine mock: nessuna query live, pubblicazione automatica o quota
        ricerca consumata.
      </p>
    </main>
  );
}
