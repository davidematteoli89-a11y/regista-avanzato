import type { SubstackFeature } from "@/lib/substack/substackTypes";

export function SubstackFeatureList({ features }: { features: readonly SubstackFeature[] }) {
  return (
    <ul className="substack-feature-list">
      {features.map((feature) => <li key={feature.id}><strong>{feature.label}</strong><span>{feature.description}</span></li>)}
    </ul>
  );
}
