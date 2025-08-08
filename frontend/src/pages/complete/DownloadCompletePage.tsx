import downloadImage from '@assets/images/download.png';
import { useNavigate } from 'react-router-dom';
import MessageLayout from '../../components/layout/messageLayout/MessageLayout';
import { COMPLETE } from '../../constants/messages';
import { ROUTES } from '../../constants/routes';
import useSpaceCodeFromPath from '../../hooks/useSpaceCodeFromPath';

const DownloadCompletePage = () => {
  const { spaceId } = useSpaceCodeFromPath();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(ROUTES.MANAGER.SPACE_HOME(spaceId ?? ''));
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
