import type { NewsletterDraftFormat } from "@/lib/newsletterGenerator/newsletterGeneratorTypes";

export function AdminNewsletterFormatBadge({ format }: { format: NewsletterDraftFormat }) { return <span className="admin-status newsletter-format-badge">{format.replace(/_/g, " ")}</span>; }
