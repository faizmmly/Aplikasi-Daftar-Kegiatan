import type { Activity } from "../types";
import ActivityCard from "./ActivityCard";

interface ActivityListProps {
  activities: Activity[];
  onNextStatus: (id: number) => void;
  onDelete: (id: number) => void;
}

function ActivityList({ activities, onNextStatus, onDelete }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="empty">
        <span>📝</span>
        <p>Belum ada kegiatan. Tambahkan kegiatan pertamamu!</p>
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
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default ActivityList;