import { MdWarning } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import CompletePageLayout from '../../components/layout/completePageLayout/CompletePageLayout';
import { ROUTES } from '../../constants/routes';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <CompletePageLayout
      icon={<MdWarning />}
      message="존재하지 않는 페이지입니다"
      buttonText="홈으로 돌아가기"
      isAnimationRequired={false}
      onButtonClick={() => {
        navigate(ROUTES.LANDING);
      }}
    />
  );
};

export default NotFound;
