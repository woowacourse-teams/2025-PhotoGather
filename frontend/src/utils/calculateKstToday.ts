import { padZero } from './dateTimeFormatters';

export const calculateKstToday = () => {
  const kstDate = new Date(Date.now() + 9 * 60 * 60 * 1000);

  const kstDateString = `${kstDate.getUTCFullYear()}-${padZero(kstDate.getUTCMonth() + 1)}-${padZero(kstDate.getUTCDate())}`;
  const kstTimeString = `${padZero(kstDate.getUTCHours())}:${padZero(kstDate.getUTCMinutes())}`;

  return {
    kstDate: kstDate,
    kstDateString,
    kstTimeString,
  };
};
