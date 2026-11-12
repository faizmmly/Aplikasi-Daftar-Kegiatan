import { useMemo, useState } from "react";
import type { Activity } from "../types";
import { monthGrid, monthLabel } from "../utils/calendar";
import { formatDate, todayStr } from "../utils/date";

interface CalendarProps {
  activities: Activity[];
  selected: string | null;
  onSelect: (date: string | null) => void;
}

const WEEKDAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function Calendar({ activities, selected, onSelect }: CalendarProps) {
  const today = todayStr();
  const base = selected ?? today;

  // State lokal: bulan yang sedang dilihat
  const [view, setView] = useState(() => ({
    year: Number(base.slice(0, 4)),
    month: Number(base.slice(5, 7)) - 1,
  }));

  const cells = monthGrid(view.year, view.month);

  // Kelompokkan kegiatan per tanggal
  const byDate = useMemo(() => {
    const map = new Map<string, Activity[]>();
    for (const a of activities) {
      const list = map.get(a.date) ?? [];
      list.push(a);
      map.set(a.date, list);
    }
    return map;
  }, [activities]);

  const move = (delta: number) =>
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  const goToday = () => {
    setView({ year: Number(today.slice(0, 4)), month: Number(today.slice(5, 7)) - 1 });
    onSelect(today);
  };

  return (
    <section className="calendar" aria-label="Kalender kegiatan">
      <div className="cal-head">
        <h2>{monthLabel(view.year, view.month)}</h2>
        <div className="cal-controls">
          <button type="button" className="icon-btn" aria-label="Bulan sebelumnya" onClick={() => move(-1)}>
            ‹
          </button>
          <button type="button" className="cal-today" onClick={goToday}>
            Hari ini
          </button>
          <button type="button" className="icon-btn" aria-label="Bulan berikutnya" onClick={() => move(1)}>
            ›
          </button>
        </div>
      </div>

      <div className="cal-grid">
        {WEEKDAYS.map((w) => (
          <span key={w} className="cal-weekday">{w}</span>
        ))}

        {cells.map((date, i) => {
          if (!date) return <span key={`empty-${i}`} className="cal-empty" />;

          const items = byDate.get(date) ?? [];
          const allDone = items.length > 0 && items.every((a) => a.status === "Selesai");
          const isSelected = date === selected;

          return (
            <button
              key={date}
              type="button"
              className={`cal-cell ${date === today ? "is-today" : ""} ${isSelected ? "is-selected" : ""}`}
              aria-label={`${formatDate(date)}, ${items.length} kegiatan`}
              aria-pressed={isSelected}
              onClick={() => onSelect(isSelected ? null : date)}
            >
              {Number(date.slice(8))}
              {items.length > 0 && (
                <span className={`cal-dot ${allDone ? "dot-done" : "dot-open"}`} />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Calendar;