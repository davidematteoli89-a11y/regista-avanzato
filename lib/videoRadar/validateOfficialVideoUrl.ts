import type { OfficialVideoValidationResult } from "./videoRadarTypes";

const REJECTED_HOST_MARKERS = ["streaming", "pirate", "crack", "torrent", "mega.nz"];
const OFFICIAL_DOMAINS = new Set(["uefa.com", "www.uefa.com", "fifa.com", "www.fifa.com"]);
const TRUSTED_PLATFORM_DOMAINS = new Set(["youtube.com", "www.youtube.com", "youtu.be", "instagram.com", "www.instagram.com", "x.com", "www.x.com"]);

/** Controllo sintattico conservativo: non visita URL e non certifica titolarità del canale. */
export function validateOfficialVideoUrl(value: string, explicitlyVerifiedDomains: readonly string[] = []): OfficialVideoValidationResult {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return { verdict: "rejected", valid: false, normalizedUrl: null, hostname: url.hostname, embedAvailability: "not_allowed", reason: "Sono ammessi soltanto URL HTTPS.", checkedWithoutNetwork: true };
    const hostname = url.hostname.toLowerCase();
    if (REJECTED_HOST_MARKERS.some((marker) => hostname.includes(marker))) return { verdict: "rejected", valid: false, normalizedUrl: null, hostname, embedAvailability: "not_allowed", reason: "Dominio associato a storage o streaming non ufficiale.", checkedWithoutNetwork: true };
    if (explicitlyVerifiedDomains.map((item) => item.toLowerCase()).includes(hostname) || OFFICIAL_DOMAINS.has(hostname)) return { verdict: "official", valid: true, normalizedUrl: url.toString(), hostname, embedAvailability: "external_link_only", reason: "Dominio ufficiale/esplicitamente verificato; il singolo contenuto richiede comunque review.", checkedWithoutNetwork: true };
    if (TRUSTED_PLATFORM_DOMAINS.has(hostname)) return { verdict: "trusted", valid: true, normalizedUrl: url.toString(), hostname, embedAvailability: "unknown", reason: "Piattaforma nota, ma ufficialità del canale e permesso embed devono essere verificati.", checkedWithoutNetwork: true };
    return { verdict: "pending_review", valid: true, normalizedUrl: url.toString(), hostname, embedAvailability: "unknown", reason: "URL sintatticamente valido ma dominio non presente nelle fonti verificate.", checkedWithoutNetwork: true };
  } catch {
    return { verdict: "rejected", valid: false, normalizedUrl: null, hostname: null, embedAvailability: "not_allowed", reason: "URL non valido.", checkedWithoutNetwork: true };
  }
}
