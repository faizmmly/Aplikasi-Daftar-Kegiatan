import type { Activity } from "../types";
import ActivityCard from "./ActivityCard";

interface ActivityListProps {
  activities: Activity[];
  onNextStatus: (id: number) => void;
  onEdit: (activity: Activity) => void;
  onDelete: (id: number) => void;
}

function ActivityList({ activities, onNextStatus, onEdit, onDelete }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="empty">
        <span>📝</span>
        <p>Tidak ada kegiatan di sini. Tekan tombol + untuk menambah.</p>
      </div>
    );
  }

  return (
    <ul className="list">
      {activities.map((a) => (
        <ActivityCard
          key={a.id}
          activity={a}
          onNextStatus={onNextStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default ActivityList;