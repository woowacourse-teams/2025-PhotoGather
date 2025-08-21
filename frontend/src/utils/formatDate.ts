import { DEBUG_MESSAGES } from '../constants/debugMessages';
import { isParsableToDate } from './isParsableToDate';

export const formatDate = (rawDate: string) => {
  if (!isParsableToDate(rawDate)) {
    console.warn(
      `${DEBUG_MESSAGES.CAN_NOT_PARSE_TO_DATE} formatDate: "${rawDate}"`,
    );
    return {
      date: '',
      time: '',
    };
  }

  const parsedDate = new Date(rawDate);
  const parsedMonth = padTwoDigits(parsedDate.getMonth() + 1);
  const parsedDay = padTwoDigits(parsedDate.getDate());

  const hour = parsedDate.getHours();
  const parsedMinute = padTwoDigits(parsedDate.getMinutes());
  const parsedHour = padTwoDigits(hour % 12 === 0 ? 12 : hour % 12);
  const formattedDate = `${parsedDate.getFullYear()}년 ${parsedMonth}월 ${parsedDay}일`;
  const formattedTime =
    parsedDate.getHours() > 12
      ? `오후 ${parsedHour}시 ${parsedMinute}분`
      : `오전 ${parsedHour}시 ${parsedMinute}분`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

const padTwoDigits = (num: number) => String(num).padStart(2, '0');
