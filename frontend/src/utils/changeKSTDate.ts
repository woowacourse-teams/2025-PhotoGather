export const changeKSTDate = (utcDate: Date) => {
  const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

  const padZero = (num: number) => String(num).padStart(2, '0');

  const kstDateString = `${kstDate.getUTCFullYear()}-${padZero(kstDate.getUTCMonth() + 1)}-${padZero(kstDate.getUTCDate())}`;
  const kstTimeString = `${padZero(kstDate.getUTCHours())}:${padZero(kstDate.getUTCMinutes())}`;

  return {
    kstDate: kstDate,
    kstDateString,
    kstTimeString,
  };
};
