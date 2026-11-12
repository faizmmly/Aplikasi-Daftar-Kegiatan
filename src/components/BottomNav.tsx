import type { Page } from "../types";

interface BottomNavProps {
  page: Page;
  onChange: (page: Page) => void;
}

const ITEMS: { key: Page; label: string; icon: string }[] = [
  { key: "beranda", label: "Beranda", icon: "🏠" },
  { key: "kalender", label: "Kalender", icon: "🗓️" },
];

function BottomNav({ page, onChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      {ITEMS.map((it) => (
        <button
          key={it.key}
          type="button"
          className={page === it.key ? "is-active" : ""}
          aria-current={page === it.key ? "page" : undefined}
          onClick={() => onChange(it.key)}
        >
          <span aria-hidden="true">{it.icon}</span>
          {it.label}
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;