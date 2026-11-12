import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  type?: "button" | "submit";
}

function Button({ children, onClick, variant = "ghost", type = "button" }: ButtonProps) {
  return (
    <button type={type} className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;