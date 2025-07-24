import uploadImage from '@assets/images/upload.png';
import { useNavigate } from 'react-router-dom';
import CompletePage from '../../components/layout/completePage/CompletePage';
import { COMPLETE } from '../../constants/messages';
import { ROUTES } from '../../constants/routes';

const UploadCompletePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // TODO: 실제 업로드 페이지 경로로 변경 필요
    navigate('/guest/image-upload');
    navigate(ROUTES.GUEST.IMAGE_UPLOAD);
  };

  return (
    <CompletePage
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
