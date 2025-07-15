import { useState } from 'react';
import * as S from './Input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  maxCount?: number;
}

const Input = ({ errorMessage, maxCount, ...inputProps }: InputProps) => {
  const [_isComposition, setIsComposition] = useState(false);
  const handleCompositionStart = () => {
    setIsComposition(true);
  };
  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>,
  ) => {
    if (!inputProps.value || !maxCount) return;

    const currentValue = e.currentTarget.value;
    if (currentValue.length > maxCount) {
      e.currentTarget.value = currentValue.slice(0, maxCount);
    }
    setIsComposition(false);
  };
  const splicedValue = String(inputProps.value).slice(0, maxCount);
  return (
    <S.Wrapper>
      <S.InputField
        {...inputProps}
        id={inputProps.id}
        aria-label={inputProps['aria-label']}
        value={splicedValue}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      <S.InputFooterContainer>
        <S.ErrorMessage>{errorMessage ? errorMessage : ''}</S.ErrorMessage>
        <S.InputCount>
          {maxCount && `${splicedValue.length} / ${maxCount}`}
        </S.InputCount>
      </S.InputFooterContainer>
    </S.Wrapper>
  );
};

export default Input;
