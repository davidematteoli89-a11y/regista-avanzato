import Link from "next/link";
import type { HistoricalEchoRelatedStory } from "@/lib/historicalEcho/historicalEchoTypes";
import { SubstackCTA } from "./SubstackCTA";

export function HistoricalEchoCTA({ story }: { story: HistoricalEchoRelatedStory }) {
  return <section className="echo-cta"><div><span className="eyebrow">Dalla Story Library</span><h2>{story.title}</h2><p>{story.summary}</p><Link className="button-link button-secondary" href={`/storie/${story.slug}`}>Leggi la storia collegata</Link></div><SubstackCTA label="Leggi su Substack" compact /></section>;
}
