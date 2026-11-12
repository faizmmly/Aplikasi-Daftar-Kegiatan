import type { OverviewFilter } from "../types";
import StatCard from "./StatCard";

interface OverviewCardsProps {
  counts: Record<OverviewFilter, number>;
  active: OverviewFilter;
  onSelect: (f: OverviewFilter) => void;
}

const ITEMS: { key: OverviewFilter; label: string; tone: "purple" | "orange" | "green" | "blue" }[] = [
  { key: "hari-ini", label: "Hari ini", tone: "purple" },
  { key: "mendatang", label: "Mendatang", tone: "orange" },
  { key: "selesai", label: "Selesai", tone: "green" },
  { key: "semua", label: "Semua kegiatan", tone: "blue" },
];

function OverviewCards({ counts, active, onSelect }: OverviewCardsProps) {
  return (
    <section className="overview" aria-label="Ringkasan kegiatan">
      {ITEMS.map((it) => (
        <StatCard
          key={it.key}
          label={it.label}
          value={counts[it.key]}
          tone={it.tone}
          active={active === it.key}
          onClick={() => onSelect(it.key)}
        />
      ))}
    </section>
  );
}

export default OverviewCards;