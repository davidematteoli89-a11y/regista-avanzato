export type PublicArticleCategory = "storia" | "talento" | "tattica" | "mercato" | "campionati_minori" | "calcio_internazionale" | "historical_echo" | "video_radar" | "numeri" | "cultura_calcistica" | "opinione_editoriale";
export type PublicArticleStatus = "draft" | "pending_review" | "approved" | "published" | "archived" | "rejected";
export type PublicArticleVisibility = "public_full" | "public_preview" | "login_required" | "substack_only" | "paid_substack_candidate" | "private_admin";
export type PublicArticleFormat = "news_brief" | "feature" | "longform" | "profile" | "analysis" | "roundup";
export type PublicTalentStatus = "draft" | "pending_review" | "approved" | "published" | "archived" | "rejected";
export type PublicRadarType = "talent_radar" | "match_radar" | "story_radar" | "video_radar" | "historical_echo" | "italy_connection" | "minor_league_signal" | "weekly_watchlist";
export type PublicCTAType = "login_free" | "newsletter" | "substack" | "stats_hub" | "story_library" | "video_radar";

export type PublicEditorialSource = {
  id: string;
  label: string;
  type: "original" | "official" | "story_library" | "historical_echo" | "manual_research";
  publicUrl: string | null;
  verified: boolean;
  publiclyVisible: boolean;
};

export type PublicContentAccess = {
  canViewFull: boolean;
  requiresLogin: boolean;
  redirectsToSubstack: boolean;
  isPreview: boolean;
  consumesSearchQuota: false;
  message: string;
};

export type PublicArticle = {
  id: string;
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  previewText: string;
  bodySections: { id: string; heading: string | null; paragraphs: string[] }[];
  category: PublicArticleCategory;
  format: PublicArticleFormat;
  status: PublicArticleStatus;
  visibility: PublicArticleVisibility;
  authorLabel: string;
  publishedAt: string | null;
  readingMinutes: number;
  tags: string[];
  featured: boolean;
  sources: PublicEditorialSource[];
  internalNotes: string[];
  autoPublished: false;
};

export type PublicTalent = {
  id: string;
  slug: string;
  name: string;
  role: string;
  ageLabel: string;
  competitionLabel: string;
  editorialSummary: string;
  whyWatch: string;
  status: PublicTalentStatus;
  visibility: "public" | "private_admin";
  tags: string[];
  reportAvailability: "site_preview" | "substack_candidate";
  scoutingDisclaimer: string;
};

export type PublicRadarItem = {
  id: string;
  slug: string;
  type: PublicRadarType;
  title: string;
  summary: string;
  signalLabel: string;
  status: PublicArticleStatus;
  visibility: "public" | "private_admin";
  relatedHref: string | null;
  internalScore: number | null;
  internalWarnings: string[];
  certaintyClaimed: false;
};

export type PublicCrazyMatch = {
  id: string;
  slug: string;
  competitionLabel: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  dateLabel: string;
  editorialSummary: string;
  whyItMatters: string;
  status: PublicArticleStatus;
  visibility: "public" | "private_admin";
  historicalEchoHref: string | null;
  reviewedTrigger: boolean;
  autoPublished: false;
};

export type PublicArticleView = Omit<PublicArticle, "internalNotes">;
export type PublicRadarView = Omit<PublicRadarItem, "internalScore" | "internalWarnings">;

export type PublicHomepageSection = {
  id: string;
  title: string;
  description: string;
  href: string;
  itemCount: number;
};

export type PublicHomepageData = {
  hero: PublicArticleView;
  featuredArticles: PublicArticleView[];
  talents: PublicTalent[];
  crazyMatches: PublicCrazyMatch[];
  historicalEchoes: import("../historicalEcho/historicalEchoTypes").PublicHistoricalEcho[];
  videoRadarPreview: import("../videoRadar/videoRadarTypes").VideoRadarItem[];
  competitionsPreview: import("../publicData/publicDataTypes").PublicCompetition[];
  sections: PublicHomepageSection[];
  access: { consumesSearchQuota: false; exposesAdminData: false; source: "mock_public_website" };
};
