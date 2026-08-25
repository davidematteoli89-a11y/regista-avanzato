import { MOCK_ADMIN_COMPETITIONS } from "./mockAdminData";
export async function getAdminCompetitions() { return MOCK_ADMIN_COMPETITIONS.map((item) => ({ ...item })); }
