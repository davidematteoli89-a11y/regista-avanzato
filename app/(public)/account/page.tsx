import Link from "next/link";
import { AccountMenu } from "@/components/AccountMenu";
import { LoginRequiredBlock } from "@/components/LoginRequiredBlock";
import { SearchUsageBox } from "@/components/SearchUsageBox";
import { getCurrentUser } from "@/lib/auth/access";
import { getUserProfile } from "@/lib/auth/profile";
import { getUserSearchUsage } from "@/lib/auth/searchUsage";
import { logoutAction } from "./actions";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <main><h1>Account</h1><LoginRequiredBlock /></main>;
  }

  const [profile, usage] = await Promise.all([getUserProfile(user.id), getUserSearchUsage(user.id)]);

  return (
    <main className="stack">
      <AccountMenu email={user.email} logoutAction={logoutAction} />
      <section>
        <span className="eyebrow">Account free</span>
        <h1>{profile?.displayName || "Il tuo account"}</h1>
        <p>Accesso gratuito attivo. Nessun piano premium interno.</p>
        <Link href="/account/preferenze">Gestisci preferenze</Link>
      </section>
      <SearchUsageBox usage={usage} />
    </main>
  );
}
