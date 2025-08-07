import downloadImage from '@assets/images/download.png';
import { useNavigate } from 'react-router-dom';
import MessageLayout from '../../components/layout/test2/MessageLayout';
import { COMPLETE } from '../../constants/messages';
import { ROUTES } from '../../constants/routes';

const DownloadCompletePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // TODO: 실제 매니저 스페이스 홈 경로로 변경 필요
    navigate(ROUTES.MANAGER.SPACE_HOME);
  };

  return (
    <MessageLayout
      image={downloadImage}
      title={COMPLETE.DOWNLOAD.TITLE}
      description={COMPLETE.DOWNLOAD.DESCRIPTION}
      buttonText={COMPLETE.DOWNLOAD.BUTTON_TEXT}
      highlightWords={COMPLETE.DOWNLOAD.HIGHLIGHT_WORDS}
      onButtonClick={handleButtonClick}
    />
  );
};

export default DownloadCompletePage;
