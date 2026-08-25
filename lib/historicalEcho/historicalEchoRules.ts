import type { HistoricalEchoRule, HistoricalEchoTriggerType } from "./historicalEchoTypes";

export const STRONG_TRIGGER_TYPES: readonly HistoricalEchoTriggerType[] = [
  "result_5_4", "draw_4_4", "comeback", "hat_trick_candidate", "young_player_candidate", "anniversary", "same_scoreline",
];

export const WEAK_TRIGGER_TYPES: readonly HistoricalEchoTriggerType[] = [
  "same_country", "similar_tactical_pattern", "story_keyword_match",
];

export const HISTORICAL_ECHO_RULES: readonly HistoricalEchoRule[] = [
  { id: "rule-scoreline", name: "Risultato memorabile", triggerTypes: ["result_5_4", "draw_4_4", "high_scoring_match", "same_scoreline"], echoType: "scoreline_echo", preferredStoryCategories: ["legendary_match", "record", "historical_echo"], weight: 18, minimumReviewScore: 65, description: "Collega risultati eccezionali soltanto a precedenti narrativi verificabili.", requiresHumanReview: true, allowedDestinations: ["story_library", "modern_match", "future_article", "substack", "video_radar"] },
  { id: "rule-comeback", name: "Rimonta", triggerTypes: ["comeback", "late_goal"], echoType: "comeback_echo", preferredStoryCategories: ["comeback", "legendary_match", "underdog_story"], weight: 16, minimumReviewScore: 65, description: "Cerca analogie sulla dinamica della rimonta, senza equiparare automaticamente i contesti.", requiresHumanReview: true, allowedDestinations: ["story_library", "modern_match", "future_article", "video_radar"] },
  { id: "rule-talent", name: "Talento decisivo", triggerTypes: ["young_player_candidate", "hat_trick_candidate"], echoType: "talent_echo", preferredStoryCategories: ["talent_story", "player_profile", "record"], weight: 17, minimumReviewScore: 68, description: "Suggerisce profili e precedenti, ma non formula valutazioni di scouting certificate.", requiresHumanReview: true, allowedDestinations: ["story_library", "modern_match", "future_article", "substack", "video_radar"] },
  { id: "rule-italy", name: "Collegamento Italia", triggerTypes: ["italian_club_mention", "ex_serie_a_player"], echoType: "italian_connection_echo", preferredStoryCategories: ["italian_connection", "player_profile", "team_story"], weight: 13, minimumReviewScore: 70, description: "Richiede un collegamento italiano esplicito e verificato, non una semplice coincidenza lessicale.", requiresHumanReview: true, allowedDestinations: ["story_library", "future_article", "substack"] },
  { id: "rule-anniversary", name: "Anniversario", triggerTypes: ["anniversary", "same_fixture"], echoType: "historical_anniversary", preferredStoryCategories: ["historical_echo", "legendary_match", "rivalry"], weight: 15, minimumReviewScore: 70, description: "Date e ricorrenze devono essere controllate su fonti affidabili prima della review.", requiresHumanReview: true, allowedDestinations: ["story_library", "future_article", "substack"] },
  { id: "rule-context", name: "Somiglianza contestuale", triggerTypes: ["same_country", "similar_tactical_pattern", "story_keyword_match"], echoType: "tactical_echo", preferredStoryCategories: ["tactical_story", "cultural_story", "team_story"], weight: 5, minimumReviewScore: 75, description: "Un trigger debole non è mai sufficiente da solo: servono ulteriori riscontri strutturati.", requiresHumanReview: true, allowedDestinations: ["story_library", "future_article"] },
];

export function getRulesForTrigger(type: HistoricalEchoTriggerType): HistoricalEchoRule[] {
  return HISTORICAL_ECHO_RULES.filter((rule) => rule.triggerTypes.includes(type));
}

export function isStrongHistoricalEchoTrigger(type: HistoricalEchoTriggerType): boolean {
  return STRONG_TRIGGER_TYPES.includes(type);
}

export function isWeakHistoricalEchoTrigger(type: HistoricalEchoTriggerType): boolean {
  return WEAK_TRIGGER_TYPES.includes(type);
}
