export type AdminEditorialArea = "articles" | "news" | "stories" | "historical_echo";

export type AdminEditorialSource = "supabase_staging" | "mock_fallback";

export type AdminEditorialRecord = {
  id: string;
  area: AdminEditorialArea;
  title: string;
  slug: string;
  status: string;
  visibility: string;
  publishedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  reviewStatus: string | null;
  internalNotes: string | null;
  internalWarnings: string[];
  internalScoreLabel: string | null;
  sourceLabel: string;
  detailHref: string | null;
};

export type AdminEditorialReadResult = {
  items: AdminEditorialRecord[];
  source: AdminEditorialSource;
  warning: string | null;
  realWritesEnabled: false;
  providerCalls: 0;
  apifyCalls: 0;
  aiCalls: 0;
};

export type AdminEditorialSummary = {
  total: number;
  byArea: Record<AdminEditorialArea, number>;
  byStatus: Record<string, number>;
  source: AdminEditorialSource;
  warning: string | null;
};
