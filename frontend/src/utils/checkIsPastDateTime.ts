export const checkIsPastDateTime = (date: string, time: string): boolean => {
  const kstDateString = `${date}T${time}:00+09:00`;
  const input = new Date(kstDateString);

  const now = Date.now();
  return input.getTime() < now;
};
