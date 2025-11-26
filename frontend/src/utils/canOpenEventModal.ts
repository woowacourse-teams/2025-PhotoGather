import { EVENT_MODAL_HIDE_KEY } from '../constants/constants';

interface CanOpenEventModalProps {
  eventModalKey?: string;
  endDate?: string;
}

export const canOpenEventModal = ({
  eventModalKey,
  endDate,
}: CanOpenEventModalProps) => {
  const eventEndDate = new Date(endDate ?? '2025-11-20T00:00:00+09:00');
  if (Date.now() >= eventEndDate.getTime() && endDate) {
    return false;
  }

  if (typeof window === 'undefined') return true;
  const key = eventModalKey ?? EVENT_MODAL_HIDE_KEY;

  try {
    const hideUntil = window.localStorage.getItem(key);
    if (!hideUntil) return true;
    return Number(hideUntil) < Date.now();
  } catch (error) {
    console.warn('localStorage 접근 실패:', error);
    return true;
  }
};
