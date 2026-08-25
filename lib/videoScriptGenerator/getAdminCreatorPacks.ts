import { MOCK_CREATOR_PACKS } from "./mockVideoScripts";
import type { CreatorPack } from "./videoScriptTypes";
export async function getAdminCreatorPacks(): Promise<CreatorPack[]> { return MOCK_CREATOR_PACKS.map((pack) => ({ ...pack, items: pack.items.map((item) => ({ ...item, sourceIds: [...item.sourceIds] })), sourceIds: [...pack.sourceIds] })); }
