import type { Theme } from '@emotion/react';
import * as S from './HighlightText.styles';

interface HighlightTextProps {
  text: string;
  highlightText: string;
  fontStyle: keyof Theme['typography'];
}

const HighlightText = ({
  text,
  highlightText,
  fontStyle,
}: HighlightTextProps) => {
  const normalTextArray = text.split(highlightText);

  return (
    <>
      {normalTextArray.map((text, index) => (
        <S.Wrapper key={text} $fontStyle={fontStyle}>
          <S.Text>{text}</S.Text>
          {index !== normalTextArray.length - 1 && (
            <S.HighLight>{highlightText}</S.HighLight>
          )}
        </S.Wrapper>
      ))}
    </>
  );
};

export default HighlightText;
