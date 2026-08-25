import type { NewsRadarPriority, NewsRadarScore, NewsRadarScoringInput, NewsRadarSignalType, NewsSourceReliability } from "./newsRadarTypes";

const reliabilityPoints: Record<NewsSourceReliability, number> = { official: 32, high: 22, medium: 10, low: -10, unverified: -22 };
const positiveSignals: Partial<Record<NewsRadarSignalType, number>> = { fonte_ufficiale: 15, club_italiano_citato: 10, ex_serie_a: 8, giovane_talento: 8, partita_pazza: 10, risultato_storico: 10, possibile_storia: 8, possibile_video: 6, possibile_substack: 5, record: 8 };

export function getNewsRadarPriority(total: number): NewsRadarPriority {
  if (total >= 85) return "urgent";
  if (total >= 70) return "high";
  if (total >= 45) return "medium";
  return "low";
}

export function calculateNewsRadarScore(input: NewsRadarScoringInput): { score: NewsRadarScore; priority: NewsRadarPriority } {
  const reasons: string[] = [];
  const bestReliability = input.sources.reduce((best, source) => Math.max(best, reliabilityPoints[source.reliability]), input.sourceMissing || input.sources.length === 0 ? -25 : -22);
  const sourceScore = bestReliability;
  if (sourceScore >= 32) reasons.push("Fonte ufficiale presente.");
  if (input.sources.length === 0 || input.sourceMissing) reasons.push("Fonte mancante.");
  let signalScore = 0;
  let penaltyScore = 0;
  for (const signal of input.signals) {
    signalScore += positiveSignals[signal.type] ?? 0;
    if (signal.type === "rumor_da_verificare") penaltyScore += 25;
  }
  if (input.sources.some((source) => source.reliability === "low" || source.reliability === "unverified")) penaltyScore += 12;
  if (input.duplicateCandidate) { penaltyScore += 20; reasons.push("Possibile duplicato."); }
  if (input.signals.some((signal) => signal.type === "rumor_da_verificare")) reasons.push("Rumor non verificato: penalità e review obbligatoria.");
  const total = Math.max(0, Math.min(100, Math.round(30 + sourceScore + signalScore - penaltyScore)));
  reasons.push(`Segnali editoriali: ${signalScore} punti; penalità: ${penaltyScore}.`);
  return { score: { total, sourceScore, signalScore, penaltyScore, reasons }, priority: getNewsRadarPriority(total) };
}
