import * as S from './Input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  maxCount: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input = ({ errorMessage, maxCount, ...inputProps }: InputProps) => {
  return (
    <S.Wrapper>
      <S.InputField
        {...inputProps}
        id={inputProps.id}
        aria-label={inputProps['aria-label']}
        value={inputProps.value}
        $isError={!!errorMessage}
      />
      <S.InputFooterContainer>
        <S.ErrorMessage>{errorMessage ? errorMessage : ''}</S.ErrorMessage>
        <S.InputCount>
          {maxCount && `${inputProps.value.length} / ${maxCount}`}
        </S.InputCount>
      </S.InputFooterContainer>
    </S.Wrapper>
  );
};

export default Input;
