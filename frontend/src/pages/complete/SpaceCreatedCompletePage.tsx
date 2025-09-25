import { useNavigate } from 'react-router-dom';
import { SpaceCreateImg as spaceCreateImage } from '../../@assets/images';
import MessageLayout from '../../components/layout/messageLayout/MessageLayout';
import { COMPLETE } from '../../constants/messages';
import { ROUTES } from '../../constants/routes';
import useSpaceCodeFromPath from '../../hooks/useSpaceCodeFromPath';

const SpaceCreatedCompletePage = () => {
  const navigate = useNavigate();
  const { spaceCode } = useSpaceCodeFromPath();

  const handleButtonClick = () => {
    navigate(ROUTES.MANAGER.SPACE_HOME(spaceCode ?? ''));
  };

  return (
    <MessageLayout
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
