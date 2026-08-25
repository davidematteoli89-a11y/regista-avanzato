import type { TrackingLevel } from "../../config/competitions";
import type { DailyBudgetStatus } from "./checkDailyBudget";

export type ImportPriority =
  | "full_official"
  | "apify_light_plus_p1"
  | "apify_light_plus_p2"
  | "trigger"
  | "skip";

export type ImportPriorityDecision = {
  priority: ImportPriority;
  shouldImport: boolean;
  latestRoundOnly: boolean;
  useStoredDataOnFailure: true;
  reason: string;
};

export type ImportPriorityInput = {
  trackingLevel: TrackingLevel;
  latestRoundOnly?: boolean;
  stableProviderBudget?: DailyBudgetStatus;
  apifyPriorityOneAllowed?: boolean;
  apifyPriorityTwoAllowed?: boolean;
  strongTriggerDetected?: boolean;
};

/** Decide il livello da importare; non avvia alcuna operazione. */
export function getImportPriority(input: ImportPriorityInput): ImportPriorityDecision {
  const latestRoundOnly = input.latestRoundOnly ?? true;
  const skip = (reason: string): ImportPriorityDecision => ({
    priority: "skip",
    shouldImport: false,
    latestRoundOnly,
    useStoredDataOnFailure: true,
    reason,
  });

  if (!latestRoundOnly) {
    return skip("Import massivo/storico non consentito da questa strategia operativa.");
  }

  switch (input.trackingLevel) {
    case "full_official":
      if (!input.stableProviderBudget?.canStart) {
        return skip("Provider stabile non autorizzato dal budget: mantenere dati Supabase esistenti o usare mock.");
      }
      return {
        priority: "full_official",
        shouldImport: true,
        latestRoundOnly,
        useStoredDataOnFailure: true,
        reason: "Competizione FULL_OFFICIAL con budget provider disponibile.",
      };

    case "apify_light_plus_p1":
      if (!input.apifyPriorityOneAllowed) return skip("Run Apify priority 1 non consentita dal budget.");
      return {
        priority: "apify_light_plus_p1",
        shouldImport: true,
        latestRoundOnly,
        useStoredDataOnFailure: true,
        reason: "Competizione Apify P1 essenziale autorizzata.",
      };

    case "apify_light_plus_p2":
      if (!input.apifyPriorityTwoAllowed) return skip("Run Apify priority 2 esclusa o senza budget residuo.");
      return {
        priority: "apify_light_plus_p2",
        shouldImport: true,
        latestRoundOnly,
        useStoredDataOnFailure: true,
        reason: "Competizione Apify P2 autorizzata dopo le P1.",
      };

    case "trigger":
      if (!input.strongTriggerDetected) return skip("Nessun trigger forte già rilevato nei dati disponibili.");
      return {
        priority: "trigger",
        shouldImport: true,
        latestRoundOnly,
        useStoredDataOnFailure: true,
        reason: "Trigger forte confermato; import minimo consentito.",
      };
  }
}
