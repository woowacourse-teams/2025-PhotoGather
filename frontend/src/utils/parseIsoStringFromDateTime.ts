export const parseIsoStringFromDateTime = (date: string, time: string) => {
  const local = new Date(`${date}T${time}:00+09:00`);
  return local.toISOString();
};
