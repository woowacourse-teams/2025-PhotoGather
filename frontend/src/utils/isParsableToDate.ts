export const isParsableToDate = (value: string): boolean => {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};
