import type { ArticleDraft, ArticleDraftFrontmatter } from "./articleGeneratorTypes";

const safeYaml = (value: string) => JSON.stringify(value);

/** Restituisce Markdown in memoria e non accede al filesystem. */
export function formatArticleDraftAsMarkdown(draft: ArticleDraft): string {
  const frontmatter: ArticleDraftFrontmatter = { title: draft.title, subtitle: draft.subtitle, status: draft.status, visibility: draft.visibility, format: draft.format, tone: draft.tone, destinations: draft.destinations, source_ids: draft.sources.map((source) => source.id), human_review_required: true, auto_publish: false };
  const yaml = ["---", `title: ${safeYaml(frontmatter.title)}`, `subtitle: ${safeYaml(frontmatter.subtitle)}`, `status: ${frontmatter.status}`, `visibility: ${frontmatter.visibility}`, `format: ${frontmatter.format}`, `tone: ${frontmatter.tone}`, `destinations: ${frontmatter.destinations.join(", ")}`, `source_ids: ${frontmatter.source_ids.join(", ")}`, "human_review_required: true", "auto_publish: false", "---"];
  const body = draft.sections.filter((section) => section.kind !== "title" && section.kind !== "subtitle").map((section) => `## ${section.heading}\n\n${section.paragraphs.join("\n\n")}`).join("\n\n");
  return `${yaml.join("\n")}\n\n# ${draft.title}\n\n_${draft.subtitle}_\n\n${body}`.trim();
}
