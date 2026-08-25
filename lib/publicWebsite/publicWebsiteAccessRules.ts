import type { PublicArticle, PublicContentAccess, PublicCrazyMatch, PublicRadarItem, PublicTalent } from "./publicWebsiteTypes";

const PUBLIC_STATUSES = ["approved", "published"] as const;

export function isPublicArticle(article: PublicArticle): boolean {
  return PUBLIC_STATUSES.includes(article.status as (typeof PUBLIC_STATUSES)[number]) && article.visibility !== "private_admin";
}

export function isPublicTalent(talent: PublicTalent): boolean {
  return PUBLIC_STATUSES.includes(talent.status as (typeof PUBLIC_STATUSES)[number]) && talent.visibility === "public";
}

export function isPublicRadarItem(item: PublicRadarItem): boolean {
  return PUBLIC_STATUSES.includes(item.status as (typeof PUBLIC_STATUSES)[number]) && item.visibility === "public";
}

export function isPublicCrazyMatch(match: PublicCrazyMatch): boolean {
  return PUBLIC_STATUSES.includes(match.status as (typeof PUBLIC_STATUSES)[number]) && match.visibility === "public" && match.reviewedTrigger;
}

export function getPublicArticleAccess(article: PublicArticle, isLoggedIn = false): PublicContentAccess {
  if (!isPublicArticle(article)) return { canViewFull: false, requiresLogin: false, redirectsToSubstack: false, isPreview: true, consumesSearchQuota: false, message: "Articolo non disponibile al pubblico." };
  if (article.visibility === "public_full") return { canViewFull: true, requiresLogin: false, redirectsToSubstack: false, isPreview: false, consumesSearchQuota: false, message: "Articolo pubblico completo." };
  if (article.visibility === "login_required") return { canViewFull: isLoggedIn, requiresLogin: !isLoggedIn, redirectsToSubstack: false, isPreview: !isLoggedIn, consumesSearchQuota: false, message: isLoggedIn ? "Articolo disponibile con account free." : "Accedi gratis per continuare la lettura." };
  if (article.visibility === "substack_only" || article.visibility === "paid_substack_candidate") return { canViewFull: false, requiresLogin: false, redirectsToSubstack: true, isPreview: true, consumesSearchQuota: false, message: "Anteprima sul sito; approfondimento editoriale su Substack." };
  return { canViewFull: false, requiresLogin: false, redirectsToSubstack: false, isPreview: true, consumesSearchQuota: false, message: "Anteprima pubblica." };
}

export const PUBLIC_WEBSITE_ACCESS = { consumesSearchQuota: false as const, exposesAdminData: false as const, source: "mock_public_website" as const };
