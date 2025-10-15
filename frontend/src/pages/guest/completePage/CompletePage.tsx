import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CompletePageLayout from '../../../components/layout/completePageLayout/CompletePageLayout';
import { createGuestbookCompleteMessage } from '../../../constants/messages';
import { ROUTES } from '../../../constants/routes';

const CompletePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state || !state.guestNickName || !state.receiver) {
      // TODO : 랜딩 페이지 구현 후 대체 필요
      navigate(ROUTES.GUEST.MAIN);
    }
  }, [state, navigate]);

  if (!state?.receiver || !state?.guestNickName) return null;

  return (
    <CompletePageLayout
      message={createGuestbookCompleteMessage(
        state.receiver,
        state.guestNickName,
      )}
      buttonText="스페이스로 돌아가기"
      onButtonClick={() => {
        navigate(ROUTES.GUEST.MAIN);
      }}
    />
  );
};

export default CompletePage;
