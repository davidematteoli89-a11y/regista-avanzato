import type { ArticleDraftRisk, ArticleDraftRiskLevel, ArticleDraftSection, ArticleDraftSource } from "./articleGeneratorTypes";

const CERTAINTY_TERMS = ["è certo", "senza dubbio", "ufficiale!", "affare fatto", "dimostra definitivamente"];
const levelWeight: Record<ArticleDraftRiskLevel, number> = { low: 1, medium: 2, high: 3, blocked: 4 };

export function getOverallArticleRisk(risks: readonly ArticleDraftRisk[]): ArticleDraftRiskLevel {
  return risks.reduce<ArticleDraftRiskLevel>((level, risk) => levelWeight[risk.level] > levelWeight[level] ? risk.level : level, "low");
}

export function evaluateArticleDraftRisks(input: { title: string; sources: readonly ArticleDraftSource[]; sections: readonly ArticleDraftSection[] }): { risks: ArticleDraftRisk[]; riskLevel: ArticleDraftRiskLevel; automaticPublicationAllowed: false } {
  const risks: ArticleDraftRisk[] = [];
  const add = (code: ArticleDraftRisk["code"], level: ArticleDraftRiskLevel, message: string) => { if (!risks.some((risk) => risk.code === code)) risks.push({ id: `risk-${code}`, code, level, message, blocksAutomaticPublication: true }); };
  if (input.sources.length === 0) add("missing_source", "blocked", "Bozza senza fonte: pubblicazione bloccata.");
  for (const source of input.sources) {
    if (source.riskFlags.includes("rumor")) add("rumor", "high", "Rumor presente: conferme indipendenti e linguaggio ipotetico obbligatori.");
    if (source.riskFlags.includes("injury")) add("injury", "medium", "Informazioni su infortuni: usare soltanto comunicazioni autorizzate e non formulare diagnosi.");
    if (source.riskFlags.includes("controversy")) add("controversy", "high", "Controversia o accusa: fact-check e revisione legale/editoriale necessari.");
    if (source.riskFlags.includes("unverified_data") || source.factConfidence === "unknown" || source.factConfidence === "uncertain") add("unverified_data", "high", "Sono presenti dati o affermazioni non verificati.");
    if (source.riskFlags.includes("copyright") || source.copyrightReviewRequired) add("copyright", "medium", "Verificare copyright: usare soltanto riassunti brevi e testo originale.");
    if (source.riskFlags.includes("video_rights")) add("video_rights", "medium", "Verificare diritti video; nessuna clip deve essere copiata o caricata.");
  }
  const fullText = `${input.title} ${input.sections.flatMap((section) => section.paragraphs).join(" ")}`.toLocaleLowerCase("it-IT");
  if (input.sources.some((source) => !source.verifiedForDraft) && CERTAINTY_TERMS.some((term) => fullText.includes(term))) add("assertive_claim", "high", "Affermazione troppo certa rispetto alle fonti disponibili.");
  return { risks, riskLevel: getOverallArticleRisk(risks), automaticPublicationAllowed: false };
}
