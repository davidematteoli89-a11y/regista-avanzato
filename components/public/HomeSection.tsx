import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";

export function HomeSection({
  title,
  description,
  href,
  linkLabel,
  children,
}: {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  children: ReactNode;
}) {
  return (
    <section className="home-section">
      <SectionHeader title={title} description={description} href={href} linkLabel={linkLabel} />
      {children}
    </section>
  );
}
