import Button from '../../../components/@common/buttons/button/Button';
import * as S from './CompletePageLayout.styles';

interface CompletePageProps {
  message: string | React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
  icon?: React.ReactNode;
  isAnimationRequired?: boolean;
}

const CompletePageLayout = ({
  message,
  buttonText,
  onButtonClick,
  icon,
  isAnimationRequired = true,
}: CompletePageProps) => {
  return (
    <S.Wrapper>
      <S.ContentContainer>
        <S.InfoContainer>
          {icon && <S.IconContainer>{icon}</S.IconContainer>}
          <S.Message $isAnimationRequired={isAnimationRequired}>
            {message}
          </S.Message>
        </S.InfoContainer>
      </S.ContentContainer>
      <Button text={buttonText} onClick={onButtonClick} />
    </S.Wrapper>
  );
};

export default CompletePageLayout;
