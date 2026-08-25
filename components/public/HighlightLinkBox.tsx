import type { PublicHighlightLink } from "@/lib/publicData/publicDataTypes";
import type { HighlightLink } from "@/lib/videoRadar/videoRadarTypes";
import { VideoCopyrightNotice } from "./VideoCopyrightNotice";

type LinkRecord = PublicHighlightLink | HighlightLink;
const title = (link: LinkRecord) => "title" in link ? link.title : link.label;
const source = (link: LinkRecord) => "source" in link ? link.source.name : link.officialSource;
const publicApproved = (link: LinkRecord) => "status" in link ? link.status === "approved" : link.verified;

export function HighlightLinkBox({ links }: { links: readonly LinkRecord[] }) { return <section className="access-box"><span className="eyebrow">Highlights ufficiali</span><h2>Link approvati</h2>{links.length === 0 ? <p>Nessun link ufficiale disponibile.</p> : links.map((link) => <div key={link.id}>{link.url && publicApproved(link) ? <a href={link.url} target="_blank" rel="noreferrer">{title(link)} — {source(link)}</a> : <p className="muted">{title(link)}: URL ufficiale non ancora configurato o verificato.</p>}</div>)}<VideoCopyrightNotice /></section>; }
