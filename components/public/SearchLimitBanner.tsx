import Link from "next/link";
import { FREE_SEARCH_LIMIT_MESSAGE } from "@/lib/freeSearch/checkUserSearchLimit";

export function SearchLimitBanner() {
  return (
    <aside className="notice search-limit-banner" role="status">
      <strong>Limite mensile raggiunto</strong>
      <p>{FREE_SEARCH_LIMIT_MESSAGE}</p>
      <Link href="/substack">Vai alla newsletter su Substack</Link>
    </aside>
  );
}
