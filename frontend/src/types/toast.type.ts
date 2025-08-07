export type ToastType = 'info' | 'error';

export interface ToastBase {
  /** 토스트 텍스트 */
  text: string;
  /** 토스트 타입 */
  type?: ToastType;
  /** 토스트 지속시간 */
  duration?: number;
}

export interface Toast extends ToastBase {
  id: number;
}
