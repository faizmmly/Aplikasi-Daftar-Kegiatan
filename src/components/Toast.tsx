import { useEffect } from "react";

interface ToastProps {
  message: string;
  tone: "success" | "danger";
  onClose: () => void;
}

function Toast({ message, tone, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`toast toast-${tone}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}

export default Toast;