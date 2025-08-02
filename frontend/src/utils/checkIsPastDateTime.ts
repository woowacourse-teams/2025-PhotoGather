export const checkIsPastDateTime = (date: string, time: string): boolean => {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);

  const input = new Date(year, month - 1, day, hour, minute);
  const now = Date.now();
  return input.getTime() < now;
};
