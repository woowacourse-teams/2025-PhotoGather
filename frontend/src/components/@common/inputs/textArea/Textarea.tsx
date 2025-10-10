import type React from 'react';
import type { CSSProperties } from 'react';
import * as S from './Textarea.styles';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
  maxCount: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  validLength: number;
  customStyle?: CSSProperties;
}

const Textarea = ({
  errorMessage,
  maxCount,
  validLength,
  customStyle,
  ...textareaProps
}: TextareaProps) => {
  return (
    <S.Wrapper>
      <S.TextareaField
        {...textareaProps}
        id={textareaProps.id}
        aria-label={textareaProps['aria-label']}
        value={textareaProps.value}
        $isError={!!errorMessage}
        style={customStyle}
      />
      <S.InputFooterContainer>
        <S.ErrorMessage>{errorMessage ? errorMessage : ''}</S.ErrorMessage>
        <S.InputCount>
          {maxCount && `${validLength} / ${maxCount}`}
        </S.InputCount>
      </S.InputFooterContainer>
    </S.Wrapper>
  );
};

export default Textarea;
