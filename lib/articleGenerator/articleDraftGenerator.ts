import { ARTICLE_GENERATOR_ACCESS } from "./articleAccessRules";
import { formatArticleDraftAsMarkdown } from "./articleMarkdownFormatter";
import { buildArticlePrompt } from "./articlePromptBuilder";
import { buildArticleReviewChecklist } from "./articleReviewRules";
import { evaluateArticleDraftRisks } from "./articleRiskRules";
import { collectArticleSources } from "./articleSourceCollector";
import type { ArticleDraft, ArticleDraftGenerationInput, ArticleDraftGenerationResult, ArticleDraftSection, ArticleDraftSource } from "./articleGeneratorTypes";

const FIXED_GENERATED_AT = "2026-08-25T12:00:00.000Z";
const slugify = (value: string) => value.toLocaleLowerCase("it-IT").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "bozza-articolo";
const sourceIds = (sources: readonly ArticleDraftSource[], confidence?: ArticleDraftSource["factConfidence"]) => sources.filter((source) => !confidence || source.factConfidence === confidence).map((source) => source.id);
const summaries = (sources: readonly ArticleDraftSource[]) => sources.map((source) => `${source.label}: ${source.shortSummary}`);

function buildSections(title: string, subtitle: string, sources: readonly ArticleDraftSource[], includeCta: boolean): ArticleDraftSection[] {
  const verified = sources.filter((source) => source.factConfidence === "verified");
  const signals = sources.filter((source) => source.factConfidence === "likely");
  const uncertain = sources.filter((source) => source.factConfidence === "uncertain" || source.factConfidence === "unknown");
  const opinions = sources.filter((source) => source.factConfidence === "opinion");
  const history = sources.filter((source) => source.type === "story_library" || source.type === "historical_echo");
  const verification = sources.filter((source) => !source.verifiedForDraft || source.riskFlags.length > 0);
  const sections: ArticleDraftSection[] = [
    { id: "section-title", kind: "title", heading: "Titolo", paragraphs: [title], factConfidence: "opinion", sourceIds: [] },
    { id: "section-subtitle", kind: "subtitle", heading: "Sottotitolo", paragraphs: [subtitle], factConfidence: "opinion", sourceIds: [] },
    { id: "section-opening", kind: "opening", heading: "Apertura", paragraphs: sources.length ? [`Questa bozza parte da ${sources.length} elementi mock già presenti nel progetto. Il collegamento proposto è editoriale e deve essere verificato prima di qualsiasi uso pubblico.`] : ["Bozza priva di fonti: nessuna affermazione può essere sviluppata o pubblicata."], factConfidence: "opinion", sourceIds: sources.map((source) => source.id) },
    { id: "section-context", kind: "context", heading: "Contesto", paragraphs: verified.length ? summaries(verified) : ["Non sono disponibili fatti classificati come verificati: mantenere ogni formulazione ipotetica."], factConfidence: verified.length ? "verified" : "unknown", sourceIds: sourceIds(verified) },
    { id: "section-interest", kind: "why_interesting", heading: "Perché è interessante", paragraphs: ["Il materiale suggerisce un possibile angolo narrativo. Interesse editoriale e rilevanza fattuale restano due valutazioni separate."], factConfidence: "opinion", sourceIds: sources.map((source) => source.id) },
    { id: "section-data", kind: "available_data", heading: "Dati e segnali disponibili", paragraphs: [...summaries(signals), ...summaries(uncertain), ...(signals.length || uncertain.length ? [] : ["Nessun segnale aggiuntivo disponibile."])], factConfidence: uncertain.length ? "uncertain" : signals.length ? "likely" : "unknown", sourceIds: [...sourceIds(signals), ...sourceIds(uncertain)] },
    { id: "section-history", kind: "historical_connection", heading: "Collegamento storico", paragraphs: history.length ? summaries(history) : ["Nessun Historical Echo o elemento Story Library è stato selezionato."], factConfidence: history.length ? "likely" : "unknown", sourceIds: history.map((source) => source.id) },
    { id: "section-angle", kind: "editorial_angle", heading: "Angolo editoriale", paragraphs: opinions.length ? summaries(opinions) : ["Separare sempre fatto, segnale, ipotesi e interpretazione. Non trasformare una coincidenza in una certezza."], factConfidence: "opinion", sourceIds: opinions.map((source) => source.id) },
    { id: "section-verify", kind: "verification", heading: "Cosa verificare prima di pubblicare", paragraphs: verification.length ? verification.map((source) => `${source.label}: verificare ${source.riskFlags.join(", ") || "fonte e contesto"}.`) : ["Ricontrollare comunque nomi, date, punteggi, fonti, tono, diritti e destinazione."], factConfidence: "unknown", sourceIds: verification.map((source) => source.id) },
  ];
  if (includeCta) sections.push({ id: "section-cta", kind: "cta", heading: "CTA eventuale", paragraphs: ["CTA proposta da approvare in base alla destinazione: esplora il contenuto correlato o iscriviti al canale editoriale appropriato."], factConfidence: "opinion", sourceIds: [] });
  return sections;
}

/** Generatore deterministico in-memory: zero AI, rete, file, database e pubblicazioni. */
export function generateArticleDraft(input: ArticleDraftGenerationInput): ArticleDraftGenerationResult {
  const collection = collectArticleSources(input);
  const firstSource = collection.sources[0];
  const title = input.workingTitle?.trim() || (firstSource ? `Bozza: ${firstSource.label}` : "Bozza senza fonte — bloccata");
  const subtitle = firstSource ? `Spunto editoriale costruito da ${collection.sources.length} fonti mock, da revisionare.` : "Nessun elemento verificabile disponibile.";
  const sections = buildSections(title, subtitle, collection.sources, input.includeCta ?? false);
  const riskResult = evaluateArticleDraftRisks({ title, sources: collection.sources, sections });
  const id = input.draftId ?? `draft-${slugify(title)}-${input.format}`;
  const baseDraft: ArticleDraft = {
    id, slug: slugify(title), title, subtitle,
    status: collection.sources.length ? "generated" : "draft",
    visibility: "private_admin",
    format: input.format,
    tone: input.tone,
    destinations: [input.destination],
    sections,
    sources: collection.sources,
    risks: riskResult.risks,
    riskLevel: riskResult.riskLevel,
    reviewChecklist: buildArticleReviewChecklist(riskResult.riskLevel),
    internalPrompt: buildArticlePrompt(input, collection.sources),
    markdownPreview: "",
    reviewedByHuman: false,
    generatedWithoutExternalAi: true,
    autoPublish: false,
    createdAt: FIXED_GENERATED_AT,
    updatedAt: FIXED_GENERATED_AT,
  };
  const markdown = formatArticleDraftAsMarkdown(baseDraft);
  const draft = { ...baseDraft, markdownPreview: markdown };
  return { success: collection.sources.length > 0, draft, markdown, warnings: [...collection.warnings, ...riskResult.risks.map((risk) => risk.message)], externalAiCalls: 0, networkCalls: 0, filesWritten: 0, databaseWrites: 0, published: false };
}

export { ARTICLE_GENERATOR_ACCESS };
