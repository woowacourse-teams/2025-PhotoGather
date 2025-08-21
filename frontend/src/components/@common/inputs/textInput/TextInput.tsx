import * as C from '../Input.styles';
import * as S from './TextInput.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  maxCount: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  validLength: number;
}

const TextInput = ({
  errorMessage,
  maxCount,
  validLength,
  ...inputProps
}: InputProps) => {
  return (
    <C.Wrapper>
      <C.InputField
        {...inputProps}
        id={inputProps.id}
        aria-label={inputProps['aria-label']}
        value={inputProps.value}
        $isError={!!errorMessage}
      />
      <S.InputFooterContainer>
        <C.ErrorMessage>{errorMessage ? errorMessage : ''}</C.ErrorMessage>
        <S.InputCount>
          {maxCount && `${validLength} / ${maxCount}`}
        </S.InputCount>
      </S.InputFooterContainer>
    </C.Wrapper>
  );
};

export default TextInput;
