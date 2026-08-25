import { MOCK_STORY_LIBRARY } from "../storyLibrary/mockStoryLibrary";
import { getRulesForTrigger } from "./historicalEchoRules";
import { calculateHistoricalEchoScore } from "./historicalEchoScoring";
import { mapStoryToHistoricalEcho } from "./historicalEchoMappers";
import type { HistoricalEchoCandidate, HistoricalEchoEngineInput } from "./historicalEchoTypes";

/** Motore in-memory: produce soltanto candidati editoriali e non esegue I/O. */
export function generateHistoricalEchoCandidates(input: HistoricalEchoEngineInput): HistoricalEchoCandidate[] {
  const eligibleStories = (input.stories ?? MOCK_STORY_LIBRARY).filter((story) => story.status === "approved" || story.status === "published");
  const candidates: HistoricalEchoCandidate[] = [];

  for (const trigger of input.triggers) {
    for (const rule of getRulesForTrigger(trigger.type)) {
      for (const story of eligibleStories) {
        const score = calculateHistoricalEchoScore(trigger, story, rule);
        if (score.total < 40) continue;
        const belowReviewThreshold = score.total < rule.minimumReviewScore;
        candidates.push({
          id: `candidate-${trigger.id}-${story.id}-${rule.id}`,
          trigger,
          relatedStory: mapStoryToHistoricalEcho(story),
          proposedType: rule.echoType,
          score,
          explanation: `Il trigger “${trigger.label}” richiama “${story.title}” per affinità di categoria e tema. Il collegamento è un'ipotesi da verificare, non un fatto storico stabilito.`,
          warnings: [
            "Review umana obbligatoria prima di qualsiasi uso editoriale.",
            ...(belowReviewThreshold ? [`Score sotto la soglia editoriale ${rule.minimumReviewScore}: non proporre per pubblicazione.`] : []),
          ],
          editorialSuggestion: {
            headline: `${trigger.label}: il calcio si ripete?`,
            angle: `Confrontare il caso moderno con la storia “${story.title}”, verificando contesto, fonti e differenze.`,
            destinations: rule.allowedDestinations,
            status: "idea_only",
          },
          autoPublish: false,
        });
      }
    }
  }

  return candidates.sort((a, b) => b.score.total - a.score.total).slice(0, input.maximumCandidates ?? 12);
}
