export type ToastType = 'info' | 'error';

export type ToastPositionType = 'top' | 'bottom';

export interface ToastBase {
  text: string;
  type?: ToastType;
  duration?: number;
}

export interface Toast extends ToastBase {
  id: number;
}
