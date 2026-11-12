import { useState } from "react";
import type { Activity, ActivityInput, Kind, Priority } from "../types";
import { KINDS, PRIORITIES } from "../types";
import { todayStr } from "../utils/date";
import Button from "./Button";

interface ActivityFormProps {
  initial: Activity | null;
  defaultDate?: string;
  onSubmit: (input: ActivityInput) => void;
  onCancel: () => void;
}

interface FormState {
  title: string;
  kind: Kind;
  priority: Priority;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  note: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

function toState(a: Activity | null, defaultDate?: string): FormState {
  return {
    title: a?.title ?? "",
    kind: a?.kind ?? "Tugas",
    priority: a?.priority ?? "Sedang",
    date: a?.date ?? defaultDate ?? todayStr(),
    startTime: a?.startTime ?? "",
    endTime: a?.endTime ?? "",
    location: a?.location ?? "",
    note: a?.note ?? "",
  };
}

function validate(f: FormState): Errors {
  const errors: Errors = {};
  if (!f.title.trim()) errors.title = "Judul wajib diisi.";
  if (!f.date) errors.date = "Tanggal wajib diisi.";
  if (f.startTime && f.endTime && f.endTime <= f.startTime) {
    errors.endTime = "Jam selesai harus setelah jam mulai.";
  }
  return errors;
}

function ActivityForm({ initial, defaultDate, onSubmit, onCancel }: ActivityFormProps) {
  const [form, setForm] = useState<FormState>(() => toState(initial, defaultDate));
  const [errors, setErrors] = useState<Errors>({});

  // Generic: mengubah satu field tanpa menyentuh yang lain
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit({
      title: form.title.trim(),
      kind: form.kind,
      priority: form.priority,
      date: form.date,
      startTime: form.startTime || undefined,
      endTime: form.endTime || undefined,
      location: form.location.trim() || undefined,
      note: form.note.trim() || undefined,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="title">Judul</label>
        <input
          id="title"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Contoh: Rapat himpunan"
          autoComplete="off"
          aria-invalid={!!errors.title}
          autoFocus
        />
        {errors.title && <p className="error">{errors.title}</p>}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="kind">Jenis</label>
          <select id="kind" value={form.kind} onChange={(e) => set("kind", e.target.value as Kind)}>
            {KINDS.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="priority">Prioritas</label>
          <select
            id="priority"
            value={form.priority}
            onChange={(e) => set("priority", e.target.value as Priority)}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="date">Tanggal</label>
        <input
          id="date"
          type="date"
          value={form.date}
          onChange={(e) => set("date", e.target.value)}
          aria-invalid={!!errors.date}
        />
        {errors.date && <p className="error">{errors.date}</p>}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="startTime">Mulai</label>
          <input id="startTime" type="time" value={form.startTime} onChange={(e) => set("startTime", e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="endTime">Selesai</label>
          <input
            id="endTime"
            type="time"
            value={form.endTime}
            onChange={(e) => set("endTime", e.target.value)}
            aria-invalid={!!errors.endTime}
          />
          {errors.endTime && <p className="error">{errors.endTime}</p>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="location">Lokasi (opsional)</label>
        <input id="location" value={form.location} onChange={(e) => set("location", e.target.value)} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="note">Catatan (opsional)</label>
        <textarea id="note" rows={3} value={form.note} onChange={(e) => set("note", e.target.value)} />
      </div>

      <div className="form-actions">
        <Button onClick={onCancel}>Batal</Button>
        <Button type="submit" variant="primary">
          {initial ? "Simpan perubahan" : "Tambah kegiatan"}
        </Button>
      </div>
    </form>
  );
}

export default ActivityForm;