interface StatCardProps {
  label: string;
  value: number;
  tone: "purple" | "orange" | "green" | "blue";
  active: boolean;
  onClick: () => void;
}

function StatCard({ label, value, tone, active, onClick }: StatCardProps) {
  return (
    <button
      type="button"
      className={`stat stat-${tone} ${active ? "is-active" : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      <strong>{value}</strong>
      <span>{label}</span>
    </button>
  );
}

export default StatCard;