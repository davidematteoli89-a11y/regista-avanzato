import type { ArticleDraftReviewItem, ArticleDraftRiskLevel } from "./articleGeneratorTypes";

const CHECKS = [
  ["sources", "Fonti", "Controllare origine, affidabilità e seconda fonte quando necessaria."],
  ["names", "Nomi", "Verificare grafia, identità e ruoli di persone e club."],
  ["dates", "Date", "Controllare date, stagioni e ricorrenze."],
  ["scores", "Punteggi", "Verificare risultati, minuti ed eventi citati."],
  ["rights", "Diritti immagini/video", "Verificare licenze; non scaricare o riutilizzare clip non autorizzate."],
  ["tone", "Tono", "Separare fatti, segnali, ipotesi e opinione."],
  ["headline", "Titolo", "Evitare clickbait e affermazioni non sostenute."],
  ["rumors", "Rumor", "Richiedere conferme indipendenti e linguaggio prudente."],
  ["quotes", "Citazioni", "Non inventare citazioni e verificare quelle minime eventualmente usate."],
  ["destination", "Destinazione", "Approvare canale, accesso e CTA prima dell'uso editoriale."],
] as const;

export function buildArticleReviewChecklist(riskLevel: ArticleDraftRiskLevel): ArticleDraftReviewItem[] {
  return CHECKS.map(([id, label, description]) => ({ id: `review-${id}`, label, description, required: true, status: riskLevel === "blocked" && id === "sources" ? "blocked" : "pending" }));
}
