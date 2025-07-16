import type { Theme } from '@emotion/react';
import * as S from './HighlightText.styles';

interface HighlightTextProps {
  /** 전체 문장 */
  text: string;
  /** 강조할 부분 문자열 */
  highlightText: string;
  /** 폰트 스타일 키 */
  fontStyle: keyof Theme['typography'];
}

const HighlightText = ({
  text,
  highlightText,
  fontStyle,
}: HighlightTextProps) => {
  const normalTextArray = text.split(highlightText);

  return (
    <S.Wrapper key={text} $fontStyle={fontStyle}>
      {normalTextArray.map((text, index) => (
        <span key={text + String(index)}>
          <S.Text>{text}</S.Text>
          {index !== normalTextArray.length - 1 && (
            <S.HighLight>{highlightText}</S.HighLight>
          )}
        </span>
      ))}
    </S.Wrapper>
  );
};

export default HighlightText;
