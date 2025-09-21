import { useEffect, useState } from 'react';
import { authService } from '../../apis/services/auth.service';
import type { SpaceAccessType } from '../../types/space.type';

interface UseSpaceAccessProps {
  hostId: number | undefined;
  spaceType: SpaceAccessType;
}

const useSpaceAccess = ({ hostId, spaceType }: UseSpaceAccessProps) => {
  // TODO : 전역에서 내려주는 hostId로 변경
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoadingAccess, setIsLoadingAccess] = useState(true);

  useEffect(() => {
    if (spaceType === 'PUBLIC') {
      setHasAccess(true);
      return;
    }
    const fetchAccess = async () => {
      if (!hostId) return;
      setIsLoadingAccess(true);
      try {
        await authService.status().then((res) => {
          setHasAccess(res.data?.id === hostId);
        });
      } catch (error) {
        console.error(`접근 권한 확인 실패 : ${error}`);
      } finally {
        setIsLoadingAccess(false);
      }
    };
    fetchAccess();
  }, [hostId, spaceType]);

  return { hasAccess, isLoadingAccess };
};

export default useSpaceAccess;
