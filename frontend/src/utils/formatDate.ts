import { DEBUG_MESSAGES } from '../constants/debugMessages';
import { isParsableToDate } from './isParsableToDate';

const formatType = {
  long: (parsedDate: Date) => ({
    date: `${parsedDate.getFullYear()}년 ${parsedDate.getMonth() + 1}월 ${parsedDate.getDate()}일`,
    time: `${parsedDate.getHours() > 12 ? '오후' : '오전'} ${parsedDate.getHours() - 12}시 ${parsedDate.getMinutes()}분`,
  }),
  short: (parsedDate: Date) => ({
    date: `${parsedDate.getFullYear()}.${parsedDate.getMonth() + 1}.${parsedDate.getDate()}`,
    time: `${parsedDate.getHours()}:${parsedDate.getMinutes()}`,
  }),
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
