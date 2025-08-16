export const checkIsPastDateTime = (date: string, time: string) => {
  const kstDateString = `${date}T${time}:00+09:00`;
  const input = new Date(kstDateString);

  const now = new Date();

  input.setSeconds(0, 0);
  now.setSeconds(0, 0);

  return input.getTime() < now.getTime();
};
