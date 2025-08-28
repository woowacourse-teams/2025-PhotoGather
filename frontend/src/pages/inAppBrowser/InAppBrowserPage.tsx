import planetImage from '@assets/images/planet.png';
import MessageLayout from '../../components/layout/messageLayout/MessageLayout';

const InAppBrowserPage = () => {
  return (
    <MessageLayout
      image={planetImage}
      title="외부 브라우저에서 실행 중입니다."
      description="사파리, 크롬 등 실행 중인 브라우저에서 홈페이지를 열어주세요."
      highlightWords={['외부 브라우저']}
    />
  );
};

export default InAppBrowserPage;
