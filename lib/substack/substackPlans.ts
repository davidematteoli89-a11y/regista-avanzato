import type { NewsletterDigestPreview, SubstackPlan, SubstackReportPreviewData } from "./substackTypes";

export const SUBSTACK_FREE_PLAN: SubstackPlan = {
  id: "substack_free",
  name: "Substack Free",
  status: "free",
  description: "L’estensione gratuita del sito: una selezione editoriale settimanale per non perdere storie, talenti e partite da vedere.",
  ctaLabel: "Iscriviti gratis",
  disclaimer: "Newsletter editoriale gratuita; nessuna promessa di aggiornamenti live.",
  features: [
    { id: "weekly-recap", label: "Riepilogo settimanale", description: "La settimana calcistica in una lettura compatta." },
    { id: "best-stories", label: "Migliori storie", description: "Le storie più interessanti selezionate dalla redazione." },
    { id: "three-talents", label: "3 talenti da seguire", description: "Profili emergenti con contesto e dati disponibili." },
    { id: "three-highlights", label: "3 video/link highlights da vedere", description: "Soltanto collegamenti ufficiali, senza download o reupload." },
    { id: "crazy-match", label: "1 partita pazza", description: "Il risultato o racconto più insolito della settimana." },
    { id: "historical-link", label: "1 collegamento storico", description: "Un’eco tra calcio attuale e archivio." },
    { id: "site-link", label: "Link al sito", description: "Approfondimenti e schede disponibili su Regista Avanzato." },
  ],
};

export const SUBSTACK_PAID_PLAN: SubstackPlan = {
  id: "substack_paid",
  name: "Substack Paid",
  status: "paid",
  description: "Report editoriali avanzati e analisi più estese, distribuiti esternamente tramite Substack.",
  ctaLabel: "Ricevi il report completo",
  disclaimer: "Analisi editoriale: non costituisce scouting professionale certificato, consulenza o dato live.",
  features: [
    { id: "talent-radar", label: "Talent Radar completo", description: "Selezione estesa di profili e segnali da seguire." },
    { id: "italia-radar", label: "Italia Radar", description: "Giocatori, squadre e collegamenti con il calcio italiano." },
    { id: "minor-leagues", label: "Report campionati minori", description: "Lettura editoriale basata sui dati disponibili e verificati." },
    { id: "historical-premium", label: "Historical Echo premium", description: "Confronti storici più approfonditi." },
    { id: "creator-pack", label: "Creator Pack", description: "Angoli editoriali, strutture e spunti per contenuti originali." },
    { id: "weekend-watchlist", label: "Watchlist weekend", description: "Partite e profili da osservare nel fine settimana." },
    { id: "monthly-scouting", label: "Report mensile scouting", description: "Report editoriale mensile, non certificazione professionale." },
  ],
};

export const SUBSTACK_PLANS = [SUBSTACK_FREE_PLAN, SUBSTACK_PAID_PLAN] as const;

export const MOCK_WEEKLY_DIGEST: NewsletterDigestPreview = {
  weekTitle: "La settimana del Regista — anteprima mock",
  intro: "Una selezione dimostrativa di ciò che potrebbe arrivare nella newsletter gratuita.",
  stories: [
    { id: "story-1", title: "La rimonta della settimana", description: "Un racconto editoriale mock su una gara ad alta intensità." },
    { id: "story-2", title: "Il regista che cambia il ritmo", description: "Profilo narrativo dimostrativo." },
    { id: "story-3", title: "Una provincia che sorprende", description: "Storia mock da un campionato minore." },
  ],
  talents: [
    { id: "talent-1", title: "Talento #1 — centrocampista U21", description: "Profilo fittizio da verificare." },
    { id: "talent-2", title: "Talento #2 — esterno creativo", description: "Profilo fittizio da verificare." },
    { id: "talent-3", title: "Talento #3 — portiere emergente", description: "Profilo fittizio da verificare." },
  ],
  highlights: [
    { id: "video-1", title: "Highlights ufficiali #1", description: "Placeholder per un futuro link alla fonte ufficiale.", officialLinkOnly: true },
    { id: "video-2", title: "Highlights ufficiali #2", description: "Nessun video viene ospitato o scaricato.", officialLinkOnly: true },
    { id: "video-3", title: "Highlights ufficiali #3", description: "Link sottoposto a verifica editoriale.", officialLinkOnly: true },
  ],
  crazyMatch: { id: "crazy-match", title: "Partita pazza — 4–4", description: "Esempio mock di una gara ricca di eventi." },
  historicalEcho: { id: "echo", title: "Historical Echo — quando il 4–4 si ripete", description: "Collegamento storico dimostrativo, da verificare." },
  finalCta: "Leggi su Substack",
};

export const MOCK_PAID_REPORT: SubstackReportPreviewData = {
  title: "Talent Radar — anteprima report",
  reportType: "Report editoriale avanzato",
  description: "Esempio mock della struttura di un futuro report distribuito tramite Substack Paid.",
  sections: ["Segnali della settimana", "Profili da seguire", "Contesto tattico", "Watchlist weekend", "Fonti e limiti dei dati"],
  disclaimer: "Anteprima dimostrativa. Non è scouting professionale certificato e non contiene dati live.",
};
