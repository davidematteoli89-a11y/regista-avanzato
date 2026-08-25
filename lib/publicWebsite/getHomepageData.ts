import { getPublicCompetitions } from "../publicData/getPublicCompetitions";
import { getPublicHistoricalEchoes } from "../historicalEcho/getPublicHistoricalEchoes";
import { getPublicVideoRadar } from "../videoRadar/getPublicVideoRadar";
import { getPublicArticles } from "./getPublicArticles";
import { getPublicCrazyMatches } from "./getPublicCrazyMatches";
import { getPublicTalents } from "./getPublicTalents";
import { PUBLIC_WEBSITE_ACCESS } from "./publicWebsiteAccessRules";
import type { PublicHomepageData } from "./publicWebsiteTypes";

export async function getHomepageData(): Promise<PublicHomepageData> {
  const [articles, talents, crazyMatches, echoes, videos, competitions] = await Promise.all([
    getPublicArticles(),
    getPublicTalents(),
    getPublicCrazyMatches(),
    getPublicHistoricalEchoes(),
    getPublicVideoRadar({ tier: "anonymous", canViewPreview: true, canViewFullRadar: false, canViewFullHighlightLinks: false, consumesSearchQuota: false, message: "Anteprima pubblica." }),
    getPublicCompetitions(),
  ]);
  const hero = articles.items.find((article) => article.featured && article.visibility === "public_full") ?? articles.items[0];
  if (!hero) throw new Error("Mock homepage priva di articolo hero pubblico.");
  return {
    hero,
    featuredArticles: articles.items.filter((article) => article.featured && article.id !== hero.id).slice(0, 3),
    talents: talents.items.slice(0, 3),
    crazyMatches: crazyMatches.items.slice(0, 2),
    historicalEchoes: echoes.items.slice(0, 2),
    videoRadarPreview: videos.items.slice(0, 2),
    competitionsPreview: competitions.items.slice(0, 3),
    sections: [
      { id: "articles", title: "Articoli", description: "Storie, numeri e analisi editoriali.", href: "/articoli", itemCount: articles.items.length },
      { id: "talents", title: "Talenti", description: "Profili prudenti e giocatori da osservare.", href: "/talenti", itemCount: talents.items.length },
      { id: "crazy", title: "Partite pazze", description: "Risultati revisionati e possibili echi storici.", href: "/partite-pazze", itemCount: crazyMatches.items.length },
      { id: "stats", title: "Stats Hub", description: "Classifiche e risultati base, con dati completi dopo il login free.", href: "/competizioni", itemCount: competitions.items.length },
    ],
    access: PUBLIC_WEBSITE_ACCESS,
  };
}
