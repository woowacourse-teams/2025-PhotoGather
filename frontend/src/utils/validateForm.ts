export const createSafeValidator = <T extends (value: string) => void>(
  validator: T,
) => {
  return (value: string) => {
    try {
      validator(value);
      return true;
    } catch (error) {
      return error instanceof Error ? error.message : '알 수 없는 오류';
    }
  };
};
