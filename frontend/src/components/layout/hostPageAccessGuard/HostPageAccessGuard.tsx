import { useQuery } from '@tanstack/react-query';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { spaceService } from '../../../apis/services/space/space.service';
import { ROUTES } from '../../../constants/routes';
import CompletePageLayout from '../completePageLayout/CompletePageLayout';

const HostPageAccessGuard = () => {
  const navigate = useNavigate();
  const { spaceCode } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['isSpaceHost', spaceCode],
    queryFn: async () => {
      const response = await spaceService.getIsSpaceOwner(spaceCode ?? '');
      if (response.success) {
        return response.data;
      }
      throw new Error('스페이스 호스트 확인에 실패했습니다');
    },
  });

  if (isLoading) return null;

  if (!isLoading && !data?.isSpaceHost) {
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
