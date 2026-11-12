interface BadgeProps {
  label: string;
  tone?: "neutral" | "info" | "success" | "warning" | "danger";
}

function Badge({ label, tone = "neutral" }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{label}</span>;
}

export default Badge;