import { useLocation } from 'react-router-dom';
import CompletePageLayout from '../../components/layout/completePageLayout/CompletePageLayout';
import useInAppRedirect from '../../hooks/@common/useInAppRedirect';

const InAppRedirectPage = () => {
  const { state } = useLocation();
  const { redirectToExternalBrowser } = useInAppRedirect();

  return (
    <CompletePageLayout
      message="실행 중인 브라우저로 이동해 주세요"
      buttonText="Forgather로 돌아가기"
      onButtonClick={() => {
        redirectToExternalBrowser(state.targetUrl);
      }}
    />
  );
};

export default InAppRedirectPage;
