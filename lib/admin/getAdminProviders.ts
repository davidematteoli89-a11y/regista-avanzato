import { MOCK_ADMIN_PROVIDERS } from "./mockAdminData";
export async function getAdminProviders() { return MOCK_ADMIN_PROVIDERS.map((item) => ({ ...item })); }
