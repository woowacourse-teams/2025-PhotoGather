import donutImage from '@assets/images/loading.png';
import { useLocation } from 'react-router-dom';
import MessageLayout from '../../components/layout/messageLayout/MessageLayout';

const OpenBrowserPage = () => {
  const location = useLocation();
  const redirectPath = location.state?.redirectPath;

  return (
    <MessageLayout
      image={donutImage}
      title={'Forgather로 이동'}
      description={'하단 버튼을 눌러 이동해 주세요'}
      buttonText={'브라우저에서 열기'}
      highlightWords={['Forgather']}
      onButtonClick={() => {
        window.open(process.env.DOMAIN + redirectPath, '_blank');
      }}
    />
  );
};

export default OpenBrowserPage;
