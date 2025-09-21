import { useEffect, useState } from 'react';
import { authService } from '../../apis/services/auth.service';
import type { SpaceAccessType } from '../../types/space.type';

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
          if (spaceType === 'PUBLIC') {
            setHasAccess(true);
            setAccessLoadingState('success');
            setHostId(res.data?.id);
            return;
          }
          setHasAccess(res.data?.id === spaceHostId);
          setHostId(res.data?.id);
          setAccessLoadingState('success');
        });
      } catch (error) {
        console.error(`접근 권한 확인 실패 : ${error}`);
        setAccessLoadingState('error');
      }
    };
    fetchAccess();
  }, [spaceHostId, spaceType]);

  return { hasAccess, accessLoadingState, hostId };
};

export default useSpaceAccess;
