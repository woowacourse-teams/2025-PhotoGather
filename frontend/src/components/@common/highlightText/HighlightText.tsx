import type { Theme } from '@emotion/react';
import * as S from './HighlightText.styles';

interface HighlightTextProps {
  /** 전체 문장 */
  text: string;
  /** 강조할 부분 문자열 배열*/
  highlightTextArray: string[];
  /** 폰트 스타일 */
  fontStyle: keyof Theme['typography'];
  /** 강조할 부분 색상 */
  highlightColorStyle: keyof Theme['colors'];
  /** 일반 텍스트 색상 */
  textColorStyle?: keyof Theme['colors'];
  /** 텍스트 정렬 */
  textAlign?: S.TextAlign;
}

const HighlightText = ({
  text,
  highlightTextArray,
  fontStyle,
  textColorStyle,
  highlightColorStyle,
  textAlign,
}: HighlightTextProps) => {
  const splitStandard = new RegExp(`(${highlightTextArray.join('|')})`, 'g');
  const tokens = text.split(splitStandard);

  return (
    <S.Wrapper
      key={text}
      $fontStyle={fontStyle}
      $textAlign={textAlign ?? 'center'}
    >
      {tokens.map((token, index) =>
        highlightTextArray.includes(token) ? (
          <S.HighLight
            // biome-ignore lint/suspicious/noArrayIndexKey: index가 고유 키가 되어야 함
            key={index}
            $highlightColorStyle={highlightColorStyle}
          >
            {token}
          </S.HighLight>
        ) : (
          <S.Text key={token} $textColorStyle={textColorStyle ?? 'gray06'}>
            {token}
          </S.Text>
        ),
      )}
    </S.Wrapper>
  );
};

export default HighlightText;
