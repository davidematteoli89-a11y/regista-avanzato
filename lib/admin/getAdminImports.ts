import { MOCK_IMPORTS } from "./mockAdminData";
export async function getAdminImports() { return MOCK_IMPORTS.map((item) => ({ ...item })); }
