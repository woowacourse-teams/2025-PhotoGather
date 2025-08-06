import { createContext, useState } from 'react';
import { ToastList } from '../components/@common/notification/toastList/ToastList';
import type { Toast, ToastBase } from '../types/toast.type';

interface ToastContextProps {
  showToast: (options: ToastBase) => void;
  removeToast: (id: number) => void;
  toasts: Toast[];
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined,
);

let toastId = 0;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = ({ text, type = 'error', duration = 5000 }: ToastBase) => {
    const id = toastId++;
    setToasts((prev) => [...prev, { id, text, type, duration }]);

    setTimeout(() => {
      removeToast(id);
    }, duration + 500);
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast, toasts }}>
      {children}
      <ToastList toasts={toasts} />
    </ToastContext.Provider>
  );
};
