import { calculateKSTDate } from './calculateKSTDate';

export const checkIsEarlyDate = (openedAt: string) => {
  if (!openedAt) return false;

  const { kstDate } = calculateKSTDate();
  const openDate = new Date(openedAt);

  return kstDate < openDate;
};
