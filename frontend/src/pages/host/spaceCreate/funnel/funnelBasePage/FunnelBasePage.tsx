import Button from '../../../../../components/@common/buttons/button/Button';
import type { FunnelBaseElementProps } from '../../../../../types/funnel.type';
import * as S from './FunnelBasePage.styles';

const FunnelBasePage = ({
  title,
  description,
  element,
  onNextButtonClick: handleNextButtonClick,
  nextButtonDisabled,
  buttonText = '다음으로',
}: FunnelBaseElementProps) => {
  return (
    <S.Wrapper>
      <S.TopContainer>
        <S.InfoContainer>
          <S.Title>{title}</S.Title>
          <S.Info>{description}</S.Info>
        </S.InfoContainer>
        {element}
      </S.TopContainer>
      <Button
        variant="primary"
        onClick={handleNextButtonClick}
        text={buttonText}
        disabled={nextButtonDisabled}
      />
    </S.Wrapper>
  );
};

export default FunnelBasePage;
