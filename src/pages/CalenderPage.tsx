import type { Activity } from "../types";
import { comparators, sortItems } from "../utils/filter";
import { formatDate } from "../utils/date";
import Calendar from "../components/Calendar";
import ActivityList from "../components/ActivityList";

interface CalendarPageProps {
  activities: Activity[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
  onNextStatus: (id: number) => void;
  onEdit: (activity: Activity) => void;
  onDelete: (id: number) => void;
}

function CalendarPage({
  activities, selectedDate, onSelectDate, onNextStatus, onEdit, onDelete,
}: CalendarPageProps) {
  const dayActivities = selectedDate
    ? sortItems(
        activities.filter((a) => a.date === selectedDate),
        comparators.tanggal,
      )
    : [];

  return (
    <div className="split">
      <Calendar activities={activities} selected={selectedDate} onSelect={onSelectDate} />
      <div>
        <h2 className="section-title">
          {selectedDate ? `Kegiatan ${formatDate(selectedDate)}` : "Pilih tanggal"}
          {selectedDate && <span className="muted"> ({dayActivities.length})</span>}
        </h2>
        {selectedDate ? (
          <ActivityList
            activities={dayActivities}
            onNextStatus={onNextStatus}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ) : (
          <div className="empty">
            <span>🗓️</span>
            <p>Pilih tanggal di kalender untuk melihat kegiatannya.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;