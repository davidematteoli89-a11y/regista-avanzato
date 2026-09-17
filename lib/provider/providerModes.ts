export const PROVIDER_DATA_MODES = {
  manualDataMode: true,
  mockDataMode: true,
  realProviderMode: false,
  realProviderImports: false,
  realProviderWrites: false,
} as const;

export type ProviderDataModes = typeof PROVIDER_DATA_MODES;

export function getProviderDataModeSummary(): ProviderDataModes {
  return PROVIDER_DATA_MODES;
}
