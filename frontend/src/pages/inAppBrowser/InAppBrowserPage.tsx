import { useLocation } from 'react-router-dom';
import { PlanetImg as planetImage } from '../../@assets/images';
import MessageLayout from '../../components/layout/messageLayout/MessageLayout';
import useInAppRedirect from '../../hooks/@common/useInAppRedirect';

const InAppBrowserPage = () => {
  const { targetUrl } = useLocation().state;
  const { redirectToExternalBrowser } = useInAppRedirect();
  return (
    <MessageLayout
      image={planetImage}
      title="외부 브라우저에서 실행 중입니다."
      description="사파리, 크롬 등 실행 중인 브라우저에서 열어주세요."
      highlightWords={['외부 브라우저']}
      buttonText="Forgather로 이동하기"
      onButtonClick={() => {
        redirectToExternalBrowser(targetUrl);
      }}
    />
  );
};

export default InAppBrowserPage;
