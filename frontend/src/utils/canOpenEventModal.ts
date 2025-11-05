import { EVENT_MODAL_HIDE_KEY } from '../constants/constants';

export const canOpenEventModal = () => {
  const eventEndDate = new Date('2025-11-20T00:00:00+09:00');
  if (Date.now() >= eventEndDate.getTime()) {
    return false;
  }
  const hideUntil = localStorage.getItem(EVENT_MODAL_HIDE_KEY);
  if (!hideUntil) return true;
  return Number(hideUntil) < Date.now();
};
