import type { HistoricalEcho } from "./historicalEchoTypes";

export function isPublicHistoricalEcho(echo: HistoricalEcho): boolean {
  return (echo.status === "approved" || echo.status === "published") && (echo.visibility === "public_preview" || echo.visibility === "public_full");
}

export function canShowFullHistoricalEcho(echo: HistoricalEcho): boolean {
  return isPublicHistoricalEcho(echo) && echo.visibility === "public_full";
}

export const HISTORICAL_ECHO_PUBLIC_ACCESS = {
  consumesSearchQuota: false as const,
  exposesTechnicalScore: false as const,
  exposesAdminWarnings: false as const,
  autoPublishes: false as const,
};
