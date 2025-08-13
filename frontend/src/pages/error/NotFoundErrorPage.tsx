import NotFoundImage from '@assets/images/not-found.png';
import { useNavigate } from 'react-router-dom';
import MessageLayout from '../../components/layout/messageLayout/MessageLayout';
import { ERROR } from '../../constants/messages';
import { ROUTES } from '../../constants/routes';

const NotFoundErrorPage = () => {
  const navigate = useNavigate();

  return (
    <MessageLayout
      image={NotFoundImage}
      title={ERROR.NOT_FOUND.TITLE}
      highlightWords={ERROR.NOT_FOUND.HIGHLIGHT_WORDS}
      description={ERROR.NOT_FOUND.DESCRIPTION}
      buttonText={ERROR.NOT_FOUND.BUTTON_TEXT}
      onButtonClick={() => {
        navigate(ROUTES.MAIN);
      }}
    />
  );
};

export default NotFoundErrorPage;
