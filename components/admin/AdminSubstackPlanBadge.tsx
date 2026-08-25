import type { NewsletterDraftPlan } from "@/lib/newsletterGenerator/newsletterGeneratorTypes";

export function AdminSubstackPlanBadge({ plan }: { plan: NewsletterDraftPlan }) { return <span className={`admin-status newsletter-plan-${plan}`}>{plan.replace(/_/g, " ")}</span>; }
