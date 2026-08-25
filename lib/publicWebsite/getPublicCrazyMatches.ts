import { MOCK_PUBLIC_CRAZY_MATCHES } from "./mockPublicWebsiteData";
import { isPublicCrazyMatch, PUBLIC_WEBSITE_ACCESS } from "./publicWebsiteAccessRules";

export async function getPublicCrazyMatches() {
  return { items: MOCK_PUBLIC_CRAZY_MATCHES.filter(isPublicCrazyMatch).map((match) => ({ ...match })), access: PUBLIC_WEBSITE_ACCESS, message: "Sono visibili soltanto trigger mock già revisionati; nessuna pubblicazione automatica." };
}
