export type ToastType = 'info' | 'error';
export type ToastListPosition = 'top' | 'bottom';

export interface ToastBase {
  /** 토스트 텍스트 */
  text: string;
  /** 토스트 타입 */
  type?: ToastType;
  /** 토스트 지속시간 */
  duration?: number;
  /** 토스트 위치 */
  position?: ToastListPosition;
}

export interface Toast extends ToastBase {
  id: number;
}
