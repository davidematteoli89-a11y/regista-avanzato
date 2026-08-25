import Link from "next/link";
import type { UserSearchUsage } from "@/lib/auth/types";

export function SearchUsageBox({ usage }: { usage: UserSearchUsage }) {
  return (
    <aside className="access-box" aria-live="polite">
      <span className="eyebrow">Ricerche avanzate</span>
      <h2>{usage.used} / {usage.limit} usate</h2>
      <p>{usage.message}</p>
      {!usage.canSearch && <Link href="/substack">Vai alla newsletter su Substack</Link>}
      {usage.mode === "safe_mock" && <p className="muted">Modalità safe: il contatore non viene salvato.</p>}
    </aside>
  );
}
