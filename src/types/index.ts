export const CATEGORIES = ["Kuliah", "Organisasi", "Tugas", "Pribadi", "Lomba"] as const;
export const PRIORITIES = ["Rendah", "Sedang", "Tinggi"] as const;
export const STATUSES = ["Direncanakan", "Berlangsung", "Selesai"] as const;

// Union type diturunkan dari array di atas
export type Category = (typeof CATEGORIES)[number];
export type Priority = (typeof PRIORITIES)[number];
export type Status = (typeof STATUSES)[number];

export interface Activity {
  id: number;
  title: string;
  category: Category;
  priority: Priority;
  status: Status;
  date: string; // YYYY-MM-DD
  time?: string;
  location?: string;
  note?: string;
}

export type ActivityInput = Omit<Activity, "id" | "status">;