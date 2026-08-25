import Link from "next/link";
import { AdminNewsletterGeneratorPanel } from "@/components/admin/AdminNewsletterGeneratorPanel";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";

export default function AdminNewNewsletterDraftPage() { return <main className="admin-page"><header><h2>Nuova bozza Newsletter / Substack</h2><p>Pannello dimostrativo senza submit, API, database o filesystem.</p><Link href="/admin/generated-content/newsletters">Torna alle bozze</Link></header><AdminNewsletterGeneratorPanel /><AdminWarningBox warning={{ id: "generator-disabled", level: "info", title: "Placeholder sicuro", message: "Le fixture esistenti sono generate dal codice in modo deterministico. Questo pannello non esegue operazioni." }} /></main>; }
