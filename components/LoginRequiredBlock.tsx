import Link from "next/link";
import { LOGIN_REQUIRED_MESSAGE } from "@/lib/auth/access";

export function LoginRequiredBlock() {
  return (
    <aside className="access-box locked-block">
      <span className="eyebrow">Account free richiesto</span>
      <h2>Continua gratuitamente</h2>
      <p>{LOGIN_REQUIRED_MESSAGE}</p>
      <div className="actions">
        <Link className="button-link" href="/login">Accedi</Link>
        <Link href="/registrati">Registrati gratis</Link>
      </div>
    </aside>
  );
}
