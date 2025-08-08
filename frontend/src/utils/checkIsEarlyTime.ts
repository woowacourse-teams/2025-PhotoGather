import { changeKSTDate } from './changeKSTDate';

export const checkIsEarlyDate = (openedAt: string) => {
  if (!openedAt) return false;

  const date = new Date();
  const openDate = changeKSTDate(new Date(openedAt)).kstDate;

  return date < openDate;
};
