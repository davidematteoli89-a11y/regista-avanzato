import Link from "next/link";
import type { PublicCTAType } from "@/lib/publicWebsite/publicWebsiteTypes";

export function PublicCTA({ type, title, description, href, label }: { type: PublicCTAType; title: string; description: string; href: string; label: string }) {
  return <aside className={`public-cta cta-${type}`}><span className="eyebrow">{type.replaceAll("_", " ")}</span><h2>{title}</h2><p>{description}</p><Link className="button-link" href={href}>{label}</Link></aside>;
}
