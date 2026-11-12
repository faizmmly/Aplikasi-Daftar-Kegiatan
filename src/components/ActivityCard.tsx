import { useState } from "react";
import type { Activity, Status } from "../types";
import { dateLabel, daysLeft, formatDate, timeRange } from "../utils/date";
import { KIND_ICON } from "../utils/kind";
import Badge from "./Badge";
import Button from "./Button";

interface ActivityCardProps {
  activity: Activity;
  onNextStatus: (id: number) => void;
  onEdit: (activity: Activity) => void;
  onDelete: (id: number) => void;
}

const statusTone: Record<Status, "info" | "warning" | "success"> = {
  Direncanakan: "info",
  Berlangsung: "warning",
  Selesai: "success",
};

function ActivityCard({ activity, onNextStatus, onEdit, onDelete }: ActivityCardProps) {
  const [open, setOpen] = useState(false);
  const days = daysLeft(activity.date);
  const done = activity.status === "Selesai";
  const late = !done && days < 0;
  const time = timeRange(activity.startTime, activity.endTime);

  return (
    <li className={`card ${done ? "is-done" : ""} ${late ? "is-late" : ""}`}>
      <div className="card-head">
        <h3>
          <span aria-hidden="true">{KIND_ICON[activity.kind]}</span> {activity.title}
        </h3>
        <Badge label={activity.status} tone={statusTone[activity.status]} />
      </div>

      <div className="card-meta">
        <Badge label={activity.kind} />
        <Badge
          label={activity.priority}
          tone={activity.priority === "Tinggi" ? "danger" : "neutral"}
        />
        <span>📅 {formatDate(activity.date)}</span>
        {time && <span>🕒 {time}</span>}
        {!done && <span className={late ? "due due-late" : "due"}>{dateLabel(days)}</span>}
      </div>

      {open && (
        <div className="card-detail">
          {activity.location && <p>📍 {activity.location}</p>}
          <p>{activity.note || "Tidak ada catatan."}</p>
        </div>
      )}

      <div className="card-actions">
        <Button variant="primary" onClick={() => onNextStatus(activity.id)}>
          Ubah status
        </Button>
        <Button onClick={() => onEdit(activity)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(activity.id)}>
          Hapus
        </Button>
      </div>
    </li>
  );
}

export default ActivityCard;