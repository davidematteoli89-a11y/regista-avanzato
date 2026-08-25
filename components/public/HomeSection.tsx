import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";

export function HomeSection({ title, description, href, children }: { title: string; description: string; href?: string; children: ReactNode }) {
  return <section className="home-section"><SectionHeader title={title} description={description} href={href} />{children}</section>;
}
