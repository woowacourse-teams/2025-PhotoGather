import wifiImage from '@assets/images/wifi.png';
import { useNavigate } from 'react-router-dom';
import CompletePage from '../../components/layout/completePage/CompletePage';
import { ERROR } from '../../constants/messages';
import { ROUTES } from '../../constants/routes';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(ROUTES.MAIN);
  };

  return (
    <CompletePage
      image={wifiImage}
      title={ERROR.NETWORK.TITLE}
      description={ERROR.NETWORK.DESCRIPTION}
      buttonText={ERROR.NETWORK.BUTTON_TEXT}
      highlightWords={ERROR.NETWORK.HIGHLIGHT_WORDS}
      onButtonClick={handleButtonClick}
    />
  );
};

export default ErrorPage;
