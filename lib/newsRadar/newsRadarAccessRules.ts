import { checkNewsRadarRules } from "./newsRadarRules";
import type { NewsRadarItem, NewsRadarPublicAccess } from "./newsRadarTypes";

export function isPublicNewsRadarItem(item: NewsRadarItem): boolean {
  return checkNewsRadarRules(item).publicEligible;
}

export function getPublicNewsAccess(item: NewsRadarItem, isLoggedIn = false): NewsRadarPublicAccess {
  if (!isPublicNewsRadarItem(item)) return { canViewFull: false, isPreview: true, requiresLogin: false, redirectsToSubstack: false, consumesSearchQuota: false, message: "News non disponibile al pubblico." };
  if (item.visibility === "public_full") return { canViewFull: true, isPreview: false, requiresLogin: false, redirectsToSubstack: false, consumesSearchQuota: false, message: "News pubblica completa." };
  if (item.visibility === "login_required") return { canViewFull: isLoggedIn, isPreview: !isLoggedIn, requiresLogin: !isLoggedIn, redirectsToSubstack: false, consumesSearchQuota: false, message: isLoggedIn ? "Approfondimento disponibile con account free." : "Accedi gratis per leggere l'approfondimento." };
  if (item.visibility === "substack_only" || item.visibility === "paid_substack_candidate") return { canViewFull: false, isPreview: true, requiresLogin: false, redirectsToSubstack: true, consumesSearchQuota: false, message: "Anteprima pubblica; approfondimento editoriale su Substack." };
  return { canViewFull: false, isPreview: true, requiresLogin: false, redirectsToSubstack: false, consumesSearchQuota: false, message: "Anteprima pubblica approvata." };
}

export const NEWS_RADAR_PUBLIC_ACCESS = { consumesSearchQuota: false as const, exposesTechnicalScore: false as const, exposesAdminWarnings: false as const, exposesPrivateSources: false as const };
