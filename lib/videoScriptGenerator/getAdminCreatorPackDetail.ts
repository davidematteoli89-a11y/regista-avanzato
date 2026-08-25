import { isPrivateAdminCreatorPack } from "./videoScriptAccessRules";
import { MOCK_CREATOR_PACKS } from "./mockVideoScripts";
export async function getAdminCreatorPackDetail(packId: string) { const pack = MOCK_CREATOR_PACKS.find((item) => item.id === packId); if (!pack) return null; return { pack, privateAdminOnly: isPrivateAdminCreatorPack(pack), canPublishAutomatically: false as const, generatedVideos: 0 as const, filesWritten: 0 as const, databaseWrites: 0 as const }; }
