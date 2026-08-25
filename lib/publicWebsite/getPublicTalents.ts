import { MOCK_PUBLIC_TALENTS } from "./mockPublicWebsiteData";
import { isPublicTalent, PUBLIC_WEBSITE_ACCESS } from "./publicWebsiteAccessRules";

export async function getPublicTalents() {
  return { items: MOCK_PUBLIC_TALENTS.filter(isPublicTalent).map((talent) => ({ ...talent })), access: PUBLIC_WEBSITE_ACCESS, disclaimer: "Contenuti editoriali mock: non costituiscono scouting professionale certificato." };
}
