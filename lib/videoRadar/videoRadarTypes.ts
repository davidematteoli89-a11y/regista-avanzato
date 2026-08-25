export type VideoRadarType = "top_10_goals_to_watch" | "top_5_skills_to_watch" | "talent_of_the_week" | "crazy_match_of_the_week" | "weekend_watchlist" | "tactical_note" | "story_video" | "historical_echo_video" | "creator_pack_idea";
export type VideoRadarStatus = "draft" | "pending_review" | "approved" | "archived";
export type VideoRadarVisibility = "public_preview" | "free_login" | "private_editorial";
export type HighlightLinkStatus = "pending_review" | "approved" | "rejected" | "archived";
export type HighlightSourceType = "official_league" | "official_club" | "official_broadcaster" | "official_youtube" | "official_social" | "editorial_reference";
export type EmbedAvailability = "allowed" | "external_link_only" | "unknown" | "not_allowed";

export type OfficialVideoSource = { id: string; name: string; sourceType: HighlightSourceType; domain: string | null; verified: boolean; rightsNote: string };
export type HighlightLink = { id: string; matchId: string | null; title: string; url: string | null; source: OfficialVideoSource; status: HighlightLinkStatus; embedAvailability: EmbedAvailability; reviewedAt: string | null; editorialNote: string | null };
export type VideoRadarItem = { id: string; slug: string; type: VideoRadarType; status: VideoRadarStatus; visibility: VideoRadarVisibility; title: string; summary: string; originalContent: boolean; officialVideoUrl: string | null; embedAvailability: EmbedAvailability; relatedMatchId: string | null; relatedPlayerIds: string[]; tags: string[]; editorialNotes: string | null; publishedAt: string | null };
export type VideoWatchlistItem = { id: string; videoRadarItemId: string; title: string; reasonToWatch: string; scheduledAt: string | null; priority: "high" | "medium" | "low"; status: VideoRadarStatus; competitionName: string | null };
export type VideoAccessState = { tier: "anonymous" | "free"; canViewPreview: true; canViewFullRadar: boolean; canViewFullHighlightLinks: boolean; consumesSearchQuota: false; message: string };
export type OfficialVideoValidationResult = { verdict: "official" | "trusted" | "pending_review" | "rejected"; valid: boolean; normalizedUrl: string | null; hostname: string | null; embedAvailability: EmbedAvailability; reason: string; checkedWithoutNetwork: true };
export type PublicVideoRadarResult = { items: VideoRadarItem[]; preview: boolean; message: string; consumesSearchQuota: false };
export type PublicHighlightLinksResult = { items: HighlightLink[]; preview: boolean; message: string; consumesSearchQuota: false };
export type PublicWatchlistResult = { items: VideoWatchlistItem[]; preview: boolean; message: string; consumesSearchQuota: false };
