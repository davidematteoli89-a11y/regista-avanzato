import type { AdminAccessState } from "./adminTypes";
export function getAdminAccess(): AdminAccessState { return { isAdminMock: true, accessMode: "mock_admin", allowed: true, realProtectionEnabled: false, warning: "Protezione reale da collegare prima della produzione: Auth, ruolo admin, RLS e controllo server-side non sono attivi." }; }
