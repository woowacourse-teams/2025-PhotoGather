import Button from '../../../../components/@common/buttons/button/Button';
import HighlightText from '../../../../components/@common/highlightText/HighlightText';
import type { FunnelBaseElementProps } from '../../../../types/funnel.type';
import * as S from './FunnelElementBase.styles';

const FunnelBasePage = ({
  title,
  description,
  element,
  handleNextButtonClick,
  nextButtonDisabled,
}: FunnelBaseElementProps) => {
  return (
    <S.Wrapper>
      <S.TopContainer>
        <S.InfoContainer>
          <HighlightText
            text={title.text}
            highlightTextArray={title.highlightTextArray}
            fontStyle="header02"
            highlightColorStyle="primary"
            textAlign="left"
          />
          <S.Info>{description}</S.Info>
        </S.InfoContainer>
        {element}
      </S.TopContainer>
      <Button
        onClick={handleNextButtonClick}
        text="다음으로"
        disabled={nextButtonDisabled}
      />
    </S.Wrapper>
  );
};

export default FunnelBasePage;
