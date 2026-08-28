import type { ReactNode } from "react";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicNavigation } from "@/components/public/PublicNavigation";

export const dynamic = "force-dynamic";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicNavigation />
      {children}
      <PublicFooter />
    </>
  );
}
