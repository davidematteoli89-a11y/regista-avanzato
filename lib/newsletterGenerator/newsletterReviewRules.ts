import type { NewsletterDraftReviewItem, NewsletterDraftRiskLevel } from "./newsletterGeneratorTypes";

const CHECKS = [
  ["sources", "Fonti", "Controllare origine, affidabilità e seconde fonti."],
  ["names", "Nomi", "Verificare persone, club, ruoli e grafie."],
  ["dates", "Date", "Controllare date, stagioni e ricorrenze."],
  ["scores", "Punteggi", "Verificare risultati ed eventi citati."],
  ["rights", "Diritti immagini/video", "Usare solo materiali autorizzati; nessun download o reupload."],
  ["tone", "Tono", "Separare fatto, segnale, ipotesi e opinione."],
  ["subject", "Titolo e oggetto email", "Evitare clickbait e promesse non sostenute."],
  ["rumors", "Rumor", "Richiedere conferme indipendenti e linguaggio prudente."],
  ["quotes", "Citazioni", "Non inventare citazioni; verificare quelle eventualmente usate."],
  ["plan", "Destinazione free/paid", "Approvare piano, paywall esterno e porzione preview."],
  ["links", "Link Substack/sito", "Verificare ogni URL prima della pubblicazione manuale."],
  ["cta", "CTA", "Controllare chiarezza e assenza di promesse commerciali eccessive."],
  ["corrections", "Rettifiche", "Verificare aggiornamenti, smentite o correzioni necessarie."],
] as const;

export function buildNewsletterReviewChecklist(riskLevel: NewsletterDraftRiskLevel): NewsletterDraftReviewItem[] { return CHECKS.map(([id, label, description]) => ({ id: `newsletter-review-${id}`, label, description, required: true, status: riskLevel === "blocked" && id === "sources" ? "blocked" : "pending" })); }
