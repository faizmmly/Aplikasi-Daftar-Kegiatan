import type { Theme } from "../types";

interface HeaderProps {
  name: string;
  nim: string;
  kelas: string;
  theme: Theme;
  onToggleTheme: () => void;
}

function Header({ name, nim, kelas, theme, onToggleTheme }: HeaderProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="app-header">
      <div className="avatar" aria-hidden="true">{initials}</div>
      <div>
        <p className="muted">Selamat datang</p>
        <h1>{name}</h1>
        <p className="muted">{nim} • {kelas}</p>
      </div>
      <div className="header-right">
        <span className="brand">AgendaKu</span>
        <button
          type="button"
          className="icon-btn"
          aria-label={theme === "dark" ? "Pakai tema terang" : "Pakai tema gelap"}
          onClick={onToggleTheme}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

export default Header;