import Button from '../../@common/buttons/button/Button';
import * as S from './CompleteLayout.styles';

interface CompletePageProps {
  message: string;
  buttonText: string;
  onButtonClick: () => void;
}

const CompletePageLayout = ({
  message,
  buttonText,
  onButtonClick,
}: CompletePageProps) => {
  // TODO : 붕 뜨는 애니메이션
  // TODO : confetti 애니메이션
  return (
    <S.Wrapper>
      <S.Message>{message}</S.Message>
      <Button text={buttonText} onClick={onButtonClick} />
    </S.Wrapper>
  );
};

export default CompletePageLayout;
