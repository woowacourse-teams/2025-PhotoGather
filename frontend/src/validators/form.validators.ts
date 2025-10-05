export const checkInputEmpty = (value: string) => {
  if (value.length === 0) {
    throw new Error('필수 항목입니다.');
  }
};

export const checkMaxLength = (value: string, maxLength: number) => {
  if (value.length > maxLength) {
    throw new Error(`${maxLength}자까지만 입력할 수 있습니다.`);
  }
};

export const checkEmailForm = (value: string) => {
  if (value.length !== 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new Error('올바른 이메일 형식을 입력해 주세요.');
  }
};
