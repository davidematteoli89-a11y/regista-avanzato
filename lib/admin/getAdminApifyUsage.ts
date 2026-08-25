import { MOCK_APIFY_USAGE } from "./mockAdminData";
export async function getAdminApifyUsage() { return { ...MOCK_APIFY_USAGE, warnings: [...MOCK_APIFY_USAGE.warnings] }; }
