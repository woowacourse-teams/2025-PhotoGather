import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import useSpaceInfoContext from '../../../hooks/context/useSpaceInfoContext';
import CompletePageLayout from '../completePageLayout/CompletePageLayout';

const GuestbookAccessGuard = () => {
  const { spaceInfo } = useSpaceInfoContext();
  const navigate = useNavigate();

  if (!spaceInfo.isPublic) {
    return (
      <CompletePageLayout
        message="비공개 방명록입니다"
        buttonText="호스트 페이지로 이동"
        onButtonClick={() => {
          navigate(ROUTES.HOST.MAIN);
        }}
      />
    );
  }

  return <Outlet />;
};

export default GuestbookAccessGuard;
