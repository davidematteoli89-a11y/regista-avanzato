import type { ReactNode } from "react";

type PublicDataBadgeProps = {
  children?: ReactNode;
};

export function PublicDataBadge({ children = "Dati pubblici" }: PublicDataBadgeProps) {
  return <span className="stats-badge">{children}</span>;
}
