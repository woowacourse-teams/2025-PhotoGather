import uploadImage from '@assets/images/upload.png';
import { useLocation, useNavigate } from 'react-router-dom';
import MessageLayout from '../../components/layout/messageLayout/MessageLayout';
import { COMPLETE } from '../../constants/messages';
import { ROUTES } from '../../constants/routes';

const UploadCompletePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const spaceCode = location.state?.spaceCode;

  const handleButtonClick = () => {
    navigate(ROUTES.GUEST.IMAGE_UPLOAD(spaceCode ?? ''));
  };

  return (
    <MessageLayout
      image={uploadImage}
      title={COMPLETE.UPLOAD.TITLE}
      description={COMPLETE.UPLOAD.DESCRIPTION}
      buttonText={COMPLETE.UPLOAD.BUTTON_TEXT}
      highlightWords={COMPLETE.UPLOAD.HIGHLIGHT_WORDS}
      onButtonClick={handleButtonClick}
    />
  );
};

export default UploadCompletePage;
