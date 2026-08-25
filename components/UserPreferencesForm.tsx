import type { UserPreferences } from "@/lib/auth/types";

export function UserPreferencesForm({
  preferences,
  action,
}: {
  preferences: UserPreferences;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="stack form-card">
      <label>
        Lingua
        <select name="locale" defaultValue={preferences.locale}>
          <option value="it">Italiano</option>
          <option value="en">English</option>
        </select>
      </label>
      <label>
        Fuso orario
        <select name="timezone" defaultValue={preferences.timezone}>
          <option value="Europe/Rome">Europe/Rome</option>
          <option value="UTC">UTC</option>
        </select>
      </label>
      <label className="checkbox-row">
        <input name="newsletterOptIn" type="checkbox" defaultChecked={preferences.newsletterOptIn} />
        Desidero ricevere aggiornamenti editoriali
      </label>
      <button type="submit">Salva preferenze</button>
    </form>
  );
}
