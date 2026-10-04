import { AccountMenu } from "@/components/AccountMenu";
import { LoginRequiredBlock } from "@/components/LoginRequiredBlock";
import { UserPreferencesForm } from "@/components/UserPreferencesForm";
import { getCurrentUser } from "@/lib/auth/access";
import { getUserPreferences } from "@/lib/auth/preferences";
import { logoutAction } from "../actions";
import { savePreferencesAction } from "./actions";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<{ state?: string | string[] }> };

export default async function PreferencesPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();
  if (!user) return <main><h1>Preferenze</h1><LoginRequiredBlock /></main>;

  const preferences = await getUserPreferences(user.id);
  const state = (await searchParams).state;
  const stateValue = Array.isArray(state) ? state[0] : state;

  return (
    <main className="stack">
      <AccountMenu email={user.email} logoutAction={logoutAction} />
      <section>
        <span className="eyebrow">Account free</span>
        <h1>Preferenze</h1>
        {stateValue === "saved" && <p className="notice success">Preferenze salvate.</p>}
        {stateValue === "error" && <p className="notice error">Preferenze non salvate.</p>}
        <UserPreferencesForm preferences={preferences} action={savePreferencesAction} />
      </section>
    </main>
  );
}
