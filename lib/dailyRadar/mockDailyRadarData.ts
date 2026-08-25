import { runDailyRadar } from "./dailyRadarEngine";
export const MOCK_DAILY_RADAR_RUNS = [runDailyRadar({ radarId: "daily-radar-2026-08-25", date: "2026-08-25", title: "Daily Radar — segnali di oggi", mode: "mock" }), runDailyRadar({ radarId: "daily-radar-2026-08-24", date: "2026-08-24", title: "Daily Radar — archivio mock", mode: "mock", signalLimit: 8 })];
export const MOCK_DAILY_RADAR_ITEMS = MOCK_DAILY_RADAR_RUNS.map((run) => run.radar);
