import { checkNewsSource, hasPubliclyReliableNewsSource } from "./newsSourceRules";
import type { NewsRadarDestination, NewsRadarItem, NewsRadarRuleCheck } from "./newsRadarTypes";

const SENSATIONAL_TERMS = ["bomba", "shock", "clamoroso", "sicuro", "fatto", "ufficiale!"];

export const NEWS_RADAR_EDITORIAL_RULES = [
  { id: "human-review", title: "Review umana", description: "Rumor, social, controversie e fonti non ufficiali richiedono sempre revisione umana.", level: "mandatory" },
  { id: "no-auto-publish", title: "Nessun auto-publish", description: "Score e priorità ordinano la queue ma non autorizzano mai la pubblicazione.", level: "mandatory" },
  { id: "cautious-language", title: "Linguaggio prudente", description: "Titoli non verificati devono usare forme ipotetiche ed evitare formule sensazionalistiche.", level: "mandatory" },
  { id: "public-filter", title: "Separazione pubblico/admin", description: "Il pubblico riceve solo approved/published, fonti compatibili e nessun dato tecnico interno.", level: "mandatory" },
  { id: "destinations", title: "Destinazioni suggerite", description: "Articolo, Radar, Substack, Historical Echo, Video Radar e digest restano suggerimenti editoriali.", level: "advisory" },
] as const;

export function suggestNewsDestinations(item: Pick<NewsRadarItem, "category" | "signals">): NewsRadarDestination[] {
  const destinations = new Set<NewsRadarDestination>(["weekly_digest"]);
  if (["official_news", "injury_update", "match_preview", "match_reaction", "tactical_analysis"].includes(item.category)) destinations.add("article");
  if (["talent_signal", "minor_league_signal", "data_signal", "italian_connection"].includes(item.category)) destinations.add("public_radar");
  if (item.signals.some((signal) => signal.type === "possibile_substack")) destinations.add("substack_free");
  if (item.category === "minor_league_signal") destinations.add("substack_paid");
  if (item.category === "historical_echo_candidate" || item.signals.some((signal) => signal.type === "risultato_storico" || signal.type === "possibile_storia")) destinations.add("historical_echo");
  if (item.category === "video_radar_candidate" || item.signals.some((signal) => signal.type === "possibile_video")) destinations.add("video_radar");
  return [...destinations];
}

export function checkNewsRadarRules(item: NewsRadarItem): NewsRadarRuleCheck {
  const sourceChecks = item.sources.map(checkNewsSource);
  const rumorOrSocial = item.sources.some((source) => source.type === "rumor" || source.type === "social_signal") || item.signals.some((signal) => signal.type === "rumor_da_verificare");
  const controversy = item.category === "controversy" || item.signals.some((signal) => signal.type === "controversia");
  const sensationalHeadlineBlocked = (rumorOrSocial || !hasPubliclyReliableNewsSource(item.sources)) && SENSATIONAL_TERMS.some((term) => item.title.toLocaleLowerCase("it-IT").includes(term));
  const warnings = sourceChecks.flatMap((check) => check.warnings);
  if (rumorOrSocial) warnings.push("Rumor/social: vietata pubblicazione senza verifica indipendente.");
  if (controversy) warnings.push("Controversia: fact-check e revisione editoriale obbligatori.");
  if (sensationalHeadlineBlocked) warnings.push("Titolo sensazionalistico bloccato per fonte non ufficiale.");
  const publicEligible = hasPubliclyReliableNewsSource(item.sources) && !rumorOrSocial && !sensationalHeadlineBlocked && (item.status === "approved" || item.status === "published") && item.visibility !== "private_admin";
  const suggestedDestinations = rumorOrSocial || controversy || !hasPubliclyReliableNewsSource(item.sources) ? [] : suggestNewsDestinations(item);
  return { autoPublishAllowed: false, requiresHumanReview: rumorOrSocial || controversy || sourceChecks.some((check) => check.requiresHumanReview), publicEligible, sensationalHeadlineBlocked, warnings, suggestedDestinations };
}
