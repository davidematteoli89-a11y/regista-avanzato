import type { NewsRadarSource, NewsRadarSourceCheck } from "./newsRadarTypes";

const OFFICIAL_TYPES = ["official_club", "official_league", "official_federation", "official_player"] as const;

export function classifyNewsSource(source: NewsRadarSource): NewsRadarSourceCheck["classification"] {
  if (OFFICIAL_TYPES.includes(source.type as (typeof OFFICIAL_TYPES)[number])) return "official";
  if (source.type === "verified_journalist") return "verified";
  if (source.type === "media_outlet") return "media";
  if (source.type === "database_signal" || source.type === "manual_research") return "signal";
  if (source.type === "social_signal" || source.type === "rumor") return "rumor";
  return "unknown";
}

export function checkNewsSource(source: NewsRadarSource): NewsRadarSourceCheck {
  const warnings: string[] = [];
  const classification = classifyNewsSource(source);
  if (!source.name.trim() || !source.referenceLabel.trim()) warnings.push("Nome e riferimento della fonte sono obbligatori.");
  if (classification === "rumor") warnings.push("Rumor o segnale social: review umana e seconda fonte obbligatorie.");
  if (source.type === "unknown" || source.reliability === "unverified") warnings.push("Fonte unknown/unverified: contenuto pubblico bloccato.");
  if (source.reliability === "low") warnings.push("Affidabilità bassa: non usare linguaggio assertivo.");
  const allowedPublicly = classification !== "rumor" && classification !== "unknown" && source.reliability !== "unverified" && source.reliability !== "low";
  return { validForCandidate: Boolean(source.name.trim() && source.referenceLabel.trim()), allowedPublicly, requiresHumanReview: classification === "rumor" || classification === "media" || classification === "signal" || source.reliability !== "official", warnings, classification };
}

export function hasPubliclyReliableNewsSource(sources: readonly NewsRadarSource[]): boolean {
  return sources.length > 0 && sources.some((source) => checkNewsSource(source).allowedPublicly);
}
