import { useEffect, useState } from 'react';
import { authService } from '../../../apis/services/auth.service';
import type { SpaceAccessType } from '../../../types/space.type';

interface UseSpaceAccessProps {
  spaceHostId: number | undefined;
  spaceType: SpaceAccessType | undefined;
}

const useSpaceAccess = ({ spaceHostId, spaceType }: UseSpaceAccessProps) => {
  const [hasAccess, setHasAccess] = useState(false);
  // TODO : 전역에서 내려주는 hostId로 변경
  const [hostId, setHostId] = useState<number | undefined>(undefined);
  type LoadingStateType = 'pending' | 'loading' | 'success' | 'error';
  const [accessLoadingState, setAccessLoadingState] =
    useState<LoadingStateType>('pending');

  const checkAuthAccess = (visitorId?: number) => {
    const isPublic = spaceType === 'PUBLIC';
    const hasPermission = isPublic || visitorId === spaceHostId;

    setHasAccess(hasPermission);
    setAccessLoadingState('success');
    if (visitorId) setHostId(visitorId);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: contextApI로 대체 예정
  useEffect(() => {
    if (!spaceHostId) {
      setHasAccess(false);
      setAccessLoadingState('error');
      return;
    }

    setAccessLoadingState('loading');
    const fetchAccess = async () => {
      try {
        await authService.status().then((res) => {
          if (!res.data) return;
          checkAuthAccess(res.data.id);
        });
      } catch (error) {
        console.error(`접근 권한 확인 실패 : ${error}`);
        // TODO : catch 단을 context에 hostId가 없을 경우로 변경 (로그인 하지 않은 사용자)
        checkAuthAccess();
      }
    };
    fetchAccess();
  }, [spaceHostId, spaceType]);

  return { hasAccess, accessLoadingState, hostId };
};

export default useSpaceAccess;
