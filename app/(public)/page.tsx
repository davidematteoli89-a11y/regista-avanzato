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
          <span className="eyebrow">Osservatorio calcistico narrativo</span>
          <h1>Regista Avanzato</h1>
          <p>
            Il calcio fuori dal mainstream, letto con dati, storie e contesto.
            Un osservatorio narrativo per seguire campionati, squadre e talenti
            meno raccontati.
          </p>
          <div className="actions">
            <Link className="button-link" href="/competitions">
              Esplora le competizioni
            </Link>
            <Link href="/manifesto">Leggi il manifesto</Link>
            <Link href="/rubriche">Scopri le rubriche</Link>
            <Link href="/newsletter">Segui la newsletter</Link>
          </div>
          <p className="notice">
            MVP pubblico: i primi dati sono curati manualmente per validare
            struttura, esperienza e racconto.
          </p>
        </div>
        <article className="hero-feature">
          <span className="stats-badge">MVP pubblico</span>
          <p className="muted">Campionati radar, dati essenziali, contesto</p>
          <h2>Meno rumore, più profondità</h2>
          <p>
            Regista Avanzato nasce per dare spazio a campionati e giocatori che
            spesso restano fuori dal racconto quotidiano.
          </p>
        </article>
      </section>
      <section className="preview-block" aria-labelledby="homepage-public-path-title">
        <span className="stats-badge">Cosa puoi fare ora</span>
        <h2 id="homepage-public-path-title">Entra nei primi campionati disponibili</h2>
        <p>
          Dalla homepage puoi aprire le competizioni, leggere la scheda pubblica
          e seguire l’evoluzione editoriale del progetto.
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
        description="Primi campionati disponibili nel radar di Regista Avanzato. In questa fase MVP i dati sono curati manualmente e servono a validare esperienza, struttura e racconto."
        href="/competitions"
        linkLabel="Esplora i campionati"
        title="Campionati nel radar"
      >
        <section className="preview-block" aria-labelledby="home-competitions-title">
          <span className="stats-badge">Public data only</span>
          <h2 id="home-competitions-title">Dati manuali, racconto pubblico</h2>
          <p>
            Le prime schede uniscono dati essenziali, squadre e classifiche per
            costruire il percorso pubblico prima di attivare import automatici.
          </p>
          <Link href="/competitions">Apri le competizioni pubbliche</Link>
        </section>
      </HomeSection>
      <HomeSection
        description="Regista Avanzato nasce per dare profondità a campionati e giocatori che spesso restano fuori dal racconto quotidiano: meno rumore, più contesto."
        href="/manifesto"
        linkLabel="Leggi il manifesto"
        title="Cosa trovi"
      >
        <section className="public-stats-grid" aria-label="Cosa trovi su Regista Avanzato">
          <article className="public-stat-card">
            <span className="stats-badge">Radar</span>
            <h2>Campionati radar</h2>
            <p>Competizioni meno raccontate, selezionate per potenziale narrativo e interesse calcistico.</p>
          </article>
          <article className="public-stat-card">
            <span className="stats-badge">Dati</span>
            <h2>Squadre e classifiche</h2>
            <p>Statistiche essenziali e leggibili, pensate per orientare la scoperta senza rumore.</p>
          </article>
          <article className="public-stat-card">
            <span className="stats-badge">Storie</span>
            <h2>Storie e talenti</h2>
            <p>Spunti editoriali, giocatori da seguire e percorsi da sviluppare nel tempo.</p>
          </article>
          <article className="public-stat-card">
            <span className="stats-badge">Video</span>
            <h2>Video e highlights ufficiali</h2>
            <p>Radar video con link a fonti ufficiali, senza scaricare o ripubblicare clip.</p>
          </article>
          <article className="public-stat-card">
            <span className="stats-badge">Rubriche</span>
            <h2>Manifesto e rubriche</h2>
            <p>Pagine editoriali statiche per capire identità, metodo e percorsi del progetto.</p>
            <Link href="/rubriche">Scopri le rubriche</Link>
          </article>
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
