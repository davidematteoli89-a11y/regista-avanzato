import type { ArticleDraftGenerationInput, ArticleDraftSource } from "./articleGeneratorTypes";

function sourceLine(source: ArticleDraftSource): string { return `- [${source.factConfidence}] ${source.type}: ${source.label} — ${source.shortSummary}`; }

/** Costruisce istruzioni interne: non invia il prompt a modelli o servizi esterni. */
export function buildArticlePrompt(input: ArticleDraftGenerationInput, sources: readonly ArticleDraftSource[]): string {
  const grouped = {
    verified: sources.filter((source) => source.factConfidence === "verified"),
    signals: sources.filter((source) => source.factConfidence === "likely"),
    hypotheses: sources.filter((source) => source.factConfidence === "uncertain" || source.factConfidence === "unknown"),
    interpretation: sources.filter((source) => source.factConfidence === "opinion"),
  };
  const lines = (items: readonly ArticleDraftSource[]) => items.length ? items.map(sourceLine).join("\n") : "- Nessun elemento";
  return [
    "ISTRUZIONI INTERNE MOCK — NON INVIARE A SERVIZI ESTERNI",
    `Formato: ${input.format}; tono: ${input.tone}; destinazione proposta: ${input.destination}.`,
    "Scrivi in italiano chiaro, con taglio narrativo e prudente su rumor, infortuni e scouting.",
    "Non inventare fatti, quote, URL, fonti o clip. Non usare titoli clickbait per elementi non verificati.",
    "FATTI VERIFICATI", lines(grouped.verified),
    "SEGNALI DA CONTESTUALIZZARE", lines(grouped.signals),
    "IPOTESI / ELEMENTI INCERTI", lines(grouped.hypotheses),
    "INTERPRETAZIONE EDITORIALE", lines(grouped.interpretation),
    "ELEMENTI DA VERIFICARE", ...sources.filter((source) => !source.verifiedForDraft || source.riskFlags.length > 0).map((source) => `- ${source.label}: ${source.riskFlags.join(", ") || "review editoriale"}`),
    "Output richiesto: bozza privata, mai pubblicazione automatica.",
  ].join("\n");
}
