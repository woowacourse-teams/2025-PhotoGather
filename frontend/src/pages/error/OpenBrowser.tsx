import donutImage from '@assets/images/loading.png';
import MessageLayout from '../../components/layout/messageLayout/MessageLayout';

const OpenBrowserPage = () => {
  return (
    <MessageLayout
      image={donutImage}
      title={'Forgather로 이동'}
      description={'하단 버튼을 눌러 이동해 주세요'}
      buttonText={'브라우저에서 열기'}
      highlightWords={['Forgather']}
      onButtonClick={() => {
        window.open(process.env.BASE_URL, '_blank');
      }}
    />
  );
};

export default OpenBrowserPage;
