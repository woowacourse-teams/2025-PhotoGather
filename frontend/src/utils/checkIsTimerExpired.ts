import type { Timer } from '../types/timer.type';

export const checkIsTimerExpired = (timer: Timer): boolean => {
  return (
    timer.days === 0 &&
    timer.hours === 0 &&
    timer.minutes === 0 &&
    timer.seconds === 0
  );
};
