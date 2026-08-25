import type { SubstackReportPreviewData } from "@/lib/substack/substackTypes";
import { SubstackCTA } from "./SubstackCTA";

export function SubstackReportPreview({ report }: { report: SubstackReportPreviewData }) {
  return (
    <article className="substack-report-preview">
      <span className="eyebrow">{report.reportType}</span>
      <h2>{report.title}</h2>
      <p>{report.description}</p>
      <ol>{report.sections.map((section) => <li key={section}>{section}</li>)}</ol>
      <p className="notice">{report.disclaimer}</p>
      <SubstackCTA label="Ricevi il report completo" compact />
    </article>
  );
}
