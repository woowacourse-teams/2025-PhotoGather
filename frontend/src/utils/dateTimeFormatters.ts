import type { Timer } from '../types/timer.type';

export const padZero = (num: number) => String(num).padStart(2, '0');

export const formatTimerToString = (timer: Timer): string => {
  return `${padZero(timer.hours)}:${padZero(timer.minutes)}:${padZero(timer.seconds)}`;
};

export const formatRemainingHours = (hours: number): string => {
  const totalSeconds = hours * 3600;
  const hour = Math.floor(totalSeconds / 3600);
  const minute = Math.floor((totalSeconds % 3600) / 60);
  const second = Math.floor(totalSeconds % 60);

  return `${padZero(hour)}:${padZero(minute)}:${padZero(second)} 남음`;
};

export const formatExpiredDate = (dateString?: string): string => {
  if (!dateString) return '만료';

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());

  return `만료일 | ${year}/${month}/${day}`;
};

export const calculateTimeDifference = (
  targetDate: Date,
  currentDate: Date = new Date(),
): Timer => {
  const timeDifference = targetDate.getTime() - currentDate.getTime();

  if (timeDifference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(timeDifference / 1000);
  const totalHours = Math.floor(totalSeconds / 3600);
  const totalDays = Math.floor(totalHours / 24);
  const hoursLeft = totalHours % 24;
  const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
  const secondsLeft = totalSeconds % 60;

  return {
    days: totalDays,
    hours: hoursLeft,
    minutes: minutesLeft,
    seconds: secondsLeft,
  };
};

export const formatTimeUntilOpen = (openedAtString: string): string => {
  const timer = calculateTimeDifference(new Date(openedAtString));

  if (
    timer.days === 0 &&
    timer.hours === 0 &&
    timer.minutes === 0 &&
    timer.seconds === 0
  ) {
    return '곧 시작';
  }

  if (timer.days > 0) {
    return `열리기까지 ${timer.days}일`;
  }

  return `열리기까지 ${formatTimerToString(timer)}`;
};
