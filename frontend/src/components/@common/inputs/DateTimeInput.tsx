import * as C from './Input.styles';

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
    <C.Wrapper>
      <C.InputField
        $isError={!!errorMessage}
        type={inputType}
        {...inputProps}
      />
      <C.ErrorMessage>{errorMessage ? errorMessage : ''}</C.ErrorMessage>
    </C.Wrapper>
  );
};

export default DateTimeInput;
