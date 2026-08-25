export type SafeApifyClientConfig = {
  actorId?: string | null;
  token?: string | null;
};

export type LatestRoundImportRequest = {
  competitionId: string;
  season: string;
  scope: "latest_round";
};

export type SafeApifyRunResult = {
  started: false;
  mode: "safe_placeholder";
  configured: boolean;
  competitionId: string;
  scope: "latest_round";
  reason: string;
};

export type SafeApifyClient = {
  readonly mode: "safe_placeholder";
  readonly configured: boolean;
  runLatestRoundImport: (request: LatestRoundImportRequest) => Promise<SafeApifyRunResult>;
};

/**
 * Client intenzionalmente non operativo. Anche con token presente non effettua
 * fetch né avvia actor: l'integrazione reale richiederà uno step approvato.
 */
export function createSafeApifyClient(config: SafeApifyClientConfig = {}): SafeApifyClient {
  const configured = Boolean(config.actorId && config.token);

  return {
    mode: "safe_placeholder",
    configured,
    async runLatestRoundImport(request) {
      const reason = configured
        ? "Credenziali rilevate ma client reale disabilitato: nessuna run avviata."
        : "Apify non configurato: nessuna run avviata.";
      console.info(
        `[apify-client] mode=safe_placeholder competition=${request.competitionId} scope=${request.scope} started=false`,
      );
      return {
        started: false,
        mode: "safe_placeholder",
        configured,
        competitionId: request.competitionId,
        scope: request.scope,
        reason,
      };
    },
  };
}
