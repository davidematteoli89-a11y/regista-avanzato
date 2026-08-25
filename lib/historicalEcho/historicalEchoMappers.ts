import type { StoryItem } from "../storyLibrary/storyTypes";
import type { HistoricalEcho, HistoricalEchoCandidate, HistoricalEchoConfidence, HistoricalEchoRelatedStory, PublicHistoricalEcho } from "./historicalEchoTypes";

export function mapStoryToHistoricalEcho(story: StoryItem): HistoricalEchoRelatedStory {
  return { storyId: story.id, slug: story.slug, title: story.title, category: story.category, summary: story.summary };
}

export function confidenceToPublicLabel(confidence: HistoricalEchoConfidence): string {
  return confidence === "high" ? "Affinità alta" : confidence === "medium" ? "Affinità da approfondire" : "Spunto editoriale";
}

export function mapHistoricalEchoForPublic(echo: HistoricalEcho): PublicHistoricalEcho {
  const { trigger: _trigger, score, sources: _sources, internalWarnings: _warnings, editorialSuggestion: _suggestion, ...safe } = echo;
  return { ...safe, confidence: score.confidence, confidenceLabel: confidenceToPublicLabel(score.confidence), publicReason: echo.explanation };
}

export function mapCandidateToEcho(candidate: HistoricalEchoCandidate): HistoricalEcho {
  return {
    id: candidate.id,
    slug: candidate.id,
    title: candidate.editorialSuggestion.headline,
    summary: candidate.explanation,
    type: candidate.proposedType,
    status: "candidate",
    visibility: "private_admin",
    trigger: candidate.trigger,
    score: candidate.score,
    explanation: candidate.explanation,
    comparisonPoints: [],
    relatedStory: candidate.relatedStory,
    relatedMatches: candidate.trigger.modernMatchId ? [{ id: candidate.trigger.modernMatchId, label: candidate.trigger.label, scoreline: null, dateLabel: candidate.trigger.observedAt, isModern: true }] : [],
    sources: [],
    editorialSuggestion: candidate.editorialSuggestion,
    internalWarnings: candidate.warnings,
    timeline: [],
    reviewedByHuman: false,
    autoPublished: false,
    createdAt: candidate.trigger.observedAt,
    updatedAt: candidate.trigger.observedAt,
  };
}
