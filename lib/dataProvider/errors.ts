import type { ProviderError, ProviderId } from "./types";

export class FootballProviderError extends Error {
  readonly providerError: ProviderError;

  constructor(providerError: ProviderError) {
    super(providerError.message);
    this.name = "FootballProviderError";
    this.providerError = providerError;
  }
}

export function createProviderError(
  providerId: ProviderId,
  code: string,
  message: string,
  options: { retryable?: boolean; details?: Record<string, unknown> } = {},
): ProviderError {
  return {
    code,
    message,
    providerId,
    retryable: options.retryable ?? false,
    ...(options.details ? { details: options.details } : {}),
  };
}

export function normalizeProviderError(error: unknown, providerId: ProviderId): ProviderError {
  if (error instanceof FootballProviderError) return error.providerError;

  return createProviderError(
    providerId,
    "UNEXPECTED_PROVIDER_ERROR",
    error instanceof Error ? error.message : "Errore provider non riconosciuto",
  );
}
