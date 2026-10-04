import type { ProviderId } from "@/config/providers";

export type ProviderWriteMode = "dry_run" | "real_disabled";

export type ProviderWritePolicy = {
  mode: ProviderWriteMode;
  realWritesEnabled: false;
  allowExternalFetch: false;
  allowProviderCalls: false;
  allowApifyRuns: false;
  allowServiceRole: false;
};

export type ProviderWriteGuardResult = {
  allowed: false;
  code: "PROVIDER_WRITES_DISABLED" | "EXTERNAL_FETCH_BLOCKED" | "PROVIDER_CALL_BLOCKED" | "APIFY_RUN_BLOCKED" | "SERVICE_ROLE_BLOCKED";
  message: string;
  providerId: ProviderId;
  dbWrite: false;
  externalFetch: false;
};

export const SAFE_PROVIDER_WRITE_POLICY: ProviderWritePolicy = {
  mode: "dry_run",
  realWritesEnabled: false,
  allowExternalFetch: false,
  allowProviderCalls: false,
  allowApifyRuns: false,
  allowServiceRole: false,
};

export function createSafeProviderWritePolicy(mode: ProviderWriteMode = "dry_run"): ProviderWritePolicy {
  return { ...SAFE_PROVIDER_WRITE_POLICY, mode };
}

export function assertProviderWritesDisabled(providerId: ProviderId): ProviderWriteGuardResult {
  return {
    allowed: false,
    code: "PROVIDER_WRITES_DISABLED",
    message: "Scritture provider/import disabilitate: D.5 prepara solo preview locali.",
    providerId,
    dbWrite: false,
    externalFetch: false,
  };
}

export function guardProviderWriteAttempt(
  providerId: ProviderId,
  policy: ProviderWritePolicy = SAFE_PROVIDER_WRITE_POLICY,
): ProviderWriteGuardResult {
  if (!policy.realWritesEnabled) return assertProviderWritesDisabled(providerId);

  return {
    allowed: false,
    code: "PROVIDER_WRITES_DISABLED",
    message: "Policy non valida: le scritture reali non sono disponibili in D.5.",
    providerId,
    dbWrite: false,
    externalFetch: false,
  };
}

export function validateProviderWritePolicy(
  providerId: ProviderId,
  policy: ProviderWritePolicy = SAFE_PROVIDER_WRITE_POLICY,
): ProviderWriteGuardResult[] {
  const results: ProviderWriteGuardResult[] = [];

  if (!policy.realWritesEnabled) results.push(assertProviderWritesDisabled(providerId));
  if (policy.allowExternalFetch) {
    results.push({
      allowed: false,
      code: "EXTERNAL_FETCH_BLOCKED",
      message: "Fetch esterne non autorizzate per provider writer dry-run.",
      providerId,
      dbWrite: false,
      externalFetch: false,
    });
  }
  if (policy.allowProviderCalls) {
    results.push({
      allowed: false,
      code: "PROVIDER_CALL_BLOCKED",
      message: "Chiamate provider reali non autorizzate.",
      providerId,
      dbWrite: false,
      externalFetch: false,
    });
  }
  if (policy.allowApifyRuns) {
    results.push({
      allowed: false,
      code: "APIFY_RUN_BLOCKED",
      message: "Run Apify non autorizzate.",
      providerId,
      dbWrite: false,
      externalFetch: false,
    });
  }
  if (policy.allowServiceRole) {
    results.push({
      allowed: false,
      code: "SERVICE_ROLE_BLOCKED",
      message: "Service role non consentito nel layer D.5.",
      providerId,
      dbWrite: false,
      externalFetch: false,
    });
  }

  return results;
}
