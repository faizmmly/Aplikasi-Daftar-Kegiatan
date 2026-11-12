import { useCallback, useState } from "react";
import type { Activity, ActivityInput, KindFilter, OverviewFilter, SortBy, Status } from "./types";
import { STATUSES } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { addDays, todayStr } from "./utils/date";
import { comparators, countBy, matchesOverview, matchesQuery, sortItems } from "./utils/filter";
import Header from "./components/Header";
import OverviewCards from "./components/OverviewCard";
import FilterBar from "./components/FilterBar";
import ActivityList from "./components/ActivityList";
import ActivityForm from "./components/ActivityForm";
import ConfirmModal from "./components/ConfirmModal";
import Modal from "./components/Modal";
import Toast from "./components/Toast";

const sample = (): Activity[] => {
  const t = todayStr();
  return [
    { id: 1, title: "Kuliah Pengembangan Aplikasi Web", kind: "Acara", priority: "Sedang", status: "Berlangsung", date: t, startTime: "08:00", endTime: "10:00", location: "Gedung FST", note: "Bawa laptop." },
    { id: 2, title: "Rapat himpunan", kind: "Acara", priority: "Tinggi", status: "Direncanakan", date: addDays(t, 1), startTime: "16:00", endTime: "17:30", location: "Sekretariat" },
    { id: 3, title: "Kumpulkan tugas React", kind: "Tugas", priority: "Tinggi", status: "Direncanakan", date: addDays(t, 18), note: "Deadline 30 November." },
    { id: 4, title: "Ingatkan bayar UKT", kind: "Pengingat", priority: "Sedang", status: "Direncanakan", date: addDays(t, 3), startTime: "09:00" },
    { id: 5, title: "Selesaikan prototipe UI", kind: "Target", priority: "Rendah", status: "Selesai", date: addDays(t, -1) },
  ];
};

const TITLES: Record<OverviewFilter, string> = {
  "hari-ini": "Kegiatan hari ini",
  mendatang: "Kegiatan mendatang",
  selesai: "Kegiatan selesai",
  semua: "Semua kegiatan",
};

function nextStatus(s: Status): Status {
  return STATUSES[(STATUSES.indexOf(s) + 1) % STATUSES.length];
}

interface ToastState {
  id: number;
  message: string;
  tone: "success" | "danger";
}

function App() {
  const [activities, setActivities] = useLocalStorage<Activity[]>("agendaku-v2", sample());

  // State tampilan
  const [overview, setOverview] = useState<OverviewFilter>("semua");
  const [kind, setKind] = useState<KindFilter>("Semua");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortBy>("tanggal");

  // State form, konfirmasi, dan notifikasi
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Activity | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Activity | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const notify = (message: string, tone: "success" | "danger" = "success") =>
    setToast({ id: Date.now(), message, tone });
  const closeToast = useCallback(() => setToast(null), []);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (a: Activity) => {
    setEditing(a);
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const handleSubmit = (input: ActivityInput) => {
    if (editing) {
      setActivities(activities.map((a) => (a.id === editing.id ? { ...a, ...input } : a)));
      notify("Kegiatan diperbarui");
    } else {
      setActivities([{ id: Date.now(), status: "Direncanakan", ...input }, ...activities]);
      notify("Kegiatan ditambahkan");
    }
    closeForm();
  };

  const handleNextStatus = (id: number) => {
    const target = activities.find((a) => a.id === id);
    if (!target) return;
    const next = nextStatus(target.status);
    setActivities(activities.map((a) => (a.id === id ? { ...a, status: next } : a)));
    notify(`Status diubah menjadi ${next}`);
  };

  const requestDelete = (id: number) =>
    setPendingDelete(activities.find((a) => a.id === id) ?? null);

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setActivities(activities.filter((a) => a.id !== pendingDelete.id));
    setPendingDelete(null);
    notify("Kegiatan dihapus", "danger");
  };

  const resetFilters = () => {
    setOverview("semua");
    setKind("Semua");
    setQuery("");
  };

  // Nilai turunan: dihitung dari state, tidak disimpan terpisah
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

  return (
    <div className="container">
      <Header name="Faiz Muhammad Ilham" nim="1247050032" kelas="IF A 24" />
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
        onNextStatus={handleNextStatus}
        onEdit={openEdit}
        onDelete={requestDelete}
      />

      <button type="button" className="fab" aria-label="Tambah kegiatan" onClick={openAdd}>
        +
      </button>

      {formOpen && (
        <Modal title={editing ? "Edit kegiatan" : "Kegiatan baru"} onClose={closeForm}>
          <ActivityForm
            key={editing?.id ?? "new"}
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        </Modal>
      )}

      {pendingDelete && (
        <ConfirmModal
          title="Hapus kegiatan?"
          message={`"${pendingDelete.title}" akan dihapus dan tidak bisa dikembalikan.`}
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}

      {toast && (
        <Toast key={toast.id} message={toast.message} tone={toast.tone} onClose={closeToast} />
      )}
    </div>
  );
}

export default App;