import { useLocation, useNavigate } from 'react-router-dom';
import CompletePageLayout from '../../../components/layout/completeLayout/CompleteLayout';
import { createGuestbookCompleteMessage } from '../../../constants/messages';
import { ROUTES } from '../../../constants/routes';

const CompletePage = () => {
  const { receiver, guestNickName } = useLocation().state;
  const navigate = useNavigate();

  return (
    <CompletePageLayout
      message={createGuestbookCompleteMessage(receiver, guestNickName)}
      buttonText="스페이스로 돌아가기"
      onButtonClick={() => {
        navigate(ROUTES.GUEST.MAIN);
      }}
    />
  );
};

export default CompletePage;
