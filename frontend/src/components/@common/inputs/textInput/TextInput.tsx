import * as C from '../input.common.styles';
import * as S from './TextInput.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  maxCount?: number;
  validLength?: number;
  isRequired?: boolean;
}

const TextInput = ({
  label,
  errorMessage,
  maxCount,
  validLength,
  isRequired = false,
  ...inputProps
}: InputProps) => {
  return (
    <C.Wrapper>
      <C.Label htmlFor={inputProps.id}>
        {label} {isRequired && '*'}
      </C.Label>
      <S.InputField
        {...inputProps}
        id={inputProps.id}
        aria-label={inputProps['aria-label']}
        $isError={!!errorMessage}
      />
      <C.InputFooterContainer>
        <C.ErrorMessage>{errorMessage ? errorMessage : ' '}</C.ErrorMessage>
        <C.InputCount>
          {maxCount && `${validLength} / ${maxCount}`}
        </C.InputCount>
      </C.InputFooterContainer>
    </C.Wrapper>
  );
};

export default TextInput;
