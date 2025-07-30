import useInputLength from '../../../hooks/@common/useInputLength';
import * as S from './Input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  maxCount: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  updateValue: (value: string) => void;
}

const Input = ({
  errorMessage,
  maxCount,
  updateValue,
  ...inputProps
}: InputProps) => {
  const { handleCompositionEnd, handleCompositionStart, handleChange } =
    useInputLength({
      maxCount,
      value: String(inputProps.value),
      updateValue: updateValue,
    });

  return (
    <S.Wrapper>
      <S.InputField
        {...inputProps}
        id={inputProps.id}
        aria-label={inputProps['aria-label']}
        value={inputProps.value}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onChange={handleChange}
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
