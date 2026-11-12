import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  type?: "button" | "submit";
  autoFocus?: boolean;
}

function Button({ children, onClick, variant = "ghost", type = "button", autoFocus }: ButtonProps) {
  return (
    <button type={type} className={`btn btn-${variant}`} onClick={onClick} autoFocus={autoFocus}>
      {children}
    </button>
  );
}

export default Button;