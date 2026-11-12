import { useState } from "react";
import type { Activity, KindFilter, OverviewFilter, SortBy } from "../types";
import { comparators, countBy, matchesOverview, matchesQuery, sortItems } from "../utils/filter";
import OverviewCards from "../components/OverviewCard";
import FilterBar from "../components/FilterBar";
import ActivityList from "../components/ActivityList";

interface HomePageProps {
  activities: Activity[];
  onNextStatus: (id: number) => void;
  onEdit: (activity: Activity) => void;
  onDelete: (id: number) => void;
}

const TITLES: Record<OverviewFilter, string> = {
  "hari-ini": "Kegiatan hari ini",
  mendatang: "Kegiatan mendatang",
  selesai: "Kegiatan selesai",
  semua: "Semua kegiatan",
};

function HomePage({ activities, onNextStatus, onEdit, onDelete }: HomePageProps) {
  const [overview, setOverview] = useState<OverviewFilter>("semua");
  const [kind, setKind] = useState<KindFilter>("Semua");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortBy>("tanggal");

  const counts: Record<OverviewFilter, number> = {
    "hari-ini": countBy(activities, (a) => matchesOverview(a, "hari-ini")),
    mendatang: countBy(activities, (a) => matchesOverview(a, "mendatang")),
    selesai: countBy(activities, (a) => matchesOverview(a, "selesai")),
    semua: activities.length,
  };

  const filtered = activities.filter(
    (a) =>
      matchesOverview(a, overview) &&
      (kind === "Semua" || a.kind === kind) &&
      matchesQuery(a, query),
  );
  const visible = sortItems(filtered, comparators[sort]);
  const hasActive = overview !== "semua" || kind !== "Semua" || query.trim() !== "";

  const resetFilters = () => {
    setOverview("semua");
    setKind("Semua");
    setQuery("");
  };

  return (
    <>
      <OverviewCards counts={counts} active={overview} onSelect={setOverview} />
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        kind={kind}
        onKindChange={setKind}
        sort={sort}
        onSortChange={setSort}
        hasActive={hasActive}
        onReset={resetFilters}
      />
      <h2 className="section-title">
        {TITLES[overview]} <span className="muted">({visible.length})</span>
      </h2>
      <ActivityList
        activities={visible}
        onNextStatus={onNextStatus}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
}

export default HomePage;