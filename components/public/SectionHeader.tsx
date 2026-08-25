import Link from "next/link";

export function SectionHeader({ eyebrow, title, description, href, linkLabel = "Vedi tutto" }: { eyebrow?: string; title: string; description?: string; href?: string; linkLabel?: string }) {
  return <header className="section-header"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{description && <p>{description}</p>}</div>{href && <Link href={href}>{linkLabel}</Link>}</header>;
}
