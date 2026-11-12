import { useCallback, useEffect, useState } from "react";
import type { Activity, ActivityInput, Page, Status, Theme } from "./types";
import { STATUSES } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useToast } from "./hooks/useToast";
import { addDays, todayStr } from "./utils/date";
import Header from "./components/Header";
import ActivityForm from "./components/ActivityForm";
import ConfirmModal from "./components/ConfirmModal";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalenderPage";

const PROFILE = { name: "Faiz Muhammad Ilham Hariry", nim: "1247050032", kelas: "IF A 24" };

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

function nextStatus(s: Status): Status {
  return STATUSES[(STATUSES.indexOf(s) + 1) % STATUSES.length];
}

function App() {
  const [activities, setActivities] = useLocalStorage<Activity[]>("agendaku-v2", sample());
  const [theme, setTheme] = useLocalStorage<Theme>("agendaku-theme", "light");
  const { toast, notify, close } = useToast();

  const [page, setPage] = useState<Page>("beranda");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Activity | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Activity | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const openAdd = useCallback(() => {
    setEditing(null);
    setFormOpen(true);
  }, []);
  const openEdit = (a: Activity) => {
    setEditing(a);
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const changePage = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0 });
  };

  // Pintasan keyboard: "/" untuk mencari, "n" untuk kegiatan baru
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.matches("input, textarea, select") || e.metaKey || e.ctrlKey || e.altKey) return;
      if (formOpen || pendingDelete) return;

      if (e.key === "/") {
        e.preventDefault();
        setPage("beranda");
        requestAnimationFrame(() => document.getElementById("search")?.focus());
      } else if (e.key === "n") {
        e.preventDefault();
        openAdd();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [formOpen, pendingDelete, openAdd]);

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

  return (
    <>
      <a className="skip-link" href="#main">Lewati ke konten</a>

      <div className="container">
        <Header
          name={PROFILE.name}
          nim={PROFILE.nim}
          kelas={PROFILE.kelas}
          theme={theme}
          onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        />

        {/* Kedua halaman tetap terpasang, jadi filter dan bulan kalender tidak hilang saat berpindah */}
        <main id="main">
          <div hidden={page !== "beranda"}>
            <HomePage
              activities={activities}
              onNextStatus={handleNextStatus}
              onEdit={openEdit}
              onDelete={requestDelete}
            />
          </div>
          <div hidden={page !== "kalender"}>
            <CalendarPage
              activities={activities}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              onNextStatus={handleNextStatus}
              onEdit={openEdit}
              onDelete={requestDelete}
            />
          </div>
        </main>

        <button
          type="button"
          className="fab"
          aria-label="Tambah kegiatan"
          title="Tambah kegiatan (N)"
          onClick={openAdd}
        >
          +
        </button>

        <BottomNav page={page} onChange={changePage} />

        {formOpen && (
          <Modal title={editing ? "Edit kegiatan" : "Kegiatan baru"} onClose={closeForm}>
            <ActivityForm
              key={editing?.id ?? "new"}
              initial={editing}
              defaultDate={page === "kalender" ? (selectedDate ?? undefined) : undefined}
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

        {toast && <Toast key={toast.id} message={toast.message} tone={toast.tone} onClose={close} />}
      </div>
    </>
  );
}

export default App;