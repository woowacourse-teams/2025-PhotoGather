import { CONSTRAINTS } from '../constants/constraints';
import { calculateValidLength } from '../utils/grapheme';

export const checkInputEmpty = (value: string) => {
  if (value.trim() === '' || value.length === 0) {
    throw new Error('필수 항목입니다.');
  }
};

export const checkMaxLength = (value: string, maxLength: number) => {
  if (calculateValidLength(value) > maxLength) {
    throw new Error(`${maxLength}자까지만 입력할 수 있습니다.`);
  }
};

export const checkNoWhitespaceOnly = (value: string) => {
  if (value.length > 0 && value.trim() === '') {
    throw new Error('공백만 입력할 수 없습니다.');
  }
};

export const checkEmailForm = (value: string) => {
  if (value.length !== 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new Error('올바른 이메일 형식을 입력해 주세요.');
  }
};

export const checkInstagramUsernameForm = (value: string) => {
  if (value.length !== 0 && !CONSTRAINTS.INSTAGRAM_USERNAME_REGEX.test(value)) {
    throw new Error('영어, 숫자, _, . 만 입력할 수 있습니다.');
  }
};

export const checkYoutubeUrlForm = (value: string) => {
  if (!value) return;

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;

  const isValid = youtubeRegex.test(value);
  if (!isValid) {
    throw new Error('유효한 유튜브 링크 형식이 아닙니다.');
  }
};
