export const checkIsEarlyDate = (openedAt: string) => {
  if (!openedAt) return false;

  const date = new Date();
  const openDate = new Date(openedAt);

  return date < openDate;
};
