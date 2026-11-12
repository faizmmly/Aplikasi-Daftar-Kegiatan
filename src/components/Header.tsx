interface HeaderProps {
  name: string;
  nim: string;
  kelas: string;
}

function Header({ name, nim, kelas }: HeaderProps) {
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
      <span className="brand">AgendaKu</span>
    </header>
  );
}

export default Header;