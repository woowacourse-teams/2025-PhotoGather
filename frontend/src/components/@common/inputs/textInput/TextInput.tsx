import * as C from '../input.common.styles';
import * as S from './TextInput.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  maxCount: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  validLength: number;
}

const TextInput = ({
  label,
  errorMessage,
  maxCount,
  validLength,
  ...inputProps
}: InputProps) => {
  return (
    <C.Wrapper>
      <C.Label htmlFor={inputProps.id}>{label} *</C.Label>
      <S.InputField
        {...inputProps}
        id={inputProps.id}
        aria-label={inputProps['aria-label']}
        value={inputProps.value}
        $isError={!!errorMessage}
      />
      <C.InputFooterContainer>
        <C.ErrorMessage>{errorMessage ? errorMessage : ''}</C.ErrorMessage>
        <C.InputCount>
          {maxCount && `${validLength} / ${maxCount}`}
        </C.InputCount>
      </C.InputFooterContainer>
    </C.Wrapper>
  );
};

export default TextInput;
