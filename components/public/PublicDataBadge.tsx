import type { ReactNode } from "react";

type PublicDataBadgeProps = {
  children?: ReactNode;
};

export function PublicDataBadge({ children = "Public data only" }: PublicDataBadgeProps) {
  return <span className="stats-badge">{children}</span>;
}
