import { MOCK_ADMIN_USERS } from "./mockAdminData";
export async function getAdminUsers() { return MOCK_ADMIN_USERS.map((item) => ({ ...item })); }
