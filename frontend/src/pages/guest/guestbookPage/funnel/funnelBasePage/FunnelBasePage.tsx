import Button from '../../../../../components/@common/buttons/button/Button';
import type { FunnelBaseElementProps } from '../../../../../types/domain/guestbook.type';
import * as S from './FunnelBasePage.styles';

const FunnelBasePage = ({
  prompt,
  receiver,
  element,
  isOptional,
  onNextButtonClick: handleNextButtonClick,
  nextButtonDisabled,
  buttonText = '다음으로',
}: FunnelBaseElementProps) => {
  return (
    <S.Wrapper>
      <S.ContentContainer>
        <S.TextContainer>
          <S.Receiver>
            {isOptional && <S.Optional>(선택) </S.Optional>}
            {receiver}에게
          </S.Receiver>
          <S.Prompt>{prompt}</S.Prompt>
        </S.TextContainer>
        {element}
      </S.ContentContainer>
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
