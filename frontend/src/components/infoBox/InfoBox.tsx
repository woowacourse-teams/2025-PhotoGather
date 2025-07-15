import HighlightText from '../highlightText/HighlightText';
import * as S from './InfoBox.styles';

interface InfoBoxProps {
  description: string;
  highlightText: string;
}

const InfoBox = ({ description, highlightText }: InfoBoxProps) => {
  return (
    <S.Wrapper>
      <S.InfoIcon />
      <HighlightText
        text={description}
        highlightText={highlightText}
        fontStyle="bodyLarge"
      />
    </S.Wrapper>
  );
};

export default InfoBox;
