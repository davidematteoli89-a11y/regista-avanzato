import type { PublicArticleStatus } from "@/lib/publicWebsite/publicWebsiteTypes";

export function ContentStatusBadge({ status }: { status: PublicArticleStatus }) {
  return <span className={`content-status status-${status}`}>{status}</span>;
}
