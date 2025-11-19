import { EVENT_MODAL_HIDE_KEY } from '../constants/constants';

export const canOpenEventModal = () => {
  const eventEndDate = new Date('2025-11-20T00:00:00+09:00');
  if (Date.now() >= eventEndDate.getTime()) {
    return false;
  }

  if (typeof window === 'undefined') return true;

  try {
    const hideUntil = window.localStorage.getItem(EVENT_MODAL_HIDE_KEY);
    if (!hideUntil) return true;
    return Number(hideUntil) < Date.now();
  } catch (error) {
    console.warn('localStorage 접근 실패:', error);
    return true;
  }
};
