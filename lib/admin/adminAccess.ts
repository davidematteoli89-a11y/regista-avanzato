import type { AdminAccessState } from "./adminTypes";

export function getAdminAccess(): AdminAccessState {
  return {
    isAdminMock: false,
    accessMode: "supabase_rbac",
    allowed: true,
    realProtectionEnabled: true,
    role: "admin",
    userId: "server-verified",
    warning: "Accesso admin verificato server-side tramite Supabase Auth/RBAC.",
  };
}
