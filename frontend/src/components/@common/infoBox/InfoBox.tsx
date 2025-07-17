import HighlightText from '../highlightText/HighlightText';
import * as S from './InfoBox.styles';

interface InfoBoxProps {
  /** 설명 문장 */
  description: string;
  /** 강조할 부분 문자열 */
  highlightTextArray?: string[];
}

const InfoBox = ({ description, highlightTextArray }: InfoBoxProps) => {
  return (
    <S.Wrapper>
      <S.InfoIcon />
      {highlightTextArray && highlightTextArray.length > 0 ? (
        <HighlightText
          text={description}
          fontStyle="bodyLarge"
          highlightTextArray={[...highlightTextArray]}
          highlightColorStyle="primary"
        />
      ) : (
        <S.Description>{description}</S.Description>
      )}
    </S.Wrapper>
  );
};

export default InfoBox;
