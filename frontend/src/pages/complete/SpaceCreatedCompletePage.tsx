import spaceCreateImage from '@assets/images/space_create.png';
import { useNavigate } from 'react-router-dom';
import CompletePage from '../../components/layout/completePage/CompletePage';
import { COMPLETE } from '../../constants/messages';
import { ROUTES } from '../../constants/routes';

const SpaceCreatedCompletePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // TODO: 실제 매니저 스페이스 홈 경로로 변경 필요
    navigate('/manager/space-home');
    navigate(ROUTES.MANAGER.SPACE_HOME);
  };

  return (
    <CompletePage
      image={spaceCreateImage}
      title={COMPLETE.SPACE_CREATED.TITLE}
      description={COMPLETE.SPACE_CREATED.DESCRIPTION}
      buttonText={COMPLETE.SPACE_CREATED.BUTTON_TEXT}
      highlightWords={COMPLETE.SPACE_CREATED.HIGHLIGHT_WORDS}
      onButtonClick={handleButtonClick}
    />
  );
};

export default SpaceCreatedCompletePage;
