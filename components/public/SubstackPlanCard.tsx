import { SubstackCTA } from "./SubstackCTA";
import { SubstackFeatureList } from "./SubstackFeatureList";
import type { SubstackPlan } from "@/lib/substack/substackTypes";

export function SubstackPlanCard({ plan }: { plan: SubstackPlan }) {
  return (
    <article className={`substack-plan-card ${plan.status}`}>
      <span className="eyebrow">{plan.status === "free" ? "Gratis" : "Paid su Substack"}</span>
      <h2>{plan.name}</h2>
      <p>{plan.description}</p>
      <SubstackFeatureList features={plan.features} />
      <p className="muted">{plan.disclaimer}</p>
      <SubstackCTA label={plan.ctaLabel} compact />
    </article>
  );
}
