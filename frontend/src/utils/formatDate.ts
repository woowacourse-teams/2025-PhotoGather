import { DEBUG_MESSAGES } from '../constants/debugMessages';
import { isParsableToDate } from './isParsableToDate';

const padTwoDigits = (num: number) => String(num).padStart(2, '0');

const formatType = {
  long: (parsedDate: Date) => {
    const year = parsedDate.getFullYear();
    const month = padTwoDigits(parsedDate.getMonth() + 1);
    const day = padTwoDigits(parsedDate.getDate());

    const hour = parsedDate.getHours();
    const minute = padTwoDigits(parsedDate.getMinutes());
    const hour12 = padTwoDigits(hour % 12 === 0 ? 12 : hour % 12);

    return {
      date: `${year}년 ${month}월 ${day}일`,
      time: `${hour >= 12 ? '오후' : '오전'} ${hour12}시 ${minute}분`,
    };
  },
  short: (parsedDate: Date) => {
    const year = parsedDate.getFullYear();
    const month = padTwoDigits(parsedDate.getMonth() + 1);
    const day = padTwoDigits(parsedDate.getDate());

    const hour = padTwoDigits(parsedDate.getHours());
    const minute = padTwoDigits(parsedDate.getMinutes());

    return {
      date: `${year}.${month}.${day}`,
      time: `${hour}:${minute}`,
    };
  },
};

type FormatType = 'long' | 'short';

export const formatDate = (rawDate: string, type: FormatType = 'long') => {
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
  const formattedDateTime = formatType[type](parsedDate);

  return formattedDateTime;
};
