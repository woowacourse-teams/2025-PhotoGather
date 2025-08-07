export const calculateKSTDate = () => {
  const utcNow = new Date(Date.now());
  const kstDate = new Date(utcNow.getTime() + 9 * 60 * 60 * 1000);

  const padZero = (num: number) => String(num).padStart(2, '0');

  const kstDateString = `${kstDate.getUTCFullYear()}-${padZero(kstDate.getUTCMonth() + 1)}-${padZero(kstDate.getUTCDate())}`;
  const kstTimeString = `${padZero(kstDate.getUTCHours())}:${padZero(kstDate.getUTCMinutes())}`;

  return {
    kstDate: kstDate,
    kstDateString,
    kstTimeString,
  };
};
