export type SafeMode = "supabase" | "safe_mock";

export type AuthUser = {
  id: string;
  email: string | null;
};

export type AccessDecision = {
  allowed: boolean;
  mode: SafeMode;
  loginRequired: boolean;
  reason: string;
};

export type UserProfile = {
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
  role: "free_user" | "editor" | "admin" | "super_admin";
  status: "draft" | "review_needed" | "approved" | "published" | "archived" | "rejected";
  createdAt: string | null;
  updatedAt: string | null;
};

export type UserSearchUsage = {
  mode: SafeMode;
  userId: string | null;
  periodStart: string;
  periodEnd: string;
  used: number;
  limit: 3;
  remaining: number;
  canSearch: boolean;
  persisted: boolean;
  lastIncremented?: boolean;
  message: string;
};

export type UserPreferences = {
  locale: string;
  timezone: string;
  newsletterOptIn: boolean;
  favoriteCompetitionIds: string[];
  favoriteTeamIds: string[];
};

export type SafeWriteResult<T> = {
  ok: boolean;
  mode: SafeMode;
  persisted: boolean;
  data: T;
  message: string;
};
