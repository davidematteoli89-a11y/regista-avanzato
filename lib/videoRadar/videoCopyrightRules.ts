export const VIDEO_COPYRIGHT_MESSAGE = "Regista Avanzato non ospita né ricarica clip partita. Mostriamo solo link o embed da fonti ufficiali/verificate quando disponibili.";
export const BLOCKED_VIDEO_OPERATIONS = ["download", "reupload", "local_file", "unofficial_stream", "pirated_source", "compilation_unauthorized", "raw_clip_storage"] as const;
export type BlockedVideoOperation = (typeof BLOCKED_VIDEO_OPERATIONS)[number];
export const VIDEO_COPYRIGHT_RULES = [
  "Conservare solo URL, fonte, stato di revisione, permesso embed e note editoriali.",
  "Usare embed soltanto quando piattaforma, titolare, territorio e termini lo consentono.",
  "Produrre internamente soltanto script, voce, grafiche, animazioni e video originali.",
  "Non scaricare, copiare, ritagliare, compilare o archiviare clip partita non autorizzate.",
] as const;
export function checkVideoOperation(operation: string): { allowed: boolean; operation: string; reason: string } { const blocked = (BLOCKED_VIDEO_OPERATIONS as readonly string[]).includes(operation); return { allowed: !blocked, operation, reason: blocked ? `Operazione vietata: ${operation}.` : "Operazione non presente nella blocklist; richiede comunque revisione diritti." }; }
