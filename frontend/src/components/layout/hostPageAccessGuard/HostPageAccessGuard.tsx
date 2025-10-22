import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import CompletePageLayout from '../completePageLayout/CompletePageLayout';

const HostPageAccessGuard = () => {
  const navigate = useNavigate();
  // TODO : 소유자 정보와 공간 정보를 비교하는 API 연동 필요
  const isOwner = true;

  if (!isOwner) {
    return (
      <CompletePageLayout
        message="접근 권한이 없습니다"
        buttonText="메인 페이지로 이동"
        onButtonClick={() => {
          navigate(ROUTES.HOST.MAIN);
        }}
      />
    );
  }
  return <Outlet />;
};

export default HostPageAccessGuard;
