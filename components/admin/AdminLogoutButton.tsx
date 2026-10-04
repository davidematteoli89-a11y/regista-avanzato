import { redirect } from "next/navigation";
import { getSupabaseRuntimeStatus } from "@/lib/auth/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function adminLogoutAction(): Promise<void> {
  "use server";

  if (getSupabaseRuntimeStatus().configured) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  redirect("/login");
}

export function AdminLogoutButton() {
  return (
    <form action={adminLogoutAction}>
      <button type="submit" className="button-secondary">
        Esci
      </button>
    </form>
  );
}
