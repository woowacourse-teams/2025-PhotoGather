import GiftICon from '@assets/images/gift.png';
import { useLocation, useNavigate } from 'react-router-dom';
import MessageLayout from '../../components/layout/messageLayout/MessageLayout';
import { COMPLETE } from '../../constants/messages';
import { ROUTES } from '../../constants/routes';

const DownloadCompletePage = () => {
  const navigate = useNavigate();
  const { spaceCode } = useLocation().state as { spaceCode: string };

  const handleButtonClick = () => {
    navigate(ROUTES.MANAGER.SPACE_HOME(spaceCode ?? ''));
  };

  return (
    <MessageLayout
      image={GiftICon}
      title={COMPLETE.DOWNLOAD.TITLE}
      description={COMPLETE.DOWNLOAD.DESCRIPTION}
      buttonText={COMPLETE.DOWNLOAD.BUTTON_TEXT}
      highlightWords={COMPLETE.DOWNLOAD.HIGHLIGHT_WORDS}
      onButtonClick={handleButtonClick}
    />
  );
};

export default DownloadCompletePage;
