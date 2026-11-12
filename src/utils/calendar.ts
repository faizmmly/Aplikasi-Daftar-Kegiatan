const pad = (n: number) => String(n).padStart(2, "0");

export const toDateStr = (y: number, m: number, d: number): string =>
  `${y}-${pad(m + 1)}-${pad(d)}`;

// Sel kalender satu bulan, mulai hari Minggu. null = sel kosong di awal bulan.
export function monthGrid(year: number, month: number): (string | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const cells = new Array<string | null>(firstDay).fill(null);
  for (let d = 1; d <= totalDays; d++) cells.push(toDateStr(year, month, d));
  return cells;
}

export function monthLabel(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
}