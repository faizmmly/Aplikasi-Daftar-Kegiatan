import type { KindFilter, SortBy } from "../types";
import { KINDS } from "../types";

interface FilterBarProps {
  query: string;
  onQueryChange: (v: string) => void;
  kind: KindFilter;
  onKindChange: (v: KindFilter) => void;
  sort: SortBy;
  onSortChange: (v: SortBy) => void;
  hasActive: boolean;
  onReset: () => void;
}

const SORTS: { value: SortBy; label: string }[] = [
  { value: "tanggal", label: "Tanggal terdekat" },
  { value: "prioritas", label: "Prioritas tertinggi" },
  { value: "nama", label: "Nama (A-Z)" },
];

function FilterBar({
  query, onQueryChange, kind, onKindChange, sort, onSortChange, hasActive, onReset,
}: FilterBarProps) {
  return (
    <section className="filterbar" aria-label="Cari dan filter">
      <input
        type="search"
        className="search"
        placeholder="🔍 Cari judul, lokasi, atau catatan..."
        aria-label="Cari kegiatan"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />

      <div className="filter-row">
        <label>
          <span>Jenis</span>
          <select value={kind} onChange={(e) => onKindChange(e.target.value as KindFilter)}>
            <option value="Semua">Semua jenis</option>
            {KINDS.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Urutkan</span>
          <select value={sort} onChange={(e) => onSortChange(e.target.value as SortBy)}>
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>

        {hasActive && (
          <button type="button" className="reset" onClick={onReset}>
            Reset filter
          </button>
        )}
      </div>
    </section>
  );
}

export default FilterBar;