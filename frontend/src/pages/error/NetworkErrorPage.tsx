import wifiImage from '@assets/images/wifi.png';
import { useNavigate } from 'react-router-dom';
import MessageLayout from '../../components/layout/MessageLayout/MessageLayout';
import { ERROR } from '../../constants/messages';

const NetworkErrorPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(-1);
  };

  return (
    <MessageLayout
      image={wifiImage}
      title={ERROR.NETWORK.TITLE}
      description={ERROR.NETWORK.DESCRIPTION}
      buttonText={ERROR.NETWORK.BUTTON_TEXT}
      highlightWords={ERROR.NETWORK.HIGHLIGHT_WORDS}
      onButtonClick={handleButtonClick}
    />
  );
};

export default NetworkErrorPage;
