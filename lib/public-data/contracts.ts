export const PUBLIC_FREE_VISIBILITY = "public_free" as const;
export const PUBLIC_VISIBILITY = PUBLIC_FREE_VISIBILITY;
export const PUBLIC_PREVIEW_VISIBILITY = "public_preview" as const;
export const PRIVATE_ADMIN_VISIBILITY = "private_admin" as const;

export const PUBLIC_READER_CONTRACT_VERSION = "p52-public-reader-contract-skeleton" as const;

export const PUBLIC_READER_ALLOWED_VISIBILITIES = [PUBLIC_VISIBILITY] as const;
export const PUBLIC_READER_PREVIEW_ALLOWED_VISIBILITIES = [
  PUBLIC_VISIBILITY,
  PUBLIC_PREVIEW_VISIBILITY,
] as const;

export const PUBLIC_READER_SAFETY_FLAGS = {
  contractOnly: true,
  operationalReaderImplemented: false,
  routeConnected: false,
  supabaseQueryEnabled: false,
  dbWriteEnabled: false,
  providerFetchEnabled: false,
  serviceRoleAllowed: false,
  privateAdminAllowed: false,
} as const;

export type PublicVisibility = typeof PUBLIC_VISIBILITY;
export type PublicPreviewVisibility = typeof PUBLIC_PREVIEW_VISIBILITY;
export type PrivateAdminVisibility = typeof PRIVATE_ADMIN_VISIBILITY;

export type PublicReaderVisibility = PublicVisibility;
export type PublicPreviewReaderVisibility = PublicVisibility | PublicPreviewVisibility;

export type PublicDataSource = "public_supabase" | "empty" | "unavailable";

export type PublicDataListResult<T> = {
  source: PublicDataSource;
  items: T[];
  warning: string | null;
};

export type PublicCompetition = {
  id: string;
  slug: string;
  name: string;
  country: string | null;
  season: string | null;
  status: string | null;
  visibility: PublicVisibility;
  updatedAt: string | null;
};

export type PublicTeam = {
  id: string;
  competitionId: string;
  slug: string;
  name: string;
  shortName: string | null;
  country: string | null;
  status: string | null;
  visibility: PublicVisibility;
  updatedAt: string | null;
};

export type PublicStanding = {
  id: string;
  competitionId: string;
  teamId: string;
  teamName: string;
  season: string | null;
  stage: string | null;
  matchday: number | null;
  rank: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  status: string | null;
  visibility: PublicVisibility;
  updatedAt: string | null;
};

export type PublicCompetitionDetailResult = {
  source: PublicDataSource;
  competition: PublicCompetition | null;
  teams: PublicTeam[];
  standings: PublicStanding[];
  warning: string | null;
};

export type PublicReaderContractStatus = {
  point: "P52";
  mode: "contract_skeleton_only";
  publicReadersImplemented: false;
  publicRoutesEnabled: false;
  publicReaderConnectedToRoutes: false;
  supabaseQueriesImplemented: false;
  dbWrite: false;
  providerFetch: false;
  serviceRoleUsed: false;
  privateAdminPubliclyExposed: false;
};

export const PUBLIC_READER_CONTRACT_STATUS: PublicReaderContractStatus = {
  point: "P52",
  mode: "contract_skeleton_only",
  publicReadersImplemented: false,
  publicRoutesEnabled: false,
  publicReaderConnectedToRoutes: false,
  supabaseQueriesImplemented: false,
  dbWrite: false,
  providerFetch: false,
  serviceRoleUsed: false,
  privateAdminPubliclyExposed: false,
};
