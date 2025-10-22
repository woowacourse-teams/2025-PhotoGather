import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { createGuestHomeRoute } from '../../../constants/routes';
import useSpaceInfoContext from '../../../hooks/context/useSpaceInfoContext';
import CompletePageLayout from '../completePageLayout/CompletePageLayout';

const GuestbookAccessGuard = () => {
  const { spaceInfo, isLoading } = useSpaceInfoContext();
  const { spaceCode } = useParams();
  const navigate = useNavigate();

  if (isLoading) return null;

  if (!isLoading && !spaceInfo.isPublic) {
    return (
      <CompletePageLayout
        message="비공개 방명록입니다"
        buttonText="스페이스 홈으로 이동"
        onButtonClick={() => {
          navigate(createGuestHomeRoute(spaceCode ?? ''));
        }}
      />
    );
  }

  return <Outlet />;
};

export default GuestbookAccessGuard;
