export const parseIsoStringFromDateTime = (date: string, time: string) => {
  const local = new Date(`${date}T${time}:00`);
  return new Date(local.getTime()).toISOString();
};
