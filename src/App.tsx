import type { Activity, Status } from "./types";
import { STATUSES } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { addDays, todayStr } from "./utils/date";
import ActivityList from "./components/ActivityList";

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

  const handleNextStatus = (id: number) =>
    setActivities(activities.map((a) => (a.id === id ? { ...a, status: nextStatus(a.status) } : a)));

  const handleDelete = (id: number) =>
    setActivities(activities.filter((a) => a.id !== id));

  return (
    <div className="container">
      <header className="app-header">
        <div>
          <h1>AgendaKu</h1>
          <p className="muted">Faiz Muhammad Ilham • 1247050032 • IF A 24</p>
        </div>
      </header>
      <ActivityList
        activities={activities}
        onNextStatus={handleNextStatus}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;