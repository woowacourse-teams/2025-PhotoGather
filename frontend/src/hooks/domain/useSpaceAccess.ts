import { useEffect, useState } from 'react';
import { authService } from '../../apis/services/auth.service';
import type { SpaceAccessType } from '../../types/space.type';

interface UseSpaceAccessProps {
  hostId: number | undefined;
  spaceType: SpaceAccessType | undefined;
}

const useSpaceAccess = ({ hostId, spaceType }: UseSpaceAccessProps) => {
  // TODO : 전역에서 내려주는 hostId로 변경
  const [hasAccess, setHasAccess] = useState(false);
  type LoadingStateType = 'pending' | 'loading' | 'success' | 'error';
  const [accessLoadingState, setAccessLoadingState] =
    useState<LoadingStateType>('pending');

  useEffect(() => {
    setAccessLoadingState('loading');
    if (spaceType === 'PUBLIC') {
      setHasAccess(true);
      setAccessLoadingState('success');
      return;
    }
    if (!hostId) {
      setHasAccess(false);
      setAccessLoadingState('error');
      return;
    }

    setAccessLoadingState('loading');
    const fetchAccess = async () => {
      try {
        await authService.status().then((res) => {
          setHasAccess(res.data?.id === hostId);
          setAccessLoadingState('success');
        });
      } catch (error) {
        console.error(`접근 권한 확인 실패 : ${error}`);
        setAccessLoadingState('error');
      }
    };
    fetchAccess();
  }, [hostId, spaceType]);

  return { hasAccess, accessLoadingState };
};

export default useSpaceAccess;
