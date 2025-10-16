import Button from '../../../components/@common/buttons/button/Button';
import * as S from './CompletePageLayout.styles';

interface CompletePageProps {
  message: string | React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
}

const CompletePageLayout = ({
  message,
  buttonText,
  onButtonClick,
}: CompletePageProps) => {
  return (
    <S.Wrapper>
      <S.Message>{message}</S.Message>
      <Button text={buttonText} onClick={onButtonClick} />
    </S.Wrapper>
  );
};

export default CompletePageLayout;
