import type { Activity, OverviewFilter } from "../types";
import { daysLeft } from "./date";

export function matchesOverview(a: Activity, f: OverviewFilter): boolean {
  switch (f) {
    case "hari-ini":
      return daysLeft(a.date) === 0;
    case "mendatang":
      return daysLeft(a.date) > 0 && a.status !== "Selesai";
    case "selesai":
      return a.status === "Selesai";
    default:
      return true;
  }
}

// Generic: menghitung item yang memenuhi syarat
export function countBy<T>(items: T[], predicate: (item: T) => boolean): number {
  return items.filter(predicate).length;
}