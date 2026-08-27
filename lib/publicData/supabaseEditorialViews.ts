import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { HistoricalEchoType, PublicHistoricalEcho } from "@/lib/historicalEcho/historicalEchoTypes";
import type { NewsRadarCategory, NewsRadarSource, NewsRadarVisibility, PublicNewsRadarItem } from "@/lib/newsRadar/newsRadarTypes";
import type { PublicArticleCategory, PublicArticleFormat, PublicArticleView, PublicArticleVisibility } from "@/lib/publicWebsite/publicWebsiteTypes";
import type { StoryCategory, StoryFormat, StoryItem, StoryVisibility } from "@/lib/storyLibrary/storyTypes";

type EditorialList<T> = {
  items: T[];
  source: "supabase_public_view";
  message: string;
};

type PublicArticlePublishedRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  hero_image_url: string | null;
  competition_id: string | null;
  match_id: string | null;
  player_id: string | null;
  team_id: string | null;
  visibility: string;
  login_required: boolean;
  published_at: string | null;
  updated_at: string | null;
};

type PublicNewsPublishedRow = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  body: string | null;
  source_name: string | null;
  source_url: string | null;
  source_published_at: string | null;
  category: string | null;
  competition_id: string | null;
  match_id: string | null;
  team_id: string | null;
  player_id: string | null;
  visibility: string;
  login_required: boolean;
  published_at: string | null;
  updated_at: string | null;
};

type PublicStoryPublishedRow = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  story_body: string | null;
  story_type: string | null;
  historical_period: string | null;
  tags: string[] | null;
  visibility: string;
  login_required: boolean;
  published_at: string | null;
  updated_at: string | null;
};

type PublicHistoricalEchoRow = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  echo_type: string;
  explanation: string | null;
  related_story_id: string | null;
  modern_match_id: string | null;
  comparison_points: unknown;
  related_matches: unknown;
  timeline: unknown;
  visibility: string;
  login_required: boolean;
  published_at: string | null;
  updated_at: string | null;
};

const ARTICLE_CATEGORIES = new Set<PublicArticleCategory>([
  "storia",
  "talento",
  "tattica",
  "mercato",
  "campionati_minori",
  "calcio_internazionale",
  "historical_echo",
  "video_radar",
  "numeri",
  "cultura_calcistica",
  "opinione_editoriale",
]);

const NEWS_CATEGORIES = new Set<NewsRadarCategory>([
  "official_news",
  "transfer_market",
  "injury_update",
  "tactical_analysis",
  "talent_signal",
  "minor_league_signal",
  "italian_connection",
  "historical_echo_candidate",
  "video_radar_candidate",
  "controversy",
  "data_signal",
  "cultural_story",
  "match_preview",
  "match_reaction",
]);

const STORY_CATEGORIES = new Set<StoryCategory>([
  "legendary_match",
  "player_profile",
  "team_story",
  "tactical_story",
  "transfer_story",
  "underdog_story",
  "rivalry",
  "record",
  "comeback",
  "scandal_or_controversy",
  "cultural_story",
  "italian_connection",
  "historical_echo",
  "talent_story",
]);

const ECHO_TYPES = new Set<HistoricalEchoType>([
  "scoreline_echo",
  "comeback_echo",
  "late_goal_echo",
  "underdog_echo",
  "rivalry_echo",
  "talent_echo",
  "italian_connection_echo",
  "tactical_echo",
  "historical_anniversary",
  "record_echo",
  "cultural_echo",
  "video_radar_echo",
  "substack_report_candidate",
]);

function isSupabasePublicConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function createPublicClient() {
  if (!isSupabasePublicConfigured()) return null;

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}

function mapContentVisibility(visibility: string, loginRequired: boolean): PublicArticleVisibility {
  if (loginRequired || visibility === "public_login_required") return "login_required";
  if (visibility === "public_free") return "public_full";
  if (visibility === "substack_free") return "substack_only";
  if (visibility === "substack_paid") return "paid_substack_candidate";
  if (visibility === "private_admin") return "private_admin";
  return "public_preview";
}

function mapNewsVisibility(visibility: string, loginRequired: boolean): NewsRadarVisibility {
  if (loginRequired || visibility === "public_login_required") return "login_required";
  if (visibility === "public_free") return "public_full";
  if (visibility === "substack_free") return "substack_only";
  if (visibility === "substack_paid") return "paid_substack_candidate";
  if (visibility === "private_admin") return "private_admin";
  return "public_preview";
}

function mapStoryVisibility(visibility: string): StoryVisibility {
  if (visibility === "public_free") return "public_full";
  if (visibility === "substack_free") return "substack_only";
  if (visibility === "substack_paid") return "paid_substack_candidate";
  if (visibility === "private_admin") return "private_admin";
  return "public_preview";
}

function paragraphsFromBody(body: string | null): string[] {
  return (body ?? "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function readingMinutes(body: string | null) {
  const words = (body ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function safeArticleCategory(value: string | null): PublicArticleCategory {
  return value && ARTICLE_CATEGORIES.has(value as PublicArticleCategory) ? (value as PublicArticleCategory) : "cultura_calcistica";
}

function safeNewsCategory(value: string | null): NewsRadarCategory {
  return value && NEWS_CATEGORIES.has(value as NewsRadarCategory) ? (value as NewsRadarCategory) : "cultural_story";
}

function safeStoryCategory(value: string | null): StoryCategory {
  return value && STORY_CATEGORIES.has(value as StoryCategory) ? (value as StoryCategory) : "cultural_story";
}

function safeEchoType(value: string): HistoricalEchoType {
  return ECHO_TYPES.has(value as HistoricalEchoType) ? (value as HistoricalEchoType) : "cultural_echo";
}

function asStringRecordArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object" && !Array.isArray(item)) : [];
}

function stringOrFallback(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function mapArticleRow(row: PublicArticlePublishedRow): PublicArticleView {
  const bodySections = paragraphsFromBody(row.body);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    kicker: "Staging demo",
    summary: row.excerpt ?? "Contenuto editoriale demo pubblicato nello staging.",
    previewText: row.excerpt ?? "Anteprima editoriale demo.",
    bodySections: bodySections.length ? [{ id: `${row.id}-body`, heading: null, paragraphs: bodySections }] : [],
    category: safeArticleCategory(null),
    format: "feature" satisfies PublicArticleFormat,
    status: "published",
    visibility: mapContentVisibility(row.visibility, row.login_required),
    authorLabel: "Redazione Regista Avanzato",
    publishedAt: row.published_at,
    readingMinutes: readingMinutes(row.body),
    tags: ["demo", "staging"],
    featured: false,
    sources: [],
    autoPublished: false,
  };
}

function mapNewsRow(row: PublicNewsPublishedRow): PublicNewsRadarItem {
  const source: NewsRadarSource | null = row.source_name
    ? {
        id: `${row.id}-source`,
        name: row.source_name,
        type: "manual_research",
        reliability: "high",
        referenceUrl: row.source_url,
        referenceLabel: row.source_name,
        publiclyVisible: true,
        internalNote: null,
        checkedOfflineOnly: true,
      }
    : null;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary ?? "News demo pubblicata nello staging.",
    body: paragraphsFromBody(row.body),
    category: safeNewsCategory(row.category),
    status: "published",
    visibility: mapNewsVisibility(row.visibility, row.login_required),
    sources: source ? [{ id: source.id, name: source.name, type: source.type, reliability: source.reliability, referenceUrl: source.referenceUrl, referenceLabel: source.referenceLabel, checkedOfflineOnly: source.checkedOfflineOnly }] : [],
    signals: [],
    reviewStatus: "approved",
    relatedEntities: [],
    certaintyClaimed: false,
    autoPublished: false,
    publishedAt: row.published_at,
    createdAt: row.published_at ?? row.updated_at ?? new Date(0).toISOString(),
    updatedAt: row.updated_at ?? row.published_at ?? new Date(0).toISOString(),
  };
}

function mapStoryRow(row: PublicStoryPublishedRow): StoryItem {
  const visibility = mapStoryVisibility(row.visibility);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: safeStoryCategory(row.story_type),
    status: "published",
    visibility,
    format: "short_story" satisfies StoryFormat,
    summary: row.summary ?? "Story demo pubblicata nello staging.",
    originalBody: visibility === "public_full" ? (row.story_body ?? "") : "",
    keyFacts: [],
    sourceIds: [],
    relatedEntities: [],
    timeline: row.historical_period
      ? [{ id: `${row.id}-period`, dateLabel: row.historical_period, title: "Periodo narrativo", description: "Contesto demo indicato manualmente.", sourceIds: [] }]
      : [],
    tags: row.tags ?? ["demo", "staging"],
    reviewStatus: "approved",
    reviewWarnings: [],
    createdAt: row.published_at ?? row.updated_at ?? new Date(0).toISOString(),
    updatedAt: row.updated_at ?? row.published_at ?? new Date(0).toISOString(),
    publishedAt: row.published_at,
    originalOrReworked: true,
    autoPublished: false,
  };
}

function mapHistoricalEchoRow(row: PublicHistoricalEchoRow): PublicHistoricalEcho {
  const comparisonPoints = asStringRecordArray(row.comparison_points).map((item, index) => ({
    id: stringOrFallback(item.id, `${row.id}-point-${index + 1}`),
    label: stringOrFallback(item.label, "Punto di confronto"),
    modernValue: stringOrFallback(item.modernValue ?? item.modern_value, "Evento moderno demo"),
    historicalValue: stringOrFallback(item.historicalValue ?? item.historical_value, "Precedente demo"),
    similarity: ["direct", "partial", "contextual"].includes(String(item.similarity)) ? (item.similarity as "direct" | "partial" | "contextual") : "contextual",
  }));

  const relatedMatches = asStringRecordArray(row.related_matches).map((item, index) => ({
    id: stringOrFallback(item.id, `${row.id}-match-${index + 1}`),
    label: stringOrFallback(item.label, "Partita demo"),
    scoreline: typeof item.scoreline === "string" ? item.scoreline : null,
    dateLabel: stringOrFallback(item.dateLabel ?? item.date_label, "Data demo"),
    isModern: typeof item.isModern === "boolean" ? item.isModern : Boolean(item.is_modern),
  }));

  const timeline = asStringRecordArray(row.timeline).map((item, index) => ({
    id: stringOrFallback(item.id, `${row.id}-timeline-${index + 1}`),
    dateLabel: stringOrFallback(item.dateLabel ?? item.date_label, "Momento demo"),
    title: stringOrFallback(item.title, "Evento demo"),
    description: stringOrFallback(item.description, "Nota editoriale demo."),
  }));

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary ?? "Historical Echo demo pubblicato nello staging.",
    type: safeEchoType(row.echo_type),
    status: "published",
    visibility: row.visibility === "public_free" ? "public_full" : "public_preview",
    explanation: row.explanation ?? "Confronto editoriale demo, non una equivalenza storica.",
    comparisonPoints,
    relatedStory: {
      storyId: row.related_story_id ?? "story-demo",
      slug: "storia-demo-c3",
      title: "Story demo collegata",
      category: "cultural_story",
      summary: "Collegamento demo alla Story Library.",
    },
    relatedMatches,
    timeline,
    reviewedByHuman: true,
    autoPublished: false,
    createdAt: row.published_at ?? row.updated_at ?? new Date(0).toISOString(),
    updatedAt: row.updated_at ?? row.published_at ?? new Date(0).toISOString(),
    confidence: "medium",
    confidenceLabel: "Spunto editoriale",
    publicReason: row.explanation ?? "Confronto editoriale demo, non una equivalenza storica.",
  };
}

async function readRows<T extends Record<string, unknown>>(viewName: string, orderColumn = "published_at") {
  const supabase = createPublicClient();
  if (!supabase) return { configured: false, rows: [] as T[], error: null };

  const { data, error } = await supabase.from(viewName).select("*").order(orderColumn, { ascending: false });
  return { configured: true, rows: (data ?? []) as T[], error };
}

export async function readEditorialArticlesFromSupabase(): Promise<EditorialList<PublicArticleView> | null> {
  const result = await readRows<PublicArticlePublishedRow>("public_articles_published");
  if (!result.configured || result.error) return null;
  return {
    items: result.rows.map(mapArticleRow),
    source: "supabase_public_view",
    message: result.rows.length ? "Articoli letti da public_articles_published." : "Dati editoriali in preparazione: nessun articolo pubblicato nello staging.",
  };
}

export async function readEditorialArticleFromSupabase(slug: string): Promise<PublicArticleView | null | undefined> {
  const list = await readEditorialArticlesFromSupabase();
  if (!list) return undefined;
  return list.items.find((item) => item.id === slug || item.slug === slug) ?? null;
}

export async function readNewsFromSupabase(): Promise<EditorialList<PublicNewsRadarItem> | null> {
  const result = await readRows<PublicNewsPublishedRow>("public_news_published");
  if (!result.configured || result.error) return null;
  return {
    items: result.rows.map(mapNewsRow),
    source: "supabase_public_view",
    message: result.rows.length ? "News lette da public_news_published." : "Dati in preparazione: nessuna news pubblicata nello staging.",
  };
}

export async function readNewsDetailFromSupabase(slug: string): Promise<PublicNewsRadarItem | null | undefined> {
  const list = await readNewsFromSupabase();
  if (!list) return undefined;
  return list.items.find((item) => item.id === slug || item.slug === slug) ?? null;
}

export async function readStoriesFromSupabase(): Promise<EditorialList<StoryItem> | null> {
  const result = await readRows<PublicStoryPublishedRow>("public_stories_published");
  if (!result.configured || result.error) return null;
  return {
    items: result.rows.map(mapStoryRow),
    source: "supabase_public_view",
    message: result.rows.length ? "Storie lette da public_stories_published." : "Dati in preparazione: nessuna storia pubblicata nello staging.",
  };
}

export async function readStoryDetailFromSupabase(slug: string): Promise<StoryItem | null | undefined> {
  const list = await readStoriesFromSupabase();
  if (!list) return undefined;
  return list.items.find((item) => item.id === slug || item.slug === slug) ?? null;
}

export async function readHistoricalEchoesFromSupabase(): Promise<EditorialList<PublicHistoricalEcho> | null> {
  const result = await readRows<PublicHistoricalEchoRow>("public_historical_echoes");
  if (!result.configured || result.error) return null;
  return {
    items: result.rows.map(mapHistoricalEchoRow),
    source: "supabase_public_view",
    message: result.rows.length ? "Historical Echo letti da public_historical_echoes." : "Dati in preparazione: nessun Historical Echo pubblicato nello staging.",
  };
}

export async function readHistoricalEchoDetailFromSupabase(slug: string): Promise<PublicHistoricalEcho | null | undefined> {
  const list = await readHistoricalEchoesFromSupabase();
  if (!list) return undefined;
  return list.items.find((item) => item.id === slug || item.slug === slug) ?? null;
}
