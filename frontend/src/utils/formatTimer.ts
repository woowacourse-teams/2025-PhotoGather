import type { Timer } from '../types/timer.type';

export const formatTimer = (timer: Timer) => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return timer.days > 0
    ? `${timer.days}일`
    : `${pad(timer.hours)}:${pad(timer.minutes)}:${pad(timer.seconds)}`;
};
