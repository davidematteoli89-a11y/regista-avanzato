import { MOCK_HISTORICAL_ECHO_DATA } from "../historicalEcho/mockHistoricalEchoData";
import { MOCK_NEWS_RADAR_DATA } from "../newsRadar/mockNewsRadarData";
import { checkNewsRadarRules } from "../newsRadar/newsRadarRules";
import { MOCK_STORY_LIBRARY } from "../storyLibrary/mockStoryLibrary";
import { MOCK_VIDEO_RADAR_ITEMS } from "../videoRadar/mockVideoRadarData";
import type { ArticleDraftGenerationInput, ArticleDraftRiskFlag, ArticleDraftSource, ArticleSourceCollectionResult } from "./articleGeneratorTypes";

function collectStory(id: string): ArticleDraftSource | null {
  const story = MOCK_STORY_LIBRARY.find((item) => item.id === id || item.slug === id);
  if (!story) return null;
  const reviewed = story.status === "approved" || story.status === "published";
  return { id: `draft-source-story-${story.id}`, type: "story_library", referenceId: story.id, label: story.title, shortSummary: story.summary, referenceUrl: null, factConfidence: reviewed ? "likely" : "unknown", riskFlags: reviewed ? ["copyright"] : ["unverified_data", "copyright"], verifiedForDraft: reviewed, copyrightReviewRequired: true, copiedLongText: false };
}

function collectNews(id: string): ArticleDraftSource | null {
  const news = MOCK_NEWS_RADAR_DATA.find((item) => item.id === id || item.slug === id);
  if (!news) return null;
  const rule = checkNewsRadarRules(news);
  const flags: ArticleDraftRiskFlag[] = [];
  if (news.signals.some((signal) => signal.type === "rumor_da_verificare")) flags.push("rumor", "unverified_data");
  if (news.category === "injury_update") flags.push("injury");
  if (news.category === "controversy") flags.push("controversy");
  if (!rule.publicEligible) flags.push("unverified_data");
  const official = news.sources.some((source) => source.reliability === "official");
  return { id: `draft-source-news-${news.id}`, type: "news_radar", referenceId: news.id, label: news.title, shortSummary: news.summary, referenceUrl: null, factConfidence: official && rule.publicEligible ? "verified" : rule.publicEligible ? "likely" : "uncertain", riskFlags: [...new Set(flags)], verifiedForDraft: rule.publicEligible, copyrightReviewRequired: false, copiedLongText: false };
}

function collectEcho(id: string): ArticleDraftSource | null {
  const echo = MOCK_HISTORICAL_ECHO_DATA.find((item) => item.id === id || item.slug === id);
  if (!echo) return null;
  const reviewed = echo.reviewedByHuman && (echo.status === "approved" || echo.status === "published");
  return { id: `draft-source-echo-${echo.id}`, type: "historical_echo", referenceId: echo.id, label: echo.title, shortSummary: echo.summary, referenceUrl: null, factConfidence: reviewed ? "likely" : "uncertain", riskFlags: reviewed ? [] : ["unverified_data"], verifiedForDraft: reviewed, copyrightReviewRequired: false, copiedLongText: false };
}

function collectVideo(id: string): ArticleDraftSource | null {
  const video = MOCK_VIDEO_RADAR_ITEMS.find((item) => item.id === id || item.slug === id);
  if (!video) return null;
  const reviewed = video.status === "approved";
  return { id: `draft-source-video-${video.id}`, type: "video_radar", referenceId: video.id, label: video.title, shortSummary: video.summary, referenceUrl: null, factConfidence: "opinion", riskFlags: ["video_rights", ...(reviewed ? [] : ["unverified_data" as const])], verifiedForDraft: reviewed, copyrightReviewRequired: true, copiedLongText: false };
}

export function collectArticleSources(input: Pick<ArticleDraftGenerationInput, "sourceRefs">): ArticleSourceCollectionResult {
  const sources: ArticleDraftSource[] = [];
  const missingRefs: ArticleDraftGenerationInput["sourceRefs"] = [];
  for (const ref of input.sourceRefs) {
    const source = ref.type === "story_library" ? collectStory(ref.id) : ref.type === "news_radar" ? collectNews(ref.id) : ref.type === "historical_echo" ? collectEcho(ref.id) : collectVideo(ref.id);
    if (source) sources.push(source); else missingRefs.push(ref);
  }
  const unique = sources.filter((source, index) => sources.findIndex((candidate) => candidate.id === source.id) === index);
  return { sources: unique, missingRefs, warnings: [...(missingRefs.length ? [`${missingRefs.length} riferimenti mock non risolti.`] : []), ...(unique.length === 0 ? ["Nessuna fonte raccolta: la bozza sarà bloccata."] : [])] };
}
