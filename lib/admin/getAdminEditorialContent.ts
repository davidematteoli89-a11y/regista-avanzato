import "server-only";

import { getSupabaseRuntimeStatus } from "@/lib/auth/config";
import { MOCK_HISTORICAL_ECHO_DATA } from "@/lib/historicalEcho/mockHistoricalEchoData";
import { MOCK_NEWS_RADAR_DATA } from "@/lib/newsRadar/mockNewsRadarData";
import { MOCK_PUBLIC_ARTICLES } from "@/lib/publicWebsite/mockPublicWebsiteData";
import { MOCK_STORY_LIBRARY } from "@/lib/storyLibrary/mockStoryLibrary";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminEditorialArea, AdminEditorialReadResult, AdminEditorialRecord, AdminEditorialSummary } from "./adminEditorialTypes";

type AdminArticleRow = {
  id: string;
  slug: string;
  title: string;
  status: string;
  visibility: string;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  reviewed_at: string | null;
  internal_notes: string | null;
};

type AdminNewsRow = AdminArticleRow & {
  review_status: string | null;
  internal_warnings: string[] | null;
  internal_score: Record<string, unknown> | null;
};

type AdminStoryRow = AdminArticleRow & {
  story_type: string | null;
};

type AdminHistoricalEchoRow = AdminArticleRow & {
  echo_type: string;
  reviewed_by_human: boolean | null;
  internal_score: Record<string, unknown> | null;
  internal_warnings: string[] | null;
};

const emptyCounters: Record<AdminEditorialArea, number> = {
  articles: 0,
  news: 0,
  stories: 0,
  historical_echo: 0,
};

function baseResult(items: AdminEditorialRecord[], source: AdminEditorialReadResult["source"], warning: string | null): AdminEditorialReadResult {
  return {
    items,
    source,
    warning,
    realWritesEnabled: false,
    providerCalls: 0,
    apifyCalls: 0,
    aiCalls: 0,
  };
}

function scoreLabel(score: Record<string, unknown> | null | undefined) {
  if (!score || !Object.keys(score).length) return null;
  const total = score.total ?? score.value ?? score.score;
  const confidence = score.confidence;
  if (typeof total === "number" && typeof confidence === "string") return `${total}/100 · ${confidence}`;
  if (typeof total === "number") return `${total}/100`;
  if (typeof confidence === "string") return confidence;
  return "score interno presente";
}

function mapArticleRow(row: AdminArticleRow): AdminEditorialRecord {
  return {
    id: row.id,
    area: "articles",
    title: row.title,
    slug: row.slug,
    status: row.status,
    visibility: row.visibility,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    reviewStatus: row.reviewed_at ? "reviewed" : "not_reviewed",
    internalNotes: row.internal_notes,
    internalWarnings: [],
    internalScoreLabel: null,
    sourceLabel: "admin_public_articles",
    detailHref: `/articoli/${row.slug}`,
  };
}

function mapNewsRow(row: AdminNewsRow): AdminEditorialRecord {
  return {
    id: row.id,
    area: "news",
    title: row.title,
    slug: row.slug,
    status: row.status,
    visibility: row.visibility,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    reviewStatus: row.review_status,
    internalNotes: row.internal_notes,
    internalWarnings: row.internal_warnings ?? [],
    internalScoreLabel: scoreLabel(row.internal_score),
    sourceLabel: "admin_news_archive",
    detailHref: `/admin/news-radar/${row.id}`,
  };
}

function mapStoryRow(row: AdminStoryRow): AdminEditorialRecord {
  return {
    id: row.id,
    area: "stories",
    title: row.title,
    slug: row.slug,
    status: row.status,
    visibility: row.visibility,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    reviewStatus: row.reviewed_at ? "reviewed" : "not_reviewed",
    internalNotes: row.internal_notes,
    internalWarnings: [],
    internalScoreLabel: row.story_type,
    sourceLabel: "admin_story_library",
    detailHref: `/admin/story-library/${row.id}`,
  };
}

function mapHistoricalEchoRow(row: AdminHistoricalEchoRow): AdminEditorialRecord {
  return {
    id: row.id,
    area: "historical_echo",
    title: row.title,
    slug: row.slug,
    status: row.status,
    visibility: row.visibility,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    reviewStatus: row.reviewed_by_human ? "human_reviewed" : "needs_review",
    internalNotes: row.internal_notes,
    internalWarnings: row.internal_warnings ?? [],
    internalScoreLabel: scoreLabel(row.internal_score) ?? row.echo_type,
    sourceLabel: "admin_historical_echoes",
    detailHref: `/admin/historical-echo/${row.id}`,
  };
}

function mockRecords(area: AdminEditorialArea): AdminEditorialRecord[] {
  if (area === "articles") {
    return MOCK_PUBLIC_ARTICLES.map((item) => ({
      id: item.id,
      area,
      title: item.title,
      slug: item.slug,
      status: item.status,
      visibility: item.visibility,
      publishedAt: item.publishedAt,
      createdAt: null,
      updatedAt: null,
      reviewStatus: item.status === "published" ? "reviewed" : "mock_review",
      internalNotes: item.internalNotes.join(" ") || null,
      internalWarnings: [],
      internalScoreLabel: null,
      sourceLabel: "mock_public_articles",
      detailHref: `/articoli/${item.slug}`,
    }));
  }

  if (area === "news") {
    return MOCK_NEWS_RADAR_DATA.map((item) => ({
      id: item.id,
      area,
      title: item.title,
      slug: item.slug,
      status: item.status,
      visibility: item.visibility,
      publishedAt: item.publishedAt,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      reviewStatus: item.reviewStatus,
      internalNotes: null,
      internalWarnings: [...item.internalWarnings],
      internalScoreLabel: `${item.score.total}/100`,
      sourceLabel: "mock_news_radar",
      detailHref: `/admin/news-radar/${item.id}`,
    }));
  }

  if (area === "stories") {
    return MOCK_STORY_LIBRARY.map((item) => ({
      id: item.id,
      area,
      title: item.title,
      slug: item.slug,
      status: item.status,
      visibility: item.visibility,
      publishedAt: item.publishedAt,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      reviewStatus: item.reviewStatus,
      internalNotes: null,
      internalWarnings: [...item.reviewWarnings],
      internalScoreLabel: item.category,
      sourceLabel: "mock_story_library",
      detailHref: `/admin/story-library/${item.id}`,
    }));
  }

  return MOCK_HISTORICAL_ECHO_DATA.map((item) => ({
    id: item.id,
    area,
    title: item.title,
    slug: item.slug,
    status: item.status,
    visibility: item.visibility,
    publishedAt: item.status === "published" ? item.updatedAt : null,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    reviewStatus: item.reviewedByHuman ? "human_reviewed" : "needs_review",
    internalNotes: null,
    internalWarnings: [...item.internalWarnings],
    internalScoreLabel: `${item.score.total}/100 · ${item.score.confidence}`,
    sourceLabel: "mock_historical_echo",
    detailHref: `/admin/historical-echo/${item.id}`,
  }));
}

async function readAdminView<T extends Record<string, unknown>>(
  viewName: string,
  columns: string,
): Promise<{ rows: T[]; error: unknown | null; configured: boolean }> {
  if (!getSupabaseRuntimeStatus().configured) return { rows: [], error: null, configured: false };

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from(viewName).select(columns).order("updated_at", { ascending: false });
    return { rows: (data ?? []) as unknown as T[], error, configured: true };
  } catch (error) {
    return { rows: [], error, configured: true };
  }
}

export async function getAdminEditorialArticles(): Promise<AdminEditorialReadResult> {
  const result = await readAdminView<AdminArticleRow>("admin_public_articles", "id, slug, title, status, visibility, published_at, created_at, updated_at, reviewed_at, internal_notes");
  if (!result.configured) return baseResult(mockRecords("articles"), "mock_fallback", "Supabase non configurato: lettura admin articoli in fallback mock.");
  if (result.error) return baseResult(mockRecords("articles"), "mock_fallback", "View admin_public_articles non disponibile o non autorizzata: fallback mock.");
  return baseResult(result.rows.map(mapArticleRow), "supabase_staging", "Lettura server-side da admin_public_articles. Scritture reali disabilitate.");
}

export async function getAdminNewsItems(): Promise<AdminEditorialReadResult> {
  const result = await readAdminView<AdminNewsRow>("admin_news_archive", "id, slug, title, status, visibility, published_at, created_at, updated_at, reviewed_at, internal_notes, review_status, internal_warnings, internal_score");
  if (!result.configured) return baseResult(mockRecords("news"), "mock_fallback", "Supabase non configurato: lettura admin news in fallback mock.");
  if (result.error) return baseResult(mockRecords("news"), "mock_fallback", "View admin_news_archive non disponibile o non autorizzata: fallback mock.");
  return baseResult(result.rows.map(mapNewsRow), "supabase_staging", "Lettura server-side da admin_news_archive. Rumor e warning restano solo admin.");
}

export async function getAdminStories(): Promise<AdminEditorialReadResult> {
  const result = await readAdminView<AdminStoryRow>("admin_story_library", "id, slug, title, status, visibility, published_at, created_at, updated_at, reviewed_at, internal_notes, story_type");
  if (!result.configured) return baseResult(mockRecords("stories"), "mock_fallback", "Supabase non configurato: lettura admin storie in fallback mock.");
  if (result.error) return baseResult(mockRecords("stories"), "mock_fallback", "View admin_story_library non disponibile o non autorizzata: fallback mock.");
  return baseResult(result.rows.map(mapStoryRow), "supabase_staging", "Lettura server-side da admin_story_library. Fonti e note interne restano in admin.");
}

export async function getAdminHistoricalEchoes(): Promise<AdminEditorialReadResult> {
  const result = await readAdminView<AdminHistoricalEchoRow>("admin_historical_echoes", "id, slug, title, status, visibility, published_at, created_at, updated_at, reviewed_at, internal_notes, echo_type, reviewed_by_human, internal_score, internal_warnings");
  if (!result.configured) return baseResult(mockRecords("historical_echo"), "mock_fallback", "Supabase non configurato: lettura admin Historical Echo in fallback mock.");
  if (result.error) return baseResult(mockRecords("historical_echo"), "mock_fallback", "View admin_historical_echoes non disponibile o non autorizzata: fallback mock.");
  return baseResult(result.rows.map(mapHistoricalEchoRow), "supabase_staging", "Lettura server-side da admin_historical_echoes. Score e warning restano solo admin.");
}

export async function getAdminEditorialSummary(): Promise<AdminEditorialSummary> {
  const results = await Promise.all([
    getAdminEditorialArticles(),
    getAdminNewsItems(),
    getAdminStories(),
    getAdminHistoricalEchoes(),
  ]);
  const items = results.flatMap((result) => result.items);
  const byArea = { ...emptyCounters };
  const byStatus: Record<string, number> = {};

  for (const item of items) {
    byArea[item.area] += 1;
    byStatus[item.status] = (byStatus[item.status] ?? 0) + 1;
  }

  return {
    total: items.length,
    byArea,
    byStatus,
    source: results.every((result) => result.source === "supabase_staging") ? "supabase_staging" : "mock_fallback",
    warning: results.map((result) => result.warning).filter(Boolean).join(" ") || null,
  };
}
