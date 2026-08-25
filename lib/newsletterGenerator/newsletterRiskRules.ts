import type { NewsletterDraftRisk, NewsletterDraftRiskLevel, NewsletterDraftSection, NewsletterDraftSource } from "./newsletterGeneratorTypes";

const weights: Record<NewsletterDraftRiskLevel, number> = { low: 1, medium: 2, high: 3, blocked: 4 };
const assertiveTerms = ["è certo", "senza dubbio", "affare fatto", "ufficiale!", "dimostra definitivamente"];
const commercialTerms = ["risultati garantiti", "rendimento garantito", "talento sicuro", "successo assicurato"];
const scoutingTerms = ["scouting certificato", "valutazione professionale definitiva", "campione garantito"];

export function getOverallNewsletterRisk(risks: readonly NewsletterDraftRisk[]): NewsletterDraftRiskLevel { return risks.reduce<NewsletterDraftRiskLevel>((level, risk) => weights[risk.level] > weights[level] ? risk.level : level, "low"); }

export function evaluateNewsletterRisks(input: { title: string; subject: string; sources: readonly NewsletterDraftSource[]; sections: readonly NewsletterDraftSection[] }): { risks: NewsletterDraftRisk[]; riskLevel: NewsletterDraftRiskLevel; autoPublishAllowed: false; autoSendAllowed: false } {
  const risks: NewsletterDraftRisk[] = [];
  const add = (code: NewsletterDraftRisk["code"], level: NewsletterDraftRiskLevel, message: string) => { if (!risks.some((risk) => risk.code === code)) risks.push({ id: `newsletter-risk-${code}`, code, level, message, blocksAutomaticPublishAndSend: true }); };
  if (input.sources.length === 0) add("missing_source", "blocked", "Newsletter senza fonti: invio e pubblicazione bloccati.");
  for (const source of input.sources) {
    if (source.riskFlags.includes("rumor")) add("rumor", "high", "Rumor presente: seconda fonte e linguaggio ipotetico obbligatori.");
    if (source.riskFlags.includes("injury")) add("injury", "medium", "Infortunio: usare solo comunicazioni autorizzate e non formulare diagnosi.");
    if (source.riskFlags.includes("controversy")) add("controversy", "high", "Controversia o accusa: fact-check e revisione editoriale/legale.");
    if (source.riskFlags.includes("unverified_data") || source.factConfidence === "uncertain" || source.factConfidence === "unknown") add("unverified_data", "high", "Sono presenti dati o affermazioni non verificati.");
    if (source.riskFlags.includes("copyright")) add("copyright", "medium", "Usare soltanto sintesi brevi e contenuto originale; verificare copyright.");
    if (source.riskFlags.includes("unofficial_highlight") || (source.type === "video_radar" && !source.officialLinkVerified)) add("unofficial_highlight", "high", "Highlight senza link ufficiale verificato: non inserirlo come link/video.");
    if (source.riskFlags.includes("video_rights")) add("video_rights", "medium", "Verificare diritti immagini/video; nessun download o reupload.");
    if (source.riskFlags.includes("commercial_promise")) add("commercial_promise", "high", "Promessa commerciale eccessiva da rimuovere.");
    if (source.riskFlags.includes("scouting_claim")) add("scouting_claim", "medium", "Evitare promesse o linguaggio da scouting certificato.");
  }
  const text = `${input.title} ${input.subject} ${input.sections.flatMap((section) => section.items).join(" ")}`.toLocaleLowerCase("it-IT");
  if (input.sources.some((source) => !source.verifiedForDraft) && assertiveTerms.some((term) => text.includes(term))) add("assertive_claim", "high", "Affermazione troppo certa rispetto alle fonti disponibili.");
  if (commercialTerms.some((term) => text.includes(term))) add("commercial_promise", "high", "Promessa commerciale eccessiva nel testo.");
  if (scoutingTerms.some((term) => text.includes(term))) add("scouting_claim", "high", "Il testo suggerisce scouting certificato o una valutazione definitiva.");
  return { risks, riskLevel: getOverallNewsletterRisk(risks), autoPublishAllowed: false, autoSendAllowed: false };
}
