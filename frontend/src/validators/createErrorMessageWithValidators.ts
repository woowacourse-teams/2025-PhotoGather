interface CreateErrorMessageWithValidatorsProps<T> {
  value: T;
  validators: ((value: T) => void)[];
}

interface NoErrorResult {
  isError: false;
  errorMessage: '';
}
interface ErrorResult {
  isError: true;
  errorMessage: string;
}
type CreateErrorMessageWithValidatorsResult = NoErrorResult | ErrorResult;

export const createErrorMessageWithValidators = <T>({
  value,
  validators,
}: CreateErrorMessageWithValidatorsProps<T>): CreateErrorMessageWithValidatorsResult => {
  try {
    for (const validator of validators) validator(value);
    return { isError: false, errorMessage: '' };
  } catch (error) {
    if (error instanceof Error) {
      return { isError: true, errorMessage: error.message };
    }
    return { isError: true, errorMessage: '알 수 없는 오류가 발생했어요' };
  }
};
