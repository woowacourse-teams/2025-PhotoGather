import { useCallback, useState } from 'react';
import { ToastList } from '../components/@common/notification/toastList/ToastList';
import type { Toast, ToastBase } from '../types/toast.type';
import { ToastContext } from './ToastContext';

let toastId = 0;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const TOAST_EXIT_DELAY = 500;

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({
      text,
      type = 'error',
      duration = 1500,
      position = 'bottom',
    }: ToastBase) => {
      const id = toastId++;
      setToasts((prev) => [...prev, { id, text, type, duration, position }]);

      setTimeout(() => {
        removeToast(id);
      }, duration + TOAST_EXIT_DELAY);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ showToast, removeToast, toasts }}>
      {children}
      <ToastList toasts={toasts} />
    </ToastContext.Provider>
  );
};
