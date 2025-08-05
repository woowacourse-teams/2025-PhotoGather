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
  const formattedDate = `${parsedDate.getFullYear()}년 ${parsedDate.getMonth() + 1}월 ${parsedDate.getDate()}일`;
  const formattedTime =
    parsedDate.getHours() > 12
      ? `오후 ${parsedDate.getHours() - 12}시 ${parsedDate.getMinutes()}분`
      : `오전 ${parsedDate.getHours()}시 ${parsedDate.getMinutes()}분`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
};
