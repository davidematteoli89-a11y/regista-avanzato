import type { PublicTalent } from "@/lib/publicWebsite/publicWebsiteTypes";

export function TalentCard({ talent }: { talent: PublicTalent }) {
  return <article className="talent-card"><span className="editorial-badge">{talent.role}</span><h2>{talent.name}</h2><p className="muted">{talent.ageLabel} · {talent.competitionLabel}</p><p>{talent.editorialSummary}</p><h3>Perché seguirlo</h3><p>{talent.whyWatch}</p><p className="talent-disclaimer">{talent.scoutingDisclaimer}</p></article>;
}
