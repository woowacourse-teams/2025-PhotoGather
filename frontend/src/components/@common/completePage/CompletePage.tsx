import { COMPLETE_PAGE_VARIANTS } from '../../../constants/messages';
import type { CompletePageVariant } from '../../../types/completePage.types';
import Button from '../buttons/button/Button';
import HighlightText from '../highlightText/HighlightText';
import * as S from './CompletePage.styles';

interface CompletePageProps {
  /** 완료 페이지 타입 */
  variant: CompletePageVariant;
}

const CompletePage = ({ variant }: CompletePageProps) => {
  const mappedType = COMPLETE_PAGE_VARIANTS[variant];

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.Icon src={mappedType.IMAGE} alt={mappedType.TITLE} />
        <S.TextContainer>
          <HighlightText
            text={mappedType.TITLE}
            fontStyle="header02"
            highlightTextArray={[mappedType.HIGHLIGHT_WORDS]}
            highlightColorStyle="primary"
          />
          <S.Description>{mappedType.DESCRIPTION}</S.Description>
        </S.TextContainer>
      </S.ContentWrapper>

      <S.BottomContainer>
        <Button text={mappedType.BUTTON_TEXT} onClick={() => console.log(1)} />
      </S.BottomContainer>
    </S.Wrapper>
  );
};

export default CompletePage;
