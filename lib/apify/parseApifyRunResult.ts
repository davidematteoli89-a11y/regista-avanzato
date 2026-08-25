import type { ApifySofaScoreRunResult } from "./apifySofaScoreTypes";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Parser conservativo per il futuro risultato actor. Non avvia run e non legge dataset. */
export function parseApifyRunResult(payload: unknown): ApifySofaScoreRunResult {
  if (!isRecord(payload)) {
    return {
      started: false,
      mode: "safe_placeholder",
      status: "failed",
      runId: null,
      datasetId: null,
      items: [],
      estimatedCostEur: 0,
      errors: ["Risultato Apify assente o non valido."],
      preservePreviousData: true,
    };
  }

  const status = payload.status;
  const allowedStatuses = ["succeeded", "partial", "failed"] as const;
  const validStatus = typeof status === "string" && allowedStatuses.includes(status as typeof allowedStatuses[number]);
  const items = Array.isArray(payload.items) ? payload.items : [];
  const errors = Array.isArray(payload.errors) ? payload.errors.filter((item): item is string => typeof item === "string") : [];
  if (!validStatus) errors.push("Stato run mancante o non riconosciuto.");

  return {
    started: payload.started === true,
    mode: "future_actor",
    status: validStatus ? status as typeof allowedStatuses[number] : "failed",
    runId: typeof payload.runId === "string" ? payload.runId : null,
    datasetId: typeof payload.datasetId === "string" ? payload.datasetId : null,
    items,
    estimatedCostEur: typeof payload.estimatedCostEur === "number" && Number.isFinite(payload.estimatedCostEur) && payload.estimatedCostEur >= 0 ? payload.estimatedCostEur : 0,
    errors,
    preservePreviousData: true,
  };
}
