import { generateVideoScript } from "./videoScriptGenerator";
import type { CreatorPack } from "./videoScriptTypes";

export const MOCK_VIDEO_SCRIPT_RESULTS = [
  generateVideoScript({ scriptId: "script-reel-30-talent", title: "Il regista da osservare in 30 secondi", format: "reel_30", destination: "instagram_reel", tone: "clear_fast", sourceRefs: [{ type: "news_radar", id: "news-talent" }, { type: "story_library", id: "story-mock-talent" }] }),
  generateVideoScript({ scriptId: "script-reel-60-match", title: "Otto gol, una domanda", format: "reel_60", destination: "youtube_shorts", tone: "narrative", sourceRefs: [{ type: "match_trigger", id: "mock-aurora-borgo" }, { type: "historical_echo", id: "echo-mock-4-4" }] }),
  generateVideoScript({ scriptId: "script-video-echo", title: "Historical Echo — il copione del 4–4", format: "historical_echo_video", destination: "youtube_video", tone: "narrative", sourceRefs: [{ type: "historical_echo", id: "echo-mock-4-4" }, { type: "article_draft", id: "draft-echo-4-4" }] }),
  generateVideoScript({ scriptId: "script-talent-profile", title: "Talent Radar — segnali, non sentenze", format: "talent_profile", destination: "substack_paid", tone: "cautious", sourceRefs: [{ type: "newsletter_draft", id: "newsletter-talent-paid" }, { type: "video_radar", id: "vr-talent-week" }] }),
  generateVideoScript({ scriptId: "script-tactical-board", title: "Uscire dal pressing con una lavagna originale", format: "tactical_board", destination: "website_preview", tone: "tactical", sourceRefs: [{ type: "video_radar", id: "vr-tactical" }] }),
  generateVideoScript({ scriptId: "script-creator-seed", title: "Creator seed — il dato diventa storia", format: "creator_pack_item", destination: "creator_pack", tone: "creator_friendly", sourceRefs: [{ type: "newsletter_draft", id: "newsletter-creator-internal" }, { type: "article_draft", id: "draft-talent-video" }] }),
  generateVideoScript({ scriptId: "script-blocked-empty", title: "Script senza fonti", format: "short_vertical", destination: "private_note", tone: "cautious", sourceRefs: [] }),
];

export const MOCK_VIDEO_SCRIPTS = MOCK_VIDEO_SCRIPT_RESULTS.map((result) => result.draft);
const packSources = MOCK_VIDEO_SCRIPTS.slice(0, 3).flatMap((script) => script.sources.map((source) => source.id)).filter((id, index, all) => all.indexOf(id) === index);
export const MOCK_CREATOR_PACKS: CreatorPack[] = [{ id: "creator-pack-weekly-mock", title: "Creator Pack settimanale — mock", status: "generated", visibility: "private_admin", sourceIds: packSources, autoPublish: false, createdAt: "2026-08-25T16:00:00.000Z", updatedAt: "2026-08-25T16:00:00.000Z", items: [
  ...["Otto gol: è davvero lo stesso copione?", "Un talento non si giudica in una partita", "Il dato che cambia il modo di guardare la gara"].map((content, index) => ({ id: `pack-hook-${index + 1}`, type: "hook" as const, title: `Hook ${index + 1}`, content, relatedScriptId: MOCK_VIDEO_SCRIPTS[index]?.id ?? null, sourceIds: packSources, reviewed: false as const })),
  ...["Reel seed: risultato e cambi di inerzia", "Reel seed: profilo talento prudente", "Reel seed: lavagna senza clip"].map((content, index) => ({ id: `pack-reel-${index + 1}`, type: "reel_seed" as const, title: `Reel seed ${index + 1}`, content, relatedScriptId: MOCK_VIDEO_SCRIPTS[index]?.id ?? null, sourceIds: packSources, reviewed: false as const })),
  { id: "pack-short", type: "short_script", title: "Script breve", content: "Hook, fatto verificato, interpretazione e CTA: struttura da revisionare.", relatedScriptId: "script-reel-30-talent", sourceIds: packSources, reviewed: false },
  { id: "pack-carousel", type: "carousel_idea", title: "Idea carosello", content: "Cinque card originali: contesto, dato, svolta, lettura prudente, CTA.", relatedScriptId: null, sourceIds: packSources, reviewed: false },
  { id: "pack-newsletter", type: "newsletter_idea", title: "Idea newsletter collegata", content: "Espandere il video in un digest con fonti e controlli editoriali.", relatedScriptId: null, sourceIds: packSources, reviewed: false },
] }];
