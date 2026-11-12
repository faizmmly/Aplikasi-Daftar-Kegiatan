import { useCallback, useState } from "react";

export type ToastTone = "success" | "danger";

export interface ToastState {
  id: number;
  message: string;
  tone: ToastTone;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  const notify = useCallback(
    (message: string, tone: ToastTone = "success") =>
      setToast({ id: Date.now(), message, tone }),
    [],
  );
  const close = useCallback(() => setToast(null), []);

  return { toast, notify, close };
}