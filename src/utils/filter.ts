import type { Activity, OverviewFilter, Priority, SortBy  } from "../types";
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

const PRIORITY_RANK: Record<Priority, number> = { Tinggi: 0, Sedang: 1, Rendah: 2 };

// Generic: mengurutkan tanpa mengubah array asli
export function sortItems<T>(items: T[], compare: (a: T, b: T) => number): T[] {
  return [...items].sort(compare);
}

export const comparators: Record<SortBy, (a: Activity, b: Activity) => number> = {
  tanggal: (a, b) =>
    a.date.localeCompare(b.date) || (a.startTime ?? "").localeCompare(b.startTime ?? ""),
  prioritas: (a, b) =>
    PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || a.date.localeCompare(b.date),
  nama: (a, b) => a.title.localeCompare(b.title, "id"),
};

export function matchesQuery(a: Activity, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [a.title, a.location, a.note].some((v) => v?.toLowerCase().includes(q));
}