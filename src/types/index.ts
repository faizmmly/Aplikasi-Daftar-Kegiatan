export const KINDS = ["Tugas", "Acara", "Pengingat", "Target"] as const;
export const PRIORITIES = ["Rendah", "Sedang", "Tinggi"] as const;
export const STATUSES = ["Direncanakan", "Berlangsung", "Selesai"] as const;

// Union type diturunkan dari array di atas
export type Kind = (typeof KINDS)[number];
export type Priority = (typeof PRIORITIES)[number];
export type Status = (typeof STATUSES)[number];

export interface Activity {
  id: number;
  title: string;
  kind: Kind;
  priority: Priority;
  status: Status;
  date: string; // YYYY-MM-DD
  startTime?: string; // HH:MM
  endTime?: string; // HH:MM
  location?: string;
  note?: string;
}

export type ActivityInput = Omit<Activity, "id" | "status">;

export type OverviewFilter = "semua" | "hari-ini" | "mendatang" | "selesai";