import type { StoryItem } from "../storyLibrary/storyTypes";
import type { HistoricalEchoConfidence, HistoricalEchoRule, HistoricalEchoScore, HistoricalEchoTrigger } from "./historicalEchoTypes";

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));
const normalize = (value: string) => value.toLocaleLowerCase("it-IT").replace(/[^a-z0-9à-öø-ÿ]+/g, " ");

export function getHistoricalEchoConfidence(total: number): HistoricalEchoConfidence {
  if (total >= 75) return "high";
  if (total >= 50) return "medium";
  return "low";
}

export function calculateHistoricalEchoScore(trigger: HistoricalEchoTrigger, story: StoryItem, rule: HistoricalEchoRule): HistoricalEchoScore {
  const triggerStrength = trigger.strength === "strong" ? 34 : trigger.strength === "medium" ? 24 : 12;
  const storyText = normalize(`${story.title} ${story.summary} ${story.tags.join(" ")}`);
  const keywordMatches = trigger.keywords.filter((keyword) => storyText.includes(normalize(keyword))).length;
  const categoryMatch = rule.preferredStoryCategories.includes(story.category);
  const storySimilarity = Math.min(30, keywordMatches * 6 + (categoryMatch ? 16 : 0));
  const sourceQuality = story.sourceIds.length > 0 && (story.status === "approved" || story.status === "published") ? 12 : 4;
  const editorialValue = Math.min(24, rule.weight + (story.visibility === "public_full" ? 4 : 0));
  const total = clamp(triggerStrength + storySimilarity + sourceQuality + editorialValue);
  const reasons = [
    `Trigger ${trigger.strength}.`,
    categoryMatch ? "Categoria narrativa coerente." : "Categoria narrativa soltanto contestuale.",
    keywordMatches > 0 ? `${keywordMatches} corrispondenze tematiche.` : "Nessuna corrispondenza lessicale forte.",
    sourceQuality >= 12 ? "Storia già approvata con riferimenti interni." : "Fonti o stato editoriale da rafforzare.",
  ];
  return { total, triggerStrength, storySimilarity, sourceQuality, editorialValue, confidence: getHistoricalEchoConfidence(total), reasons };
}
