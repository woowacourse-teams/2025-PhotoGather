import { createContext } from 'react';
import type { Toast, ToastBase } from '../types/toast.type';

interface ToastContextProps {
  showToast: (options: ToastBase) => void;
  removeToast: (id: number) => void;
  toasts: Toast[];
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined,
);
