import { generateArticleDraft } from "./articleDraftGenerator";

export const MOCK_ARTICLE_GENERATION_RESULTS = [
  generateArticleDraft({ draftId: "draft-echo-4-4", workingTitle: "Otto gol, due epoche e una domanda", format: "historical_echo", tone: "clear_narrative", destination: "website_article", sourceRefs: [{ type: "story_library", id: "story-mock-4-4" }, { type: "news_radar", id: "news-data-candidate" }, { type: "historical_echo", id: "echo-mock-4-4" }], includeCta: true }),
  generateArticleDraft({ draftId: "draft-talent-video", workingTitle: "Il giovane regista da osservare", format: "talent_profile", tone: "cautious", destination: "substack_free", sourceRefs: [{ type: "news_radar", id: "news-talent" }, { type: "story_library", id: "story-mock-talent" }, { type: "video_radar", id: "vr-talent-week" }], includeCta: true }),
  generateArticleDraft({ draftId: "draft-rumor-market", workingTitle: "Possibile interesse di mercato: cosa sappiamo", format: "news_analysis", tone: "cautious", destination: "private_note", sourceRefs: [{ type: "news_radar", id: "news-rumor" }], includeCta: false }),
  generateArticleDraft({ draftId: "draft-no-source", workingTitle: "Idea ancora senza fonti", format: "short_article", tone: "concise", destination: "private_note", sourceRefs: [], includeCta: false }),
] as const;

export const MOCK_ARTICLE_DRAFTS = MOCK_ARTICLE_GENERATION_RESULTS.map((result) => result.draft);
