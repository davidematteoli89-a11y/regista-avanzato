import type { ReactNode } from "react";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicNavigation } from "@/components/public/PublicNavigation";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicNavigation />
      {children}
      <PublicFooter />
    </>
  );
}
