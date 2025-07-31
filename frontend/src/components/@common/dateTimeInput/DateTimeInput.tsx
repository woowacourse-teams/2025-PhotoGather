import * as S from './DateTimeInput.styles';

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 입력 타입: 날짜, 시간 선택 */
  inputType: 'date' | 'time';
  /** 에러 메시지 */
  errorMessage?: string;
}

const DateTimeInput = ({
  inputType,
  errorMessage,
  ...inputProps
}: DateInputProps) => {
  return (
    <S.Wrapper>
      <S.InputField
        $isError={!!errorMessage}
        type={inputType}
        {...inputProps}
      />
      <S.ErrorMessage>{errorMessage ? errorMessage : ''}</S.ErrorMessage>
    </S.Wrapper>
  );
};

export default DateTimeInput;
