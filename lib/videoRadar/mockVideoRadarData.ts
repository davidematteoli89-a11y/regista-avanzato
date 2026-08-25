import type { HighlightLink, OfficialVideoSource, VideoRadarItem, VideoWatchlistItem } from "./videoRadarTypes";

export const MOCK_OFFICIAL_SOURCES: OfficialVideoSource[] = [
  { id: "mock-league-source", name: "Lega ufficiale mock approvata", sourceType: "official_league", domain: null, verified: true, rightsNote: "Identità mock approvata; URL reale ancora assente e non inventato." },
  { id: "mock-club-source", name: "Club ufficiale da configurare", sourceType: "official_club", domain: null, verified: false, rightsNote: "Nessun URL reale inserito nel mock." },
];

export const MOCK_VIDEO_RADAR_ITEMS: VideoRadarItem[] = [
  { id: "vr-talent-week", slug: "mock-talento-settimana", type: "talent_of_the_week", status: "approved", visibility: "free_login", title: "Talento della settimana — profilo mock", summary: "Analisi originale dimostrativa di un giovane centrocampista.", originalContent: true, officialVideoUrl: null, embedAvailability: "unknown", relatedMatchId: "mock-aurora-borgo", relatedPlayerIds: ["mock-luca-ferri"], tags: ["U21", "talento", "mock"], editorialNotes: "Preparare grafica originale e voice-over; nessuna clip partita.", publishedAt: "2026-08-24T09:00:00.000Z" },
  { id: "vr-crazy-match", slug: "mock-partita-pazza", type: "crazy_match_of_the_week", status: "approved", visibility: "public_preview", title: "La partita pazza della settimana", summary: "Il 4–4 mock raccontato con dati, grafiche e commento originale.", originalContent: true, officialVideoUrl: null, embedAvailability: "external_link_only", relatedMatchId: "mock-aurora-borgo", relatedPlayerIds: [], tags: ["4-4", "partita pazza"], editorialNotes: "Usare soltanto scorecard e timeline originali.", publishedAt: "2026-08-23T12:00:00.000Z" },
  { id: "vr-tactical", slug: "mock-nota-tattica", type: "tactical_note", status: "approved", visibility: "free_login", title: "Nota tattica — uscita dal pressing", summary: "Script originale basato su schemi e dati dimostrativi.", originalContent: true, officialVideoUrl: null, embedAvailability: "not_allowed", relatedMatchId: null, relatedPlayerIds: [], tags: ["tattica", "creator"], editorialNotes: "Animazioni e lavagna tattica prodotte internamente.", publishedAt: "2026-08-22T15:00:00.000Z" },
  { id: "vr-history", slug: "mock-historical-echo-video", type: "historical_echo_video", status: "approved", visibility: "free_login", title: "Historical Echo in video", summary: "Confronto storico mock in formato script/reel originale.", originalContent: true, officialVideoUrl: null, embedAvailability: "not_allowed", relatedMatchId: "mock-aurora-borgo", relatedPlayerIds: [], tags: ["storia", "historical echo"], editorialNotes: "Fact-check storico obbligatorio prima della produzione.", publishedAt: "2026-08-21T11:00:00.000Z" },
  { id: "vr-pending", slug: "mock-pending", type: "top_10_goals_to_watch", status: "pending_review", visibility: "private_editorial", title: "Top gol — in revisione", summary: "Elemento non pubblico.", originalContent: false, officialVideoUrl: null, embedAvailability: "unknown", relatedMatchId: null, relatedPlayerIds: [], tags: ["pending"], editorialNotes: "Verificare tutte le fonti.", publishedAt: null },
];

export const MOCK_HIGHLIGHT_LINKS: HighlightLink[] = [
  { id: "hl-aurora-borgo-approved", matchId: "mock-aurora-borgo", title: "Highlights ufficiali — placeholder approvato", url: null, source: MOCK_OFFICIAL_SOURCES[0], status: "approved", embedAvailability: "external_link_only", reviewedAt: "2026-08-24T10:00:00.000Z", editorialNote: "Record approvato come struttura; URL ufficiale non ancora configurato." },
  { id: "hl-alpi-lago-pending", matchId: "mock-alpi-lago", title: "Highlights in verifica", url: null, source: MOCK_OFFICIAL_SOURCES[1], status: "pending_review", embedAvailability: "unknown", reviewedAt: null, editorialNote: "Non mostrare pubblicamente fino alla verifica." },
];

export const MOCK_VIDEO_WATCHLIST: VideoWatchlistItem[] = [
  { id: "watch-1", videoRadarItemId: "vr-talent-week", title: "Osservare il centrocampista mock", reasonToWatch: "Ricezione tra le linee e ultimo passaggio.", scheduledAt: "2026-08-29T18:00:00.000Z", priority: "high", status: "approved", competitionName: "Serie A — mock" },
  { id: "watch-2", videoRadarItemId: "vr-tactical", title: "Focus sul pressing", reasonToWatch: "Confrontare struttura in possesso e riaggressione.", scheduledAt: "2026-08-30T14:30:00.000Z", priority: "medium", status: "approved", competitionName: "Swiss Super League — mock" },
  { id: "watch-pending", videoRadarItemId: "vr-pending", title: "Elemento in review", reasonToWatch: "Non pubblico.", scheduledAt: null, priority: "low", status: "pending_review", competitionName: null },
];
