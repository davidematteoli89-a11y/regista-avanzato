import type { SearchUsagePeriod } from "./searchLimitTypes";

/** Usa il calendario e la timezone del runtime server; non legge browser o database. */
export function getSearchPeriod(now = new Date()): SearchUsagePeriod {
  const year = now.getFullYear();
  const month = now.getMonth();
  const start = new Date(year, month, 1, 0, 0, 0, 0);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
  const localDate = (value: Date) => [value.getFullYear(), String(value.getMonth() + 1).padStart(2, "0"), String(value.getDate()).padStart(2, "0")].join("-");
  return { timezone: "server", period_start: localDate(start), period_end: localDate(end) };
}
