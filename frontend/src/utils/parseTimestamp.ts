export const parseTimestamp = (timestamp: string | Date) => {
  if (timestamp instanceof Date) {
    return {
      year: timestamp.getFullYear(),
      month: timestamp.getMonth() + 1,
      day: timestamp.getDate(),
      hour: timestamp.getHours(),
      minute: timestamp.getMinutes(),
    };
  }

  const [date, time] = timestamp.split('T');
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute, _seconds] = time.split(':').map(Number);

  return {
    year,
    month,
    day,
    hour,
    minute,
  };
};
