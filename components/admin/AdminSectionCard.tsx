import Link from "next/link";
import type { ReactNode } from "react";
export function AdminSectionCard({ title, description, href, children }: { title: string; description: string; href?: string; children?: ReactNode }) { return <section className="admin-section-card"><h2>{title}</h2><p>{description}</p>{children}{href && <Link href={href}>Apri sezione</Link>}</section>; }
