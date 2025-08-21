import type { Timer } from '../types/timer.type';
import { formatTimerToString } from './dateTimeFormatters';

export const formatTimer = (timer: Timer) => {
  if (timer.days > 0) return `${timer.days}일`;
  return formatTimerToString(timer);
};
