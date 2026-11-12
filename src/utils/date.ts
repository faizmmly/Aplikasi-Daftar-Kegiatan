export const todayStr = (): string => new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD

export function daysLeft(date: string): number {
  const msPerDay = 86_400_000;
  const d = new Date(`${date}T00:00:00`).getTime();
  const t = new Date(`${todayStr()}T00:00:00`).getTime();
  return Math.round((d - t) / msPerDay);
}

export function dateLabel(days: number): string {
  if (days < 0) return `Lewat ${Math.abs(days)} hari`;
  if (days === 0) return "Hari ini";
  if (days === 1) return "Besok";
  return `${days} hari lagi`;
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function addDays(base: string, n: number): string {
  const d = new Date(`${base}T00:00:00`);
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString("sv-SE");
}