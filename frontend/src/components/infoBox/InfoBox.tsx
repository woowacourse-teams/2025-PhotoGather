import HighlightText from '../highlightText/HighlightText';
import * as S from './InfoBox.styles';

interface InfoBoxProps {
  /** 설명 문장 */
  description: string;
  /** 강조할 부분 문자열 */
  highlightText?: string;
}

const InfoBox = ({ description, highlightText }: InfoBoxProps) => {
  return (
    <S.Wrapper>
      <S.InfoIcon />
      {highlightText ? (
        <HighlightText
          text={description}
          highlightText={highlightText}
          fontStyle="bodyLarge"
        />
      ) : (
        <S.Description>{description}</S.Description>
      )}
    </S.Wrapper>
  );
};

export default InfoBox;
